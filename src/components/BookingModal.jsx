import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Building2, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import BriefWizard from './BriefWizard';

const BookingModal = () => {
    const { isOpen, closeModal, prefilledData } = useBooking();
    const [mode, setMode] = useState('inquiry'); // 'inquiry' | 'wizard'
    const [brief, setBrief] = useState('');

    // Prevent propagation so clicking the modal doesn't close it
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const handleWizardComplete = (generatedBrief) => {
        setBrief(generatedBrief);
        setMode('inquiry');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-aman-charcoal/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        onClick={handleModalClick}
                        className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[800px]"
                    >
                        {/* Mobile Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-50 p-2 bg-white/10 backdrop-blur-sm rounded-full md:hidden text-white"
                        >
                            <X size={20} />
                        </button>

                        {/* Left Side: Visual / Summary OR Wizard */}
                        <div className={`w-full md:w-1/3 bg-aman-charcoal text-white p-8 flex flex-col relative transition-all duration-500 overflow-hidden ${mode === 'wizard' ? 'md:w-1/2 bg-white border-r border-aman-charcoal/10' : ''}`}>

                            {mode === 'inquiry' ? (
                                <>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-serif mb-6 text-aman-gold">Inquire</h3>
                                        <div className="space-y-6">
                                            <div>
                                                <span className="text-[10px] uppercase tracking-widest opacity-50 block mb-1">Destination</span>
                                                <p className="font-serif text-lg">{prefilledData.venueName || "General Inquiry"}</p>
                                            </div>
                                            <div>
                                                <span className="text-[10px] uppercase tracking-widest opacity-50 block mb-1">Experience</span>
                                                <p className="text-sm opacity-80">Bespoke Retreat</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Assistant Call to Action */}
                                    <div className="mt-8 pt-8 border-t border-white/10">
                                        <button
                                            onClick={() => setMode('wizard')}
                                            className="w-full text-left group"
                                        >
                                            <div className="flex items-center gap-2 text-aman-gold mb-2">
                                                <Sparkles size={16} />
                                                <span className="text-xs uppercase tracking-widest font-semibold">Start a Project</span>
                                            </div>
                                            <p className="text-xs opacity-60 leading-relaxed group-hover:opacity-100 transition-opacity">
                                                Not sure where to start? Use our AI assistant to build your perfect retreat brief.
                                            </p>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                // Wizard Mode - Rendered in the "Left" panel but style changed to light
                                <BriefWizard
                                    onComplete={handleWizardComplete}
                                    onCancel={() => setMode('inquiry')}
                                />
                            )}
                        </div>

                        {/* Right Side: Form */}
                        <div className={`w-full md:w-2/3 p-8 md:p-12 relative flex flex-col justify-center overflow-y-auto ${mode === 'wizard' ? 'hidden md:flex md:w-1/2 opacity-50 pointer-events-none grayscale' : ''}`}>
                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 text-aman-charcoal/40 hover:text-aman-charcoal transition-colors hidden md:block"
                            >
                                <X size={24} />
                            </button>

                            <form className="space-y-6 mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-aman-charcoal/60">Name</label>
                                        <input type="text" className="w-full bg-aman-pearl/30 border-b border-aman-charcoal/20 p-2 focus:border-aman-gold outline-none transition-colors" placeholder="Full Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-aman-charcoal/60">Email</label>
                                        <input type="email" className="w-full bg-aman-pearl/30 border-b border-aman-charcoal/20 p-2 focus:border-aman-gold outline-none transition-colors" placeholder="Email Address" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-aman-charcoal/60 flex items-center gap-2">
                                            <Calendar size={12} /> Desired Dates
                                        </label>
                                        <input type="text" className="w-full bg-aman-pearl/30 border-b border-aman-charcoal/20 p-2 focus:border-aman-gold outline-none transition-colors" placeholder="e.g. Oct 2026" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-aman-charcoal/60 flex items-center gap-2">
                                            <Users size={12} /> Group Size
                                        </label>
                                        <select className="w-full bg-aman-pearl/30 border-b border-aman-charcoal/20 p-2 focus:border-aman-gold outline-none transition-colors text-aman-charcoal/80">
                                            <option>10 - 20 Guests</option>
                                            <option>20 - 50 Guests</option>
                                            <option>50+ Guests</option>
                                            <option>Individual / Couple</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-aman-charcoal/60 flex items-center justify-between">
                                        <span>Vision / Requirements</span>
                                        {brief && <span className="text-aman-gold flex items-center gap-1"><Sparkles size={10} /> Brief Generated</span>}
                                    </label>
                                    <textarea
                                        rows="6"
                                        className={`w-full bg-aman-pearl/30 border-b border-aman-charcoal/20 p-2 focus:border-aman-gold outline-none transition-colors resize-none ${brief ? 'text-aman-charcoal font-serif italic bg-aman-gold/5' : ''}`}
                                        placeholder="Tell us about your retreat goals..."
                                        value={brief}
                                        onChange={(e) => setBrief(e.target.value)}
                                    ></textarea>
                                </div>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        alert("Inquiry Sent! We will be in touch shortly.");
                                        closeModal();
                                    }}
                                    className="w-full bg-aman-charcoal text-white py-4 text-xs uppercase tracking-widest hover:bg-aman-gold transition-colors duration-300 mt-4"
                                >
                                    Submit Request
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
