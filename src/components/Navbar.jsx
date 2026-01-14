import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useBooking } from '../context/BookingContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { openModal } = useBooking(); // Use Global Context
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // If not Home, force "scrolled" style (solid bg, dark text) OR transparent with dark text?
    // Let's stick to the requested "background colour is too similar" -> probably invalidates white text.
    // We will use dark text on non-home pages when not scrolled, and transparent bg if at top.

    const isTransparent = isHome && !isScrolled;

    const navClasses = `fixed w-full z-50 transition-all duration-500 ${!isTransparent ? 'bg-aman-pearl/95 backdrop-blur-sm py-4 shadow-sm' : 'bg-transparent py-8'}`;

    // Text Color: White ONLY if Home AND Not Scrolled. Else Charcoal.
    const textColorClass = isTransparent ? 'text-white' : 'text-aman-charcoal';

    const linkClasses = `text-sm uppercase tracking-widest hover:text-aman-gold transition-colors duration-300 cursor-pointer ${textColorClass}`;

    return (
        <>
            <nav className={navClasses}>
                <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="group flex-shrink-1 min-w-0">
                        <div className={`transition-colors duration-500 ${textColorClass}`}>
                            <Logo isScrolled={!isTransparent} className="w-48 md:w-auto h-auto max-w-full" />
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/about" className={linkClasses}>About</Link>
                        <Link to="/destinations" className={linkClasses}>Venues</Link>
                        <Link to="/retreats" className={linkClasses}>Retreats</Link>
                        <button onClick={() => openModal({ venueName: 'General Inquiry' })} className={linkClasses}>Start a Project</button>
                        <Link to="/journal" className={linkClasses}>Journal</Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden z-50 relative flex-shrink-0 p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <div className={`${isMobileMenuOpen ? 'text-aman-charcoal' : textColorClass} transition-colors duration-300`}>
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </div>
                    </button>
                </div>

                {/* Mobile Side Menu (Drawer) */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                            />

                            {/* Drawer */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-[#FDFCF8] shadow-2xl z-[60] flex flex-col pt-28 px-8 space-y-8 md:hidden border-l border-aman-stone/30"
                            >
                                <div className="absolute top-6 right-6">
                                    <button onClick={() => setIsMobileMenuOpen(false)}>
                                        <X size={28} className="text-aman-charcoal" />
                                    </button>
                                </div>

                                <div className="flex flex-col space-y-6 items-start">
                                    <Link to="/about" className="text-xl font-serif text-aman-charcoal uppercase tracking-widest hover:text-aman-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                                    <Link to="/destinations" className="text-xl font-serif text-aman-charcoal uppercase tracking-widest hover:text-aman-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Venues</Link>
                                    <Link to="/retreats" className="text-xl font-serif text-aman-charcoal uppercase tracking-widest hover:text-aman-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Retreats</Link>
                                    <Link to="/journal" className="text-xl font-serif text-aman-charcoal uppercase tracking-widest hover:text-aman-gold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Journal</Link>

                                    <div className="w-full h-px bg-aman-charcoal/10 my-4"></div>

                                    <button onClick={() => { openModal({ venueName: 'General Inquiry' }); setIsMobileMenuOpen(false); }} className="text-lg font-sans text-aman-charcoal hover:text-aman-gold text-left">Start a Project</button>
                                    <button
                                        onClick={() => { setIsMobileMenuOpen(false); openModal({ venueName: 'General Inquiry' }); }}
                                        className="w-full mt-4 border border-aman-charcoal py-4 text-xs uppercase tracking-widest hover:bg-aman-charcoal hover:text-white transition-all text-center"
                                    >
                                        Enquire Now
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
