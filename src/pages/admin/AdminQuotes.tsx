import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Calendar, 
  MapPin, 
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  User,
  Shield,
  DollarSign,
  Timer
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

interface QuoteRequest {
  id: string;
  user_id: string;
  service_type: string;
  pickup_location: string;
  delivery_location: string;
  preferred_date: string;
  description: string;
  status: 'pending' | 'quoted' | 'accepted' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

interface QuoteMessage {
  id: string;
  quote_request_id: string;
  sender_id: string;
  message: string;
  is_admin: boolean;
  price: number | null;
  estimated_time: string | null;
  created_at: string;
}

const AdminQuotes = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [messages, setMessages] = useState<QuoteMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [quotePrice, setQuotePrice] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/admin/login');
      return;
    }
    // Mock quotes data since we're using local auth
    const mockQuotes = [
      {
        id: '1',
        user_id: 'user1',
        service_type: 'Packing & Moving',
        pickup_location: 'New York, NY',
        delivery_location: 'Los Angeles, CA',
        preferred_date: '2024-02-15',
        description: 'Need help moving a 2-bedroom apartment with fragile items',
        status: 'pending' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        user_id: 'user2',
        service_type: 'Office Shifting',
        pickup_location: 'Chicago, IL',
        delivery_location: 'Miami, FL',
        preferred_date: '2024-02-20',
        description: 'Corporate office relocation for 50 employees',
        status: 'quoted' as const,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    setQuotes(mockQuotes);
    setLoading(false);
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    if (selectedQuote) {
      // Mock messages for the selected quote
      const mockMessages = [
        {
          id: '1',
          quote_request_id: selectedQuote.id,
          sender_id: 'admin',
          message: 'Thank you for your quote request. We can provide this service for $2,500 with an estimated completion time of 3-4 days.',
          is_admin: true,
          price: 2500,
          estimated_time: '3-4 days',
          created_at: new Date().toISOString()
        }
      ];
      setMessages(selectedQuote.id === '2' ? mockMessages : []);
    }
  }, [selectedQuote]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedQuote || !user) return;

    setSendingMessage(true);
    
    // Mock sending message
    setTimeout(() => {
      const newMsg = {
        id: Date.now().toString(),
        quote_request_id: selectedQuote.id,
        sender_id: 'admin',
        message: newMessage.trim(),
        is_admin: true,
        price: quotePrice ? parseFloat(quotePrice) : null,
        estimated_time: estimatedTime || null,
        created_at: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, newMsg]);
      
      // Update quote status if price was provided
      if (quotePrice) {
        setQuotes(prev => prev.map(q => 
          q.id === selectedQuote.id ? { ...q, status: 'quoted' as const } : q
        ));
        setSelectedQuote({ ...selectedQuote, status: 'quoted' as const });
      }
      
      setNewMessage('');
      setQuotePrice('');
      setEstimatedTime('');
      setShowQuoteForm(false);
      setSendingMessage(false);
    }, 1000);
  };

  const updateQuoteStatus = (status: string) => {
    if (!selectedQuote) return;
    
    const updatedQuote = { ...selectedQuote, status: status as any };
    setQuotes(prev => prev.map(q => q.id === selectedQuote.id ? updatedQuote : q));
    setSelectedQuote(updatedQuote);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'quoted':
        return 'text-blue-600 bg-blue-100';
      case 'accepted':
        return 'text-green-600 bg-green-100';
      case 'completed':
        return 'text-purple-600 bg-purple-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'quoted':
        return <MessageSquare className="h-4 w-4" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (!user || !isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Quote Requests Management
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage and respond to customer quote requests
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quote Requests List */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">All Requests ({quotes.length})</h2>
              
              {quotes.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No quote requests yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <motion.div
                      key={quote.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedQuote(quote)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedQuote?.id === quote.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                          {getStatusIcon(quote.status)}
                          <span className="ml-1">{quote.status.toUpperCase()}</span>
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(quote.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{quote.service_type}</h3>
                      <p className="text-sm text-gray-600 truncate">
                        {quote.pickup_location} → {quote.delivery_location}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            {selectedQuote ? (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg h-[700px] flex flex-col">
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedQuote.service_type}</h2>
                      <p className="text-sm text-gray-600">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        {selectedQuote.pickup_location} → {selectedQuote.delivery_location}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedQuote.status)}`}>
                      {getStatusIcon(selectedQuote.status)}
                      <span className="ml-1">{selectedQuote.status.toUpperCase()}</span>
                    </span>
                  </div>
                  
                  {/* Status Update Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {selectedQuote.status !== 'quoted' && (
                      <button
                        onClick={() => setShowQuoteForm(!showQuoteForm)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Send Quote
                      </button>
                    )}
                    {selectedQuote.status === 'quoted' && (
                      <button
                        onClick={() => updateQuoteStatus('accepted')}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        Mark Accepted
                      </button>
                    )}
                    {selectedQuote.status === 'accepted' && (
                      <button
                        onClick={() => updateQuoteStatus('completed')}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                      >
                        Mark Completed
                      </button>
                    )}
                    <button
                      onClick={() => updateQuoteStatus('cancelled')}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                  
                  {selectedQuote.preferred_date && (
                    <p className="text-sm text-gray-600 mt-2">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Preferred Date: {new Date(selectedQuote.preferred_date).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {/* Initial Request */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-900 mb-1">Customer</p>
                        <p className="text-gray-700">{selectedQuote.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(selectedQuote.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  {messages.map((message) => (
                    <div key={message.id} className={`flex items-start space-x-3 ${message.is_admin ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.is_admin ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          {message.is_admin ? (
                            <Shield className="h-4 w-4 text-blue-600" />
                          ) : (
                            <User className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className={`rounded-lg p-4 ${
                          message.is_admin ? 'bg-blue-50' : 'bg-gray-50'
                        }`}>
                          <p className={`text-sm font-medium mb-1 ${
                            message.is_admin ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {message.is_admin ? 'You (Admin)' : 'Customer'}
                          </p>
                          <p className="text-gray-700">{message.message}</p>
                          {message.price && (
                            <div className="mt-2 p-2 bg-white rounded border">
                              <p className="text-sm font-medium text-gray-900">Quote Details:</p>
                              <p className="text-lg font-bold text-green-600">${message.price}</p>
                              {message.estimated_time && (
                                <p className="text-sm text-gray-600">Estimated Time: {message.estimated_time}</p>
                              )}
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(message.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200">
                  {showQuoteForm && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-3">Send Quote</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <DollarSign className="h-4 w-4 inline mr-1" />
                            Price
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={quotePrice}
                            onChange={(e) => setQuotePrice(e.target.value)}
                            placeholder="0.00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Timer className="h-4 w-4 inline mr-1" />
                            Estimated Time
                          </label>
                          <input
                            type="text"
                            value={estimatedTime}
                            onChange={(e) => setEstimatedTime(e.target.value)}
                            placeholder="e.g., 2-3 days"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={sendMessage} className="flex space-x-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={sendingMessage}
                    />
                    <button
                      type="submit"
                      disabled={sendingMessage || !newMessage.trim()}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                      {sendingMessage ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg h-[700px] flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Quote Request</h3>
                  <p className="text-gray-600">Choose a quote request from the list to manage it</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuotes;