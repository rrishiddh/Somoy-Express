'use client'

import { motion } from "motion/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqPage() {
  const faqs = [
    {
      question: "How can I track my package?",
      answer:
        "You can easily track your package through our website or mobile app using the tracking ID provided at the time of booking.",
    },
    {
      question: "Do you offer same-day delivery?",
      answer:
        "Yes, we provide express delivery services including same-day and next-day delivery options in major cities.",
    },
    {
      question: "What items are restricted from delivery?",
      answer:
        "We do not deliver perishable goods, hazardous materials, or items restricted under Bangladesh's courier regulations.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "Our support team is available 24/7 via phone, email, and live chat to assist you with any issues or queries.",
    },
    {
      question: "Do you provide corporate courier solutions?",
      answer:
        "Yes, we offer tailored courier solutions for businesses including bulk deliveries, scheduled pickups, and priority support.",
    },
  ]

  return (
    <div className="min-h-screen mx-auto mx-w-7xl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Find answers to the most common questions about our courier services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Questions, Answered</h2>
            <p className="text-lg text-gray-600">
              If you can’t find what you’re looking for, feel free to reach out to our support team.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="border rounded-lg bg-white shadow-sm">
                  <AccordionTrigger className="px-4 md:px-6 py-4 text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 md:px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
