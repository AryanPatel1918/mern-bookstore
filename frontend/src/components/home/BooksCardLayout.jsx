import BookCard from "./BookCard"

export default function BooksCardLayout({ books }) {
  return (
    books.length > 0 ? (
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
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