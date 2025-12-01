import { Link } from 'react-router-dom'
import { BsInfoCircleFill } from "react-icons/bs"
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"

export default function BooksTableLayout({ books }) {
  return (
    <div className="overflow-x-auto mt-4 shadow-md">
      <table className="min-w-full border-collapse border border-slate-300">
        <thead className="bg-slate-200">
          <tr>
            <th className="p-2 text-sm font-semibold text-slate-700 border border-slate-300">
              No
            </th>
            <th className="p-2 text-sm font-semibold text-slate-700 border border-slate-300">
              Title
            </th>
            <th className="p-2 text-sm font-semibold text-slate-700 border border-slate-300 hidden md:table-cell">
              Author
            </th>
            <th className="p-2 text-sm font-semibold text-slate-700 border border-slate-300 hidden md:table-cell">
              Publish Year
            </th>
            <th className="p-2 text-sm font-semibold text-slate-700 border border-slate-300">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="hover:bg-slate-100 transition-colors even:bg-slate-50">
              <td className="border border-slate-300 text-center p-2">{index + 1}</td>
              <td className="border border-slate-300 text-center p-2">{book.title}</td>
              <td className="border border-slate-300 text-center p-2 hidden md:table-cell">{book.author}</td>
              <td className="border border-slate-300 text-center p-2 hidden md:table-cell">{book.year}</td>
              <td className="border border-slate-300 text-center p-2">
                <div className="flex justify-evenly">
                  <Link to={`/books/details/${book._id}`} title="Book Details">
                    <BsInfoCircleFill className="text-blue-500 hover:text-blue-600 transition-colors text-lg" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} title="Edit Book">
                    <AiFillEdit className="text-yellow-500 hover:text-yellow-600 transition-colors text-lg" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} title="Delete Book">
                    <MdDelete className="text-red-600 hover:text-red-700 transition-colors text-lg" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}