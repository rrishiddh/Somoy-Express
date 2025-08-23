'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Shield, Truck, Star, Package,  CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'


export default function HomePage() {
  const features = [
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Same day and next day delivery options available for urgent packages.'
    },
    {
      icon: Shield,
      title: 'Secure Handling',
      description: 'Your packages are handled with utmost care and security protocols.'
    },
    {
      icon: Truck,
      title: 'Real-time Tracking',
      description: 'Track your packages in real-time with detailed status updates.'
    },
    {
      icon: Star,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your delivery needs.'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '100K+', label: 'Parcels Delivered' },
    { number: '25+', label: 'Cities Covered' },
    { number: '99.8%', label: 'Success Rate' }
  ]

  const services = [
    {
      title: 'Document Delivery',
      description: 'Quick and secure delivery of important documents',
      features: ['Same day delivery', 'Digital proof of delivery', 'Secure handling']
    },
    {
      title: 'Package Delivery',
      description: 'Reliable delivery service for all types of packages',
      features: ['Real-time tracking', 'Insurance coverage', 'Flexible scheduling']
    },
    {
      title: 'Express Delivery',
      description: 'Ultra-fast delivery for urgent requirements',
      features: ['2-hour delivery', 'Priority handling', 'Live GPS tracking']
    }
  ]

  return (
    <>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Fast & Reliable
                <span className="block text-yellow-300">Courier Service</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Delivering your packages with speed, security, and care across Bangladesh. 
                Experience the most trusted courier service in the country.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/track">
                  <Button size="lg" variant="outline" className="  hover:bg-gray-300 text-blue-600 hover:text-blue-800">
                    Track Package
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Package className="w-32 h-32 text-yellow-300" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Truck className="w-12 h-12 text-blue-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Somoy Express?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide exceptional courier services with modern technology and reliable delivery network.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive courier solutions tailored to meet your specific delivery needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Send Your Package?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Somoy Express for their delivery needs.
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                Start Shipping Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </>
  )
}