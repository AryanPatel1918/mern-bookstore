import BookCard from "./BookCard"

export default function BooksCardLayout({ books }) {
  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map(book => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  )
}