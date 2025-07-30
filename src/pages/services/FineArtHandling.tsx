import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Palette, 
  Shield, 
  Thermometer, 
  Eye, 
  CheckCircle, 
  ArrowRight,
  Package,
  Truck,
  Star,
  Award
} from 'lucide-react';

const FineArtHandling = () => {
  const services = [
    {
      icon: Package,
      title: 'Custom Crating',
      description: 'Museum-quality custom crates designed for each piece'
    },
    {
      icon: Thermometer,
      title: 'Climate Control',
      description: 'Temperature and humidity controlled transportation'
    },
    {
      icon: Shield,
      title: 'Full Insurance',
      description: 'Comprehensive coverage for high-value artwork'
    },
    {
      icon: Eye,
      title: 'White-Glove Service',
      description: 'Meticulous handling by trained art specialists'
    }
  ];

  const artworkTypes = [
    {
      title: 'Paintings & Canvas',
      description: 'Oil paintings, watercolors, acrylics, and mixed media',
      features: ['Protective glazing', 'Custom frames', 'Canvas protection', 'Varnish care'],
      image: 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Sculptures & 3D Art',
      description: 'Bronze, marble, ceramic, and contemporary sculptures',
      features: ['Weight distribution', 'Base protection', 'Multi-piece handling', 'Installation support'],
      image: 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Antiques & Collectibles',
      description: 'Historical artifacts, vintage items, and collectibles',
      features: ['Period-appropriate handling', 'Archival materials', 'Documentation', 'Provenance care'],
      image: 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const specialFeatures = [
    'Museum-trained handlers',
    'Climate-controlled vehicles',
    'Custom packaging materials',
    'Real-time monitoring systems',
    'Installation and hanging services',
    'Photography documentation',
    'Conservation consultation',
    'International shipping expertise'
  ];

  const process = [
    {
      step: '01',
      title: 'Assessment',
      description: 'Detailed evaluation of artwork condition and requirements'
    },
    {
      step: '02',
      title: 'Custom Planning',
      description: 'Tailored handling and transportation plan for each piece'
    },
    {
      step: '03',
      title: 'Professional Packing',
      description: 'Museum-quality packing with archival materials'
    },
    {
      step: '04',
      title: 'Secure Transport',
      description: 'Climate-controlled transport with real-time monitoring'
    },
    {
      step: '05',
      title: 'Installation',
      description: 'Professional unpacking and installation services'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Margaret Foster',
      title: 'Museum Curator',
      text: 'Wing Movers handled our traveling exhibition with exceptional care. Their expertise in fine art logistics is unmatched.',
      rating: 5
    },
    {
      name: 'James Wellington',
      title: 'Private Collector',
      text: 'They moved my entire collection including several million-dollar pieces. Professional, careful, and trustworthy.',
      rating: 5
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Palette className="h-4 w-4 mr-2" />
                Fine Art Handling Services
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Museum-Quality Art Handling</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Trust your valuable artwork to specialists who understand the unique requirements 
                of fine art transportation. Our museum-trained team provides white-glove service 
                with climate-controlled transport and comprehensive insurance coverage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
                >
                  Get Art Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/portfolio"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center"
                >
                  View Gallery
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Fine art handling services"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Specialized Art Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Every piece of art is unique and requires specialized handling techniques and materials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artwork Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Artwork We Handle</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From delicate paintings to heavy sculptures, we have expertise across all art forms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artworkTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{type.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>
                  <ul className="space-y-3">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Museum-Standard Care</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Our fine art handling services meet the highest museum standards. We use 
                conservation-grade materials, maintain strict environmental controls, and 
                employ handlers trained in art conservation techniques.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center mb-6">
                  <Award className="h-8 w-8 text-gold-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Certifications & Standards</h3>
                </div>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>International Association of Museum Facility Administrators (IAMFA) certified</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Fine Arts Trade Guild (FATG) member</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>ISO 9001:2015 quality management certified</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Specialized art insurance partnerships</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Art Handling Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Meticulous process designed to protect and preserve your valuable artwork.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full border-t-2 border-dashed border-gray-300 -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance & Security */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Protection</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your artwork is protected by comprehensive insurance coverage and advanced security 
              measures throughout the entire handling and transportation process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Full Value Coverage</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive insurance coverage up to full appraised value with specialized 
                fine art insurance providers.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Monitoring</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time GPS tracking and environmental monitoring throughout transport 
                with immediate alerts for any issues.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Storage</h3>
              <p className="text-gray-600 leading-relaxed">
                Climate-controlled, secure storage facilities with museum-grade security 
                systems and access controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Art Professionals</h2>
            <p className="text-xl text-gray-600">Museums, galleries, and collectors trust us with their most valuable pieces</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Protect Your Valuable Art</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Don't trust your valuable artwork to just anyone. Our museum-trained specialists 
            provide the expertise and care your collection deserves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
            >
              Get Art Handling Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FineArtHandling;