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

## 零基础学具身智能与世界模型

独立的 AI 辅助论文学习专栏：`#/category/embodied-basics`，不属于上述 Tingde Liu 转载内容。

- `learning-path.js` 保存共同先修、VLA / 世界模型双分支、调研来源和十八个主线模块。条目只有匹配 `content.js` 的已发布正文才显示“已发布”，不能把目录当作完成课程。
- 新主线文章使用 `category: "embodied-basics"`、`seriesId: "embodied-main"`，唯一 slug、`seriesOrder` 与知识位置 `learningCode`。编号并不意味着读者可以跳过共同先修。
- 旧有 11 篇全文和 URL 保留，索引标记 `seriesId: "embodied-classics"`、`seriesStatus: "supplementary"`。文章页明确显示经典补充档案；前后篇导航不混入新主线。
- 新稿须具备元信息、先修说明、问题/洞察/方法/实验/批判/联系/实现/研究机会/总结及来源。没有真实运行时只能写实验方案或待验证，不能标“已复现”。
- 原论文插图优先保存至 `assets/embodied-learning/`。每图具备图号、原文来源、作者信用、适用许可、修改说明、alt、高清链接和逐项读图指南。代码许可不自动覆盖论文图片；详见相关图片许可记录。
- 正文仍按 `articles/zh/<slug>.js` 注册至 `window.BLOG_ARTICLE_CONTENT["zh/<slug>"]`。仅有真实英文稿时才添加翻译条目。不要给学习讲解填写旧转载格式的 `author` + `sourceUrl`（会误触发 CC BY 4.0 转载标签）。
- 发布前检查 JavaScript 语法、slug/次序唯一性、正文/图片路径、许可、移动与桌面阅读；核验旧文原样保留。基于最新 master 原子提交，禁止 force push。发布后核对线上文件、专栏和文章路由。

本次调研以可核验的 GitHub 官方项目、社区指南和课程要求为依据；无法核验的小红书帖子没有当作已读材料。日更自动化不由本次代码修改管理。

主线课程现覆盖 C01–C10、A01–A03、W01–W04、X01，共十八篇。2026-10-30 新增 C09 DDPM 与 C10 Flow Matching，补齐从噪声回归、反向采样到条件概率路径、速度场与 ODE 的生成建模先修，再连接 A02 动作扩散和 A03 流式动作生成。后续主线次序顺延，旧正文、经典补充及独立学习记录栏目保持不变。正文完整不代表完成训练复现；研究方案标注未运行。原图版本、图号、作者、许可与高清资源详见各篇正文及 `licenses/embodied-learning/`。

## 学习记录

独立专栏：`#/category/learning-records`，记录概念、论文与实现思路，不属于具身智能主线或转载系列。

- 2026-10-29 首篇：ViT 学习记录，正文 `articles/zh/learning-record-vit-2020.js`。
- 索引使用 `category: "learning-records"`，正文键 `zh/<slug>`；AI 辅助学习整理，注明原始资料与未复现实验的边界。
- 顶部/侧栏导航与 Blog 页提供入口，文章的前后篇导航仅限本专栏。此专栏没有新增定时发布安排。

