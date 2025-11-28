export default function BackendErrorState() {
  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-medium text-red-600">
        Unable to load books. The server may be offline.
      </h2>
      <p className="text-slate-500 mt-1 font-medium">
        Please start your backend and refresh the page.
      </p>
    </div>
  )
}
