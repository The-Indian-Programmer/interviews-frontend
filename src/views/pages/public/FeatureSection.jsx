import React from 'react'
import { Button } from "@/components/ui/button"

const FeatureSection = ({
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText,
  buttonHref,
  isReversed
}) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600 mb-6">{description}</p>
            <Button asChild>
              <a href={buttonHref}>{buttonText}</a>
            </Button>
          </div>
          <div className="md:w-1/2">
            <img src={imageSrc} alt={imageAlt} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection