import { useState, useEffect } from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function EditBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    year: ""
  })
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  
  const navigate = useNavigate()
  
  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/books/${id}`)
      .then(response => setBook({ title: response.data.title, author: response.data.author, year: response.data.year }))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])


  function handleBookInfo(e) {
    setBook(prevBook => ({ ...prevBook, [e.target.name]: e.target.value }))
  }
  
  function handleUpdateBook() {
    const title = book.title.trim()
    const author = book.author.trim()
    const year = book.year.toString().trim()

    // Frontend validation
    if (!title || !author || !year) {
      toast.warn('All fields are required')
      return
    }

    if (title.length > 100) {
      toast.warn('Title cannot exceed 100 characters')
      return
    }

    if (author.length > 60) {
      toast.warn('Author name cannot exceed 60 characters')
      return
    }

    if (isNaN(Number(year)) || Number(year) > 9999) {
      toast.warn("Year must be a valid number up to 4 digits")
      return
    }

    const data = { title, author, year: Number(year) }

    setLoading(true)
    axios.put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        toast.success('Book updated successfully')
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
          Edit Book
        </h2>
        <div className=''>
          <label htmlFor='title' className='text-lg text-gray-600 font-medium mr-3'>Title:</label>
          <input id='title' name='title' onChange={handleBookInfo} value={book.title} className='outline-0 border-2 border-gray-600 px-1.5 py-1 w-full' />
        </div>
        <div className=''>
          <label htmlFor='author' className='text-lg text-gray-600 font-medium mr-3'>Author:</label>
          <input id='author' name='author' onChange={handleBookInfo} value={book.author} className='outline-0 border-2 border-gray-600 px-1.5 py-1 w-full' />
        </div>
        <div className=''>
          <label htmlFor='year' className='text-lg text-gray-600 font-medium mr-3'>Publish Year:</label>
          <input id='year' type='number' name='year' onChange={handleBookInfo} value={book.year} className='outline-0 border-2 border-gray-600 px-1.5 py-1 w-full' />
        </div>
        <button className='w-full py-2 px-4 bg-sky-400 text-white font-medium mx-auto mt-2 rounded cursor-pointer hover:bg-sky-500 transition duration-200 ease-in-out' onClick={handleUpdateBook}>
          Save Changes
        </button>
      </div>
    </div>
  )
}
