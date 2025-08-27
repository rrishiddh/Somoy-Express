'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from "motion/react";
import { Menu, X, Package, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { initializeAuth, logout } from '@/redux/slices/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, token } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    router.push('/')
  }

  // Conditionally include /track only if user exists
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    ...(user ? [{ href: '/track', label: 'Track' }] : []),
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  const getDashboardLink = () => {
    if (!user) return '/auth/login'
    return `/dashboard/${user.role}`
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">
                Somoy Express
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href ? 'text-blue-600 border-b-2 border-blue-600' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {token ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={getDashboardLink()}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                >
                  <User className="h-4 w-4" />
                  <span className="capitalize">{user?.role} Panel</span>
                </Link>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {token ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 capitalize"
                    onClick={() => setIsOpen(false)}
                  >
                    {user?.role} Panel
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2 px-3 py-2">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar