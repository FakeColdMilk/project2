import Database from "better-sqlite3";
const db = new Database("./games.db");

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, published, owned, price, image } = body;

  // Validate required fields
  if (!title || !description || !published || !owned || !price) {
    return new Response(JSON.stringify({ error: "All fields except image are required." }), {
      status: 400,
    });
  }

  const data = db
    .prepare(
      "INSERT INTO games (title, description, published, owned, image, price) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(title, description, published, owned, image || '', price);

  return Response.json({ id: data.lastInsertRowid });
}
export async function GET() {
  const data = db.prepare("SELECT * FROM games").all();
  return Response.json(data);
}