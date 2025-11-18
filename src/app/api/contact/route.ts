import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  // 保存原始代理设置
  const originalHttpProxy = process.env.HTTP_PROXY;
  const originalHttpsProxy = process.env.HTTPS_PROXY;
  
  try {
    // 清除代理环境变量，避免 SMTP 连接被代理
    delete process.env.HTTP_PROXY;
    delete process.env.HTTPS_PROXY;
    
    const { name, email, subject, message } = await request.json();

    // 验证必填字段
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "所有字段都是必填的" },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "邮箱格式不正确" },
        { status: 400 }
      );
    }

    // 创建邮件传输器
    // 支持多种邮箱服务商，通过环境变量配置
    const smtpPort = parseInt(process.env.SMTP_PORT || "465");
    const smtpSecure = process.env.SMTP_SECURE !== "false";
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.exmail.qq.com", // 默认使用腾讯企业邮箱
      port: smtpPort,
      secure: smtpSecure, // 465 端口使用 true，587 端口使用 false
      auth: {
        user: process.env.EMAIL_USER, // 你的邮箱地址
        pass: process.env.EMAIL_PASS, // 你的邮箱密码或授权码
      },
      // 添加连接配置
      connectionTimeout: 15000, // 15 秒连接超时
      greetingTimeout: 15000, // 15 秒握手超时
      socketTimeout: 15000, // 15 秒 socket 超时
      // TLS 配置
      tls: {
        // 587 端口需要 STARTTLS
        ciphers: 'SSLv3',
        rejectUnauthorized: process.env.NODE_ENV === "production", // 生产环境验证证书
      },
      // 强制使用 STARTTLS（对于 587 端口）
      requireTLS: !smtpSecure,
      // 调试模式（生产环境应该关闭）
      debug: process.env.NODE_ENV === "development",
      logger: process.env.NODE_ENV === "development",
    });

    // 邮件内容
    const mailOptions = {
      from: `"Toon Fast 联系表单" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // 接收邮件的地址，默认发给自己
      subject: `[Toon Fast] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">新的联系表单提交</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>姓名：</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>邮箱：</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>主题：</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">消息内容：</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #EFF6FF; border-left: 4px solid #3B82F6; border-radius: 4px;">
            <p style="margin: 0; color: #1E40AF; font-size: 14px;">
              💡 提示：请直接回复 ${email} 来回复此消息
            </p>
          </div>
        </div>
      `,
      replyTo: email, // 设置回复地址为用户的邮箱
    };

    // 验证 SMTP 连接
    try {
      await transporter.verify();
      console.log("SMTP 连接验证成功");
    } catch (verifyError) {
      console.error("SMTP 连接验证失败:", verifyError);
      throw new Error("SMTP 服务器连接失败，请检查邮箱配置");
    }

    // 发送邮件
    const info = await transporter.sendMail(mailOptions);
    console.log("邮件发送成功:", info.messageId);

    // 恢复代理设置
    if (originalHttpProxy) process.env.HTTP_PROXY = originalHttpProxy;
    if (originalHttpsProxy) process.env.HTTPS_PROXY = originalHttpsProxy;

    return NextResponse.json(
      { message: "邮件发送成功" },
      { status: 200 }
    );
  } catch (error) {
    // 恢复代理设置
    if (originalHttpProxy) process.env.HTTP_PROXY = originalHttpProxy;
    if (originalHttpsProxy) process.env.HTTPS_PROXY = originalHttpsProxy;
    console.error("邮件发送失败:", error);
    
    // 提供更详细的错误信息
    let errorMessage = "邮件发送失败，请稍后重试";
    
    if (error instanceof Error) {
      if (error.message.includes("SMTP")) {
        errorMessage = "SMTP 服务器连接失败，请检查邮箱配置";
      } else if (error.message.includes("authentication")) {
        errorMessage = "邮箱认证失败，请检查用户名和密码";
      } else if (error.message.includes("timeout")) {
        errorMessage = "连接超时，请检查网络或 SMTP 服务器";
      } else if (error.message.includes("socket close")) {
        errorMessage = "连接被关闭，请检查 SMTP 端口和 SSL 设置";
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
