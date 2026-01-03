import React from 'react'
import { Users, Building2, GraduationCap, Heart } from 'lucide-react'

function WhoIsItFor() {
  const userTypes = [
    {
      icon: Users,
      title: "Small Businesses",
      description: "Our form builder provides complete automation of customer feedback, lead generation, and contact forms for growing businesses"
    },
    {
      icon: Building2,
      title: "Enterprise Organizations", 
      description: "Our form management software provides full automation of data collection, employee surveys, and compliance forms"
    },
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      description: "Our platform provides seamless automation of student registrations, course evaluations, and academic surveys"
    },
    {
      icon: Heart,
      title: "Healthcare & Nonprofits",
      description: "Our intelligent forms streamline patient intake, volunteer registration, and donation collection with secure data handling"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Streamline your data collection
            <br />
            in a single platform
          </h2>
          <p className="text-lg text-gray-600">
            Who is FormForms suitable for?
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {userTypes.map((userType, index) => {
            const Icon = userType.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {userType.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {userType.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhoIsItFor