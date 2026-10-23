# Jay · Personal Blog & Research Notes

个人博客：[https://jayxuan.github.io/](https://jayxuan.github.io/)。

使用静态 HTML、CSS 与 JavaScript；GitHub Pages 从 `master` 分支根目录发布，`.nojekyll` 禁用 Jekyll 处理。

## 内容与来源

- 布局与样式参考 [Tingde Liu](https://tingdeliu.github.io/)，原站代码按 MIT 许可使用，见 [代码许可](licenses/LICENSE-CODE.txt)。
- 已同步至 2026-10-22，共 34 篇中文文章及 27 篇原站英文版。上述转载文章原作者为 **Tingde Liu**，按 **CC BY 4.0** 转载；每篇保留署名、来源、许可与修改说明。
- 完整文章目录见 [导入清单](licenses/articles-index.md)，内容授权与例外见 [内容许可](licenses/LICENSE-CONTENT.txt)。
- 本站改编了排版、站内链接、按篇加载和阅读交互；第三方论文配图及部分第三方引文以来源链接呈现。
- 字体、MathJax 和 Mermaid 随站点提供，可在本地阅读文章、公式与作者绘制的图表。许可证见 `fonts/` 和 `vendor/`。

## 修改与预览

最近同步（2026-10-22）：新增 2026-10-11、2026-10-17 两篇具身导航周报；更新 Embodied Agent 论文精读、VLA 论文精读、VLN 论文精读指令跟随篇与目标导航扩展篇、VLN 综述，以及原站对应英文版。中英文文章各自使用原文标注的更新日期。

同时修复了部分公式字符的 HTML 转义，确保后续章节和论文筛选完整；修复一处旧的 Cosmos 3 章节链接。正文语义保持原样。

- `config.js`：个人资料、简介和 GitHub 链接。
- `content.js` 与 `translations.js`：文章索引和元数据。
- `articles/zh/` 与 `articles/en/`：按篇保存的正文。
- `reference.css`、`styles.css`、`local.css`：基础与适配样式。

可用任何静态文件服务器预览此目录，也可直接打开 `index.html`。推送到 `master` 后 GitHub Pages 会自动更新。

## 旧站

2026-10-22 发布前的 Hexo 完整版本保留在 [备份分支](https://github.com/Jayxuan/Jayxuan.github.io/tree/backup/hexo-before-blog-2026-10-22)。旧站文章和资源目录仍保留，历史文章地址继续可访问。

## 零基础学具身智能

独立的 AI 辅助论文学习讲解专栏：`#/category/embodied-basics`。并非上述转载文章的一部分。第 1 课从 Brooks (1991) 与感知—行动闭环开始；文章包含论文来源、教学例子与阅读边界。

后续发布：在 `articles/zh/` 新增正文注册文件，并在 `content.js` 增加唯一 slug、`category: "embodied-basics"`、递增的 `seriesOrder`、上海时区发布日期、中文标题/摘要/标签、阅读时长、`contentLanguage: "zh"`、相应 `contentFile`。正文键为 `zh/<slug>`。专栏目录自动按课次排列。不要为学习讲解填入旧转载格式的 `author` + `sourceUrl` 字段（会误标 CC BY 4.0）；应在正文明确论文作者、原文链接与 AI 辅助讲解身份。只有真实英文稿才添加 `translations.js` 条目。发布前检查语法、文件路径、slug 和课次重复，并核验原文；基于最新 master 原子提交，禁止 force push。发布后核验线上文件、专栏和文章路由。
