import React from 'react'
import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
      <h1 className="text-6xl font-bold text-orange-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NoPage