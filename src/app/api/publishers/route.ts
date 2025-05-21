
// gameslib project
import Database from "better-sqlite3";
import { NextResponse } from "next/server";

const db = new Database("./gameslib.db");

export async function GET() {
  const publishers = db.prepare("SELECT DISTINCT publisher FROM games").all();
  return NextResponse.json(publishers.map(p => p.publisher));
}
