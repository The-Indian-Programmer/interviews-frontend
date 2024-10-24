import React from 'react'
import HeroSection from './HeroSection'
import CompanyLogos from './CompanyLogos'
import FeatureSection from './FeatureSection'
import AdditionalFeatures from './AdditionalFeatures'
import FeaturedIn from './FeaturedIn'
import BlogPosts from './BlogPosts'
import SubscriptionForm from './SubscriptionForm'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
    <HeroSection />
    <CompanyLogos />
    <FeatureSection
      title="Accelerate your job search with a personalized CRM!"
      description="Keep track of all your jobs opportunities, applications, notes, contacts in one single dashboard. Don't let anything slip through the cracks and land your dream job in a single place!"
      imageSrc="https://cdn.prod.website-files.com/635c591378332f38be25d45f/63dbe3edc05353368be53772_1201-p-1080.png"
      imageAlt="Job search dashboard"
      buttonText="Start tracking your jobs for free →"
      buttonHref="#"
      isReversed={false}
    />
    <FeatureSection
      title="Optimize your profile."
      description="Your copilot saves you time and effort in optimizing your online profiles to get 2.5X more search appearances to land your dream job. In as little as 10 minutes."
      imageSrc="https://cdn.prod.website-files.com/635c591378332f38be25d45f/63a0db780c9cb4b0543ba7a9_1-p-1080.png"
      imageAlt="LinkedIn profile optimization"
      buttonText="Optimize your LinkedIn Profile for free →"
      buttonHref="#"
      isReversed={true}
    />
    <AdditionalFeatures />
    <FeaturedIn />
    <BlogPosts />
    <SubscriptionForm />
  </div>
  )
}

export default Home
