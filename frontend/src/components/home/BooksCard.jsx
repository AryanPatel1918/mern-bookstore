import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from "react-icons/pi"
import { BiUserCircle } from "react-icons/bi"
import { AiOutlineEdit } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { MdOutlineDelete } from "react-icons/md"

export default function BooksCard({ books }) {
  return (
    <>
      {books.map((book, index) => (
        <div>
          <h3>{book.title}</h3>
        </div>
      ))}
    </>
  )
}
