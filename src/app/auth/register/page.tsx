'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from "motion/react";
import { Eye, EyeOff, User, Mail, Phone, MapPin, Lock, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import toast from 'react-hot-toast'
import { useRegisterMutation } from '@/redux/api/authApi';
import { useAppDispatch , useAppSelector} from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: '' as 'sender' | 'receiver' | ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [register, { isLoading }] = useRegisterMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      router.push(`/dashboard/${user.role}`)
    }
  }, [user, router])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.address || !formData.role) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    try {
      const response = await register(formData).unwrap()
      dispatch(setCredentials(response))
      toast.success('Registration successful!')
      router.push(`/dashboard/${response.user.role}`)
    } catch (error: any) {
      toast.error(error?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex items-center justify-center space-x-2 mb-4"
          >
          <p className="text-gray-600">Create your account and start shipping today</p>
           
          </motion.div>
        </div>

        {/* Registration Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10 h-12"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 h-12"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 h-12"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="pl-10 h-12"
                    placeholder="Enter your address"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Account Type
                </Label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                  <Select onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger className="pl-10 h-12">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sender">Sender - Send packages</SelectItem>
                      <SelectItem value="receiver">Receiver - Receive packages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 h-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Role Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 bg-gray-50 rounded-lg"
            >
              <h4 className="text-sm font-medium text-gray-700 mb-3">Account Types:</h4>
              <div className="space-y-2 text-xs text-gray-600">
                <div>
                  <span className="font-medium">Sender:</span> Create and send packages, track deliveries, manage shipments
                </div>
                <div>
                  <span className="font-medium">Receiver:</span> Receive packages, confirm deliveries, view delivery history
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>

      </motion.div>
    </div>
  )
}