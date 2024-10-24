import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'

const blogPosts = [
  {
    title: '10 TIPS TO NAIL YOUR NEXT INTERVIEW',
    image: 'https://cdn.prod.website-files.com/635c591478332fd4db25d46e/644cc3d3a7eb5c0786878c90_chatgpt%20PM%20interview.jpg',
    rating: 5,
    description: '10 Tips To Nail Your Job Interview',
  },
  {
    title: 'CHATGPT FOR CAREER NETWORKING',
    image: 'https://cdn.prod.website-files.com/635c591478332fd4db25d46e/644cc3d3a7eb5c0786878c90_chatgpt%20PM%20interview.jpg',
    rating: 5,
    description: 'ChatGPT For Career Networking',
  },
  {
    title: 'DO YOU NEED A COVER LETTER IN 2022',
    image: 'https://cdn.prod.website-files.com/635c591478332fd4db25d46e/66e71baa7cfb2ef43adefdc3_10%20Tips%20To%20Nail%20Your%20Next%20Interview.png',
    rating: 4,
    description: 'Do You Need a Cover Letter in 2022?',
  },
  {
    title: 'GOOGLE BEHAVIORAL INTERVIEW GUIDE 2023',
    image: 'https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6714a5ecfdea83edad37e41a_ChatGPT%20For%20Career%20Networking.png',
    rating: 5,
    description: 'Google Behavioral Interview Guide 2023 (Questions, STAR Format)',
  },
  {
    title: 'HOW CAN YOU USE CHATGPT TO CRACK THE PM INTERVIEW',
    image: 'https://cdn.prod.website-files.com/635c591478332fd4db25d46e/63ca520e959ad1aeb4ea07e7_google%20behavioral%20interview.jpg',
    rating: 5,
    description: 'How To Use ChatGPT To Crack Product Manager Interview',
  },
  {
    title: 'CRAFTING AN EFFECTIVE TRANSITIONING FROM MILITARY RESUME',
    image: 'https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6468dbe6fdeb4a9f1e2897b4_military%20to%20corporate%20career.png',
    rating: 5,
    description: 'How To Write Military & Law Enforcement to Corporate Resume',
  },
]

const BlogPosts = () => {
  return (
    <section className="bg-navy-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          De-stress your job search with Careerflow.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="bg-navy-800 text-white">
              <CardHeader>
                <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-t-lg" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                <div className="flex mb-2">
                  {[...Array(post.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-300">{post.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-navy-900">
                  Read Story
                
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPosts