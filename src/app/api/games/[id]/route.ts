import Database from "better-sqlite3";
const db = new Database("./games.db");

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { title, description, published, owned, price, image } = body;

  if (!title || !description || !published || !owned || !price) {
    return new Response(JSON.stringify({ error: "All fields except image are required." }), {
      status: 400,
    });
  }

  const result = db.prepare(`
    UPDATE games
    SET title = ?, description = ?, published = ?, owned = ?, image = ?, price = ?
    WHERE id = ?
  `).run(title, description, published, owned, image || '', price, params.id);

  return Response.json({ updated: result.changes > 0 });
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const result = db.prepare("DELETE FROM games WHERE id = ?").run(params.id);
  return Response.json({ deleted: result.changes > 0 });
}