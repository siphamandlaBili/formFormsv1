import Image from 'next/image'

function Hero() {
  return (
    <section className="bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="lg:flex lg:items-center lg:gap-12">

        {/* Text Content */}
        <div className="max-w-2xl mx-auto flex flex-col justify-center items-center text-center lg:items-start lg:text-left lg:flex-1">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Create smart forms, {" "}
            <strong className="inline text-primary">gain insights instantly</strong>
          </h1>

          <p className="mt-6 text-lg text-gray-700 sm:text-xl sm:leading-relaxed">
            FormForms lets you create AI-powered forms, gather responses easily, and analyze data in real time for actionable insights.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a 
              className="inline-block rounded border border-primary bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary/90" 
              href="#"
            >
              + Create AI Form
            </a>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 hidden lg:block lg:flex-1">
          <Image
            className="w-full"
            src="/hero-img.png"
            alt="FormForms dashboard screenshot"
            width={700}
            height={450}
          />
        </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
