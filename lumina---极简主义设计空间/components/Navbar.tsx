
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
      <div className="glass px-8 py-3 rounded-full flex items-center gap-12 shadow-sm">
        <Link to="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">Lumina</Link>
        <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          <Link to="/" className="hover:text-black transition-colors">首页</Link>
          <Link to="/blog" className="hover:text-black transition-colors">日志</Link>
          <Link to="/about" className="hover:text-black transition-colors">关于</Link>
        </div>
        <button className="bg-black text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">
          联络
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
