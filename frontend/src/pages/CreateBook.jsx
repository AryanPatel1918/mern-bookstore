import { useState } from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function CreateBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    year: ""
  })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleBookInfo(e) {
    setBook(prevBook => ({ ...prevBook, [e.target.name]: e.target.value }))
  }
  
  function handleCreateBook() {
    const title = book.title.trim()
    const author = book.author.trim()
    const year = book.year.toString().trim()

    // Frontend validation
    if (!title || !author || !year) {
      toast.warn('All fields are required')
      return
    }

    const data = { title, author, year: Number(year) }

    setLoading(true)
    axios.post('http://localhost:5000/books', data)
      .then(() => {
        toast.success('Book created successfully')
        navigate('/')
      })
      .catch(error => {
        if (error.response) {
          console.log("Status: ", error.response.status)
          console.log("Data: ", error.response.data)
          toast.error(`Error: Status ${error.response.status}, Message: ${error.response.data.error}`)
        } else {
          console.log("Error:", error.message)
          toast.error('Error: Network error or server not reachable')
        }
      })
      .finally(() => setLoading(false))
    }
    
  return (
    <div className='p-4'>
      <BackButton />
      {loading && <Spinner />}
      <div className='flex flex-col gap-4 border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto mt-10 shadow-xl'>
        <h2 className="text-3xl font-semibold text-sky-600 mt-2 mb-2 border-b border-sky-200 pb-2">
          Create Book
        </h2>
        <div className=''>
          <label htmlFor='title' className='text-lg text-gray-600 font-medium mr-3'>Title:</label>
          <input id='title' name='title' onChange={handleBookInfo} value={book.title} className='outline-0 border-2 border-gray-600 px-1.5 py-1 w-full' autoFocus />
        </div>
        <div className=''>
          <label htmlFor='author' className='text-lg text-gray-600 font-medium mr-3'>Author:</label>
          <input id='author' name='author' onChange={handleBookInfo} value={book.author} className='outline-0 border-2 border-gray-600 px-1.5 py-1 w-full' />
        </div>
        <div className=''>
          <label htmlFor='year' className='text-lg text-gray-600 font-medium mr-3'>Publish Year:</label>
          <input id='year' type='number' name='year' onChange={handleBookInfo} value={book.year} className='outline-0 border-2 border-gray-600 px-1.5 py-1 w-full' />
        </div>
        <button className='w-full py-2 px-4 bg-sky-400 text-white font-medium mx-auto mt-2 rounded cursor-pointer hover:bg-sky-500 transition duration-200 ease-in-out' onClick={handleCreateBook}>
          Create Book
        </button>
      </div>
    </div>
  )
}
