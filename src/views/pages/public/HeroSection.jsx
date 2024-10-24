import React from 'react'
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Land your dream job.<br />
            <span className="text-blue-600">Without the stress.</span>
          </h1>
          <ul className="mb-8 space-y-2">
            {['Your AI Career Copilot', 'Automated Job Tracker', 'Personalized Career Insights', 'AI Resume Builder', 'And Much More!'].map((feature, index) => (
            <li key={index} className="flex items-center justify-center text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              {feature}
            </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Add to Chrome (FREE)
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <div className="flex -space-x-2 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <img
                key={i}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src={`/placeholder.svg?height=40&width=40&text=${i + 1}`}
                alt={`User avatar ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-gray-600 text-sm">
          "Just stumbled upon Careerflow. Wish I'd had something coaching me to be strategic!"
        </p>
      </div>
    </section>
  )
}

export default HeroSection