import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Signup from './pages/Signup';
import QuoteRequest from './pages/QuoteRequest';
import MyQuotes from './pages/MyQuotes';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminQuotes from './pages/admin/AdminQuotes';
import PackingMoving from './pages/services/PackingMoving';
import Shipping from './pages/services/Shipping';
import FreightForwarding from './pages/services/FreightForwarding';
import CustomClearance from './pages/services/CustomClearance';
import RelocationServices from './pages/services/RelocationServices';
import OfficeShifting from './pages/services/OfficeShifting';
import FineArtHandling from './pages/services/FineArtHandling';






function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/quote-request" element={<QuoteRequest />} />
            <Route path="/my-quotes" element={<MyQuotes />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/quotes" element={<AdminQuotes />} />
            <Route path="/services/packing-moving" element={<PackingMoving />} />
            <Route path="/services/shipping" element={<Shipping />} />
            <Route path="/services/freight-forwarding" element={<FreightForwarding />} />
            <Route path="/services/custom-clearance" element={<CustomClearance />} />
            <Route path="/services/relocation" element={<RelocationServices />} />
            <Route path="/services/office-shifting" element={<OfficeShifting />} />
            <Route path="/services/fine-art-handling" element={<FineArtHandling />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;