'use client'

import { useState } from 'react'
import { Login } from '../components/login'
import { SearchBooks } from '../components/search-books'
import { IssueBook } from '../components/issue-book'
import { ReturnBook } from '../components/return-book'
import { AddBook } from '../components/add-book'
import { UserManagement } from '../components/user-management'

export default function LibraryManagementSystem() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentView, setCurrentView] = useState('login')

  const handleLogin = (user) => {
    setCurrentUser(user)
    setCurrentView('search')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView('login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Library Management System</h1>
        </div>
      </header>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white">LMS</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {currentUser && (
                    <>
                      <button
                        onClick={() => setCurrentView('search')}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Search Books
                      </button>
                      <button
                        onClick={() => setCurrentView('issue')}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Issue Book
                      </button>
                      <button
                        onClick={() => setCurrentView('return')}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Return Book
                      </button>
                      {currentUser.role === 'admin' && (
                        <>
                          <button
                            onClick={() => setCurrentView('add')}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            Add Book
                          </button>
                          <button
                            onClick={() => setCurrentView('users')}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            User Management
                          </button>
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {currentView === 'login' && <Login onLogin={handleLogin} />}
          {currentView === 'search' && <SearchBooks />}
          {currentView === 'issue' && <IssueBook />}
          {currentView === 'return' && <ReturnBook />}
          {currentView === 'add' && currentUser?.role === 'admin' && <AddBook />}
          {currentView === 'users' && currentUser?.role === 'admin' && <UserManagement />}
        </div>
      </main>
    </div>
  )
}

