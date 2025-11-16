import { Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"

export default function BackButton({ destination = "/" }) {
  return (
    <Link
      to={destination}
      className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md w-fit flex justify-center items-center gap-1"
      title="Back"
    >
      <BsArrowLeft className="text-2xl" />
      <span className="font-medium">Back</span>
    </Link>
  )
}
