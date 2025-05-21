'use client'
import React, { useEffect, useState } from 'react'

type Game = {
  id: string
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
}

export default function GameBrowser() {
  const [games, setGames] = useState<Game[]>([])
  const [genres, setGenres] = useState<string[]>([])
  const [publishers, setPublishers] = useState<string[]>([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedPublisher, setSelectedPublisher] = useState("")

  const fetchFilters = async () => {
    const [genreRes, publisherRes] = await Promise.all([
      fetch('/api/genres'),
      fetch('/api/publishers'),
    ])
    const genreData = await genreRes.json()
    const publisherData = await publisherRes.json()
    setGenres(genreData)
    setPublishers(publisherData)
  }

  const fetchGames = async () => {
    const params = new URLSearchParams()
    if (selectedGenre) params.set("genre", selectedGenre)
    if (selectedPublisher) params.set("publisher", selectedPublisher)

    const res = await fetch(`/api/game?${params.toString()}`)
    const data = await res.json()
    setGames(data)
  }

  useEffect(() => {
    fetchFilters()
    fetchGames()
  }, [])

  useEffect(() => {
    fetchGames()
  }, [selectedGenre, selectedPublisher])

  return (
    <div className="bg-white min-h-screen px-6 py-10 text-black">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Game Library</h1>
        <div className="flex gap-4">
          <select
            className="border px-3 py-2 rounded text-sm"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded text-sm"
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
          >
            <option value="">All Publishers</option>
            {publishers.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div key={game.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <img src={game.thumbnail} alt={game.title} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{game.title}</h2>
              <p className="text-sm text-gray-600">{game.short_description}</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Genre:</strong> {game.genre}</p>
                <p><strong>Platform:</strong> {game.platform}</p>
                <p><strong>Publisher:</strong> {game.publisher}</p>
                <p><strong>Developer:</strong> {game.developer}</p>
                <p><strong>Release Date:</strong> {game.release_date}</p>
              </div>
              <div className="flex flex-col mt-2 text-sm text-blue-600">
                
                <a href={game.freetogame_profile_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  View on FreeToGame
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
