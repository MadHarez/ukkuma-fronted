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
    cover: 'linear-gradient(135deg,#a78bfa,#2dd4bf)',
    author: 'Mira',
    tags: ['tarot', 'mindset'],
    readingMinutes: 4,
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
    cover: 'linear-gradient(135deg,#fb923c,#a78bfa)',
    author: 'Mira',
    tags: ['cleansing', 'space'],
    readingMinutes: 3,
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
    cover: 'linear-gradient(135deg,#2dd4bf,#7c3aed)',
    author: 'Mira',
    tags: ['ritual', 'moon'],
    readingMinutes: 5,
    publishedAt: '2026-04-10',
  },
]

export const mockProjects: Project[] = [
  {
    id: 1,
    slug: 'equinox-circle',
    title: { zh: '昼夜平分圆环', en: 'Equinox Circle' },
    summary: {
      zh: '为社区设计的季节性集体仪式系列。',
      en: 'A seasonal series of collective rituals designed for a community.',
    },
    description: {
      zh: '在每个分至点，我们邀请参与者围坐成圈，通过引导冥想、抽牌与分享，标记季节的转换。这个项目持续了一整年，见证了二十余位成员的成长。',
      en: 'At each solstice and equinox, participants gather in a circle to mark the turning of seasons through guided meditation, card draws, and sharing. The project ran for a full year and witnessed the growth of more than twenty members.',
    },
    cover: 'linear-gradient(135deg,#7c3aed,#2dd4bf)',
    role: { zh: '设计 · 引导', en: 'Design · Facilitation' },
    year: '2025',
    tags: ['ritual', 'community'],
  },
  {
    id: 2,
    slug: 'quiet-room',
    title: { zh: '安静的房间', en: 'The Quiet Room' },
    summary: {
      zh: '一个线上引导冥想与抽牌的小型空间。',
      en: 'A small online space for guided meditation and card draws.',
    },
    description: {
      zh: '“安静的房间”是一个每周一次的线上聚会，参与者来自不同时区，在同一段时间里一起呼吸、抽牌、并记录当下的感受。',
      en: '“The Quiet Room” is a weekly online gathering. Participants from different time zones breathe together, draw a card, and note how the present feels.',
    },
    cover: 'linear-gradient(135deg,#a78bfa,#fb923c)',
    role: { zh: '主持 · 内容', en: 'Host · Content' },
    year: '2024',
    url: 'https://www.ukkuma.nz',
    tags: ['online', 'meditation'],
  },
]
