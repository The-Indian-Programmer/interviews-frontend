import React from 'react'
import { Button } from "@/components/ui/button"
import { LinkedinIcon, FileText, BarChart2, FileSpreadsheet, Mic, MoreHorizontal } from 'lucide-react'

const features = [
  { icon: LinkedinIcon, name: 'LinkedIn Writer' },
  { icon: FileText, name: 'Resume Review' },
  { icon: BarChart2, name: 'Skill Gap Analysis' },
  { icon: FileSpreadsheet, name: 'Resume Builder' },
  { icon: Mic, name: 'Elevator Pitch' },
  { icon: MoreHorizontal, name: 'and Much More' },
]

const AdditionalFeatures = () => {
  return (
    <section className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">And there's much more!</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
              <feature.icon className="h-8 w-8 text-blue-600" />
              <span className="text-lg font-medium text-gray-900">{feature.name}</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            10X your job search today →
          </Button>
        </div>
      </div>
    </section>
  )
}

export default AdditionalFeatures