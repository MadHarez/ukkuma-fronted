import type { BlogPost, Project } from '@/types'

/**
 * Local fallback content used while the Spring Boot backend is not yet
 * available. Each item is fully bilingual so the UI can switch instantly.
 */
export const mockPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'reading-the-present',
    title: { zh: '占卜不是预言未来，而是照亮当下', en: 'Divination Reads the Present, Not the Future' },
    excerpt: {
      zh: '当我们放下“会发生什么”，转而问“此刻的能量是什么”，答案往往更清晰。',
      en: 'When we trade “what will happen” for “what is the energy now”, clarity follows.',
    },
    content: {
      zh: '很多人第一次走进解读，期待的是一个确定的答案。但占卜真正的力量，在于帮助你看清当下的格局——你正站在哪里，有哪些力量在流动，又有哪些选择正向你敞开。\n\n当你不再执着于一个固定的结局，你会发现自己重新握回了主动权。',
      en: 'Many arrive at their first reading hoping for a fixed answer. Yet the real power of divination is to reveal the present — where you stand, which forces are moving, and which choices are opening before you.\n\nWhen you stop clinging to a single ending, you find your agency returning to your own hands.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: '很多人第一次走进解读，期待的是一个确定的答案。但占卜真正的力量，在于帮助你看清当下的格局——你正站在哪里，有哪些力量在流动，又有哪些选择正向你敞开。',
          en: 'Many arrive at their first reading hoping for a fixed answer. Yet the real power of divination is to reveal the present — where you stand, which forces are moving, and which choices are opening before you.',
        },
      },
      {
        type: 'image',
        src: 'https://picsum.photos/seed/ukkuma-tarot/1200/750',
        alt: { zh: '桌上摊开的塔罗牌', en: 'Tarot cards spread on a table' },
        caption: { zh: '每一张牌都是一面镜子，映照此刻的你。', en: 'Each card is a mirror reflecting who you are right now.' },
      },
      {
        type: 'heading',
        text: { zh: '把问题换一种问法', en: 'Ask the Question Differently' },
      },
      {
        type: 'paragraph',
        text: {
          zh: '与其问“他会回来吗”，不如问“这段关系此刻在教我什么”。前者把力量交给了未知，后者把力量留在了你手里。',
          en: 'Instead of “will they come back?”, try “what is this relationship teaching me now?” The first hands your power to the unknown; the second keeps it in your hands.',
        },
      },
      {
        type: 'quote',
        text: {
          zh: '占卜不替你做决定，它只是让你更清楚地听见自己的声音。',
          en: 'Divination does not decide for you — it helps you hear your own voice more clearly.',
        },
        cite: { zh: 'Mira', en: 'Mira' },
      },
      {
        type: 'list',
        items: [
          { zh: '带着一个开放的问题，而不是一个是非题。', en: 'Bring an open question rather than a yes/no one.' },
          { zh: '关注牌阵之间的关系，而非单张的“好坏”。', en: 'Notice the relationships between cards, not just whether one is “good” or “bad”.' },
          { zh: '解读结束后，写下你最有共鸣的一句话。', en: 'After the reading, write down the one line that resonated most.' },
        ],
      },
      {
        type: 'paragraph',
        text: {
          zh: '当你不再执着于一个固定的结局，你会发现自己重新握回了主动权。',
          en: 'When you stop clinging to a single ending, you find your agency returning to your own hands.',
        },
      },
    ],
    cover: 'linear-gradient(135deg,#a78bfa,#2dd4bf)',
    author: 'Mira',
    tags: ['tarot', 'mindset'],
    readingMinutes: 5,
    publishedAt: '2026-05-12',
  },
  {
    id: 2,
    slug: 'space-and-energy',
    title: { zh: '空间会记住你的情绪', en: 'Your Space Remembers Your Emotions' },
    excerpt: {
      zh: '一次空间净化，往往也是一次内在的整理。',
      en: 'A space cleansing is often an inner tidying, too.',
    },
    content: {
      zh: '我们居住的环境会悄悄累积情绪的残留。一次有意识的净化，不只是清洁空气，更是为新的意图腾出位置。\n\n试着在打扫时，把每一个动作都当作一次温柔的告别。',
      en: 'The places we live quietly accumulate emotional residue. A conscious cleansing is not only about clearing the air — it makes room for new intention.\n\nNext time you tidy, treat each motion as a gentle goodbye.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: '我们居住的环境会悄悄累积情绪的残留。一次有意识的净化，不只是清洁空气，更是为新的意图腾出位置。',
          en: 'The places we live quietly accumulate emotional residue. A conscious cleansing is not only about clearing the air — it makes room for new intention.',
        },
      },
      {
        type: 'image',
        src: 'https://picsum.photos/seed/ukkuma-incense/1200/750',
        alt: { zh: '燃烧的鼠尾草与香', en: 'Burning sage and incense' },
        caption: { zh: '烟雾是看得见的呼吸，帮助空间重新开始。', en: 'Smoke is a visible breath, helping a space begin again.' },
      },
      {
        type: 'heading',
        text: { zh: '一个简单的净化流程', en: 'A Simple Cleansing Ritual' },
      },
      {
        type: 'list',
        ordered: true,
        items: [
          { zh: '打开窗户，让空气流动。', en: 'Open the windows and let the air move.' },
          { zh: '从门口开始，顺时针绕行整个空间。', en: 'Start at the door and move clockwise through the space.' },
          { zh: '在每个角落停留片刻，说出你的意图。', en: 'Pause in each corner and speak your intention aloud.' },
          { zh: '结束时，点一盏灯或一支蜡烛作为收束。', en: 'Close by lighting a lamp or candle to seal the space.' },
        ],
      },
      {
        type: 'paragraph',
        text: {
          zh: '试着在打扫时，把每一个动作都当作一次温柔的告别。',
          en: 'Next time you tidy, treat each motion as a gentle goodbye.',
        },
      },
    ],
    cover: 'linear-gradient(135deg,#fb923c,#a78bfa)',
    author: 'Mira',
    tags: ['cleansing', 'space'],
    readingMinutes: 4,
    publishedAt: '2026-04-28',
  },
  {
    id: 3,
    slug: 'lunar-rhythm',
    title: { zh: '跟随月相，安排你的意图与释放', en: 'Set Intention and Release with the Moon' },
    excerpt: {
      zh: '新月种下意图，满月学会放手。',
      en: 'Plant intention at the new moon; learn to let go at the full moon.',
    },
    content: {
      zh: '月相提供了一种天然的节奏。新月适合书写意图，满月适合回顾与释放。\n\n你不需要复杂的仪式，一支笔、一张纸、几分钟的安静就足够。',
      en: 'The lunar phases offer a natural rhythm. The new moon invites writing intentions; the full moon invites review and release.\n\nNo elaborate ritual is required — a pen, paper, and a few quiet minutes are enough.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: '月相提供了一种天然的节奏。新月适合书写意图，满月适合回顾与释放。',
          en: 'The lunar phases offer a natural rhythm. The new moon invites writing intentions; the full moon invites review and release.',
        },
      },
      {
        type: 'image',
        src: 'https://picsum.photos/seed/ukkuma-moon/1200/750',
        alt: { zh: '夜空中的满月', en: 'A full moon in the night sky' },
        caption: { zh: '满月是回顾的时刻——看看你种下的意图长成了什么。', en: 'The full moon is a time to look back — see what your intentions have become.' },
      },
      {
        type: 'quote',
        text: {
          zh: '新月种下意图，满月学会放手。',
          en: 'Plant intention at the new moon; learn to let go at the full moon.',
        },
      },
      { type: 'divider' },
      {
        type: 'paragraph',
        text: {
          zh: '你不需要复杂的仪式，一支笔、一张纸、几分钟的安静就足够。',
          en: 'No elaborate ritual is required — a pen, paper, and a few quiet minutes are enough.',
        },
      },
    ],
    cover: 'linear-gradient(135deg,#2dd4bf,#7c3aed)',
    author: 'Mira',
    tags: ['ritual', 'moon'],
    readingMinutes: 6,
    publishedAt: '2026-04-10',
  },
]

