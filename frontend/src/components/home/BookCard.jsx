import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from "react-icons/pi"
import { BiUserCircle, BiShow } from "react-icons/bi"
import { BsInfoCircleFill } from "react-icons/bs"
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { useState } from "react"
import BookModal from './BookModal'

export default function BookCard({ book }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='border-2 border-blue-400 rounded-lg px-4 py-2 relative hover:shadow-xl'>
      <h2 className='absolute top-2 right-2 px-3 py-1 bg-red-300 rounded-lg shadow'>{book.year}</h2>
      <h4 className='my-2 text-gray-400 font-mono break-all'>{book._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className='text-red-400 text-2xl' />
        <h2 className="my-1">{book.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-400 text-2xl' />
        <h2 className='my-1'>{book.author}</h2>
      </div>
      <div className='flex justify-evenly items-center mt-4 p-2'>
        <BiShow onClick={() => setShowModal(true)} className='text-3xl text-gray-600 hover:text-gray-700 cursor-pointer' title='Preview' />
        <Link to={`/books/details/${book._id}`} title="Book Details">
          <BsInfoCircleFill className='text-2xl text-blue-500 hover:text-blue-600' />
        </Link>
        <Link to={`/books/edit/${book._id}`} title="Edit Book">
          <AiFillEdit className='text-2xl text-yellow-500 hover:text-yellow-600' />
        </Link>
        <Link to={`/books/delete/${book._id}`} title="Delete Book">
          <MdDelete className="text-2xl text-red-500 hover:text-red-600" />
        </Link>
      </div>
      {showModal && <BookModal book={book} closeModal={() => setShowModal(false)} />}
    </div>
  )
}
