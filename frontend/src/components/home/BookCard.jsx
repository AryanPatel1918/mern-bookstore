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
    <>
      <div className='flex flex-col border border-b-4 border-blue-400 rounded-lg px-4 py-2 relative hover:shadow-xl hover:shadow-blue-400/40 hover:-translate-y-1 md:hover:-translate-y-2 transition duration-300 ease-in-out'>
        <h2 className='absolute top-2 right-2 px-3 py-1 bg-red-400 text-white rounded-lg shadow'>{book.year}</h2>
        <h4 className='my-2 text-gray-400 font-mono break-all'>{book._id}</h4>
        <div className="flex flex-1 justify-start items-center gap-x-2 min-w-0">
          <PiBookOpenTextLight className='text-red-400 text-2xl shrink-0' />
          <h2 className="my-1 break-words min-w-0">{book.title}</h2>
        </div>
        <div className='flex flex-1 justify-start items-center gap-x-2 min-w-0'>
          <BiUserCircle className='text-red-400 text-2xl shrink-0' />
          <h2 className='my-1 break-words min-w-0'>{book.author}</h2>
        </div>
        <div className='flex justify-evenly items-center mt-4 p-2'>
          <BiShow onClick={() => setShowModal(true)} className='text-3xl text-gray-500 hover:text-gray-700 transition-colors cursor-pointer' title='Preview' />
          <Link to={`/books/details/${book._id}`} title="Book Details">
            <BsInfoCircleFill className='text-2xl text-blue-500 hover:text-blue-600 transition-colors' />
          </Link>
          <Link to={`/books/edit/${book._id}`} title="Edit Book">
            <AiFillEdit className='text-2xl text-yellow-500 hover:text-yellow-600 transition-colors' />
          </Link>
          <Link to={`/books/delete/${book._id}`} title="Delete Book">
            <MdDelete className="text-2xl text-red-500 hover:text-red-600 transition-colors" />
          </Link>
        </div>
      </div>
      {showModal && <BookModal book={book} closeModal={() => setShowModal(false)} />}
    </>
  )
}