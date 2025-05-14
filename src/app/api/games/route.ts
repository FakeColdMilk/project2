import Database from "better-sqlite3";
const db = new Database("./games.db")

export async function GET(request: Request) {
    const games = db.prepare("SELECT * FROM games").all();
   return Response.json(games);
}

export async function POST(req: Request){
    // Läser in request body
    const body = await req.json()
    const data = db.prepare("INSERT INTO games (title, description, published, owned, image, price) VALUES (?, ?, ?, ?, ?, ?)").run(body.title, body.description, body.published, body.owned, body.image, body.price)
    //skcikar tillbaka json respons
    return Response.json(data)
}