export const mockProjects: Project[] = [
  {
    id: 1,
    slug: 'insight-reading',
    title: { zh: '洞察解读（Insight Reading）', en: 'Insight Reading' },
    summary: {
      zh: '把困住你的问题，从情绪与故事里拎出来，变成可处理、可推进的结构。',
      en: 'Lift the problem that traps you out of emotion and story, into a structure you can actually work with.',
    },
    framework: 'Δ + I + R',
    bestFor: {
      zh: '关系反复拉扯、重大决策、定位与路径混乱',
      en: 'Relationship loops, big decisions, unclear direction',
    },
    description: {
      zh: '你不需要更多“安慰”，也不需要一份神秘的终极答案。你需要的是：把困住你的问题从情绪与故事里拎出来，变成可处理、可以推进的结构。',
      en: 'You don’t need more “comfort”, nor a mystical final answer. You need to lift the problem out of emotion and story into a workable, advanceable structure.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: '你不需要更多“安慰”，也不需要一份神秘的终极答案。你需要的是：把困住你的问题从情绪与故事里拎出来，变成可处理、可以推进的结构。',
          en: 'You don’t need more “comfort”, nor a mystical final answer. What you need is to lift the problem that traps you out of emotion and story, into something workable and advanceable.',
        },
      },
      { type: 'heading', text: { zh: '工作方式：ΔAIR 中的 Δ + I + R', en: 'How it works: Δ + I + R within ΔAIR' } },
      {
        type: 'paragraph',
        text: {
          zh: 'Δ（Delta）：找出真正的卡点与势能差——你为什么反复卡在同一处？方向与动力是否真实？',
          en: 'Δ (Delta): Locate the real sticking point and the gap in potential — why do you keep stalling in the same place? Are your direction and drive truly yours?',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: 'I（Integration）：把问题翻译成“可交付动作链”——下一步做什么、做到什么程度、怎么避免反弹。',
          en: 'I (Integration): Translate the problem into a deliverable chain of actions — what to do next, to what degree, and how to avoid relapse.',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: 'R（Reality）：现实校验——用时间、金钱、关系、身体、环境验明可执行的下一步。',
          en: 'R (Reality): A reality check — verify the executable next step against time, money, relationships, body, and environment.',
        },
      },
      { type: 'heading', text: { zh: '你最终会得到', en: 'What you walk away with' } },
      {
        type: 'list',
        items: [
          { zh: '一句话的结构判断（你卡住的真正原因）', en: 'A one-line structural read (the real reason you’re stuck)' },
          { zh: '2–3 条可执行路径（每条带动机 / 代价 / 风险）', en: '2–3 actionable paths (each with motive / cost / risk)' },
          { zh: '下一步行动点（可执行、可衡量）', en: 'A next action point (executable and measurable)' },
          { zh: '现实验证点（验证窗口与指标）', en: 'A reality checkpoint (verification window and signals)' },
        ],
      },
      { type: 'heading', text: { zh: '适合', en: 'Best for' } },
      {
        type: 'paragraph',
        text: {
          zh: '关系拉扯反复、重大选择决策、定位与路径混乱、想推进却卡在同一步。',
          en: 'Recurring relationship tugs, major decisions, unclear position and path, or wanting to move but stalling at the same step.',
        },
      },
      { type: 'divider' },
      {
        type: 'paragraph',
        text: {
          zh: '项目边界声明：本项目不替代医疗或心理诊断；我们不承诺具体结果，也不提供“终局裁决”。我们提供的是结构化洞察、对齐方案与可执行的现实验证路径。',
          en: 'Scope note: This is not a substitute for medical or psychological diagnosis; we promise no specific outcome and offer no “final verdict”. We provide structured insight, an alignment plan, and an executable reality-tested path.',
        },
      },
    ],
    cover: 'linear-gradient(135deg,#a78bfa,#2dd4bf)',
    tags: ['ΔAIR', 'insight', 'decision'],
  },
  {
    id: 2,
    slug: 'energy-clearing',
    title: { zh: '能量整理（Energy Clearing / Alignment Work）', en: 'Energy Clearing / Alignment Work' },
    summary: {
      zh: '当你“知道该怎么做”却“怎么也做不动”，往往是系统在耗散——帮你把电找回来。',
      en: 'When you know what to do but can’t move, your system is leaking energy. Let’s get it back.',
    },
    framework: 'A + I + R',
    bestFor: {
      zh: '持续内耗与被带跑、关系或环境黏连、启动困难',
      en: 'Chronic drain, sticky relationships/environments, trouble starting',
    },
    description: {
      zh: '当你“知道该怎么做”却“怎么也做不动”，往往不是你意志力差，而是系统在耗散状态：注意力被牵绊、边界被侵入、环境与关系持续拉扯，导致你一直掉电。',
      en: 'When you know what to do but can’t move, it’s usually not weak willpower but a system in a draining state: attention snagged, boundaries breached, environment and relationships pulling at you — so you keep losing charge.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: '当你“知道该怎么做”却“怎么也做不动”，往往不是你意志力差，而是系统在耗散状态：注意力被牵绊、边界被侵入、环境与关系持续拉扯，导致你一直掉电。',
          en: 'When you know what to do yet can’t get moving, it’s usually not weak willpower — your system is in a draining state: attention snagged, boundaries breached, environment and relationships constantly pulling, so you keep losing charge.',
        },
      },
      { type: 'heading', text: { zh: '工作方式：ΔAIR 中的 A + I + R', en: 'How it works: A + I + R within ΔAIR' } },
      {
        type: 'paragraph',
        text: {
          zh: 'A（Alignment）：先稳住——建立你的对齐机制（身体锚点 / 信息边界 / 空间秩序 / 仪式相关），让系统不再耗电。',
          en: 'A (Alignment): Steady first — build your alignment mechanisms (body anchors / information boundaries / spatial order / supportive ritual) so the system stops draining.',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: 'I（Integration）：再落地——把对齐转成每天做得到的维护动作与复位流程。',
          en: 'I (Integration): Then ground it — turn alignment into daily, doable maintenance actions and a reset routine.',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: 'R（Reality）：用现实指标判断是否真正稳住（睡眠、启动速度、被带跑频率等），并迭代方案。',
          en: 'R (Reality): Judge real stability by concrete signals (sleep, startup speed, how often you get pulled off course) and iterate the plan.',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: '在这个项目里，我们可能使用呼吸与声音、意识降噪、SRT，以及传统元素支持（如净香、收束仪式等），用于扫描、校准与复位。我们不做迷信式承诺；目标是让你可稳定、可执行、可复盘。',
          en: 'Here we may use breath and sound, attention de-noising, SRT, and traditional elemental support (such as cleansing incense or closing rituals) to scan, calibrate, and reset. We make no superstitious promises; the goal is something stable, executable, and reviewable.',
        },
      },
      { type: 'heading', text: { zh: '你最终会得到', en: 'What you walk away with' } },
      {
        type: 'list',
        items: [
          { zh: '耗能地图（你的电量漏在哪里）', en: 'An energy-drain map (where your charge leaks)' },
          { zh: '对齐方案（你适合的稳态开关）', en: 'An alignment plan (the steady-state switches that suit you)' },
          { zh: '3–7 天维护清单（每天做什么）', en: 'A 3–7 day maintenance checklist (what to do each day)' },
          { zh: '复位流程（散了 / 乱了怎么回到自己）', en: 'A reset routine (how to return to yourself when scattered)' },
          { zh: '禁区与风险提示（避免反效果）', en: 'Cautions and risk notes (to avoid backfiring)' },
        ],
      },
      { type: 'heading', text: { zh: '适合', en: 'Best for' } },
      {
        type: 'paragraph',
        text: {
          zh: '持续内耗与被带跑、关系或环境黏连、启动困难、搬家 / 转岗后的散乱、需要节奏与稳定的人。',
          en: 'Those facing chronic drain, sticky relationships or environments, trouble starting, post-move or job-change scatter, or simply needing rhythm and stability.',
        },
      },
      { type: 'divider' },
      {
        type: 'paragraph',
        text: {
          zh: '项目边界声明：本项目不替代医疗或心理诊断；我们不承诺具体结果，也不提供“终局裁决”。我们提供的是结构化洞察、对齐方案与可执行的现实验证路径。',
          en: 'Scope note: This is not a substitute for medical or psychological diagnosis; we promise no specific outcome and offer no “final verdict”. We provide structured insight, an alignment plan, and an executable reality-tested path.',
        },
      },
    ],
    cover: 'linear-gradient(135deg,#fb923c,#a78bfa)',
    tags: ['ΔAIR', 'alignment', 'energy'],
  },
  {
    id: 3,
    slug: 'delta-air-system',
    title: { zh: 'ΔAIR 操作系统', en: 'The ΔAIR Operating System' },
    summary: {
      zh: 'UKKUMA 的核心工作框架：把“我到底怎么了”拆成四个可处理层级，按顺序推进。',
      en: 'UKKUMA’s core framework: break “what’s wrong with me?” into four workable layers, advanced in order.',
    },
    framework: 'Δ · A · I · R',
    bestFor: {
      zh: '想理解 UKKUMA 如何工作的人',
      en: 'Anyone wanting to understand how UKKUMA works',
    },
    description: {
      zh: 'ΔAIR 是 UKKUMA｜巫蘺玛的核心工作框架。它把“我到底怎么了”这种模糊困境，拆成四个可处理层级，并按顺序推进，避免你在同一个问题里反复打转。',
      en: 'ΔAIR is the core working framework of UKKUMA. It breaks the vague “what’s wrong with me?” into four workable layers, advanced in order, so you stop circling the same problem.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: 'ΔAIR 是 UKKUMA｜巫蘺玛的核心工作框架。它把“我到底怎么了”这种模糊困境，拆成四个可处理层级，并按顺序推进，避免你在同一个问题里反复打转。',
          en: 'ΔAIR is the core working framework of UKKUMA. It breaks the vague bind of “what’s actually wrong with me?” into four workable layers, advanced in order, so you stop circling the same problem.',
        },
      },
      { type: 'heading', text: { zh: 'Δ（Delta｜Soul Path｜源头势能差）', en: 'Δ (Delta | Soul Path | source potential gap)' } },
      {
        type: 'paragraph',
        text: {
          zh: '先看“源头差值”：你真正的元动力与方向是什么？你在追的目标，是否来自外界噪音或旧惯性？这一层解决的是：为什么你做了很多，依旧觉得没主线、没劲、没方向。',
          en: 'First, the source gap: what is your true core drive and direction? Is the goal you chase coming from outside noise or old habit? This layer addresses why, despite doing a lot, you still feel directionless and flat.',
        },
      },
      { type: 'heading', text: { zh: 'A（Alignment｜对齐稳态）', en: 'A (Alignment | steady state)' } },
      {
        type: 'paragraph',
        text: {
          zh: '再看系统稳不稳：你是否被信息、情绪、他人期待持续带跑？你需要的不是更多方法，而是一套让你稳定下来、不再耗电的对齐机制（身体锚点、信息边界、节律、空间秩序等）。',
          en: 'Next, system stability: are you constantly pulled by information, emotion, and others’ expectations? You don’t need more methods — you need alignment mechanisms that steady you and stop the drain (body anchors, information boundaries, rhythm, spatial order).',
        },
      },
      { type: 'heading', text: { zh: 'I（Integration｜整合落地）', en: 'I (Integration | grounding it)' } },
      {
        type: 'paragraph',
        text: {
          zh: '第三步把洞察翻译成动作：不是“我懂了”，而是“我接下来做什么”。这一层输出的是可交付行动链：从第一步到验证点，怎么做、做到什么程度、怎么避免反弹。',
          en: 'The third step translates insight into action: not “I get it”, but “what I do next”. It outputs a deliverable action chain — from first step to checkpoint, how, to what degree, and how to avoid relapse.',
        },
      },
      { type: 'heading', text: { zh: 'R（Reality｜现实校验）', en: 'R (Reality | reality check)' } },
      {
        type: 'paragraph',
        text: {
          zh: '最后用现实约束来做验证：时间、金钱、关系、身体、环境这些条件才是真正的裁判。R 不是泼冷水，而是让你把路走在可持续的轨道上：能做就做、做不到就缩小、直到做得到。',
          en: 'Finally, verify against real constraints: time, money, relationships, body, environment are the true judges. R isn’t a cold shower — it keeps your path on a sustainable track: do what you can, shrink what you can’t, until it’s doable.',
        },
      },
      { type: 'divider' },
      {
        type: 'paragraph',
        text: {
          zh: 'ΔAIR 的价值在于：它让“玄而又玄的感受”变成“可执行、可复盘、可迭代的路径”。我们不提供终局裁决，只交付能落地的下一步，并通过现实验证不断修正。',
          en: 'The value of ΔAIR: it turns “mysterious feelings” into an executable, reviewable, iterable path. We offer no final verdict — only a grounded next step, continually corrected through reality testing.',
        },
      },
    ],
    cover: 'linear-gradient(135deg,#7c3aed,#2dd4bf)',
    tags: ['ΔAIR', 'framework', 'method'],
  },
  {
    id: 4,
    slug: 'relationship-boundary-structure',
    title: { zh: '关系与边界结构', en: 'Relationship & Boundary Structure' },
    summary: {
      zh: '很多关系问题看起来像“情绪问题”，本质却是“结构问题”。',
      en: 'Many relationship problems look emotional but are really structural.',
    },
    framework: '4 变量',
    bestFor: {
      zh: '反复纠结“该不该”、在关系里长期耗损的人',
      en: 'Those stuck on “should I or not” and drained in relationships',
    },
    description: {
      zh: '很多关系问题看起来像“情绪问题”，本质却是“结构问题”。你反复纠结“该不该”，往往不是因为你不够爱，而是你们之间的结构不稳。',
      en: 'Many relationship problems look like “emotional problems” but are really structural. The reason you keep agonizing over “should I or shouldn’t I” is usually an unstable structure between you.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: '很多关系问题看起来像“情绪问题”，本质却是“结构问题”。你反复纠结“该不该”，往往不是因为你不够爱、也不是你不够努力，而是你们之间的结构不稳：权力失衡、需求错配、边界模糊、代价不透明。',
          en: 'Many relationship problems look like “emotional problems” but are really structural. Agonizing over “should I or shouldn’t I” usually isn’t about loving too little or not trying hard enough — it’s an unstable structure: imbalanced power, mismatched needs, blurred boundaries, opaque costs.',
        },
      },
      {
        type: 'paragraph',
        text: {
          zh: '这个框架不讨论“谁好谁坏”，它关注四个核心变量。',
          en: 'This framework doesn’t debate “who’s right or wrong” — it focuses on four core variables.',
        },
      },
      { type: 'heading', text: { zh: '1）权力结构', en: '1) Power structure' } },
      {
        type: 'paragraph',
        text: {
          zh: '谁拥有决定权？谁在承担后果？谁在设定规则？当一个人既掌控又不承担，另一方就会长期耗损。',
          en: 'Who holds the decision? Who bears the consequences? Who sets the rules? When one person controls without bearing the cost, the other is drained over time.',
        },
      },
      { type: 'heading', text: { zh: '2）需求结构', en: '2) Needs structure' } },
      {
        type: 'paragraph',
        text: {
          zh: '你真正要的是什么？安全感、确认、自由、资源、陪伴、尊重？对方能给的是哪一种？需求不被命名，就会用情绪表达；需求不被回应，就会演变成拉扯。',
          en: 'What do you truly want — safety, confirmation, freedom, resources, companionship, respect? Which can the other actually give? Unnamed needs come out as emotion; unmet needs turn into tug-of-war.',
        },
      },
      { type: 'heading', text: { zh: '3）边界结构', en: '3) Boundary structure' } },
      {
        type: 'paragraph',
        text: {
          zh: '边界不是冷漠，是“责任划线”：哪些是我负责、哪些是你负责；哪些能谈、哪些不能；哪些行为一出现就必须收束。边界不清，关系就会靠情绪维持，成本极高。',
          en: 'A boundary isn’t coldness — it’s a line of responsibility: what’s mine, what’s yours; what’s negotiable, what isn’t; which behaviors must stop the moment they appear. Without clear boundaries, a relationship runs on emotion, at huge cost.',
        },
      },
      { type: 'heading', text: { zh: '4）代价结构', en: '4) Cost structure' } },
      {
        type: 'paragraph',
        text: {
          zh: '每一种选择都要付出代价：时间、金钱、精力、尊严、机会成本。代价不透明时，你会幻想被选择；代价被看见时，选择才真正落地。',
          en: 'Every choice has a cost: time, money, energy, dignity, opportunity. When costs are opaque you fantasize about being chosen; when costs are visible, choices finally land.',
        },
      },
      { type: 'divider' },
      {
        type: 'paragraph',
        text: {
          zh: '使用这个框架的目的，是把“关系里说不清的痛”变成“可判断、可调整的结构”：你不需要更用力，你需要更清楚地看见结构、设定边界、选择代价，并用现实检验是否值得继续投入。',
          en: 'The point of this framework is to turn “the pain you can’t articulate” into a structure you can judge and adjust: you don’t need to try harder — you need to see the structure clearly, set boundaries, choose the cost, and reality-test whether it’s worth continuing.',
        },
      },
    ],
    cover: 'linear-gradient(135deg,#2dd4bf,#7c3aed)',
    tags: ['ΔAIR', 'relationship', 'boundary'],
  },
  {
    id: 5,
    slug: 'three-path-decision',
    title: { zh: '三路决策（A / B / C 路径）', en: 'Three-Path Decision (A / B / C)' },
    summary: {
      zh: '不追求“标准答案”，而是把你能走的路摆出来，让代价与风险显性化。',
      en: 'Not chasing a “right answer”, but laying out your paths so cost and risk become visible.',
    },
    framework: 'A / B / C',
    bestFor: {
      zh: '卡在一个选择里、想要确定性又拒绝面对代价的人',
      en: 'Anyone stuck in a choice, craving certainty while avoiding the cost',
    },
    description: {
      zh: '当你卡在一个选择里，最危险的状态是：一边想要确定性，一边拒绝面对代价。三路决策法把你能走的路摆出来，让代价与风险显性化，再用现实验证筛选。',
      en: 'When stuck in a choice, the most dangerous state is craving certainty while refusing to face the cost. The three-path method lays out your options, makes cost and risk visible, then filters by reality testing.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: '当你卡在一个选择里，最危险的状态是：一边想要确定性，一边拒绝面对代价。三路决策法的核心，是不追求“标准答案”，而是把你能走的路摆出来，让每条路的代价与风险显性化，然后再用现实验证筛选。',
          en: 'When you’re stuck in a choice, the most dangerous state is craving certainty while refusing the cost. The core of the three-path method is not a “standard answer” but laying out your paths, making each path’s cost and risk visible, then filtering through reality testing.',
        },
      },
      { type: 'heading', text: { zh: '第一步：明确命题', en: 'Step 1: Frame the proposition' } },
      {
        type: 'paragraph',
        text: {
          zh: '把问题从情绪化描述改成可选择的命题，例如：我是继续投入，还是抽离？我是谈边界，还是先观察？我是先做 A，还是先做 B？',
          en: 'Turn an emotional description into a selectable proposition, e.g.: do I keep investing or pull back? Do I negotiate boundaries or observe first? Do I do A first or B first?',
        },
      },
      { type: 'heading', text: { zh: '第二步：列出三条路（A / B / C）', en: 'Step 2: List three paths (A / B / C)' } },
      {
        type: 'list',
        items: [
          { zh: 'A：继续推进（你希望它变好）', en: 'A: Keep going (you hope it improves)' },
          { zh: 'B：暂停观察（给自己窗口和证据）', en: 'B: Pause and observe (give yourself a window and evidence)' },
          { zh: 'C：退出 / 转向（止损或换轨）', en: 'C: Exit / pivot (cut losses or switch tracks)' },
        ],
      },
      { type: 'heading', text: { zh: '第三步：每条路都写清四件事', en: 'Step 3: Spell out four things per path' } },
      {
        type: 'list',
        items: [
          { zh: '你能得到什么（收益）', en: 'What you gain (benefit)' },
          { zh: '你要付出什么（代价）', en: 'What you pay (cost)' },
          { zh: '你最怕什么（风险）', en: 'What you fear most (risk)' },
          { zh: '你需要什么条件（资源 / 边界 / 时间窗口）', en: 'What conditions you need (resources / boundaries / time window)' },
        ],
      },
      { type: 'heading', text: { zh: '第四步：设置验证窗口', en: 'Step 4: Set a verification window' } },
      {
        type: 'paragraph',
        text: {
          zh: '给每条路一个现实验证周期（常见 7–14 天或一个月），并设定观察点：哪些行为 / 指标出现，说明这条路可行；哪些信号出现，说明该止损或调整。',
          en: 'Give each path a reality-test period (often 7–14 days or a month) and set observation points: which behaviors/signals show the path works; which signals mean cut losses or adjust.',
        },
      },
      { type: 'divider' },
      {
        type: 'paragraph',
        text: {
          zh: '三路决策法最大的好处是：它把“内耗”转成“选择与行动”。你不再在脑内争论，而是用可验证的行动获取证据，让现实替你说话。',
          en: 'The biggest benefit: it turns inner churn into choice and action. You stop arguing in your head and instead gather evidence through verifiable action — letting reality speak for you.',
        },
      },
    ],
    cover: 'linear-gradient(135deg,#a78bfa,#fb923c)',
    tags: ['ΔAIR', 'decision', 'method'],
  },
  {
    id: 6,
    slug: 'reality-check',
    title: { zh: '现实校验（Reality Check）', en: 'Reality Check' },
    summary: {
      zh: 'UKKUMA 的“落地过滤器”：让你在认知上对，做起来也不崩。',
      en: 'UKKUMA’s grounding filter: be right in mind and sustainable in action.',
    },
    framework: '5 约束',
    bestFor: {
      zh: '认知上觉得对、做起来却崩，或被情绪推着走的人',
      en: 'Those who feel right but burn out, or get pushed by emotion',
    },
    description: {
      zh: '现实校验是 UKKUMA 的“落地过滤器”。它专门解决一种常见困境：你在认知上觉得对，但做起来永远崩；或者你被情绪推着走，走到一半才发现根本承担不起。',
      en: 'Reality Check is UKKUMA’s grounding filter. It targets a common bind: you feel right in your mind but always burn out in practice; or you get pushed along by emotion and only halfway realize you can’t afford it.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          zh: '现实校验是 UKKUMA 的“落地过滤器”。它专门解决一种常见困境：你在认知上觉得对，但做起来永远崩；或者你被情绪推着走，走到一半才发现根本承担不起。',
          en: 'Reality Check is UKKUMA’s grounding filter. It targets a common bind: you feel right in your mind but always collapse in practice; or you’re pushed along by emotion and only halfway in realize you can’t afford it.',
        },
      },
      {
        type: 'paragraph',
        text: { zh: '现实校验只问五个约束。', en: 'Reality Check asks only five constraints.' },
      },
      { type: 'heading', text: { zh: '1）时间', en: '1) Time' } },
      {
        type: 'paragraph',
        text: {
          zh: '这件事需要多少时间？我现在有没有持续投入的时间？如果没有，能否缩小成每天 15–25 分钟的可执行版本？',
          en: 'How much time does this take? Do I have time to invest consistently? If not, can it shrink to a doable 15–25 minutes a day?',
        },
      },
      { type: 'heading', text: { zh: '2）金钱', en: '2) Money' } },
      {
        type: 'paragraph',
        text: {
          zh: '我为此投入的金钱是否在可承受范围？这笔钱的机会成本是什么？如果不花钱，有没有替代方案？',
          en: 'Is the money I’d put in within what I can bear? What’s its opportunity cost? If I don’t spend, is there an alternative?',
        },
      },
      { type: 'heading', text: { zh: '3）关系', en: '3) Relationships' } },
      {
        type: 'paragraph',
        text: {
          zh: '这件事会影响哪些关系？我是否需要提前沟通边界？我能否承担关系摩擦带来的后果？',
          en: 'Which relationships does this affect? Do I need to negotiate boundaries first? Can I bear the friction it may cause?',
        },
      },
      { type: 'heading', text: { zh: '4）身体', en: '4) Body' } },
      {
        type: 'paragraph',
        text: {
          zh: '我的睡眠、精力、压力负荷是否允许我这么做？如果身体已经报警，优先级要不要调整？',
          en: 'Do my sleep, energy, and stress load allow this? If my body is already sounding alarms, should the priority change?',
        },
      },
      { type: 'heading', text: { zh: '5）环境', en: '5) Environment' } },
      {
        type: 'paragraph',
        text: {
          zh: '我的居住 / 工作环境是否支持？信息噪音是否过高？我需要哪些空间秩序或工具来降低阻力？',
          en: 'Does my living/working environment support it? Is the information noise too high? What spatial order or tools would lower the friction?',
        },
      },
      { type: 'divider' },
      {
        type: 'paragraph',
        text: {
          zh: '现实校验不是让你保守，而是让你更准确、更可持续。它的关键技巧是：如果做不到，就缩小；如果仍做不到，就换路径；直到出现一个“做得到”的下一步。当你能稳定地做出下一步，系统就会开始重新积累势能。',
          en: 'Reality Check doesn’t make you conservative — it makes you more accurate and sustainable. Its key move: if you can’t do it, shrink it; if you still can’t, switch paths; until a “doable” next step appears. Once you can take that step reliably, the system begins to rebuild momentum.',
        },
      },
    ],
    cover: 'linear-gradient(135deg,#7c3aed,#fb923c)',
    tags: ['ΔAIR', 'reality', 'method'],
  },
]
