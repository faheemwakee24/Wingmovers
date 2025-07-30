import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Users, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Package,
  Truck,
  Star,
  Heart
} from 'lucide-react';

const RelocationServices = () => {
  const services = [
    {
      icon: Package,
      title: 'Full Packing Service',
      description: 'Complete packing of all household items with premium materials'
    },
    {
      icon: Truck,
      title: 'Safe Transportation',
      description: 'Secure transport with GPS tracking and climate control'
    },
    {
      icon: Home,
      title: 'Home Setup',
      description: 'Unpacking and arrangement of belongings in your new home'
    },
    {
      icon: Users,
      title: 'Family Support',
      description: 'Specialized assistance for families with children and pets'
    }
  ];

  const relocationTypes = [
    {
      title: 'Local Relocation',
      description: 'Moving within the same city or metropolitan area',
      features: ['Same-day service available', 'Hourly pricing', 'Local expertise', 'Flexible scheduling'],
      timeframe: '1-2 days'
    },
    {
      title: 'Long-Distance Relocation',
      description: 'Interstate moves and cross-country relocations',
      features: ['Door-to-door service', 'Storage options', 'Transit insurance', 'Dedicated coordinator'],
      timeframe: '3-10 days'
    },
    {
      title: 'International Relocation',
      description: 'Global moves with customs and documentation handling',
      features: ['Customs clearance', 'International shipping', 'Cultural orientation', 'Visa assistance'],
      timeframe: '2-8 weeks'
    }
  ];

  const additionalServices = [
    'Temporary storage solutions',
    'Utility connection assistance',
    'School enrollment support',
    'Pet relocation services',
    'Vehicle shipping',
    'Home cleaning services',
    'Furniture assembly/disassembly',
    'Electronics setup'
  ];

  const process = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'Detailed assessment of your relocation needs and timeline'
    },
    {
      step: '02',
      title: 'Custom Plan',
      description: 'Personalized moving plan with timeline and services'
    },
    {
      step: '03',
      title: 'Pre-Move Services',
      description: 'Packing, documentation, and preparation activities'
    },
    {
      step: '04',
      title: 'Moving Day',
      description: 'Professional execution of your relocation plan'
    },
    {
      step: '05',
      title: 'Settlement Support',
      description: 'Unpacking and assistance settling into your new home'
    }
  ];

  const testimonials = [
    {
      name: 'Jennifer Walsh',
      location: 'Seattle to Miami',
      text: 'Wing Movers made our cross-country move with three kids seamless. Their family-focused approach was exactly what we needed.',
      rating: 5
    },
    {
      name: 'Robert Chen',
      location: 'New York to London',
      text: 'International relocation can be overwhelming, but their team handled everything from customs to school enrollment.',
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
                <Home className="h-4 w-4 mr-2" />
                Relocation Services
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Complete Relocation Solutions</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Moving your family is more than just transporting belongings. Our comprehensive 
                relocation services provide end-to-end support to make your transition smooth, 
                stress-free, and successful from start to finish.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
                >
                  Plan Your Move
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/portfolio"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center"
                >
                  Success Stories
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/7464054/pexels-photo-7464054.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Family relocation services"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Relocation Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Every aspect of your move handled with care and attention to your family's unique needs.
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

      {/* Relocation Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Types of Relocation</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Whether moving across town or across the globe, we have the expertise for your relocation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relocationTypes.map((type, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{type.title}</h3>
                <div className="text-blue-600 font-semibold mb-4">Timeline: {type.timeframe}</div>
                <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>
                <ul className="space-y-3 mb-8">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors block text-center"
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Beyond Moving</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Relocation involves much more than just moving boxes. Our comprehensive services 
                help you and your family settle into your new community quickly and comfortably. 
                We handle the details so you can focus on what matters most.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/7464121/pexels-photo-7464121.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Additional relocation services"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Relocation Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A structured approach that ensures every detail of your relocation is carefully managed.
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

      {/* Family Focus */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-6">
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Family-Centered Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We understand that moving affects the whole family. Our specialized services address 
              the unique needs of children, pets, and elderly family members to ensure everyone 
              feels supported throughout the relocation process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Children & Schools</h3>
              <p className="text-gray-600 leading-relaxed">
                School enrollment assistance, educational records transfer, and child-friendly 
                moving activities to make the transition easier for young family members.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pet Relocation</h3>
              <p className="text-gray-600 leading-relaxed">
                Safe transportation for pets, veterinary record transfers, and assistance 
                with pet registration and licensing in your new location.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Local area orientation, community resource information, and connections 
                to help your family quickly feel at home in your new neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Family Success Stories</h2>
            <p className="text-xl text-gray-600">Real families sharing their relocation experiences</p>
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
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Family's Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let us handle the complexities of relocation while you focus on your family's transition. 
            Our comprehensive services ensure a smooth move for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
            >
              Plan Your Relocation
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

export default RelocationServices;