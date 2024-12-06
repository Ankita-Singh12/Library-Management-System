'use client'

import { useState } from 'react'

const issuedBooks = [
  { id: 1, title: 'Pride and Prejudice', author: 'Jane Austen', issueDate: '2023-05-01' },
]

export function ReturnBook() {
  const [selectedBook, setSelectedBook] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedBook || !returnDate) {
      alert('Please fill in all required fields.')
      return
    }
    // Here you would typically send this data to your backend
    alert('Book returned successfully!')
    // Reset form
    setSelectedBook('')
    setReturnDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="book" className="block text-sm font-medium text-gray-700">Select Book</label>
        <select
          id="book"
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select a book</option>
          {issuedBooks.map((book) => (
            <option key={book.id} value={book.id}>{book.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="return-date" className="block text-sm font-medium text-gray-700">Return Date</label>
        <input
          type="date"
          id="return-date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Return Book
      </button>
    </form>
  )
}

