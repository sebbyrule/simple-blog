import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-gray-100 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between">
          <div className="flex items-center">
            <Link href="/">
              My Blog
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/">
              Home
            </Link>
            <Link href="/about">
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
