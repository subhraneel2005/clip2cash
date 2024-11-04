import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-500">
          © {currentYear} Getstart. All rights reserved.
        </div>
        <nav className="flex space-x-4">
          <Link href="https://facebook.com" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <FaFacebook className="h-6 w-6" />
          </Link>
          <Link href="https://twitter.com" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <FaTwitter className="h-6 w-6" />
          </Link>
          <Link href="https://instagram.com" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <FaInstagram className="h-6 w-6" />
          </Link>
          <Link href="https://linkedin.com" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin className="h-6 w-6" />
          </Link>
        </nav>
      </div>
    </footer>
  )
}