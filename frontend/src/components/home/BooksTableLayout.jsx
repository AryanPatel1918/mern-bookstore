import { Link } from 'react-router-dom'
import { BsInfoCircleFill } from "react-icons/bs"
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"

export default function BooksTableLayout({ books }) {
  return (
    books.length > 0 ? (
      <table className="w-full border-separate border-spacing-2 mt-4">
        <thead>
          <tr>
            <th className="p-1 tracking-wide border border-slate-600 rounded-md">
              No
            </th>
            <th className="p-1 tracking-wide border border-slate-600 rounded-md">
              Title
            </th>
            <th className="p-1 tracking-wide border border-slate-600 rounded-md max-md:hidden">
              Author
            </th>
            <th className="p-1 tracking-wide border border-slate-600 rounded-md max-md:hidden">
              Publish Year
            </th>
            <th className="p-1 tracking-wide border border-slate-600 rounded-md">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {book.title}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.author}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.year}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-evenly items-center">
                  <Link to={`/books/details/${book._id}`} title="Book Details">
                    <BsInfoCircleFill className="text-xl text-blue-500 hover:text-blue-600" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} title="Edit Book">
                    <AiFillEdit className="text-xl text-yellow-500 hover:text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} title="Delete Book">
                    <MdDelete className="text-xl text-red-600 hover:text-red-700" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="text-center mt-10">
        <h2 className="text-xl lg:text-2xl font-medium text-slate-700">
          No books found.
        </h2>
        <p className="text-slate-500 mt-1 lg:text-lg">
          Click <span className="text-green-500 font-semibold">"Create Book"</span> to add your first one!
        </p>
      </div>
    )
  )
}
