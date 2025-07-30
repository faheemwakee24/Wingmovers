import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  Shield, 
  Truck, 
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, number: '10,000+', label: 'Happy Customers' },
    { icon: Truck, number: '50,000+', label: 'Successful Moves' },
    { icon: Calendar, number: '15+', label: 'Years Experience' },
    { icon: MapPin, number: '50+', label: 'Cities Served' }
  ];

  const values = [
    {
      title: 'Reliability',
      description: 'We keep our promises and deliver on time, every time.'
    },
    {
      title: 'Care',
      description: 'Your belongings are treated with the same care as our own.'
    },
    {
      title: 'Excellence',
      description: 'We strive for perfection in every aspect of our service.'
    },
    {
      title: 'Innovation',
      description: 'Using the latest technology to improve your moving experience.'
    }
  ];

  const milestones = [
    {
      year: '2009',
      title: 'Company Founded',
      description: 'Started as a small local moving company with a vision to revolutionize the moving industry.'
    },
    {
      year: '2012',
      title: 'Expanded Services',
      description: 'Added shipping and freight forwarding services to our portfolio.'
    },
    {
      year: '2015',
      title: 'International Operations',
      description: 'Launched international moving and customs clearance services.'
    },
    {
      year: '2018',
      title: 'Fine Art Division',
      description: 'Established specialized fine art and antique handling division.'
    },
    {
      year: '2021',
      title: 'Technology Integration',
      description: 'Implemented advanced tracking and customer management systems.'
    },
    {
      year: '2024',
      title: 'Industry Leader',
      description: 'Recognized as a leading moving and logistics company nationwide.'
    }
  ];

  const team = [
    {
      name: 'John Mitchell',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'With over 20 years in logistics, John founded Wing Movers with a vision to provide exceptional moving services.'
    },
    {
      name: 'Sarah Williams',
      role: 'Operations Director',
      image: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Sarah oversees all operations ensuring quality service delivery and customer satisfaction.'
    },
    {
      name: 'David Chen',
      role: 'International Services Manager',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'David manages our international operations and customs clearance services with expertise in global logistics.'
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
              <h1 className="text-4xl md:text-6xl font-bold mb-6">About Wing Movers</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                For over 15 years, Wing Movers has been the trusted partner for thousands of 
                families and businesses, providing exceptional moving and logistics services 
                with care, reliability, and professionalism.
              </p>
              <Link
                to="/contact"
                className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/7464121/pexels-photo-7464121.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Wing Movers team"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Wing Movers was born from a simple belief: moving should be stress-free and reliable. 
                Founded in 2009 by John Mitchell, we started as a small local moving company with 
                big dreams and an unwavering commitment to customer satisfaction.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Over the years, we've grown into a full-service logistics company, but our core 
                values remain the same. We treat every customer like family and every move like 
                it's the most important one we've ever handled.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Today, Wing Movers is proud to be one of the most trusted names in the moving 
                industry, serving customers across the nation with the same care and dedication 
                that started it all.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/7464207/pexels-photo-7464207.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our story"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              These core values guide everything we do and shape the way we serve our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From humble beginnings to industry leadership, here's how we've grown over the years.
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{milestone.year}</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Meet the experienced professionals who lead Wing Movers with passion and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-gray-50 p-8 rounded-2xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Wing Movers Difference?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have trusted us with their most important moves. 
            Let us show you why we're the preferred choice for moving and logistics.
          </p>
          <Link
            to="/contact"
            className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center"
          >
            Get Your Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;