import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io"
import { MdOutlineAddBox } from "react-icons/md"
import BooksCardLayout from '../components/home/BooksCardLayout'
import BooksTableLayout from '../components/home/BooksTableLayout'
import BackendErrorState from '../components/home/BackendErrorState'
import EmptyDatabaseState from '../components/home/EmptyDatabaseState'
import SearchEmptyState from '../components/home/SearchEmptyState'

export default function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [layout, setLayout] = useState(() => {
    return localStorage.getItem('layout') || 'table'
  })

  const filteredBooks = useMemo(() => {
    const text = searchText.trim().toLowerCase()
    return books.filter(book => 
      book.title.toLowerCase().includes(text) ||
      book.author.toLowerCase().includes(text) ||
      String(book.year).includes(text)
    )
  }, [books, searchText])

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
        <div className='flex justify-center items-center pt-1 pb-1 pl-2 pr-2 gap-1 border-2 border-blue-400 rounded-full'>
          <IoIosSearch className='text-lg text-gray-600' />
          <input
            className='outline-0 text-sm md:text-base w-[100px] sm:w-[200px] md:w-[250px] lg:w-[350px]'
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
            placeholder='Search by title, author, or year…' />
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
        <BackendErrorState />
      ) : books.length === 0 ? (
        <EmptyDatabaseState />
      ) : filteredBooks.length === 0 ? (
        <SearchEmptyState text={searchText} />
      ) : layout === 'table' ? (
        <BooksTableLayout books={filteredBooks} />
      ) : (
        <BooksCardLayout books={filteredBooks} />
      )}
    </div>
  )
}