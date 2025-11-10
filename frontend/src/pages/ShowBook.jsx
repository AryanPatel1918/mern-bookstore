import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

export default function ShowBook() {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-3 border-2 border-sky-400 rounded-xl p-6 w-fit shadow-md bg-white">
        <h2 className="text-2xl font-semibold text-sky-600 mb-4 border-b border-sky-200 pb-2">
          Book Details
        </h2>
        {[
          { label: 'Id', value: book._id },
          { label: 'Title', value: book.title },
          { label: 'Author', value: book.author },
          { label: 'Publish Year', value: book.year },
          {
            label: 'Created At',
            value: new Date(book.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              weekday: 'short',
              hour: '2-digit',
              minute: '2-digit'
            }),
          },
          {
            label: 'Last Updated',
            value: new Date(book.updatedAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              weekday: 'short',
              hour: '2-digit',
              minute: '2-digit'
            }),
          },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-wrap items-center">
            <span className="w-40 text-gray-500 font-medium">{label}:</span>
            <span className="text-gray-800">{value}</span>
          </div>
        ))}
        </div>
      )}
    </div>
  )
}
