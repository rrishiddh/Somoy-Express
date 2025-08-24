'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+880 1234-567890', '+880 1234-567891'],
      description: 'Available 24/7 for support'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['hello@somoyexpress.com', 'support@somoyexpress.com'],
      description: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Courier Street', 'Dhaka, Bangladesh'],
      description: 'Visit our headquarters'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Thu: 8:00 AM - 8:00 PM', 'Fri - Sat: 10:00 AM - 6:00 PM'],
      description: 'Office hours'
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We&apos;re here to help! Reach out to us for any questions, concerns, or feedback. 
              Our dedicated team is ready to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach us. Choose what&apos;s most convenient for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
                    <div className="space-y-1 mb-3">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-800 font-medium text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Your email address"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please describe your inquiry in detail..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 "
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">Visit Our Office</h2>
                <p className="text-gray-600 mb-8">
                  Come visit us at our headquarters in Dhaka. We&apos;re always happy 
                  to meet our customers in person.
                </p>
              </div>

              {/* Map Placeholder */}
              <Card className="overflow-hidden">
      <div className="h-64 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.534927548389!2d90.41251831544422!3d23.793663092849572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a2f8b91e01%3A0x27c94a5da54e05b3!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1692748020193!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </Card>

              {/* FAQ Section */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How can I track my package?</h4>
                      <p className="text-gray-600 text-sm">Use your tracking ID on our tracking page or log into your dashboard for real-time updates.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">What are your delivery timeframes?</h4>
                      <p className="text-gray-600 text-sm">We offer same-day, next-day, and standard delivery options depending on your location and package type.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">How do I file a complaint?</h4>
                      <p className="text-gray-600 text-sm">Contact us through this form, call our support line, or email us directly. We respond within 24 hours.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  )
}