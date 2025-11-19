import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from "react-icons/pi"
import { BiUserCircle } from "react-icons/bi"
import { BsInfoCircleFill } from "react-icons/bs"
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"

export default function BooksCard({ books }) {
  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((book, index) => (
        <div key={index} className='border-2 border-gray-500 rounded-lg px-4 py-2 relative hover:shadow-xl'>
          <h2 className='absolute top-1 right-1 px-3 py-1 bg-red-300 rounded-lg shadow'>{book.year}</h2>
          <h4 className='my-2 text-gray-500'>{book._id}</h4>
          <div className="flex justify-start items-center gap-x-2">
            <PiBookOpenTextLight className='text-red-400 text-2xl' />
            <h2 className="my-1">{book.title}</h2>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <BiUserCircle className='text-red-400 text-2xl' />
            <h2 className='my-1'>{book.author}</h2>
          </div>
          <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
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
        </div>
      ))}
    </div>
  )
}
