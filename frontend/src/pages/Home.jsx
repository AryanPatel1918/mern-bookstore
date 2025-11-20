import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from "react-icons/md"
import BookCard from '../components/home/BookCard'
import BooksTable from '../components/home/BooksTable'

export default function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [layout, setLayout] = useState('table')

  // Load layout from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem('layout');
    if (savedLayout) setLayout(savedLayout);
  }, [])

  // Save layout to localStorage on change
  useEffect(() => {
    localStorage.setItem('layout', layout);
  }, [layout])

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:5000/books')
      .then(response => setBooks(response.data.data))
      .catch(error => console.log(error))
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
        <Link to='/books/create' title="Create Book" className='flex justify-center items-center gap-1 bg-green-500 hover:bg-green-600 transition duration-200 ease-in-out px-2 py-1.5 lg:px-3 lg:py-2 rounded-lg'>
          <MdOutlineAddBox className='text-white text-2xl' />
          <span className='text-white font-medium'>Create Book</span>
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Spinner />
        </div>
      ) : layout === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}
