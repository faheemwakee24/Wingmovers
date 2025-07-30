import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package,
  Truck,
  Plane,
  FileText,
  Home as HomeIcon,
  Building,
  Palette,
  ArrowRight,
  Shield,
  Clock,
  Award
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Package,
      title: 'Packing & Moving',
      description: 'Professional packing services with high-quality materials and expert techniques. We handle your belongings with care from start to finish.',
      features: ['Professional packing materials', 'Trained moving crew', 'Fragile item protection', 'Loading & unloading'],
      link: '/services/packing-moving',
      image: 'https://images.pexels.com/photos/7464207/pexels-photo-7464207.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Truck,
      title: 'Shipping Services',
      description: 'Reliable nationwide shipping solutions for both residential and commercial customers with real-time tracking.',
      features: ['Nationwide coverage', 'Real-time tracking', 'Multiple delivery options', 'Secure packaging'],
      link: '/services/shipping',
      image: 'https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Plane,
      title: 'Freight Forwarding',
      description: 'International freight forwarding services by land, sea, and air with customs expertise and global network.',
      features: ['Land, sea & air transport', 'Global network', 'Customs documentation', 'Import/export services'],
      link: '/services/freight-forwarding',
      image: 'https://images.pexels.com/photos/4481331/pexels-photo-4481331.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: FileText,
      title: 'Custom Clearance',
      description: 'Expert customs clearance services with proper documentation and compliance to ensure smooth international shipping.',
      features: ['Documentation handling', 'Customs compliance', 'Duty calculation', 'Regulatory guidance'],
      link: '/services/custom-clearance',
      image: 'https://images.pexels.com/photos/4481942/pexels-photo-4481942.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: HomeIcon,
      title: 'Relocation Services',
      description: 'Complete residential relocation solutions including temporary storage, utility connections, and settling-in assistance.',
      features: ['Full-service relocation', 'Temporary storage', 'Utility coordination', 'Settling assistance'],
      link: '/services/relocation',
      image: 'https://images.pexels.com/photos/7464054/pexels-photo-7464054.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Building,
      title: 'Office Shifting',
      description: 'Business relocation services designed to minimize downtime with careful planning and efficient execution.',
      features: ['Minimal business disruption', 'IT equipment handling', 'Furniture disassembly', 'Weekend moves available'],
      link: '/services/office-shifting',
      image: 'https://images.pexels.com/photos/7464121/pexels-photo-7464121.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Palette,
      title: 'Fine Art Handling',
      description: 'Specialized handling and transportation of valuable artwork, antiques, and delicate items with museum-quality care.',
      features: ['Climate-controlled transport', 'Custom crating', 'Insurance coverage', 'White-glove service'],
      link: '/services/fine-art-handling',
      image: 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'Complete protection with comprehensive insurance coverage'
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'Punctual service with guaranteed delivery schedules'
    },
    {
      icon: Award,
      title: 'Expert Team',
      description: 'Trained professionals with years of experience'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive moving and logistics solutions tailored to meet your specific needs. 
              From residential moves to international freight, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={service.link}
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-2xl shadow-xl w-full h-96 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Wing Movers?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We combine years of experience with modern technology to deliver exceptional service every time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <item.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Every move is unique. Let us create a customized solution that fits your specific requirements and budget.
          </p>
          <Link
            to="/contact"
            className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center"
          >
            Get Custom Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;