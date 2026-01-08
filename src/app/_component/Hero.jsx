"use client";
import Image from 'next/image'

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#F5F7FA] to-[#E8F4FD] overflow-hidden h-[80vh] flex items-center">
      {/* Animated Blob Backgrounds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-indigo-400/12 to-cyan-400/12 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="lg:flex lg:items-center lg:justify-between w-full">

        {/* Text Content */}
        <div className="max-w-2xl flex flex-col justify-center items-start text-left lg:flex-1">
          {/* AI Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            AI-Powered
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Create smart forms, {" "}
            <strong className="inline text-primary">gain insights instantly</strong>
          </h1>

          <p className="mt-6 text-lg text-gray-700 sm:text-xl sm:leading-relaxed">
            FormForms lets you create AI-powered forms, gather responses easily, and analyze data in real time for actionable insights.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a 
              className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-xl group" 
              href="/"
            >
              Create AI Form
              <svg className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 hidden lg:block lg:flex-1">
          <div className="transform transition-transform duration-500 hover:scale-105">
            <Image
              className="w-full rounded-xl"
              src="/hero-img.png"
              alt="FormForms dashboard screenshot"
              width={700}
              height={450}
            />
          </div>
        </div>

        </div>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}

export default Hero
