import React from 'react'
import Image from 'next/image'
import { Instagram, Twitter, Youtube, Send } from 'lucide-react'

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
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.434-2.193 4.731-1.297 1.297-2.873 2.024-4.731 2.193-.677-.677-.677-1.794 0-2.47 1.297-.169 2.454-.642 3.462-1.65 1.008-1.008 1.481-2.165 1.65-3.462.677.677.677 1.793 0 2.47-.169-1.858-.896-3.434-2.193-4.731-1.297-1.297-2.873-2.024-4.731-2.193.677.677.677 1.794 0 2.47z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Testimonials</a></li>
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
              <button className="px-4 py-3 bg-primary hover:bg-primary/90 rounded-r-lg transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer