import React from 'react'

const featuredLogos = [
  { name: 'Business Insider', src: 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/64232893590ed92caeb251dd_businessinsider.svg' },
  { name: 'GeekWire', src: 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/642329f1587a2a5211241f2f_geekwire.svg' },
  { name: 'TEDx', src: 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/64232aeeee240b2cd3bb03b0_tedx.svg' },
  { name: 'Brainz', src: 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/64232a99513e504d45201c6a_brainz.svg' },
]

const FeaturedIn = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          As featured in
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {featuredLogos.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={`${logo.name} logo`}
              className="h-8 max-w-full object-contain grayscale"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedIn