import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Shield, 
  Clock, 
  Globe, 
  CheckCircle, 
  ArrowRight,
  Calculator,
  Users,
  Star,
  AlertCircle
} from 'lucide-react';

const CustomClearance = () => {
  const services = [
    {
      icon: FileText,
      title: 'Documentation Handling',
      description: 'Complete preparation and processing of all customs paperwork'
    },
    {
      icon: Calculator,
      title: 'Duty Calculation',
      description: 'Accurate assessment of duties, taxes, and fees'
    },
    {
      icon: Shield,
      title: 'Compliance Assurance',
      description: 'Ensuring all shipments meet regulatory requirements'
    },
    {
      icon: Clock,
      title: 'Fast Processing',
      description: 'Expedited clearance to minimize delays'
    }
  ];

  const documents = [
    'Commercial Invoice',
    'Packing List',
    'Bill of Lading/Airway Bill',
    'Certificate of Origin',
    'Import/Export Licenses',
    'Insurance Documents',
    'Inspection Certificates',
    'Customs Declaration Forms'
  ];

  const benefits = [
    {
      title: 'Reduced Delays',
      description: 'Expert handling prevents common clearance issues and delays'
    },
    {
      title: 'Cost Savings',
      description: 'Accurate duty calculations and classification save money'
    },
    {
      title: 'Compliance Peace of Mind',
      description: 'Stay compliant with ever-changing international regulations'
    },
    {
      title: 'Expert Guidance',
      description: 'Professional advice on complex customs procedures'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Document Review',
      description: 'Thorough review of all shipping documentation for accuracy and completeness'
    },
    {
      step: '02',
      title: 'Classification & Valuation',
      description: 'Proper classification of goods and accurate valuation for duty calculation'
    },
    {
      step: '03',
      title: 'Customs Filing',
      description: 'Electronic filing of customs declarations and required documentation'
    },
    {
      step: '04',
      title: 'Clearance & Release',
      description: 'Coordination with customs authorities for inspection and release'
    }
  ];

  const testimonials = [
    {
      name: 'Thomas Anderson',
      company: 'Global Import Solutions',
      text: 'Wing Movers customs team has streamlined our import process. Their expertise has saved us time and money.',
      rating: 5
    },
    {
      name: 'Sarah Kim',
      company: 'International Trading Co.',
      text: 'Professional service with attention to detail. They handle all our customs clearance needs efficiently.',
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
                <FileText className="h-4 w-4 mr-2" />
                Custom Clearance Services
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Expert Customs Clearance</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Navigate complex customs procedures with confidence. Our experienced customs 
                brokers handle all documentation, compliance, and clearance processes to ensure 
                your international shipments move smoothly through customs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
                >
                  Get Clearance Quote
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
                src="https://images.pexels.com/photos/4481942/pexels-photo-4481942.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Custom clearance services"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Customs Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From documentation to final clearance, we handle every aspect of the customs process.
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

      {/* Documentation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Required Documentation</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Proper documentation is crucial for smooth customs clearance. Our team ensures 
                all required documents are complete, accurate, and submitted in the correct format 
                to prevent delays and additional costs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((document, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{document}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-6 w-6 text-orange-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Important Notice</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Customs regulations change frequently. Our team stays updated on the latest 
                  requirements to ensure your shipments remain compliant.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Tariff classifications updated regularly</li>
                  <li>• Trade agreement changes monitored</li>
                  <li>• Regulatory updates implemented immediately</li>
                  <li>• Client notifications for relevant changes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Customs Service?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Professional customs brokerage that saves time, money, and eliminates compliance risks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Clearance Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Systematic approach to ensure efficient and compliant customs clearance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full border-t-2 border-dashed border-gray-300 -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Competitive rates with no hidden fees</p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Standard Clearance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Import Clearance</span>
                    <span className="font-semibold">$150 - $300</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Export Clearance</span>
                    <span className="font-semibold">$100 - $200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Document Preparation</span>
                    <span className="font-semibold">$75 - $150</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Services</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duty Drawback</span>
                    <span className="font-semibold">Custom Quote</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Compliance Consulting</span>
                    <span className="font-semibold">$200/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expedited Service</span>
                    <span className="font-semibold">+50% surcharge</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Get Custom Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-600">Trusted by importers and exporters worldwide</p>
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
          <h2 className="text-4xl font-bold mb-6">Simplify Your Customs Process</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let our customs experts handle the complexities while you focus on your business. 
            Get professional clearance services with guaranteed compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
            >
              Get Clearance Quote
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

export default CustomClearance;