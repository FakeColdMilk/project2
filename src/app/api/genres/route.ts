
// gameslib project
import Database from "better-sqlite3";
import { NextResponse } from "next/server";

const db = new Database("./gameslib.db");

export async function GET() {
  const genres = db.prepare("SELECT DISTINCT genre FROM games").all();
  return NextResponse.json(genres.map(g => g.genre));
}
