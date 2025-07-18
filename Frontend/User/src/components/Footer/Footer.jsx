import React from "react";

const Footer = () => {
  let year = new Date()
  return (
    <footer className="bg-[#0A0E23] text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 border-b border-gray-700 pb-6">
          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold">Logo</h2>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-blue-400 cursor-pointer">➜ Features</li>
              <li className="hover:text-blue-400 cursor-pointer">➜ Integration</li>
              <li className="hover:text-blue-400 cursor-pointer">➜ Roadmap</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-blue-400 cursor-pointer">➜ About</li>
              <li className="hover:text-blue-400 cursor-pointer">➜ Term of Services</li>
              <li className="hover:text-blue-400 cursor-pointer">➜ Privacy Policy</li>
              <li className="hover:text-blue-400 cursor-pointer">➜ Licensed & Regulation</li>
            </ul>
          </div>

          {/* Stay in Touch */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Stay In Touch</h3>
            <p className="text-gray-400 mb-3">Keep Updated!!</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="p-2 flex-1 bg-[#0F172A] border border-gray-600 rounded-l-md text-white"
              />
              <button className="bg-blue-500 px-4 py-2 rounded-r-md">Submit</button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-gray-400 text-sm">
          <p>© {year.getFullYear()} All Rights Reserved.</p>
          <div className="flex space-x-4">
            <p className="hover:text-blue-400 cursor-pointer">Term of Service</p>
            <p className="hover:text-blue-400 cursor-pointer">Policy Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
