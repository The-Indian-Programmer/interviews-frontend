import React from 'react'
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Instagram, Youtube, Facebook } from 'lucide-react'

const Footer = () => {
  const footerLinks = [
    {
      title: 'Important',
      links: ['Free LinkedIn Review', "Who's Hiring", 'Premium Toolkit', 'Interview Guides', 'Job Search Tips', 'ChatGPT Guides', 'Help Center']
    },
    {
      title: 'Resources',
      links: ['Resume Template', 'Community (4K+ Members)', 'Job Search Blog', 'Gift Cards', 'Become an Affiliate']
    },
    {
      title: 'Products',
      links: ['LinkedIn Review', "Who's Hiring", 'Resume Review', 'Job Tracker', 'Resume Builder', 'AI Mock Interview']
    },
    {
      title: 'Company',
      links: ['About', 'Contact', 'Privacy', 'Terms']
    }
  ]

  const socialIcons = [
    { Icon: Linkedin, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Instagram, href: '#' },
    { Icon: Youtube, href: '#' },
    { Icon: Facebook, href: '#' },
  ]

  return (
    <footer className="bg-white text-gray-600 py-12 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <svg className="h-8 w-8 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold text-gray-900">Careerflow</span>
            </div>
            <p className="mb-4">
              Your Career Copilot. AI-assisted tools and resources to get hired at FAANG, top tech, and startup companies 10X faster.
            </p>
            <div className="flex space-x-4 mb-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <a key={index} href={href} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{Icon.name}</span>
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((column, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="font-bold text-gray-500 hover:text-gray-900 text-xs">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
      </div>
    </footer>
  )
}

export default Footer