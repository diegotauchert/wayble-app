export const Ping = () => {
  return (
    <span className="relative flex h-3 w-3 -mt-1">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/90 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary/60"></span>
    </span>
  )
}