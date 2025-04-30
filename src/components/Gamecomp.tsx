'use client'
import React, { useEffect, useState } from 'react'


export default function Example() {
  const [games, setGames] = useState([])

  const fetchData = async () => {
    const res = await fetch('/api/games')
    const data = await res.json()
    console.log('data', data)
    setGames(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Games</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <img
                alt={game.title || 'Game Image'}
                src={game.image || 'https://via.placeholder.com/300'}
                className="aspect-3/4 w-full bg-gray-200 object-cover group-hover:opacity-75 sm:aspect-auto sm:h-96"
              />
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <span>{game.title}</span>
                </h3>
                <p className="text-sm text-gray-500">{game.description || 'No description available.'}</p>
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-sm text-gray-500">Published: {game.published || 'N/A'}</p>
                  <p className="text-sm text-gray-500 italic">Owned: {game.owned}</p>
                  <p className="text-base font-medium text-gray-900">{game.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
