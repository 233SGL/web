
interface Env {
  AI: any;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const { type, content, messages } = await request.json();

  let prompt = "";
  if (type === "summarize") {
    prompt = `你是一个顶级设计评论家。请用中文将以下设计博客内容总结为3个优雅、深刻且富有洞察力的要点，每个要点不超过30字：\n\n${content}`;
  } else {
    prompt = `你是一个名为 Alex 的顶级极简主义设计师和资深工程师。语气：礼貌、富有哲学感、简练。请根据以下对话背景回答用户：\n\n${messages.map(m => `${m.role}: ${m.text}`).join('\n')}`;
  }

  const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    messages: [{ role: "user", content: prompt }],
  });

  return new Response(JSON.stringify({ text: response.response }), {
    headers: { "Content-Type": "application/json" },
  });
};
