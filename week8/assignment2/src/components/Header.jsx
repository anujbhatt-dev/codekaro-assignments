export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-blue-600">
          Tourist
        </a>

        {/* Links */}
        <nav className="flex items-center gap-8">
          <a
            href="#home"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Home
          </a>

          <a
            href="#places"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Places
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}