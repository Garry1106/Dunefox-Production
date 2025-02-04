'use client'
import { PhoneIcon } from "lucide-react";
import React from "react";
import Image from 'next/image'; // Import Image from next/image

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10">
      <div className="container mx-auto px-8">
        <header className="flex justify-between items-center mb-6">
          {/* Title and Description */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Support</h1>
            <p className="text-base text-gray-600 mt-2">Your Questions Answered, Your Issues Resolved – Contact Our Support Team</p>
          </div>
        </header>

        {/* Grid Layout for Contact Information and Message Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side */}
          <div>
            <h1 className="text-[#EB6C33] text-3xl font-bold">Contact Us</h1>
            <p className="mt-4 text-gray-600">
              Clarity gives you the blocks & components you need to create a truly professional website.
            </p>

            <div className="mt-6">
              <div>
                <h2 className="text-[#EB6C33] font-semibold">USA OFFICE HOURS</h2>
                <p className="text-gray-500">Monday-Friday</p>
                <p className="text-gray-500">8:00 am to 5:00 pm</p>
              </div>
              <div className="mt-4">
                <h2 className="text-[#EB6C33] font-semibold">CANADA OFFICE HOURS</h2>
                <p className="text-gray-500">8502 Preston Rd. Ingle, Maine 98380, USA</p>
              </div>
              <div className="mt-4">
                <h2 className="text-[#EB6C33] font-semibold">OUR ADDRESS</h2>
                <p className="text-gray-500">8502 Preston Rd. Ingle, Maine 98380, USA</p>
              </div>
              <div className="mt-4">
                <h2 className="text-[#EB6C33] font-semibold">GET IN TOUCH</h2>
                <p className="text-gray-500 flex items-center">
                  <PhoneIcon className="mr-2 text-flame" /> +1-246-888-0653
                </p>
                <p className="text-gray-500 flex items-center">
                  <PhoneIcon className="mr-2 text-flame" /> +1-222-632-0194
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-[#EB6C33] text-2xl font-semibold mb-4">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Your name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-flame focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-flame focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700">Write your message</label>
                <textarea
                  placeholder="Write us your question here..."
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-flame focus:outline-none"
                  rows={4}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#EB6C33] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
