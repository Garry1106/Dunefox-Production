"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, MessageCircle, Phone, ArrowRight, Check, X } from 'lucide-react';
import { Service, services } from '@/constants/services-page';
import { motion } from 'framer-motion'; // Import framer-motion


// Define the colors as constants
const colors = {
  eerieBlack: "#252422",
  flame: "#EB6C33",
};

const ServiceIcon: React.FC<{ serviceId: string; className?: string }> = ({ serviceId, className = '' }) => {
  const iconProps = {
    className: `${className} w-8 h-8`,
    strokeWidth: 1.5,
    color: colors.flame,
  };

  switch (serviceId) {
    case 'whatsapp-bot':
      return <MessageCircle {...iconProps} />;
    case 'web-chatbot':
      return <MessageSquare {...iconProps} />;
    default:
      return null;
  }
};

const ServiceCard: React.FC<{ service: Service; isReversed?: boolean }> = ({ service, isReversed = false }) => {
  const router = useRouter();

  const handleServiceClick = () => {
    router.push(service.route);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={`
        flex flex-col md:flex-row ${isReversed ? 'md:flex-row-reverse' : ''} 
        gap-8 items-start mb-10 p-6 bg-white rounded-xl 
        shadow-md 
        transition-shadow duration-300
      `}
    >
      <motion.div
        transition={{ duration: 0.3 }}
        className="w-full md:w-1/2"
      >
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-lg"
        />
      </motion.div>
      <div className="w-full md:w-1/2 space-y-6">
        <div className="flex items-center gap-3">
          <ServiceIcon serviceId={service.id} />
          <h3 className="text-2xl font-bold" style={{ color: colors.eerieBlack }}>
            {service.title}
          </h3>
        </div>
        <p className="leading-relaxed" style={{ color: '#6B7280' }}>
          {service.description}
        </p>
        <div className="space-y-3">
          <h4 className="font-semibold text-base flex items-center gap-2" style={{ color: colors.eerieBlack }}>
            Key Features
          </h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <motion.li
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }} // Use `index` for delay
                viewport={{ once: true }}
                onClick={handleServiceClick}
                className="flex items-center gap-2 text-gray-700 px-1 rounded-lg hover:bg-gray-50 cursor-pointer group"
              >
                {feature.available ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-500" />
                )}
                <span className="group-hover:text-flame transition-colors" style={{ color: colors.eerieBlack }}>
                  {feature.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={handleServiceClick}
          className="
            inline-flex items-center gap-2 px-6 py-3 
            rounded-lg 
            transition-colors
            bg-[#EB6C33]
            text-[#fff]
            shadow-md hover:shadow-lg hover:bg-[#ed8555]
          "
        >
          Get Started
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

const ServicesHeader: React.FC = () => (
  <motion.header
    initial={{ opacity: 0, y: -20 }} // Initial animation state
    whileInView={{ opacity: 1, y: 0 }} // Animate when in view
    transition={{ duration: 0.5 }} // Animation duration
    viewport={{ once: true }} // Only animate once
    className="flex justify-between items-center mb-6 text-center"
  >
    {/* Title and Description */}
    <div>
      <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
      <p className="text-base text-gray-600 mt-1">We offer a wide range of innovative services designed to empower your business. Explore our solutions and take your company to the next level.</p>
    </div>
  </motion.header>
);

const ProductsPage: React.FC = () => (
  <div className="min-h-screen p-8" style={{ backgroundColor: '#F9FAFB' }}>
    <main className="container mx-auto max-w-6xl">
      <ServicesHeader />
      <div className="space-y-8">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} isReversed={index % 2 !== 0} />
        ))}
      </div>
    </main>
  </div>
);

export default ProductsPage;