import Image from 'next/image'
import InstagramIcon from '../../components/icons/InstagramIcon'
import XIcon from '../../components/icons/XIcon'
import CustomIcon from '../../components/icons/CustomIcon'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Left Section - Logo and Copyright */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image 
                src="/formforms.png" 
                alt="FormForms Logo" 
                width={150} 
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            
            <div className="text-gray-300 text-sm mb-6">
              <p className="mb-2">Copyright © 2026 FormForms.</p>
              <p>All rights reserved</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="/" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="/" className="text-gray-400 hover:text-white transition-colors">
                <CustomIcon />
              </a>
              <a href="/" className="text-gray-400 hover:text-white transition-colors">
                <XIcon />
              </a>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">About us</a></li>
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Contact us</a></li>
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay up to date</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-gray-700 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer