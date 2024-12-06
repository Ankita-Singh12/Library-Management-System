'use client'

import { useState } from 'react'

const availableBooks = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 2, title: '1984', author: 'George Orwell' },
]

export function IssueBook() {
  const [selectedBook, setSelectedBook] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [remarks, setRemarks] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedBook || !issueDate || !returnDate) {
      alert('Please fill in all required fields.')
      return
    }
    // Here you would typically send this data to your backend
    alert('Book issued successfully!')
    // Reset form
    setSelectedBook('')
    setIssueDate('')
    setReturnDate('')
    setRemarks('')
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
          {availableBooks.map((book) => (
            <option key={book.id} value={book.id}>{book.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="issue-date" className="block text-sm font-medium text-gray-700">Issue Date</label>
        <input
          type="date"
          id="issue-date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
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
      <div>
        <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
        <textarea
          id="remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Issue Book
      </button>
    </form>
  )
}

