import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin,
  Calendar,
  Users,
  Package,
  ArrowRight,
  Truck,
  Building,
  Home as HomeIcon,
  Palette,
  MessageSquare,
  Star
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Portfolio = () => {
  const { user } = useAuth();

  const projects = [
    {
      id: 1,
      title: 'Corporate Headquarters Relocation',
      category: 'commercial',
      client: 'TechCorp Solutions',
      location: 'New York to Austin',
      date: '2024',
      duration: '3 weeks',
      team: '12 professionals',
      description: 'Complete relocation of a 500-employee tech company including IT infrastructure, furniture, and sensitive equipment.',
      image: 'https://images.pexels.com/photos/7464121/pexels-photo-7464121.jpeg?auto=compress&cs=tinysrgb&w=600',
      highlights: [
        'Zero downtime migration',
        'IT equipment relocation',
        'Weekend execution',
        'Employee coordination'
      ]
    },
    {
      id: 2,
      title: 'Luxury Penthouse Move',
      category: 'residential',
      client: 'Private Client',
      location: 'Manhattan to Beverly Hills',
      date: '2024',
      duration: '1 week',
      team: '8 specialists',
      description: 'High-end residential move featuring fine art, antiques, and luxury furniture requiring specialized handling.',
      image: 'https://images.pexels.com/photos/7464207/pexels-photo-7464207.jpeg?auto=compress&cs=tinysrgb&w=600',
      highlights: [
        'Fine art crating',
        'Climate-controlled transport',
        'White-glove service',
        'Custom packaging'
      ]
    },
    {
      id: 3,
      title: 'International Art Exhibition',
      category: 'specialty',
      client: 'Metropolitan Museum',
      location: 'New York to London',
      date: '2024',
      duration: '2 weeks',
      team: '6 art specialists',
      description: 'International shipping of priceless artworks for museum exhibition with full customs clearance.',
      image: 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=600',
      highlights: [
        'Museum-quality handling',
        'Customs coordination',
        'Climate monitoring',
        'Security protocols'
      ]
    },
    {
      id: 4,
      title: 'Cross-Country Family Move',
      category: 'residential',
      client: 'Johnson Family',
      location: 'California to Florida',
      date: '2024',
      duration: '5 days',
      team: '6 movers',
      description: 'Full-service family relocation including packing, transportation, and unpacking services.',
      image: 'https://images.pexels.com/photos/7464054/pexels-photo-7464054.jpeg?auto=compress&cs=tinysrgb&w=600',
      highlights: [
        'Full packing service',
        'Pet relocation assistance',
        'Storage solutions',
        'Unpacking service'
      ]
    },
    {
      id: 5,
      title: 'Manufacturing Equipment Relocation',
      category: 'commercial',
      client: 'Industrial Manufacturing Inc.',
      location: 'Detroit to Nashville',
      date: '2023',
      duration: '4 weeks',
      team: '15 specialists',
      description: 'Complex industrial move involving heavy machinery, specialized equipment, and production line relocation.',
      image: 'https://images.pexels.com/photos/4481331/pexels-photo-4481331.jpeg?auto=compress&cs=tinysrgb&w=600',
      highlights: [
        'Heavy machinery transport',
        'Production line setup',
        'Crane operations',
        'Safety compliance'
      ]
    },
    {
      id: 6,
      title: 'International Corporate Expansion',
      category: 'international',
      client: 'Global Enterprises',
      location: 'New York to Tokyo',
      date: '2023',
      duration: '6 weeks',
      team: '20 professionals',
      description: 'International office setup including furniture, equipment, and documentation for new branch office.',
      image: 'https://images.pexels.com/photos/4481942/pexels-photo-4481942.jpeg?auto=compress&cs=tinysrgb&w=600',
      highlights: [
        'International shipping',
        'Customs clearance',
        'Office setup',
        'Documentation handling'
      ]
    }
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              Our Portfolio
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our successful moving projects across residential, commercial, and specialty services. 
              Each project represents our commitment to excellence and customer satisfaction.
            </p>
            
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  to="/quote-request"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 inline-flex items-center backdrop-blur-lg"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Request a Quote
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {project.category}
                    </span>
                    <span className="text-sm text-gray-500">{project.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-green-600 font-medium mb-4">{project.client}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.team}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Project Highlights</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {project.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-sm text-gray-600">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
                    View Full Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4">
              Portfolio by the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our diverse portfolio showcases our expertise across different sectors and project types.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { number: '150+', label: 'Completed Projects' },
              { number: '25+', label: 'Fortune 500 Clients' },
              { number: '50+', label: 'Cities Served' },
              { number: '100%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Be Our Next Success Story?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether it's a residential move, commercial relocation, or specialized transport, 
              we're ready to handle your project with the same care and expertise shown in our portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/quote-request"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 inline-flex items-center justify-center backdrop-blur-lg"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Request a Quote
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 inline-flex items-center justify-center backdrop-blur-lg"
                >
                  Sign In to Request Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              )}
              <Link
                to="/services"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 backdrop-blur-lg transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;