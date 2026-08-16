import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Careers from './pages/Careers';
import Services from './pages/Services';
import HomePage from './pages/HomePage';
import Chatbot from './components/Chatbot';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'Products':
        return <Products view="all" />;
      case 'Moulds':
        return <Products view="moulds" title="Moulds" />;
      case 'Machinery':
        return <Products view="machinery" title="Workshop Machinery" />;
      case 'End Components':
        return <Products view="end-components" title="End Components" />;
      case 'Services':
        return <Services />;
      case 'About Us':
        return <AboutUs />;
      case 'Contact Us':
        return <ContactUs />;
      case 'Careers':
        return <Careers />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer />
      <Chatbot setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
