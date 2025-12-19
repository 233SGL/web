
interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  // 初始化数据库表
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT,
      excerpt TEXT,
      content TEXT,
      date TEXT,
      category TEXT,
      readTime TEXT,
      imageUrl TEXT
    )
  `).run();

  // GET: 获取所有文章
  if (request.method === "GET") {
    const { results } = await env.DB.prepare("SELECT * FROM posts ORDER BY date DESC").all();
    // 如果数据库为空，返回初始值（可选）
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // POST: 保存或更新文章
  if (request.method === "POST") {
    const post = await request.json();
    await env.DB.prepare(`
      INSERT INTO posts (id, title, excerpt, content, date, category, readTime, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        title=excluded.title,
        excerpt=excluded.excerpt,
        content=excluded.content,
        category=excluded.category,
        imageUrl=excluded.imageUrl
    `).bind(
      post.id, post.title, post.excerpt, post.content, 
      post.date, post.category, post.readTime, post.imageUrl
    ).run();
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
