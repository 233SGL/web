
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackgroundArt from './components/BackgroundArt';
import AIAssistant from './components/AIAssistant';
import { getBlogSummary } from './services/aiService';
import { Post, Skill } from './types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

// --- 初始数据（仅作为第一次部署时的种子数据） ---
const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: '极简主义的未来：无形之界',
    excerpt: '探索为何设计界正在向“隐形”交互进化，以及有意的“摩擦力”如何提升用户体验。',
    content: `极简主义并非仅仅是留白，而是将复杂性激进地消减至其绝对本质...`,
    date: '2024年10月12日',
    category: '设计趋势',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200'
  }
];

const SKILLS = [
  { name: 'UI/UX 设计', value: 95 },
  { name: 'Cloudflare Stack', value: 90 },
  { name: 'AI 整合', value: 85 }
];

// --- 页面组件 ---

const HomePage: React.FC<{posts: Post[]}> = ({ posts }) => (
  <section className="min-h-screen pt-40 px-6 pb-20 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
    <h1 className="serif text-6xl md:text-9xl font-light tracking-tight leading-tight mb-8">
      创造具有 <br /> <span className="italic">灵魂</span> 的体验.
    </h1>
    <div className="flex gap-4 mb-20">
      <Link to="/blog" className="bg-black text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-all">阅读日志</Link>
      <Link to="/admin" className="border border-neutral-200 px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-50 transition-all">管理后台</Link>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
      {posts.slice(0, 3).map(post => (
        <Link key={post.id} to={`/post/${post.id}`} className="group text-left">
          <div className="overflow-hidden rounded-3xl mb-6 bg-neutral-100 aspect-[4/5]">
            <img src={post.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">{post.category}</p>
          <h3 className="serif text-2xl group-hover:translate-x-1 transition-transform">{post.title}</h3>
        </Link>
      ))}
    </div>
  </section>
);

const AdminPage: React.FC<{posts: Post[], onUpdate: () => void}> = ({ posts, onUpdate }) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setLoading(true);
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(editingPost),
    });
    setLoading(false);
    setEditingPost(null);
    onUpdate();
  };

  return (
    <section className="pt-40 px-6 pb-20 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <h2 className="serif text-5xl">内容策展</h2>
        <button onClick={() => setEditingPost({
          id: Date.now().toString(),
          title: '新文章标题',
          excerpt: '新摘要...',
          content: '正文内容...',
          date: new Date().toLocaleDateString('zh-CN'),
          category: '设计',
          readTime: '5 min',
          imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200'
        })} className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">新增文章</button>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="glass p-6 rounded-2xl flex justify-between items-center group">
            <div>
              <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{post.category}</p>
              <h4 className="serif text-xl">{post.title}</h4>
            </div>
            <button onClick={() => setEditingPost(post)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase tracking-widest border-b border-black">编辑</button>
          </div>
        ))}
      </div>

      {editingPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setEditingPost(null)}></div>
          <form onSubmit={handleSave} className="relative glass w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-10 shadow-2xl">
            <h3 className="serif text-3xl mb-8">编辑内容</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest block mb-2">标题</label>
                <input value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} className="w-full bg-white/50 border-none p-4 rounded-xl text-lg serif outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest block mb-2">分类</label>
                <input value={editingPost.category} onChange={e => setEditingPost({...editingPost, category: e.target.value})} className="w-full bg-white/50 border-none p-4 rounded-xl outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest block mb-2">正文</label>
                <textarea rows={10} value={editingPost.content} onChange={e => setEditingPost({...editingPost, content: e.target.value})} className="w-full bg-white/50 border-none p-4 rounded-xl outline-none text-sm leading-relaxed" />
              </div>
              <button disabled={loading} className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs">
                {loading ? '保存中...' : '确认同步到 Cloudflare'}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

const PostDetail: React.FC<{posts: Post[]}> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!post) return <div className="pt-40 text-center">寻找中...</div>;

  return (
    <article className="pt-48 px-6 pb-20 max-w-3xl mx-auto">
      <header className="mb-16">
        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">{post.category} / {post.date}</p>
        <h1 className="serif text-5xl md:text-7xl mb-12 leading-tight">{post.title}</h1>
        <div className="h-[400px] rounded-[2rem] overflow-hidden grayscale">
          <img src={post.imageUrl} className="w-full h-full object-cover" alt="" />
        </div>
      </header>
      
      <div className="mb-20 glass p-10 rounded-[2rem]">
        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6">Workers AI 智能摘要</h4>
        {summary ? <p className="text-neutral-600 leading-loose">{summary}</p> : 
          <button onClick={async () => { setLoading(true); setSummary(await getBlogSummary(post.content)); setLoading(false); }} className="text-[10px] font-bold uppercase border-b border-black">
            {loading ? '计算中...' : '生成摘要'}
          </button>
        }
      </div>

      <div className="serif text-xl leading-[2.2] space-y-12">
        {post.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </article>
  );
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data.length > 0 ? data : INITIAL_POSTS);
    } catch {
      setPosts(INITIAL_POSTS);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <HashRouter>
      <BackgroundArt />
      <Navbar />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage posts={posts} />} />
          <Route path="/blog" element={<section className="pt-40 px-6 max-w-5xl mx-auto">
            {posts.map(p => <Link key={p.id} to={`/post/${p.id}`} className="block mb-20 group">
              <h2 className="serif text-4xl group-hover:translate-x-2 transition-transform">{p.title}</h2>
              <p className="text-neutral-500 mt-4">{p.excerpt}</p>
            </Link>)}
          </section>} />
          <Route path="/post/:id" element={<PostDetail posts={posts} />} />
          <Route path="/admin" element={<AdminPage posts={posts} onUpdate={fetchPosts} />} />
        </Routes>
      </main>
      <AIAssistant />
    </HashRouter>
  );
};

export default App;
