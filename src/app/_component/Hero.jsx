"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';

function Hero() {

    return (
        <section className="relative overflow-hidden pt-10 pb-32 lg:pt-32 lg:pb-40">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/20 to-white" />
                <div className="absolute top-1/4 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-lime-400/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 via-teal-400/5 to-green-400/5 rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-bold tracking-tight mb-8"
                    >
                        <span className="block text-gray-900">Smarter Forms,</span>
                        <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                            Brighter Insights
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
                    >
                        Transform data collection with AI-powered forms that analyze responses, 
                        provide real-time insights, and help you make data-driven decisions instantly.
                    </motion.p>


                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <SignInButton mode="modal">
                            <Button className="group px-8 py-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300">
                                Start Building Free
                                <div className="ml-3 p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </Button>
                        </SignInButton>
                        
                        <Button variant="outline" className="px-8 py-6 border-2 border-gray-200 text-gray-700 hover:border-emerald-300 hover:text-emerald-700 text-lg font-semibold rounded-xl group">
                            <Play className="w-5 h-5 mr-2 group-hover:text-emerald-600" />
                            Watch Demo
                        </Button>
                    </motion.div>

                    {/* Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative max-w-6xl mx-auto mt-20"
                    >
                        {/* Floating Elements */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-2xl blur-xl" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-green-400/20 to-lime-400/20 rounded-2xl blur-xl" />
                        
                        {/* Main Dashboard Card */}
                        <div className="relative bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
                            {/* Dashboard Header */}
                            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 bg-red-400 rounded-full" />
                                            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                                            <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                                        </div>
                                        <div className="text-sm font-medium text-emerald-700">analytics.formforms.ai</div>
                                    </div>
                                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-white rounded-lg shadow-sm">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-sm font-medium text-emerald-700">Live Data</span>
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Content */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Chart Section */}
                                    <div className="lg:col-span-2">
                                        <div className="h-64 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">Response Trends</h3>
                                                    <p className="text-sm text-gray-500">Last 30 days • +24% growth</p>
                                                </div>
                                                <div className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
                                                    AI Optimized
                                                </div>
                                            </div>
                                            {/* Chart Bars */}
                                            <div className="h-32 flex items-end space-x-2">
                                                {[40, 60, 80, 90, 75, 95, 100, 85, 70, 60, 75, 85].map((height, i) => (
                                                    <div key={i} className="relative flex-1 group">
                                                        <div
                                                            className="w-full bg-gradient-to-t from-emerald-500 to-green-400 rounded-t-lg transition-all duration-300 group-hover:opacity-90"
                                                            style={{ height: `${height}%` }}
                                                        />
                                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                                                            {height} responses
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Cards */}
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-3xl font-bold text-gray-900">1,248</div>
                                                <div className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                                                    +12.5%
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium text-gray-600">Total Responses</div>
                                            <div className="mt-4 w-full bg-emerald-100 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full w-3/4" />
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-3xl font-bold text-gray-900">94%</div>
                                                <div className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs font-medium">
                                                    Excellent
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium text-gray-600">Completion Rate</div>
                                            <div className="mt-4 w-full bg-teal-100 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full w-[94%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Hero;