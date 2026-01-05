"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { authData } from "../../data/auth";


function AnimatedIcons() {
  const { floatingIcons } = authData;

  // Predefined positions to avoid hydration mismatch
  const positions = [
    { left: 15, top: 20 },
    { left: 70, top: 15 },
    { left: 25, top: 60 },
    { left: 80, top: 45 },
    { left: 45, top: 25 },
    { left: 20, top: 80 },
    { left: 75, top: 70 },
    { left: 55, top: 40 },
  ];

  return (
    <div className="absolute inset-0">
      {floatingIcons.map((iconData, index) => {
        const { Icon, size, color } = iconData;
        const position = positions[index] || positions[0];
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10 - (index % 3) * 5, 0],
              rotate: [0, 5 - (index % 2) * 10, 0],
            }}
            transition={{
              duration: 4 + (index % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <Icon
              size={size}
              style={{ color }}
              className="opacity-20 drop-shadow-lg"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function AuthLayout({ children}) {
  const { branding, features, statusBadge } = authData;
  const {tagline } = branding;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F5F7FA] text-gray-900 overflow-hidden">
      
      <div className="hidden md:flex md:w-1/2 bg-[#4CAF4F]/5 relative overflow-hidden">
       
        <motion.div 
          className="absolute inset-0 bg-linear-to-br from-[#4CAF4F]/10 via-transparent to-gray-100/50"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(76, 175, 79, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(76, 175, 79, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(76, 175, 79, 0.12) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(76, 175, 79, 0.1) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #4CAF4F 1px, transparent 1px),
                             linear-gradient(to bottom, #4CAF4F 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
        <AnimatedIcons />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#4CAF4F] blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 flex flex-col justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/formforms.png"
                alt="FormForms Logo"
                width={200}
                height={48}
                className="h-12 w-auto"
              />
            </div>
            
            <motion.p 
              className="text-2xl mb-8 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {tagline}
            </motion.p>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-lg"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <item.icon className="w-5 h-5 text-[#4CAF4F]" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4CAF4F]/10 border border-[#4CAF4F]/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="w-2 h-2 rounded-full bg-[#4CAF4F] animate-pulse" />
              <span className="text-sm text-gray-600">
                {statusBadge.text}
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 bg-linear-to-r from-transparent via-[#4CAF4F] to-transparent"
              style={{
                left: `${i * 5}%`,
                bottom: (i * 23 + 17) % 100,
                width: `${((i * 31 + 50) % 100) + 50}px`,
              }}
              animate={{
                x: [0, 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: (i % 3) + 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-8 min-h-screen">
        <motion.div 
          className="w-full max-w-sm sm:max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}