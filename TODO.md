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