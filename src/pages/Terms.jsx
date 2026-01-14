import { motion } from 'framer-motion';

const Terms = () => {
    return (
        <div className="bg-aman-pearl min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-serif text-aman-charcoal mb-12"
                >
                    Terms of Service
                </motion.h1>
                <div className="space-y-8 text-aman-charcoal/70 leading-relaxed font-sans">
                    <p>Last updated: January 2026</p>
                    <p>
                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Inspired Retreats website (the "Service") operated by Inspired Ventures Ltd ("us", "we", or "our"). Inspired Ventures Ltd is registered in England and Wales with company number 08834469.
                    </p>

                    <h3 className="text-xl font-serif text-aman-charcoal mt-8 mb-4">1. Booking Formation</h3>
                    <p>
                        A booking is formed when we issue you a booking confirmation email. The person making the booking (the 'lead name') must be at least 18 years old and guarantees that they have the full authority to accept these terms on behalf of everyone in their party. If the lead name is under 18, a parent or guardian must authorize the booking.
                    </p>

                    <h3 className="text-xl font-serif text-aman-charcoal mt-8 mb-4">2. Financial Protection</h3>
                    <p>
                        We operate in accordance with the Package Travel and Linked Travel Arrangements Regulations 2018. This means that when you book a retreat with us, you are booking a regulated package, and we are responsible for the proper performance of all travel services included in that package.
                    </p>

                    <h3 className="text-xl font-serif text-aman-charcoal mt-8 mb-4">3. Travel Insurance</h3>
                    <p>
                        It is a mandatory condition of booking that you and all members of your party have adequate and valid travel insurance. We strongly advise you to take out a policy immediately upon booking to cover you for cancellation. You may be asked to provide proof of your insurance policy.
                    </p>

                    <h3 className="text-xl font-serif text-aman-charcoal mt-8 mb-4">4. Changes to Your Booking</h3>
                    <p>
                        If you wish to change your booking after our confirmation email has been issued, the lead name must inform us in writing. While we will do our best to assist, we cannot guarantee that we will be able to meet your requested change. An administration charge of £50 per person will apply, in addition to any further costs incurred by us or our suppliers.
                    </p>

                    <h3 className="text-xl font-serif text-aman-charcoal mt-8 mb-4">5. Passenger Information</h3>
                    <p>
                        We may be required to collect specific information such as Passenger Name Records (PNR) or Advanced Passenger Information (APIS) to pass on to governmental authorities for border control and security purposes. Providing this information when requested is a condition of your booking.
                    </p>

                    <h3 className="text-xl font-serif text-aman-charcoal mt-8 mb-4">6. Local Laws and Customs</h3>
                    <p>
                        When traveling with us, you must respect the laws and customs of the countries you visit. We accept no liability for any loss or damage you may suffer as a result of your failure to comply with local laws.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
