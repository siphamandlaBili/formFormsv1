"use client";
import { motion } from 'framer-motion';
import { 
  Brain, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  Globe,
  TrendingUp,
  Lock
} from 'lucide-react';

function Features() {
    const features = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI-Powered Analysis",
            description: "Our AI automatically analyzes responses, detects patterns, and provides actionable insights without manual work.",
            gradient: "from-emerald-500 to-green-600",
            delay: 0.1
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Real-time Analytics",
            description: "Watch responses come in live with interactive dashboards and customizable reporting.",
            gradient: "from-teal-500 to-cyan-600",
            delay: 0.2
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Enterprise Security",
            description: "GDPR & CCPA compliant with end-to-end encryption, SSO, and audit logs for peace of mind.",
            gradient: "from-green-500 to-emerald-600",
            delay: 0.3
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Lightning Fast",
            description: "Build forms in seconds with our drag-and-drop builder. No coding required.",
            gradient: "from-lime-500 to-green-600",
            delay: 0.4
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Team Collaboration",
            description: "Invite team members, set permissions, and work together on forms and analysis.",
            gradient: "from-emerald-500 to-teal-600",
            delay: 0.5
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Scale",
            description: "Serve forms worldwide with our global CDN and multi-language support.",
            gradient: "from-green-500 to-cyan-600",
            delay: 0.6
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-emerald-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-green-600/10 rounded-full mb-6"
                    >
                        <span className="text-sm font-medium bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                            Why Choose FormForms
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                    >
                        Everything you need for{" "}
                        <span className="bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                            smart data collection
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                        From simple surveys to complex enterprise forms, we've got you covered with powerful features.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: feature.delay }}
                            whileHover={{ y: -8 }}
                            className="group relative"
                        >
                            <div className="relative h-full p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                                {/* Background Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity duration-300`} />
                                
                                {/* Icon */}
                                <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="text-white">
                                        {feature.icon}
                                    </div>
                                    <div className="absolute -inset-4 bg-gradient-to-br ${feature.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover Indicator */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 pt-12 border-t border-gray-100"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "10K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
                            { value: "500K+", label: "Forms Created", icon: <TrendingUp className="w-6 h-6" /> },
                            { value: "99.9%", label: "Uptime", icon: <Zap className="w-6 h-6" /> },
                            { value: "24/7", label: "Support", icon: <Shield className="w-6 h-6" /> }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-xl">
                                        <div className="text-emerald-600">
                                            {stat.icon}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-gray-500 mt-2">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Features;