export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand">
      <div className="flex flex-col items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 64" role="img" aria-label="Hola Credit" className="h-10 w-14 animate-pulse">
          <path fill="#16B8A6" d="M8 8h30v14c0 8-6 14-14 14H8V8Zm80 0H58v14c0 8 6 14 14 14h16V8Z" />
          <path fill="#111512" d="M8 56h30V42c0-8-6-14-14-14H8v28Zm80 0H58V42c0-8 6-14 14-14h16v28Z" />
        </svg>
        <p className="text-sm text-ink/50">Loading...</p>
      </div>
    </div>
  );
}
