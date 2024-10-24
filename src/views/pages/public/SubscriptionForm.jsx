import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SubscriptionForm = () => {
  return (
    <section className="bg-navy-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <form className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow bg-white text-navy-900"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

export default SubscriptionForm