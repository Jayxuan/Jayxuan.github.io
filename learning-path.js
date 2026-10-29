/* Research-grounded learning roadmap. Publication state comes from content.js. */
window.BLOG_LEARNING_PATH = {
  "intro": "<div class=\"learning-hub\" lang=\"zh-CN\">\n<p class=\"learning-kicker\">2026 学习路线 · 共同基础 → VLA / 世界模型</p>\n<p class=\"rc-intro\">从零基础开始，可以先读懂问题；要动手训练和做研究，还需要逐层补齐工具、数学与实验方法。这里从当前开源项目倒推知识需求，不把十一篇经典论文当作进入现代具身智能的必修门槛。</p>\n<nav class=\"rc-jump\" aria-label=\"学习路线章节\"><a href=\"#levels\" data-jump=\"levels\">选择深度</a><a href=\"#prerequisites\" data-jump=\"prerequisites\">共同基础</a><a href=\"#branches\" data-jump=\"branches\">两条分支</a><a href=\"#main-lessons\" data-jump=\"main-lessons\">主线精读</a><a href=\"#research-sources\" data-jump=\"research-sources\">调研依据</a><a href=\"#classic-archive\" data-jump=\"classic-archive\">经典补充</a></nav>\n<section class=\"learning-callout\"><strong>先分清两个问题。</strong><p><b>策略（policy）</b>回答“现在做什么动作”；<b>世界模型（world model）</b>学习环境如何变化，常用于预测行动的后果。<b>VLA</b>把视觉、语言指令与动作联系起来，通常承担策略角色。世界模型既可以在紧凑的潜在表示中预测，也可以生成未来视频；漂亮的视频本身不证明能控制机器人。两条路线可以组合，但不应混成一门“预测下一帧”的课。</p></section>\n<h2 id=\"levels\">01 · 先选目标，再决定学到多深</h2>\n<div class=\"learning-levels\">\n<section><h3>读懂 · Reading</h3><p>先认清观察、动作、目标和反馈，再看原论文图中的输入、模块与输出。暂时跳过推导不妨碍建立第一层理解。</p><p><b>验收：</b>不用术语复述任务；沿原图走完数据流；说出一个不能从实验推出的结论。</p></section>\n<section><h3>动手 · Doing</h3><p>会 Python / NumPy、Linux 环境管理与 PyTorch 张量操作；理解训练/验证划分、梯度和模型检查点。优先在公开数据或仿真中跑小实验。</p><p><b>验收：</b>保存版本、配置、种子与日志；定位一个数据维度问题；比较基线与一次受控修改。</p></section>\n<section><h3>研究 · Research</h3><p>补概率、优化、序列建模与相应分支的理论；能审查数据泄漏、消融、统计不确定性和计算预算。</p><p><b>验收：</b>提出可被否定的假设，设计公平对照，并报告失败案例。跑通演示不等于复现论文。</p></section>\n</div>\n<h2 id=\"prerequisites\">02 · 两条路线共享的最小知识底座</h2>\n<p>以下是本专栏依据项目与课程整理的学习建议，不是所有岗位统一的准入标准。每项都给出可检查的产物；不必先学完整门机器人学再开始读论文。</p>\n<div class=\"article-table-scroll\" tabindex=\"0\" role=\"region\" aria-label=\"可横向滚动的先修表\"><table><thead><tr><th>知识块</th><th>先弄懂什么</th><th>怎样检查自己</th><th>何时需要</th></tr></thead><tbody>\n<tr><td>Python / Linux / Git</td><td>函数、数组、虚拟环境、路径、依赖与版本</td><td>读取一条轨迹，打印观察和动作的形状；记录依赖版本</td><td>动手前；纯阅读可后补</td></tr>\n<tr><td>线性代数与微积分</td><td>向量、矩阵乘法、维度、偏导、链式法则</td><td>解释两个 token 的点积；算出线性层输出形状；说明梯度更新方向</td><td>读 Attention 的公式；实现网络前</td></tr>\n<tr><td>概率与统计</td><td>条件概率、期望、方差、似然、训练分布与测试分布</td><td>区分“同一任务十次成功”与“十个新任务成功”；说明何时需置信区间</td><td>理解随机策略、潜变量和评测</td></tr>\n<tr><td>深度学习与优化</td><td>损失、autograd 自动求导、DataLoader、检查点、过拟合、梯度下降</td><td>训练小模型并画训练/验证曲线；用小批数据检查是否能过拟合</td><td>两条路线的动手基础</td></tr>\n<tr><td>表征与序列建模</td><td>token、embedding、注意力、位置编码、历史信息</td><td>沿 Transformer 图标出 token 数和特征维度；区分训练掩码与推理输入</td><td>现代 VLA、视频表征与世界模型</td></tr>\n<tr><td>机器人数据接口</td><td>观察不等于状态；本体感觉、episode 轨迹、时间戳、坐标系、动作单位</td><td>写清动作是关节角还是末端位移；检查图像与动作对齐、归一化和控制频率</td><td>处理机器人轨迹前；真机必需</td></tr>\n<tr><td>实验与安全</td><td>按轨迹/场景划分数据、闭环成功率、延迟、失败分类</td><td>列出未见物体/场景测试；保存失败回放；先仿真再谈真机急停与限幅</td><td>所有结果报告；真机有额外安全门槛</td></tr>\n</tbody></table></div>\n<details class=\"learning-check\"><summary>入门自测：这几个词你能区分吗？</summary><dl><dt>观察 observation / 状态 state</dt><dd>观察是传感器提供的信息；状态是描述系统演化所需的信息。单张照片通常看不到速度或被遮挡的物体，不能直接当成完整状态。</dd><dt>动作 action / 动作块 action chunk</dt><dd>动作是一时刻的控制指令；动作块是一段未来指令。预测一段动作不代表必须全部开环执行，执行多少步后重规划是设计选择。</dd><dt>模仿学习 / 强化学习</dt><dd>前者从示范学习动作，后者以交互回报为目标改进策略。机器人系统可能组合两者；不能只靠是否使用神经网络来分类。</dd><dt>潜变量 latent / 像素</dt><dd>潜变量是模型内部表征，不等于可直接观看的图像。预测表示有用与否，需要用下游任务检验。</dd><dt>单步预测 / 闭环决策</dt><dd>单步误差小，不保证连续行动成功；行动会改变随后看到的数据，误差也可能沿时间累积。</dd></dl></details>\n<h2 id=\"branches\">03 · 按研究问题分流，不按年代排队</h2>\n<div class=\"learning-branches\">\n<section><span class=\"learning-kicker\">分支 A · 从示范到动作</span><h3>VLA 与机器人策略</h3><p><b>问题：</b>给定相机、本体状态和语言目标，怎样产生可执行且能泛化的动作？</p><ol><li><b>先补模仿学习：</b>行为克隆、分布偏移、动作表示与闭环评测。用一个小策略建立可比较的基线。</li><li><b>再看视觉语言表征：</b>理解预训练信息如何进入动作模型，区分语言理解能力与机器人执行成功率。</li><li><b>进入现代策略：</b>动作分块、扩散/流匹配、VLA 微调与数据混合。把 ACT、Diffusion Policy、OpenVLA、π 系列作为不同设计的比较对象，而非必然逐代取代。</li><li><b>接工程工具：</b>用 LeRobot 理解数据—策略—评测接口；用 openpi 查看 π 系列推理、微调和动作适配。选定仓库版本后再写命令。</li></ol><p><b>动手验收：</b>检查一条轨迹的观察/动作单位、归一化、时间对齐；在相同数据与评测预算下对比两种动作表示。</p><p><b>研究补课：</b>连续概率分布、生成建模、跨本体数据、控制延迟与消融设计。若走腿足运动或底层控制，还需动力学与控制稳定性，不能照搬操作任务的最低门槛。</p><p>官方入口：<a href=\"https://github.com/huggingface/lerobot\">LeRobot</a> · <a href=\"https://github.com/Physical-Intelligence/openpi\">openpi</a></p></section>\n<section><span class=\"learning-kicker\">分支 B · 从经验到后果预测</span><h3>世界模型与规划</h3><p><b>问题：</b>如何用经验学习可用于决策的环境变化规律，且避免在模型误差中“想得越远、错得越远”？</p><ol><li><b>先分辨状态与历史：</b>理解部分可观测、潜在状态、动作条件与多步预测。再补 MDP/POMDP、奖励、回报和价值函数。</li><li><b>潜在动力学路线：</b>用 DreamerV3 学习表征、动态模型、想象轨迹与 actor–critic 的连接；预测得像与决策有用是两种评价。</li><li><b>视频表征路线：</b>用 V-JEPA 2 区分无动作视频预训练与动作条件后训练；追问怎样从表示预测走到规划。</li><li><b>视频生成路线：</b>比较视频 token、扩散/自回归生成、动作可控性和物理一致性。生成质量、预测准确性与任务成功率分别报告。</li></ol><p><b>动手验收：</b>在固定起点与动作序列下，分别记录一步和多步预测误差；比较真实环境与模型中的回报。</p><p><b>研究补课：</b>条件概率、潜变量目标、KL 散度、自监督学习、模型误差累积与分布外泛化。研究 Dreamer 类方法需要 RL；阅读无动作视频表征不必先完成全部 RL 课程。</p><p>官方入口：<a href=\"https://github.com/danijar/dreamerv3\">DreamerV3</a> · <a href=\"https://github.com/facebookresearch/vjepa2\">V-JEPA 2 / 2.1</a></p></section>\n</div>\n<section class=\"learning-callout\"><h3>没有高端 GPU，先做什么？</h3><p>先做原图阅读、纸上维度检查、少量数据可视化和小模型实验。阅读门槛、推理门槛和完整训练预算是三回事。openpi 文档在本次核验时给出的单卡显存估计分别为：推理 &gt;8 GB、LoRA 微调 &gt;22.5 GB、全参数微调 &gt;70 GB；这不是所有模型通用的配置保证。正式运行前按具体模型、精度与批大小重新核对<a href=\"https://github.com/Physical-Intelligence/openpi#requirements\">官方要求</a>。本站尚未执行这些训练实验，不把建议写成复现成绩。</p></section>\n<h2 id=\"main-lessons\">04 · 十六个主线模块：从基础到可检验的实验</h2>\n<p>稳定编号按知识分支管理：C 为共同基础，A 为策略/VLA，W 为世界模型，X 为统一评测。十六个主线模块均提供完整正文、原论文插图与验收题；C03 CLIP 建立图文对齐基础，C04 SigLIP 进一步解释配对损失与分块计算，C05 DINOv2 补上图像自监督与局部表征，C06 MAE 对照像素重建与教师表示目标，衔接视觉预训练和世界模型；这些正文提供当前路线的学习入口，不代表读完就掌握整个领域，也不代表本站已完成训练复现。新增 C07 I-JEPA 与 C08 原始 V-JEPA（2024），补上从图像特征预测到视频时空表征的先修桥梁，再进入 W03 V-JEPA 2 的动作条件后训练；这两篇不是 V-JEPA 2 的重复介绍。后续更新以实际发布内容为准；经典补充另列在页末。</p>\n",
  "afterRoadmap": "<h2 id=\"reading-contract\">05 · 每篇精读如何读</h2><p>采用“问题 → 洞察 → 方法 → 证据 → 批判 → 联系 → 实现 → 研究机会 → 总结”的深读结构。先看元信息和阅读前预期，再沿原图追踪数据流；对公式解释符号、维度、动机与失效条件。实验表分清论文报告、本文解释和待验证猜想，最后用可否定的假设设计下一步实验。</p><p><b>图与来源：</b>原论文插图注明图号、作者、出处、许可与修改方式，提供本地高清原图链接及逐项阅读指南；教学示意图明确标为重绘。代码开源不自动代表论文图片有同样许可。未获适用许可的图片不能用“原图”名义复制。</p>\n<h2 id=\"research-sources\">06 · 路线依据与调研边界</h2><p>路线原始核验：2026-10-24；C03 补充核验：2026-10-25；C04 补充核验：2026-10-26；C05 补充核验：2026-10-27；C06 补充核验：2026-10-28；C07–C08 补充核验：2026-10-29。以下是可追溯的公开资料，不以收藏量或社区热度替代技术证据。</p><ul>\n<li><a href=\"https://github.com/TianxingChen/Embodied-AI-Guide#14-新人常见问题\">Embodied-AI-Guide 新人 FAQ</a>：将 Python、Linux 与基本深度学习列为实践起点，机器人学与控制按需补，并提供仿真入口。这里据此区分“先上手”和“完整研究能力”，不把社区经验当作统一标准。</li>\n<li><a href=\"https://github.com/datawhalechina/dive-into-embodied-ai\">Datawhale · Dive into Embodied AI</a>：覆盖 RL、World Model、VLA 与感知/控制/仿真，适合查知识地图；仓库标注 Alpha、部分章节为占位页，不能当作已完成教材。</li>\n<li><a href=\"https://github.com/huggingface/lerobot\">LeRobot 官方仓库</a>与<a href=\"https://github.com/Physical-Intelligence/openpi\">openpi 官方仓库</a>：用于核对真实工程接口、配置和资源条件，而不是据此宣称所有初学者都应直接训练大模型。</li>\n<li><a href=\"https://github.com/danijar/dreamerv3\">DreamerV3 官方实现</a>与<a href=\"https://github.com/facebookresearch/vjepa2\">V-JEPA 2 官方实现</a>：对照潜在动力学、视频表征及动作条件预测。V-JEPA 2 仓库已包含 2.1 更新；本文精读的具体论文版本在文章元信息中单独注明，避免混用结果。</li>\n<li><a href=\"https://huggingface.co/learn/robotics-course/en/unit0/1\">Hugging Face Robotics Course</a>：以基本 Python 为入口，数学随需补充，可用仿真与数据集学习；页面仍列有 Coming Soon 单元，不能当成全部已开放的课程。这与研究课程的先修深度不同。</li>\n<li><a href=\"https://rail.eecs.berkeley.edu/deeprlcourse/syllabus/\">Berkeley CS 185/285 课程先修要求</a>：要求相当于机器学习课程的基础，并熟悉数值优化与 RL。这支持研究层需要系统先修，不能用“零基础可阅读”代替。</li>\n<li><a href=\"https://proceedings.mlr.press/v139/radford21a.html\">CLIP 正式论文</a>与<a href=\"https://github.com/openai/CLIP\">官方实现</a>：新增 C03，用图文对齐补上 Attention 到 VLA 之间的共同基础；不将分类能力等同机器人执行能力。</li>\n<li><a href=\"https://arxiv.org/abs/2303.15343v4\">SigLIP v4</a>与<a href=\"https://github.com/google-research/big_vision\">big_vision 官方项目</a>：C04 对照独立配对与全批归一化，区分视觉预训练指标、系统成本和机器人能力。</li>\n<li><a href=\"https://arxiv.org/abs/2304.07193v2\">DINOv2 v2</a>与<a href=\"https://github.com/facebookresearch/dinov2\">官方项目</a>：C05 补充图像自监督、EMA教师与局部表示；不混用后续 registers、dino.txt 或 DINOv3 结果。</li>\n<li><a href=\"https://arxiv.org/abs/2111.06377v3\">MAE v3</a>与<a href=\"https://github.com/facebookresearch/mae\">官方项目</a>：C06 解释非对称编码、像素目标与微调协议；原始TPU实现与公开GPU重实现的成本不混用。</li>\n<li><a href=\"https://github.com/facebookresearch/ijepa\">I-JEPA 官方归档实现</a>与<a href=\"https://github.com/facebookresearch/jepa\">原始 V-JEPA 官方实现</a>：C07–C08 将图像特征预测扩展到时空表征。I-JEPA 仓库已归档，作为固定历史实现阅读；论文版本与实现版本分别记录，不把后续 V-JEPA 2 / 2.1 的控制结论移植给早期方法。</li><li><a href=\"https://cs231n.stanford.edu/\">Stanford CS231n（2026）</a>列出 Python、微积分/线性代数和概率统计先修；结合本次核对的 <a href=\"https://github.com/huggingface/lerobot\">LeRobot</a> 数据/评测接口与 <a href=\"https://github.com/facebookresearch/vjepa2\">V-JEPA 2 官方项目</a>，本路线选择先补张量、训练目标、时序采样与评测协议。这是课程编排判断，不是要求初学者先购置机器人或学完 ROS 2、SLAM。</li></ul><p class=\"sample-note\"><b>小红书调研限制：</b>本轮无法可靠读取并核验相关公开笔记全文，未将搜索摘要或不可访问帖子算作已读资料，也不宣称形成“小红书社区共识”。因此当前路线以以上可核验 GitHub 项目与正式课程为依据；补充具体笔记时，应记录作者、日期、原文和可交叉验证的主张。</p>\n<h2 id=\"classic-archive\">07 · 经典基础补充档案</h2><p>原有 11 篇保留完整正文、原地址和原课次，供需要补直觉时查阅。它们仍有历史与教学价值，但不再构成新版主线，也不是阅读现代 VLA / 世界模型前必须逐篇通过的关卡。旧文中的“第几课”只代表旧系列编号。</p>",
  "roadmap": [
    {
      "id": "C01",
      "title": "张量、梯度与实验设计",
      "branch": "共同基础",
      "description": "先修：基本算术与函数。读计算图、梯度和数据划分，完成可检查的小模型实验设计。",
      "slug": "embodied-modern-c01-tensors"
    },
    {
      "id": "C02",
      "title": "Attention Is All You Need",
      "branch": "共同基础",
      "description": "先修：向量、矩阵乘法、概率与训练/验证。读原图、QKV 维度和因果掩码。",
      "slug": "embodied-modern-01-attention-2017"
    },
    {
      "id": "C03",
      "title": "CLIP：视觉语言对齐与零样本迁移",
      "branch": "共同基础",
      "description": "先修：C01 的训练与点积、C02 的 token 与注意力。读懂双编码器、对比损失与提示分类，分清语义匹配与机器人动作。",
      "slug": "embodied-modern-c03-clip-2021"
    },
    {
      "id": "C04",
      "title": "SigLIP：独立配对损失与高效图文预训练",
      "branch": "共同基础",
      "description": "先修：C01–C03。沿原图理解正负配对、偏置和分块计算，分清预训练成本与机器人闭环证据。",
      "slug": "embodied-modern-c04-siglip-2023"
    },
    {
      "id": "C05",
      "title": "DINOv2：自监督视觉特征与局部表示",
      "branch": "共同基础",
      "description": "先修：C01、C02；C03–C04用于对照。沿DINO原图学习师生蒸馏，再拆解DINOv2局部目标、数据筛选与冻结评测。",
      "slug": "embodied-modern-c05-dinov2-2023"
    },
    {
      "id": "C06",
      "title": "MAE：像素重建与掩码视觉预训练",
      "branch": "共同基础",
      "description": "先修：C01、C02；C05用于对照。沿原图核对只编码可见块的维度与损失，区分重建、冻结评测和微调。",
      "slug": "embodied-modern-c06-mae-2021"
    },
    {
      "id": "C07",
      "title": "I-JEPA：从像素重建到语义特征预测",
      "branch": "共同基础",
      "description": "先修：C01、C02、C05、C06。比较像素与特征目标，沿原图追踪上下文、目标编码器、位置查询及EMA。",
      "slug": "embodied-modern-c07-ijepa-2023"
    },
    {
      "id": "C08",
      "title": "V-JEPA：从图像表征到视频时空预测",
      "branch": "共同基础",
      "description": "先修：C07与视频token。追踪时空遮挡和冻结探针，区分视频表征、未来预测与动作条件控制。",
      "slug": "embodied-modern-c08-vjepa-2024"
    },
    {
      "id": "A01",
      "title": "模仿学习、动作表示与闭环评测",
      "branch": "策略 / VLA",
      "description": "先修：C01 的训练/验证。逐步理解行为克隆、动作坐标与单位、分布偏移和闭环评测。",
      "slug": "embodied-modern-a01-imitation"
    },
    {
      "id": "A02",
      "title": "ACT / Diffusion Policy",
      "branch": "策略 / VLA",
      "description": "先修：A01、C02。比较动作块、CVAE、扩散去噪与重规划，设计同预算消融。",
      "slug": "embodied-modern-a02-act-diffusion"
    },
    {
      "id": "A03",
      "title": "OpenVLA / π 系列与 openpi",
      "branch": "策略 / VLA",
      "description": "先修：A01、A02、C02。比较离散动作与流匹配，检查 openpi 的数据接口、版本和资源条件。",
      "slug": "embodied-modern-a03-openvla-pi"
    },
    {
      "id": "W01",
      "title": "MDP、潜变量与模型误差",
      "branch": "世界模型",
      "description": "先修：C01、条件概率直觉。读懂奖励/回报、隐藏状态、RSSM 和多步模型误差。",
      "slug": "embodied-modern-w01-mdp-latents"
    },
    {
      "id": "W02",
      "title": "DreamerV3",
      "branch": "世界模型",
      "description": "先修：MDP、奖励/回报、潜变量与条件概率。读潜在动力学与想象学习。",
      "slug": "embodied-modern-02-dreamerv3"
    },
    {
      "id": "W03",
      "title": "V-JEPA 2",
      "branch": "世界模型",
      "description": "先修：视频 token、自监督目标、状态/动作与规划。区分视频表征和动作条件后训练。",
      "slug": "embodied-modern-03-vjepa2"
    },
    {
      "id": "W04",
      "title": "视频生成式世界模型",
      "branch": "世界模型",
      "description": "先修：W01、W03 与条件生成。沿 UniSim 原图检查动作条件、视频质量、物理一致性和决策价值。",
      "slug": "embodied-modern-w04-video-world-models"
    },
    {
      "id": "X01",
      "title": "统一评测与可复现实验记录",
      "branch": "交叉专题",
      "description": "先修：C01 与任一分支。统一任务、预算和记录，解释置信区间、失败案例与复现边界。",
      "slug": "embodied-modern-x01-reproducible-evaluation"
    }
  ]
};
