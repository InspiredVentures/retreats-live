import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const BriefWizard = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        goal: '',
        vibe: '',
        budget: '',
        pax: '',
        locationProp: ''
    });

    // Patterns for the "AI" Generator
    const steps = [
        {
            id: 1,
            question: "What is the primary goal of this retreat?",
            options: [
                { label: "Deep Focus & Strategy", value: "Strategic Planning", desc: "For leadership teams to build the future." },
                { label: "Wellness & Reset", value: "Wellness", desc: "Restorative practices to recharge the group." },
                { label: "Team Bonding", value: "Team Bonding", desc: "Shared experiences to strengthen connection." },
                { label: "Celebration", value: "Celebration", desc: "Rewarding success in a luxurious setting." }
            ]
        },
        {
            id: 2,
            question: "What kind of energy are you envisioning?",
            options: [
                { label: "High Energy & Adventure", value: "High Energy", desc: "Active days, excursions, and movement." },
                { label: "Zen & Minimalist", value: "Zen", desc: "Quiet luxury, stillness, and space to breathe." },
                { label: "Rough Luxury", value: "Rustic", desc: "Close to nature, raw elements, untamed beauty." },
                { label: "Classic Opulence", value: "Luxury", desc: "White glove service, fine dining, total comfort." }
            ]
        },
        {
            id: 3,
            question: "What is your budget range (per person)?",
            options: [
                { label: "$3k - $5k", value: "Standard", desc: "Premium comfort." },
                { label: "$5k - $8k", value: "Luxury", desc: "Exceptional venues." },
                { label: "$8k - $12k+", value: "Ultra-Luxe", desc: "The finest experiences globally." },
                { label: "Undecided", value: "Flexible", desc: "Focus on the experience first." }
            ]
        }
    ];

    const handleSelect = (key, value) => {
        setSelections({ ...selections, [key]: value });
        if (step < steps.length) {
            setStep(step + 1);
        } else {
            // Final Step - Generate Brief
            generateBrief({ ...selections, [key]: value });
        }
    };

    const generateBrief = (finalSelections) => {
        const brief = `I am looking to organize a ${finalSelections.goal} retreat with a focus on ${finalSelections.vibe} energy.\n\nBudget Preference: ${finalSelections.budget}\n\nOur goal is to create an environment where specific outcomes can be achieved through this ${finalSelections.vibe} atmosphere. We are looking for Inspired Retreats to curate a venue that aligns with this vision.`;

        onComplete(brief);
    };

    const currentStepData = steps.find(s => s.id === step);

    return (
        <div className="h-full flex flex-col justify-between p-2 md:p-6">
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                    <Sparkles size={16} className="text-aman-gold" />
                    <span className="text-xs uppercase tracking-widest text-aman-gold">
                        AI Brief Assistant • Step {step}/{steps.length}
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-serif text-aman-charcoal">{currentStepData.question}</h3>

                        <div className="grid grid-cols-1 gap-4">
                            {currentStepData.options.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleSelect(steps[step - 1].id === 1 ? 'goal' : steps[step - 1].id === 2 ? 'vibe' : 'budget', opt.value)}
                                    className="text-left p-4 border border-aman-charcoal/20 hover:border-aman-gold hover:bg-aman-pearl/30 transition-all group group-hover:shadow-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-serif text-lg text-aman-charcoal">{opt.label}</span>
                                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-aman-gold" />
                                    </div>
                                    <p className="text-xs text-aman-charcoal/60 mt-1">{opt.desc}</p>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-between border-t border-aman-charcoal/10 pt-4">
                {step > 1 ? (
                    <button onClick={() => setStep(step - 1)} className="text-xs uppercase tracking-widest text-aman-charcoal/60 hover:text-aman-charcoal flex items-center gap-2">
                        <ArrowLeft size={12} /> Back
                    </button>
                ) : (
                    <button onClick={onCancel} className="text-xs uppercase tracking-widest text-aman-charcoal/60 hover:text-aman-charcoal">
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default BriefWizard;
