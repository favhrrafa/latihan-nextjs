import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Eventku
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/events"
          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          Jelajah Event
        </Link>
      </div>
    </nav>
  );
}
