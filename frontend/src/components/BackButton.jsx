import { Link } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";

export default function BackButton({ destination = '/' }) {
  return (
      <Link
          to={destination}
          className='bg-blue-500 text-white px-4 py-1 rounded-md w-fit flex justify-center items-center gap-1'
      >
          <BsArrowLeft className='text-2xl' />
          Back
      </Link>
  )
}
