'use client'
import React, { useEffect, useState } from 'react'

export default function Example() {
  const [games, setGames] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [published, setPublished] = useState("")
  const [owned, setOwned] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const fetchData = async () => {
    const res = await fetch('/api/games')
    const data = await res.json()
    setGames(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setPublished('')
    setOwned('')
    setImage('')
    setPrice('')
    setEditMode(false)
    setEditId(null)
  }

  const addOrUpdateTodo = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const method = editMode ? 'PUT' : 'POST'
    const url = editMode ? `/api/games/${editId}` : '/api/games'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, published, owned, image, price })
    })

    if (!res.ok) {
      alert('Error submitting data')
      return
    }

    resetForm()
    setShowModal(false)
    fetchData()
  }

  const startEdit = (game) => {
    setTitle(game.title)
    setDescription(game.description)
    setPublished(game.published)
    setOwned(game.owned)
    setImage(game.image)
    setPrice(game.price)
    setEditMode(true)
    setEditId(game.id)
    setShowModal(true)
  }

  const deleteTodo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this game?")) return

    const res = await fetch(`/api/games/${id}`, {
      method: 'DELETE'
    })

    if (res.ok) {
      fetchData()
    } else {
      alert('Failed to delete')
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold mb-4 text-black">Games</h2>

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
                <div className="flex flex-col justify-end space-y-1">
                  <p className="text-sm text-gray-500">Published: {game.published || 'N/A'}</p>
                  <p className="text-sm text-gray-500 italic">Owned: {game.owned}</p>
                  <p className="text-base font-medium text-gray-900">{game.price}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => startEdit(game)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(game.id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <button
            onClick={() => { resetForm(); setShowModal(true) }}
            className="p-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Todo
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md relative text-black">
              <button
                onClick={() => { setShowModal(false); resetForm() }}
                className="absolute top-2 right-3 text-2xl font-bold text-black hover:text-red-600"
              >
                &times;
              </button>
              <h2 className="text-lg font-bold mb-4">{editMode ? 'Edit Game' : 'Add Game'}</h2>
              <form onSubmit={addOrUpdateTodo} className="space-y-4">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border border-gray-300 rounded" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border border-gray-300 rounded" />
                <input type="text" value={published} onChange={(e) => setPublished(e.target.value)} placeholder="Published" className="w-full p-2 border border-gray-300 rounded" />
                <input type="text" value={owned} onChange={(e) => setOwned(e.target.value)} placeholder="Owned" className="w-full p-2 border border-gray-300 rounded" />
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full p-2 border border-gray-300 rounded" />
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" className="w-full p-2 border border-gray-300 rounded" />
                <button type="submit" className="w-full p-3 bg-green-700 text-white rounded">
                  {editMode ? 'Update Game' : 'Add Game'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
