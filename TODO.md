帮我完善项目首页布局设计
1. 增加顶部导航栏
左侧展示站Icon和名字 右侧展示Convert Blog FAQ Contact 多语言切换按钮
2. 现有转换区功能不变
3. 增加How to Convert的步骤区域
4. 增加Features区域
5. 增加FAQ区域
6. 增加页脚区域
展示Copyright， Convert列表竖向排列，列出可以转换的路由。 然后是一列语言区，竖向排列，列出可以切换的语言。然后是Doc Contact About竖向排列
7. 我想所有的转换路由，即x-to-x 页面结构都是如此，只有How to Convert,Features,FAQ的内容不一样，但是结构一样
8. 对于Blog页签, 点击跳转blog列表页面, 每个列表项包含标题，简介。点击跳转该blog文章页，路由blog/文章标题，使用markdown渲染文章，右侧需要有文章结构预览

设计一个适合工具站的配色

你先理解需求，一步一步来


继续完善
1. 所有转换页面增加H1标签,blog页面h1标签即时文章标题
2. 转换区输入输出框大小一致，输出狂下方也增加转换后的字符数

继续完善
1. 优化所有下拉框的样式
2. 加长输入输出框
3. 输出框底下增加减少或者增加的字符数和百分比,减少用绿色,增加用红色


继续完善
1. 顶部导航改为Convert Blog Contact About,底部资源同步修改为Blog Contact About，同时完善导航页签的划过和选中动效
2. 增加Contact About路由并完善页面

继续完善
1. 将网站品牌名还改为Toon Fast,不是Toon Converter
2. 邮箱使用contact@toon.fast，不需要演示表单，我需要真的能发送邮件
3. x-to-x的路由 导航要默认选中Convert


如果我是域名邮箱如何设置


优化
Blog页面我想使用专业的Marddown渲染
我的想法是我有一个目录专门存放所有的blog md文件
你动态读取文章列表和渲染具体的blog/xxx页面可以吗
如果你有更好的建议想法可以提出来

Marddown渲染不正常

markdown中的代码块没有正确渲染

使用https://github.com/remarkjs/react-markdown渲染Markdown

优化
1. 文章内容的css样式要不要清理掉
2. 检查package.json中没有使用到的包，主要是之前markdown渲染相关的


优化blog文章内容markdown的展示
去掉标题的下划线
代码高亮
结构紧凑

优化blog文章内容markdown的展示
a标签去掉下划线
sir
更新sitemap

将网页中Toon Fast的logo更新为 logo.png

Footer中的logo更新为logo.png


About中的logo更新为logo.png


<div class="nav__lang-dropdown">
            
            <a href="/es/" class="nav__lang-option" hreflang="es" data-lang="es">
              <span class="nav__lang-flag">🇪🇸</span>
              <span class="nav__lang-name">Español</span>
            </a>
            <a href="/fr/" class="nav__lang-option" hreflang="fr" data-lang="fr">
              <span class="nav__lang-flag">🇫🇷</span>
              <span class="nav__lang-name">Français</span>
            </a>
            <a href="/nl/" class="nav__lang-option" hreflang="nl" data-lang="nl">
              <span class="nav__lang-flag">🇳🇱</span>
              <span class="nav__lang-name">Nederlands</span>
            </a>
            <a href="/zh/" class="nav__lang-option" hreflang="zh" data-lang="zh">
              <span class="nav__lang-flag">🇨🇳</span>
              <span class="nav__lang-name">中文</span>
            </a>
            <a href="/ja/" class="nav__lang-option" hreflang="ja" data-lang="ja">
              <span class="nav__lang-flag">🇯🇵</span>
              <span class="nav__lang-name">日本語</span>
            </a>
            <a href="/ko/" class="nav__lang-option" hreflang="ko" data-lang="ko">
              <span class="nav__lang-flag">🇰🇷</span>
              <span class="nav__lang-name">한국어</span>
            </a>
            <a href="/vi/" class="nav__lang-option" hreflang="vi" data-lang="vi">
              <span class="nav__lang-flag">🇻🇳</span>
              <span class="nav__lang-name">Tiếng Việt</span>
            </a>
            <a href="/" class="nav__lang-option" hreflang="en" data-lang="en">
              <span class="nav__lang-flag">🇺🇸</span>
              <span class="nav__lang-name">English</span>
            </a><a href="/id/" class="nav__lang-option" hreflang="id" data-lang="id">
              <span class="nav__lang-flag">🇮🇩</span>
              <span class="nav__lang-name">Bahasa Indonesia
