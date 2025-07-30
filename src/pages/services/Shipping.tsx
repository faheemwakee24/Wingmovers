import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Package,
  Zap,
  Star
} from 'lucide-react';

const Shipping = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Nationwide Coverage',
      description: 'Coast-to-coast shipping to all 50 states with reliable delivery'
    },
    {
      icon: Clock,
      title: 'Real-Time Tracking',
      description: 'Monitor your shipment 24/7 with our advanced tracking system'
    },
    {
      icon: Shield,
      title: 'Secure Packaging',
      description: 'Professional packaging to ensure your items arrive safely'
    },
    {
      icon: Zap,
      title: 'Express Options',
      description: 'Rush delivery services for time-sensitive shipments'
    }
  ];

  const shippingOptions = [
    {
      title: 'Standard Ground',
      timeframe: '3-7 business days',
      description: 'Cost-effective shipping for non-urgent deliveries',
      features: ['Tracking included', 'Basic insurance', 'Residential delivery', 'Signature required']
    },
    {
      title: 'Express Shipping',
      timeframe: '1-3 business days',
      description: 'Faster delivery for important shipments',
      features: ['Priority handling', 'Enhanced tracking', 'Insurance included', 'Guaranteed delivery']
    },
    {
      title: 'Overnight Express',
      timeframe: 'Next business day',
      description: 'Urgent delivery when time is critical',
      features: ['Next-day delivery', 'Premium packaging', 'Full insurance', 'Real-time updates']
    }
  ];

  const specialtyServices = [
    'Fragile item handling',
    'White-glove delivery service',
    'Temperature-controlled shipping',
    'Oversized item transport',
    'Multiple package consolidation',
    'Residential and commercial delivery'
  ];

  const testimonials = [
    {
      name: 'David Wilson',
      company: 'Wilson Electronics',
      text: 'Wing Movers shipping service is reliable and cost-effective. They handle our sensitive electronics with care.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      location: 'Phoenix, AZ',
      text: 'Excellent tracking system and customer service. My furniture arrived in perfect condition.',
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
                <Truck className="h-4 w-4 mr-2" />
                Shipping Services
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Reliable Shipping Solutions</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                From single packages to large shipments, our nationwide shipping network 
                ensures your items reach their destination safely and on time. Track every 
                step of the journey with our advanced logistics technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
                >
                  Get Shipping Quote
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
                src="https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Professional shipping services"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Shipping?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Advanced logistics technology combined with personal service for a superior shipping experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shipping Options</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose the shipping speed that fits your timeline and budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl shadow-lg ${index === 1 ? 'ring-2 ring-orange-500' : ''}`}>
                {index === 1 && (
                  <div className="text-center mb-4">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <div className="text-blue-600 font-semibold mb-4">{option.timeframe}</div>
                <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`w-full py-3 rounded-lg font-semibold transition-colors block text-center ${
                    index === 1 
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Specialty Shipping Services</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Beyond standard shipping, we offer specialized services for unique requirements. 
                From fragile artwork to oversized furniture, we have the expertise and equipment 
                to handle your most challenging shipments.
              </p>
              <ul className="space-y-4">
                {specialtyServices.map((service, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/4481331/pexels-photo-4481331.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Specialty shipping services"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Calculate Shipping Cost</h2>
            <p className="text-xl text-gray-600">Get an instant estimate for your shipment</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From ZIP Code</label>
                <input
                  type="text"
                  placeholder="10001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To ZIP Code</label>
                <input
                  type="text"
                  placeholder="90210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
                <input
                  type="number"
                  placeholder="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Speed</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Standard Ground</option>
                  <option>Express Shipping</option>
                  <option>Overnight Express</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Calculate Shipping Cost
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
            <p className="text-xl text-gray-600">Trusted by businesses and individuals nationwide</p>
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
                  <p className="text-sm text-gray-500">{testimonial.company || testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ship with Confidence?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience reliable, tracked shipping with competitive rates. Get your quote today 
            and see why customers choose Wing Movers for their shipping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
            >
              Get Shipping Quote
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

export default Shipping;