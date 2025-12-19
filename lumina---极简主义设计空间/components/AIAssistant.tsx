
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAuthor } from '../services/aiService';
import { Message } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "您好。我是 Alex 的 AI 分身。想聊聊我的设计哲学，或者对刚才的文章有什么看法？" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const response = await chatWithAuthor(newMessages);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[60]">
        <button onClick={() => setIsOpen(!isOpen)} className="glass w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          {isOpen ? '✕' : 'AI'}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-80 md:w-96 glass rounded-3xl shadow-2xl z-[60] flex flex-col overflow-hidden max-h-[500px]">
          <div className="bg-black/5 p-4 border-b border-white/20 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
            Cloudflare Workers AI
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white/90 border border-black/5 rounded-bl-none text-neutral-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-neutral-400 italic text-[10px] animate-pulse">Alex 正在构思回复...</div>}
          </div>
          <div className="p-4 border-t border-white/20 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="输入对话..." className="flex-1 bg-white/50 border-none outline-none px-4 py-2 rounded-full text-xs" />
            <button onClick={handleSend} className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center">→</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
