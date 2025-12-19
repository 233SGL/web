
import { Message } from '../types';

export const getBlogSummary = async (content: string) => {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      body: JSON.stringify({ type: 'summarize', content }),
    });
    const data = await res.json();
    return data.text || "无法生成摘要。";
  } catch (error) {
    console.error("AI Error:", error);
    return "AI 助手正在深度思考中...";
  }
};

export const chatWithAuthor = async (messages: Message[]) => {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      body: JSON.stringify({ type: 'chat', messages }),
    });
    const data = await res.json();
    return data.text || "我暂时陷入了沉思。";
  } catch (error) {
    console.error("Chat Error:", error);
    return "连接我的思维网络时出了点小状况。";
  }
};
