import Database from "better-sqlite3";
const db = new Database("./games.db")

export async function GET(request: Request) {
    const games = db.prepare("SELECT * FROM games").all();
   return Response.json(games);
}