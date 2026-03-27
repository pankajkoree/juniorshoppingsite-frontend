import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-full bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Newsletter Section */}
      <div className="flex justify-center border-b border-gray-200 dark:border-gray-800 py-8">
        <div className="w-[70%]">
          <div className="bg-linear-to-r from-blue-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Stay Updated</h3>
              <p className="text-gray-600 dark:text-gray-400">Subscribe to get special offers and updates on new products</p>
              <div className="flex gap-2 mt-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:border-blue-500 dark:focus:border-blue-400"
                />
                <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="flex justify-center items-center py-12">
        <div className="grid grid-cols-5 w-[70%] gap-8">
          {/* <------- about -------> */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM0 15.326l.918 3.08a1.5 1.5 0 001.946 1.028L10 16.846l7.136 2.588a1.5 1.5 0 001.946-1.028l.918-3.08M0 15.326a6 6 0 0112 0M0 15.326l6 5 6-5"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">ABOUT</h3>
            </div>
            <nav className="flex flex-col gap-3">
              <Link href="/about/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors text-sm">
                → Contact Us
              </Link>
              <Link href="/about/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors text-sm">
                → About Us
              </Link>
              <Link href="/about/papers" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors text-sm">
                → Papers
              </Link>
            </nav>
          </div>

          {/* <------- help -------> */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18.628 5.172A6 6 0 00.172 9.828a6 6 0 008.647 8.147 6 6 0 009.812-3.8l-2.427-.427a4 4 0 01-5.922-3.066h3.094a2 2 0 000-4h-.064a4 4 0 01-7.912-2.05A5.97 5.97 0 0113.456 4.25a2 2 0 10-.628 3.983L11.82 4.347A6.996 6.996 0 0018.628 5.172z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">HELP</h3>
            </div>
            <nav className="flex flex-col gap-3">
              <Link href="/help/payments" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors text-sm">
                → Payments
              </Link>
              <Link href="/help/shipping" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors text-sm">
                → Shipping
              </Link>
              <Link href="/help/cancellationandreturns" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors text-sm">
                → Cancellation & Returns
              </Link>
              <Link href="/help/faq" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors text-sm">
                → FAQ
              </Link>
            </nav>
          </div>

          {/* <------- consumer policy -------> */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">POLICY</h3>
            </div>
            <nav className="flex flex-col gap-3">
              <Link href="/policy/cancellationandreturns" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors text-sm">
                → Cancellation & Returns
              </Link>
              <Link href="/policy/termsofuse" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors text-sm">
                → Terms Of Use
              </Link>
              <Link href="/policy/security" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors text-sm">
                → Security
              </Link>
              <Link href="/policy/privacy" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors text-sm">
                → Privacy
              </Link>
              <Link href="/policy/grievance" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors text-sm">
                → Grievance
              </Link>
            </nav>
          </div>

          {/* <------- mail us -------> */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">MAIL US</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed ml-0">
              Pacific Hostel,<br />Kalinga University,<br />Atal Nagar,<br />Naya Raipur<br />Raipur 492101
            </p>
          </div>

          {/* <------- contact -------> */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.707.707a6.005 6.005 0 006.82 6.82l.707-1.707a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">CONTACT</h3>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Chhattisgarh, India
              </p>
              <Link href="tel:9653050975" className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold text-sm transition-colors">
                <span>📞</span> 9653050975
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="flex justify-center border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="w-[70%] flex justify-center items-center gap-6">
          <p className="text-gray-600 dark:text-gray-400 font-semibold">Follow Us:</p>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center hover:bg-sky-600 dark:hover:bg-sky-600 text-sky-600 dark:text-sky-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75-2.35 7-6 7-10.55A4.5 4.5 0 0023 3z"/></svg>
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center hover:bg-pink-600 dark:hover:bg-pink-600 text-pink-600 dark:text-pink-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16.5 9.5a4 4 0 11-8 0 4 4 0 018 0" fill="white"/><circle cx="17.5" cy="6.5" r="1.5" fill="white"/></svg>
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center hover:bg-red-600 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom / Copyright */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-8">
        <div className="flex justify-center items-center w-full">
          <div className="w-[70%] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              © 2024 Junior Shopping Site. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors text-sm">
                Privacy Policy
              </Link>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors text-sm">
                Terms of Service
              </Link>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors text-sm">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
