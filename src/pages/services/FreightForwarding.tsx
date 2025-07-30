import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  Ship, 
  Truck, 
  Globe, 
  FileText, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Clock,
  MapPin,
  Star
} from 'lucide-react';

const FreightForwarding = () => {
  const transportModes = [
    {
      icon: Plane,
      title: 'Air Freight',
      description: 'Fast international shipping for time-sensitive cargo',
      features: ['Express delivery', 'Global coverage', 'Real-time tracking', 'Temperature control'],
      timeframe: '1-5 days'
    },
    {
      icon: Ship,
      title: 'Ocean Freight',
      description: 'Cost-effective shipping for large volumes and heavy cargo',
      features: ['Container shipping', 'LCL & FCL options', 'Port-to-port service', 'Cargo insurance'],
      timeframe: '15-45 days'
    },
    {
      icon: Truck,
      title: 'Land Transport',
      description: 'Reliable ground transportation across continents',
      features: ['Cross-border transport', 'Door-to-door delivery', 'Overland routes', 'Secure handling'],
      timeframe: '3-14 days'
    }
  ];

  const services = [
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Worldwide shipping partnerships and destination coverage'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Complete handling of shipping documents and paperwork'
    },
    {
      icon: Shield,
      title: 'Cargo Insurance',
      description: 'Comprehensive coverage for your valuable shipments'
    },
    {
      icon: Clock,
      title: 'Time-Definite',
      description: 'Guaranteed delivery schedules for critical shipments'
    }
  ];

  const industries = [
    'Manufacturing & Industrial',
    'Automotive Parts',
    'Electronics & Technology',
    'Fashion & Retail',
    'Healthcare & Pharmaceuticals',
    'Food & Beverages',
    'Oil & Gas',
    'Construction Materials'
  ];

  const testimonials = [
    {
      name: 'Jennifer Liu',
      company: 'Global Manufacturing Corp',
      text: 'Wing Movers freight forwarding has streamlined our international supply chain. Excellent service and competitive rates.',
      rating: 5
    },
    {
      name: 'Roberto Martinez',
      company: 'Import/Export Solutions',
      text: 'Their expertise in customs and documentation has saved us countless hours. Highly professional team.',
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
                <Plane className="h-4 w-4 mr-2" />
                Freight Forwarding Services
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Global Freight Solutions</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Navigate international shipping with confidence. Our comprehensive freight 
                forwarding services cover air, sea, and land transport with expert customs 
                handling and global logistics coordination.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
                >
                  Get Freight Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/portfolio"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center"
                >
                  Track Shipment
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/4481331/pexels-photo-4481331.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Global freight forwarding"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transport Modes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transportation Options</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose the right transport mode for your cargo based on urgency, volume, and destination.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transportModes.map((mode, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <mode.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{mode.title}</h3>
                <div className="text-blue-600 font-semibold mb-4">Transit: {mode.timeframe}</div>
                <p className="text-gray-600 mb-6 leading-relaxed">{mode.description}</p>
                <ul className="space-y-3">
                  {mode.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Freight Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              End-to-end logistics solutions with expert handling at every step of the journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white text-center p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
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

      {/* Industries Served */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Industries We Serve</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Our freight forwarding expertise spans multiple industries, each with unique 
                requirements for handling, documentation, and compliance. We understand the 
                specific needs of your sector and provide tailored solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industries.map((industry, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/4481942/pexels-photo-4481942.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Industries served"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Freight Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Streamlined logistics management from pickup to final delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                01
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quote & Booking</h3>
              <p className="text-sm text-gray-600">Get competitive rates and book your shipment</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                02
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-sm text-gray-600">Complete customs and shipping paperwork</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                03
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transportation</h3>
              <p className="text-sm text-gray-600">Secure transport via air, sea, or land</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                04
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery</h3>
              <p className="text-sm text-gray-600">Final delivery and customs clearance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
            <p className="text-xl text-gray-600">Trusted by businesses worldwide for international shipping</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ship Globally?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let our freight forwarding experts handle your international shipping needs. 
            Get competitive rates and reliable service for your global logistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
            >
              Get Freight Quote
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

export default FreightForwarding;