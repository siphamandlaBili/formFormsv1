"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

function CTA() {
    const benefits = [
        "No credit card required",
        "14-day free trial",
        "Cancel anytime",
        "All premium features included"
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white to-emerald-50/50" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
            
            {/* Animated Elements */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-gradient-to-tr from-green-400/10 to-lime-400/10 rounded-full blur-3xl" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-teal-500/5 border border-emerald-100 backdrop-blur-sm"
                >
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
                    
                    {/* Content */}
                    <div className="relative px-8 py-12 lg:px-16 lg:py-16">
                        <div className="text-center">
                            {/* Badge */}
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-green-600/10 rounded-full mb-8">
                                <Sparkles className="w-4 h-4 text-emerald-600 mr-2" />
                                <span className="text-sm font-medium bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                                    Limited Time Offer
                                </span>
                            </div>

                            {/* Heading */}
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Ready to transform your{" "}
                                <span className="bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                                    data collection?
                                </span>
                            </h2>

                            {/* Description */}
                            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Join thousands of teams using FormForms to make better decisions faster. 
                                Start your free trial today and experience the power of AI-powered forms.
                            </p>

                            {/* Benefits */}
                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
                                    >
                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <SignInButton mode="modal">
                                <Button className="group px-10 py-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300">
                                    <div className="mr-4 p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    Start Your Free Trial
                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </SignInButton>

                            {/* Footnote */}
                            <p className="mt-6 text-sm text-gray-500">
                                Get started in minutes • No setup required • Expert support included
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default CTA;