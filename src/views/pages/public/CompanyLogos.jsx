import React from 'react'

const companies = [
  'Google', 'Meta', 'Netflix', 'Amazon', 'Airbnb', 'Spotify',
  'Tesla', 'Bloomberg', 'Microsoft', 'Adobe'
]

const imageSrc = {
    'Google': 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/6360ca9051f45da1a3d23661_4747493_google_search%20engine_icon.svg',
    'Meta' : 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/6360cb7083fe872e1953be2b_meta_292F34.svg',
    'Netflix' : 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/6360cca526a7351b692f0dd2_netflix_292F34.svg',
    'Amazon' : 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/6360cd1e77b2ce1e018b6a8c_294695_amazon_icon.svg',
    'Airbnb' : 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/6360cdf6d110a11a8a10e45a_airbnb_292F34.svg',
    'Spotify' : 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/6360ce543a9e0ec79680bfea_spotify_%23292F34.svg',
    'Tesla' : 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/6360d16c3a9e0e600580dd1e_image%20(5).png',
    'Bloomberg' : 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/6360d2cb83fe87f6775458ef_image%20(7)-p-500.png',
    'Microsoft' : 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/6360d297d110a13a7c110ba5_image%20(6)-p-500.png',
    'Adobe' : 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/6360d44a82ec26fb3fcd432d_adobe_%23292F34.svg',
}

const CompanyLogos = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Folks who use Careerflow.ai get hired at
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
          {companies.map((company) => (
            <div key={company} className="flex justify-center">
              <img
                src={imageSrc[company]}
                alt={`${company} logo`}
                className="h-8 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyLogos