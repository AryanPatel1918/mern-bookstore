import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io"
import { MdOutlineAddBox } from "react-icons/md"
import BooksCardLayout from '../components/home/BooksCardLayout'
import BooksTableLayout from '../components/home/BooksTableLayout'

export default function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [layout, setLayout] = useState(() => {
    return localStorage.getItem('layout') || 'table'
  })

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchText.trim().toLowerCase())
  )  

  // Save layout to localStorage on change
  useEffect(() => {
    localStorage.setItem('layout', layout)
  }, [layout])

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:5000/books')
      .then(response => setBooks(response.data.data))
      .catch(error => {
        console.log(error)
        setError("Backend is offline. Please start the server.")
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='text-white font-medium text-sm bg-sky-400 hover:bg-sky-500 transition duration-200 ease-in-out px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-md cursor-pointer'
          onClick={() => setLayout(prev => prev === 'table' ? 'cards' : 'table')}
        >
          Switch to {layout === 'table' ? 'Cards' : 'Table'}
        </button>
      </div>
      <div className='flex justify-between items-center my-2 p-2 lg:my-4'>
        <div className='flex justify-center items-center gap-1.5'>
          <div className='w-[40px] h-[40px]'>
            <img src="/favicon.png" className='size-full object-cover' />
          </div>
          <h1 className='text-3xl font-medium lg:text-4xl'>
            <span className='text-blue-500'>B</span>
            <span className='text-red-500'>o</span>
            <span className='text-amber-500'>o</span>
            <span className='text-blue-500'>k</span>
            <span className='text-red-500'>s</span>
          </h1>
        </div>
        <div className='flex justify-center items-center pt-1 pb-1 pl-2 pr-2 gap-1 border-2 border-blue-400 rounded-4xl'>
          <IoIosSearch className='text-lg text-gray-600' />
          <input
            className='outline-0 w-[100px] sm:w-[150px] md:w-[250px] lg:w-[350px]'
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
            placeholder='Search book' />
        </div>
        <Link to='/books/create' title="Create Book" className='flex justify-center items-center gap-1 bg-green-500 hover:bg-green-600 transition duration-200 ease-in-out px-2 py-1.5 lg:px-3 lg:py-2 rounded-lg'>
          <MdOutlineAddBox className='text-white text-2xl' />
          <span className='text-white font-medium'>Create Book</span>
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-center mt-10">
          <h2 className="text-xl font-medium text-red-600">
            Unable to load books. The server may be offline.
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Please start your backend and refresh the page.
          </p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-xl lg:text-2xl font-medium text-slate-700">
            No books found.
          </h2>
          <p className="text-slate-500 mt-1 lg:text-lg">
            Click <span className="text-green-500 font-semibold">"Create Book"</span> to add your first one!
          </p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center mt-10 wrap-break-word">
          <h2 className="text-xl lg:text-2xl font-medium text-slate-700">
            No results found for "<span className='font-semibold'>{searchText}</span>"
          </h2>
        </div>
      ) : (
        layout === 'table' ? (
          <BooksTableLayout books={filteredBooks} />
        ) : (
          <BooksCardLayout books={filteredBooks} />
        ) 
      )}
    </div>
  )
}