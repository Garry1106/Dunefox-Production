'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import WhatsappForm from '@/components/forms/whatsapp';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pricingOptions = [
  {
    id: 1,
    name: 'Assist',
    price: '$29 per/month',
    description: 'Start a free trial',
    features: [
      'Shared inbox',
      'Basic chatbots and automations',
      'AI Compose',
      'Ticketing system',
      'Public help center',
      'Unlimited articles & collections',
    ],
    isPopular: false,
  },
  {
    id: 2,
    name: 'Automate',
    price: '$85 per/month',
    description: 'Start a free trial',
    features: [
      'Shared inbox',
      'Basic chatbots and automations',
      'AI Compose',
      'Ticketing system',
      'Public help center',
      'Unlimited articles & collections',
      'Multiple team inboxes',
      'Workflows for advanced automations',
    ],
    isPopular: true,
  },
  {
    id: 3,
    name: 'Optimize',
    price: '$132 per/month',
    description: 'Start a free trial',
    features: [
      'Shared inbox',
      'Basic chatbots and automations',
      'AI Compose',
      'Ticketing system',
      'Public help center',
      'Unlimited articles & collections',
      'Multiple team inboxes',
      'Workflows for advanced automations',
      'Lite seats (50 included)',
    ],
    isPopular: false,
  },
];

const featuresList = [
  'Shared inbox',
  'Basic chatbots and automations',
  'AI Compose',
  'Ticketing system',
  'Public help center',
  'Unlimited articles & collections',
  'Multiple team inboxes',
  'Workflows for advanced automations',
  'Lite seats',
  'Custom integrations',
  'Dedicated support',
];

const ProductPage = () => {
  const [isProcced, setIsProcced] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handlePricingClick = (id: number) => {
    setSelectedPlan(id);
  };

  return (
    <div className="bg-white text-black p-0 min-h-screen">
      {!isProcced ? (
        <div className='p-8'>
          <header className="flex justify-between items-center mb-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-gray-800 flex items-center gap-2"
              >
                <MessageCircle className='text-[#EB6C33] w-8 h-8' />Whatsapp AI Chatbot
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base text-gray-600 mt-2"
              >
                Get an overview of the latest sales, products, and user activity.
              </motion.p>
            </div>
          </header>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 w-full"
          >
            <h2 className="text-2xl font-bold mb-4">How to Get Started: Tutorial</h2>
            <iframe
              width="100%"
              height="550"
              src="https://www.youtube.com/embed/zAfLcKrbSps"
              title="YouTube video"
              frameBorder="0"
              allowFullScreen
              className="rounded-2xl mx-auto shadow-2xl"
            ></iframe>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="my-8"
          >
            <h2 className="text-3xl font-bold text-center text-black">Choose Your Plan</h2>
            <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
              Select the plan that best fits your business needs. Whether you're just getting started or scaling your operations, we have a solution for you. All plans include powerful features to help you automate, optimize, and grow.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 border-r border-b border-gray-200 text-center text-md font-semibold text-black">Key Features</th>
                    {pricingOptions.map((plan) => (
                      <th
                        key={plan.id}
                        className={`bg-gray-100 border-b border-gray-200 text-center text-sm font-semibold ${selectedPlan === plan.id ? 'text-[#EB6C33]' : 'text-black'
                          } border-r border-r-gray-200`}
                        style={{ width: '25%' }} // Equal width for each column
                      >
                        <div className="flex flex-col items-center h-full">
                          <div className="px-6 py-4 h-full flex flex-col justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-black mb-2">{plan.name}</h3>
                              <p className="text-base text-gray-700 mb-4">{plan.price}</p>
                            </div>
                            <Button
                              className={`mt-1 bg-[#EB6C33] hover:bg-[#EB6C33] hover:opacity-100 text-white text-sm font-semibold py-2 px-6 rounded-lg transition-opacity duration-300 ${selectedPlan === plan.id ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                                }`}
                              onClick={() => handlePricingClick(plan.id)}
                            >
                              Get started
                            </Button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featuresList.map((feature, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b border-r border-gray-200 text-sm text-black">{feature}</td>
                      {pricingOptions.map((plan) => (
                        <td
                          key={plan.id}
                          className={`px-6 py-4 border-b border-gray-200 text-center border-r border-r-gray-200`}
                        >
                          {plan.features.includes(feature) ? (
                            <svg
                              className="w-6 h-6 mx-auto text-[#EB6C33]"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-6 mb-4"
          >
            <h1 className="text-2xl font-bold ">Get Started</h1>
            <h3 className="text-xl font-medium ">Next Step: Business Form</h3>
            <p className="text-sm text-gray-600">Fill out the form to proceed with the next steps in setting up your WhatsApp AI Chatbot.</p>
            <Button
              className="mt-2 bg-[#EB6C33] text-white"
              onClick={() => setIsProcced(true)}
            >
              Click here to Proceed
            </Button>
          </motion.div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <WhatsappForm />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ProductPage;