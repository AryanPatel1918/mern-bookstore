export default function SearchEmptyState({ text }) {
  return (
    <div className="text-center mt-10 wrap-break-word">
      <h2 className="text-xl lg:text-2xl font-medium text-slate-700">
        No results found for "
        <span className="font-semibold">{text}</span>"
      </h2>
    </div>
  )
}
