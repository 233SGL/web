
import { Post, Skill } from './types';

export const BLOG_POSTS: Post[] = [
  {
    id: '1',
    title: '极简主义的未来：无形之界',
    excerpt: '探索为何设计界正在向“隐形”交互进化，以及有意的“摩擦力”如何提升用户体验。',
    content: `极简主义并非仅仅是留白，而是将复杂性激进地消减至其绝对本质。在 2024 年，我们正见证从扁平化设计向“维度极简主义”的转变——这是一种利用微妙阴影、半透明度以及有机物理特性，在不产生杂乱感的前提下创造深度感。

    作为设计师，我们往往恐惧摩擦力，希望用户能毫不费力地滑动。然而，有意的摩擦力——那些迫使个人暂停并反思的瞬间——往往能创造出更具深度的连接。这是现代 UI 设计的悖论。`,
    date: '2024年10月12日',
    category: '设计趋势',
    readTime: '阅读 6 分钟',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '2',
    title: 'AI 作为创意伙伴：重构设计边界',
    excerpt: '生成式 AI 正在将设计师的角色从繁琐的执行者转变为富有远见的导演。',
    content: `LLM 的兴起从根本上改变了设计师的角色。我们正处于从“建造者”向“导演”过渡的阶段。当 AI 可以在几秒钟内生成一千个登陆页变体时，我们的价值将体现在鉴赏力、品味和共情能力上。

    借助 Gemini API，我们现在可以构建根据用户意图实时响应的界面。想象一个能根据你现有时间自动生成摘要的博客，或者一个根据访客所属行业自动调整案例展示的作品集。`,
    date: '2024年9月28日',
    category: '技术前沿',
    readTime: '阅读 8 分钟',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '3',
    title: '光影的建筑学：数字空间的呼吸感',
    excerpt: '借鉴北欧与东方建筑哲学，打造具有呼吸感且能舒缓认知的数字环境。',
    content: `光是建筑师最基础的工具。在数字世界中，“光”则是我们的色盘与亮度。通过研究物理空间如何利用自然光引导视线并唤起情感，我们可以构建出减轻认知负荷的数字交互。

    空白并非空无物；它是专注的画布。当我们移除边界改用间距时，我们给予了内容呼吸的空间。这种克制，便是最高级的设计表达。`,
    date: '2024年8月15日',
    category: '生活美学',
    readTime: '阅读 5 分钟',
    imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200'
  }
];

export const SKILLS: Skill[] = [
  { name: 'UI/UX 交互设计', value: 95 },
  { name: 'React / 全栈开发', value: 90 },
  { name: '生成式 AI 整合', value: 85 },
  { name: '创意编码', value: 80 },
  { name: '文字排版美学', value: 88 }
];
