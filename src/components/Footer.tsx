import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const services = [
    { name: 'Packing & Moving', href: '/services/packing-moving' },
    { name: 'Shipping', href: '/services/shipping' },
    { name: 'Freight Forwarding', href: '/services/freight-forwarding' },
    { name: 'Custom Clearance', href: '/services/custom-clearance' },
    { name: 'Relocation Services', href: '/services/relocation' },
    { name: 'Office Shifting', href: '/services/office-shifting' },
    { name: 'Fine Art Handling', href: '/services/fine-art-handling' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-lg shadow-lg">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  Wing Movers
                </h3>
                <p className="text-sm text-green-300">Your Moving Partner</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Professional moving and logistics services with over 15 years of experience. 
              We handle your belongings with care and deliver excellence in every move.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-green-400 transition-colors p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-green-500/20"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-green-300">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li 
                  key={service.name}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={service.href}
                    className="text-gray-300 hover:text-green-300 transition-colors text-sm block py-1"
                  >
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-green-300">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-green-300 transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-green-300">Contact Us</h3>
            <div className="space-y-3">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <MapPin className="h-5 w-5 text-green-400 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  123 Business District, New York, NY 10001
                </p>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <p className="text-sm text-gray-300">+1 (555) 123-4567</p>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <p className="text-sm text-gray-300">info@wingmovers.com</p>
              </motion.div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-4 p-3 bg-gradient-to-r from-green-600/80 to-green-500/80 backdrop-blur-sm rounded-lg border border-green-400/30"
            >
              <p className="text-sm font-medium text-white">24/7 Emergency Support</p>
              <p className="text-xs text-green-100">We're here when you need us</p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-green-800/50 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 Wing Movers. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
                <motion.a 
                  key={link}
                  href="#" 
                  whileHover={{ y: -2 }}
                  className="text-sm text-gray-400 hover:text-green-300 transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;