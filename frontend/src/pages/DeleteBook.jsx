import { useState, useEffect } from "react"
import axios from "axios"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

export default function DeleteBook() {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  function handleDeleteBook() {
    setLoading(true)
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        toast.success('Book deleted successfully')
        navigate('/')
      })
      .catch((error) => {
        console.log("Error:", error.message)
        toast.error(`Error: ${error.message}`)
      })
      .finally(() => setLoading(false))
  }

  const handleCancel = () => navigate('/') 

  if (!book || !book._id) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-rose-600 text-xl font-medium mt-5">
          Book not found or failed to load.
        </h1>
      </div>
    )
  }

  return (
    <div className="p-4">
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-3 border-2 border-rose-500 rounded-xl p-6 w-fit mx-auto mt-10 shadow-xl bg-white">
          <h3 className="text-2xl text-center font-semibold text-rose-600 mb-2 border-b border-rose-400 pb-2">
            Are you sure you want to delete this book?
          </h3>
          {[
            { label: "Id", value: book._id },
            { label: "Title", value: book.title },
            { label: "Author", value: book.author },
            { label: "Publish Year", value: book.year },
            {
              label: "Created At",
              value: new Date(book.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
            {
              label: "Last Updated",
              value: new Date(book.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-wrap items-center">
              <span className="w-50 text-lg text-gray-500 font-medium">{label}:</span>
              <span className="text-lg text-gray-800">{value}</span>
            </div>
          ))}
        <div className="flex gap-5">
          <button className='w-full py-2 px-4 bg-rose-500 hover:bg-rose-600 text-white font-medium mx-auto mt-2 rounded cursor-pointer transition duration-200 ease-in-out' onClick={handleDeleteBook}>Delete</button>
          <button className='w-full py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 hover:text-gray-100 font-medium mx-auto mt-2 rounded cursor-pointer transition duration-200 ease-in-out' onClick={handleCancel}>Cancel</button>
        </div>
        </div>
      )}
    </div>
  )
}
