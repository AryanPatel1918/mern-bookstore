import { useState, useEffect } from "react"
import axios from "axios"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { useNavigate, useParams } from "react-router-dom"

export default function DeleteBook() {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const [isBookDeleted, setIsBookDeleted] = useState("")
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
        navigate("/")
      })
      .catch((error) => {
        console.log("Error:", error.message)
        alert("Error:" + error.message)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="p-4">
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-3 border-2 border-rose-500 rounded-xl p-6 w-fit mx-auto mt-10 shadow-xl bg-white">
          <h2 className="text-3xl font-semibold text-rose-600 mb-2 border-b border-rose-400 pb-2">
            Confirm Book Deletion
          </h2>
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
        <button className='w-full py-2 px-4 bg-rose-500 text-white font-medium mx-auto mt-2 rounded cursor-pointer hover:bg-rose-600 transition duration-200 ease-in-out' onClick={handleDeleteBook}>Delete</button>
        </div>
      )}
    </div>
  )
}
