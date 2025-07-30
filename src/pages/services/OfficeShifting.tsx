import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Clock, 
  Shield, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Monitor,
  Package,
  Star,
  Calendar
} from 'lucide-react';

const OfficeShifting = () => {
  const services = [
    {
      icon: Package,
      title: 'Furniture & Equipment',
      description: 'Professional handling of office furniture, desks, and equipment'
    },
    {
      icon: Monitor,
      title: 'IT Infrastructure',
      description: 'Specialized care for computers, servers, and technology systems'
    },
    {
      icon: Shield,
      title: 'Document Security',
      description: 'Secure handling and transport of confidential business documents'
    },
    {
      icon: Clock,
      title: 'Minimal Downtime',
      description: 'Strategic planning to minimize business disruption and downtime'
    }
  ];

  const officeTypes = [
    {
      title: 'Small Office (1-20 employees)',
      description: 'Efficient moves for startups and small businesses',
      features: ['Same-day completion', 'Basic IT setup', 'Furniture assembly', 'Weekend availability'],
      pricing: 'Starting at $1,500'
    },
    {
      title: 'Medium Office (21-100 employees)',
      description: 'Comprehensive moves for growing businesses',
      features: ['Phased relocation', 'IT coordination', 'Employee support', 'Project management'],
      pricing: 'Starting at $5,000'
    },
    {
      title: 'Large Corporate (100+ employees)',
      description: 'Complex relocations for enterprise organizations',
      features: ['Multi-phase planning', 'Dedicated team', '24/7 support', 'Change management'],
      pricing: 'Custom quote'
    }
  ];

  const specialServices = [
    'Server room relocation',
    'Laboratory equipment moving',
    'Medical equipment transport',
    'Industrial machinery relocation',
    'Warehouse and distribution center moves',
    'Retail store relocations',
    'Government office moves',
    'Educational facility relocations'
  ];

  const process = [
    {
      step: '01',
      title: 'Site Assessment',
      description: 'Detailed evaluation of current and new office spaces'
    },
    {
      step: '02',
      title: 'Strategic Planning',
      description: 'Custom relocation plan with timeline and resource allocation'
    },
    {
      step: '03',
      title: 'Pre-Move Preparation',
      description: 'Packing, labeling, and preparation of all office items'
    },
    {
      step: '04',
      title: 'Execution',
      description: 'Professional moving with minimal business disruption'
    },
    {
      step: '05',
      title: 'Setup & Support',
      description: 'Complete setup and post-move support services'
    }
  ];

  const testimonials = [
    {
      name: 'Mark Stevens',
      company: 'TechStart Solutions',
      text: 'Wing Movers relocated our entire office over the weekend. Monday morning, we were fully operational. Impressive!',
      rating: 5
    },
    {
      name: 'Lisa Park',
      company: 'Financial Advisory Group',
      text: 'Their attention to detail with our sensitive documents and IT equipment was exceptional. Highly professional team.',
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
                <Building className="h-4 w-4 mr-2" />
                Office Shifting Services
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Professional Office Relocation</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Minimize business disruption with our expert office moving services. From small 
                startups to large corporations, we handle every aspect of your office relocation 
                with precision, speed, and minimal downtime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
                >
                  Plan Office Move
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/portfolio"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/7464121/pexels-photo-7464121.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Professional office moving"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Office Moving</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Every aspect of your office move handled with business continuity as our top priority.
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

      {/* Office Types & Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Office Moving Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Tailored moving solutions based on your office size and specific requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeTypes.map((type, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl shadow-lg ${index === 1 ? 'ring-2 ring-orange-500' : ''}`}>
                {index === 1 && (
                  <div className="text-center mb-4">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{type.title}</h3>
                <div className="text-blue-600 font-semibold mb-4">{type.pricing}</div>
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

      {/* Specialized Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Specialized Business Moves</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Beyond standard office furniture, we handle specialized equipment and unique 
                business environments. Our expertise extends to various industries with specific 
                moving requirements and regulatory compliance needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Specialized business moves"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Office Moving Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Systematic approach designed to minimize business disruption and ensure smooth transition.
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

      {/* Timeline Planning */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Strategic Timeline Planning</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We work around your business schedule to minimize disruption. Weekend moves, 
              after-hours relocations, and phased transitions ensure your operations continue smoothly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Weekend Moves</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete your office relocation over the weekend to ensure zero business 
                disruption during regular operating hours.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Phased Relocation</h3>
              <p className="text-gray-600 leading-relaxed">
                Move departments or floors in phases to maintain partial operations 
                throughout the relocation process.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Support</h3>
              <p className="text-gray-600 leading-relaxed">
                24/7 support during your move with immediate response to any issues 
                or unexpected challenges that may arise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Business Success Stories</h2>
            <p className="text-xl text-gray-600">Companies that trusted us with their office relocations</p>
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
          <h2 className="text-4xl font-bold mb-6">Ready to Relocate Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Don't let office relocation disrupt your business operations. Our expert team ensures 
            a smooth transition with minimal downtime and maximum efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
            >
              Plan Your Office Move
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

export default OfficeShifting;