</span>
            </a>
            <a href="/pt/" class="nav__lang-option" hreflang="pt" data-lang="pt">
              <span class="nav__lang-flag">🇵🇹</span>
              <span class="nav__lang-name">Português</span>
            </a>
            <a href="/hi/" class="nav__lang-option" hreflang="hi" data-lang="hi">
              <span class="nav__lang-flag">🇮🇳</span>
              <span class="nav__lang-name">हिन्दी</span>
            </a>
            <a href="/ur/" class="nav__lang-option" hreflang="ur" data-lang="ur">
              <span class="nav__lang-flag">🇵🇰</span>
              <span class="nav__lang-name">اردو</span>
            </a>
            <a href="/de/" class="nav__lang-option" hreflang="de" data-lang="de">
              <span class="nav__lang-flag">🇩🇪</span>
              <span class="nav__lang-name">Deutsch</span>
            </a>
            <a href="/sv/" class="nav__lang-option" hreflang="sv" data-lang="sv">
              <span class="nav__lang-flag">🇸🇪</span>
              <span class="nav__lang-name">Svenska</span>
            </a>
            <a href="/ar/" class="nav__lang-option" hreflang="ar" data-lang="ar">
              <span class="nav__lang-flag">🇸🇦</span>
              <span class="nav__lang-name">العربية</span>
            </a>
            <a href="/he/" class="nav__lang-option" hreflang="he" data-lang="he">
              <span class="nav__lang-flag">🇮🇱</span>
              <span class="nav__lang-name">עברית</span>
            </a>
            <a href="/it/" class="nav__lang-option" hreflang="it" data-lang="it">
              <span class="nav__lang-flag">🇮🇹</span>
              <span class="nav__lang-name">Italiano</span>
            </a>
            <a href="/pl/" class="nav__lang-option" hreflang="pl" data-lang="pl">
              <span class="nav__lang-flag">🇵🇱</span>
              <span class="nav__lang-name">Polski</span>
            </a>
            <a href="/ru/" class="nav__lang-option" hreflang="ru" data-lang="ru">
              <span class="nav__lang-flag">🇷🇺</span>
              <span class="nav__lang-name">Русский</span>
            </a>
            <a href="/tr/" class="nav__lang-option" hreflang="tr" data-lang="tr">
              <span class="nav__lang-flag">🇹🇷</span>
              <span class="nav__lang-name">Türkçe</span>
            </a>
          </div>


es
pt
jp
这几的json语言你来翻译
不要创建说明文档


更新sitemap
不要创建说明文档

务必添加 <link rel="alternate" hreflang="x" ... /> 标签，告诉 Google 这些页面的关系。


Document does not have a valid rel=canonicalIs not an absolute URL (/en)

Select elements do not have associated label elements.

Polyfills and transforms enable older browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile Baseline features, unless you know you must support older browsers. Learn why most sites can deploy ES6+ code without transpilingLCPFCPUnscored

Avoid chaining critical requests by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.LCPUnscored

Requests are blocking the page's initial render, which may delay LCP. Deferring or inlining can move these network requests out of the critical path.LCPFCPUnscored

Polyfills and transforms enable older browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile Baseline features, unless you know you must support older browsers. Learn why most sites can deploy ES6+ code without transpilingLCPFCPUnscored

Layout shifts occur when elements move absent any user interaction. Investigate the causes of layout shifts, such as elements being added, removed, or their fonts changing as the page loads.CLSUnscored

Requests are blocking the page's initial render, which may delay LCP. Deferring or inlining can move these network requests out of the critical path.LCPFCPUnscored

When a button doesn't have an accessible name, screen readers announce it as "button", making it unusable for users who rely on screen readers. Learn how to make buttons more accessible.

Layout shifts occur when elements move absent any user interaction. Investigate the causes of layout shifts, such as elements being added, removed, or their fonts changing as the page loads.CLSUnscored


添加 WebApplication Schema：告诉 Google 这是一个软件工具。
添加 FAQPage Schema：在搜索结果中直接展示问答，占据更大版面。
添加 HowTo Schema：展示转换步骤。

当元素在没有任何用户互动的情况下移动时，就会发生布局偏移。调查布局偏移的原因，例如在网页加载时添加、移除元素或元素字体发生了变化。CLS不计分
元素
布局偏移分数
总计
0.197
Input Format Toon JSON CSV Swap ⇄ Output Format Toon JSON CSV Input TOON Import…
<div class="space-y-6">
0.197
Toon Fast Logo
<img alt="Toon Fast Logo" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" class="h-8 w-8" srcset="/_next/image?url=%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=%2Flogo.png&amp;w=…" src="/_next/image?url=%2Flogo.png&amp;w=64&amp;q=75" style="color: transparent;">
未设置尺寸的图片元素