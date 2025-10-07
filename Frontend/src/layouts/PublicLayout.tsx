import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PublicLayoutProps {
  children: React.ReactNode;
  hideHeaderAndFooter?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, hideHeaderAndFooter = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut" // Changed from array to string
      }
    }
  };

  const menuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut" // Changed from array to string
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {!hideHeaderAndFooter && (
        <>
          {/* Top Contact Header (Static) */}
          <div
            className="bg-gray-900 text-gray-400 text-xs py-2 px-4 sm:px-6 lg:px-8 flex justify-center items-center flex-wrap gap-x-6 gap-y-1"
          >
            <span className="flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-gray-500" />
              B-11, MIDC, Chhtrapati Sambhajinagar, (MH) 431010
            </span>
            <span className="flex items-center">
              <Phone className="w-3 h-3 mr-1 text-gray-500" />
              9226408832
            </span>
            <span className="flex items-center">
              <Mail className="w-3 h-3 mr-1 text-gray-500" />
              hr@nexintelai.com
            </span>
          </div>

          {/* Navbar */}
          <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
              scrolled
                ? 'bg-gray-800/95 backdrop-blur-md shadow-2xl border-b border-gray-700/50'
                : 'bg-gray-800 shadow-lg border-b border-gray-700'
            }`}
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/" className="flex items-center group">
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center mr-3 shadow-lg group-hover:shadow-gray-600/50 transition-all duration-300"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Shield className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.h1 
                      className="text-white text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.02 }}
                    >
                      Nexintel AI
                    </motion.h1>
                  </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <motion.div 
                  className="hidden md:flex items-center space-x-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { to: "/", label: "Home" },
                    { to: "/services", label: "Services" },
                    { to: "/pricing", label: "Pricing" },
                    { to: "/about-us", label: "About Us" }
                  ].map((link, index) => (
                    <motion.div key={link.to} variants={itemVariants}>
                      <Link 
                        to={link.to} 
                        className="relative text-gray-200 hover:text-white font-medium transition-all duration-300 group"
                      >
                        <span className="relative z-10">{link.label}</span>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                        />
                        <motion.div 
                          className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-500 group-hover:w-full transition-all duration-300"
                        />
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div variants={itemVariants}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to="/login" 
                        className="relative bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group"
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10">Login</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button
                  className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Mobile Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    className="md:hidden border-t border-gray-700 bg-gray-800/95 backdrop-blur-md"
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.div 
                      className="py-4 space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {[
                        { to: "/", label: "Home" },
                        { to: "/services", label: "Services" },
                        { to: "/pricing", label: "Pricing" },
                        { to: "/about-us", label: "About Us" }
                      ].map((link) => (
                        <motion.div key={link.to} variants={linkVariants}>
                          <Link 
                            to={link.to} 
                            className="block text-gray-200 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-200"
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      ))}
                      <motion.div variants={linkVariants} className="px-4">
                        <Link 
                          to="/login" 
                          className="block bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold py-2.5 px-6 rounded-lg text-center transition-all duration-300 hover:from-gray-600 hover:to-gray-500"
                        >
                          Login
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>

          {/* Spacer for fixed navbar */}
          <div className="h-20"></div>
        </>
      )}

      <main className="flex-1 h-full overflow-hidden">{children}</main>

      {!hideHeaderAndFooter && (
        <>
          {/* Footer */}
          <motion.footer 
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 border-t border-gray-700 relative overflow-hidden"
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Company Info */}
                <motion.div 
                  className="flex flex-col items-center md:items-start"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="flex items-center mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center mr-3 shadow-lg"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Shield className="w-6 h-6 text-white" />
                    </motion.div>
                    <span className="text-xl font-bold text-white">Nexintel AI</span>
                  </motion.div>
                  
                  <p className="text-sm font-medium text-center md:text-left mb-4">
                    &copy; {new Date().getFullYear()} Nexintel AI. All rights reserved.
                  </p>
                  
                  <motion.div 
                    className="flex items-center space-x-4 text-xs text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Secure
                    </span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                      Professional
                    </span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                      Compliant
                    </span>
                  </motion.div>
                </motion.div>

                {/* Quick Links */}
                <motion.div 
                  className="flex flex-col items-center md:items-start"
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-bold text-white mb-6 relative">
                    Quick Links
                    <motion.div 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </h3>
                  <motion.ul 
                    className="space-y-3"
                    variants={containerVariants}
                  >
                    {[
                      { to: "/", label: "Home" },
                      { to: "/services", label: "Services" },
                      { to: "/pricing", label: "Pricing" },
                      { to: "/about-us", label: "About Us" },
                      { to: "/terms", label: "Terms & Conditions" }
                    ].map((link) => (
                      <motion.li key={link.to} variants={itemVariants}>
                        <Link 
                          to={link.to} 
                          className="text-sm text-gray-400 hover:text-white transition-all duration-300 relative group inline-block"
                        >
                          <span className="relative z-10">{link.label}</span>
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 rounded opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                            whileHover={{ scale: 1.05 }}
                          />
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>

                {/* Contact Info */}
                <motion.div 
                  className="flex flex-col items-center md:items-start"
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-bold text-white mb-6 relative">
                    Contact Us
                    <motion.div 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    />
                  </h3>
                  <motion.div 
                    className="space-y-4 text-sm text-gray-400"
                    variants={containerVariants}
                  >
                    <motion.div 
                      className="flex items-start group cursor-pointer"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-500 group-hover:text-gray-300 transition-colors" />
                      <span className="group-hover:text-gray-300 transition-colors">
                        B-11, near Railway Station Road, MIDC, Chhtrapati Sambhajinagar, (MH) 431010
                      </span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center group cursor-pointer"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <Phone className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                      <span className="group-hover:text-gray-300 transition-colors">9226408832</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center group cursor-pointer"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <Mail className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                      <span className="group-hover:text-gray-300 transition-colors">hr@nexintelai.com</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Bottom border */}
              <motion.div 
                className="mt-12 pt-8 border-t border-gray-700 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.p 
                  className="text-sm text-gray-500"
                  whileHover={{ scale: 1.02 }}
                >
                  Transforming legal document analysis with cutting-edge AI technology
                </motion.p>
              </motion.div>
            </div>

            {/* Floating elements */}
            <motion.div 
              className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full opacity-5 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.footer>
        </>
      )}
    </div>
  );
};

export default PublicLayout;