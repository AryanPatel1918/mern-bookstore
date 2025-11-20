import { AiOutlineClose, AiFillCloseSquare } from "react-icons/ai"
import { IoIosCloseCircle } from "react-icons/io"
import { IoMdTime } from "react-icons/io"
import { PiBookOpenTextLight } from "react-icons/pi"
import { BiUserCircle } from "react-icons/bi"

export default function BookModal({ book, closeModal }) {
  return (
    <div onClick={closeModal} className="fixed bg-black/60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
        <div onClick={e => e.stopPropagation()} className="w-[600px] max-w-full h-[400px] bg-white border-3 rounded-xl p-5 flex flex-col relative">
            <IoIosCloseCircle onClick={closeModal} className="absolute right-4 top-4 text-4xl text-red-500 hover:text-red-600 cursor-pointer" title="Close Preview" />
            <h4 className='my-2 text-gray-500'>{book._id}</h4>
            <div className="flex justify-start items-center gap-x-2">
                <PiBookOpenTextLight className='text-red-400 text-3xl' />
                <h2 className="my-1 text-lg">{book.title}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                <BiUserCircle className='text-red-400 text-3xl' />
                <h2 className='my-1 text-lg'>{book.author}</h2>
            </div>
            <div className="flex justify-start items-center gap-x-2">
                <IoMdTime className='text-red-400 text-3xl' />
                <h2 className="my-1 text-lg">{book.year}</h2>
            </div>
            <p className="mt-4">Anything you want to show</p>
            <p className="my-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione possimus nulla magnam hic officia aperiam quisquam esse totam qui deserunt dolore sit consequuntur tenetur corrupti mollitia, sapiente sint ut quasi!
            </p>
        </div>
    </div>
  )
}
