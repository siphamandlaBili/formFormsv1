"use client";
import React from 'react'
import { userTypes } from '@/data/data'

function WhoIsItFor() {
 

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Streamline your data collection
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              in a single platform
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Who is FormForms suitable for?
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {userTypes.map((userType, index) => {
            const Icon = userType.icon
            return (
              <div 
                key={userType.id} 
                className="group text-center p-6 rounded-2xl bg-white hover:bg-white shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-gray-800">
                  {userType.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm transition-colors duration-300 group-hover:text-gray-700">
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