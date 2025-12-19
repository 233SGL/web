
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getBlogSummary = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `请将以下博客内容总结为 3 个短小、优雅且富有洞察力的要点，用于高端设计作品集展示：\n\n${content}`,
      config: {
        temperature: 0.6,
        topP: 0.9,
      }
    });
    return response.text || "无法生成摘要。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI 助手正在深度思考中，请稍后再试。";
  }
};

export const chatWithAuthor = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "你是一个名为 Alex 的顶级极简主义设计师和资深工程师的 AI 创意分身。你的语气是：礼貌、富有哲学性、简练。你推崇“少即是多”的原则。请用中文回答关于 Alex 的作品、设计理念以及博客内容的提问。",
      }
    });
    
    const result = await chat.sendMessage({ message });
    return result.text || "Alex 的 AI 助手暂时保持了沉默。";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "抱歉，我的思维网络连接暂时出现了一点波动。";
  }
};
