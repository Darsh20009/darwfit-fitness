import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, 3500); // Show for 3.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating Geometric Shapes */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-20 left-20 w-16 h-16 border-2 border-emerald-400/30 rounded-lg"
            />
            
            <motion.div
              animate={{
                rotate: -360,
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-32 right-32 w-12 h-12 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full"
            />

            <motion.div
              animate={{
                rotate: 180,
                x: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-20 left-32 w-20 h-20 border border-emerald-300/20 rotate-45"
            />

            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-32 right-20 w-14 h-14 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full"
            />

            {/* Animated Lines */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-96 h-96 border border-emerald-400/10 rounded-full" />
            </motion.div>

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-80 h-80 border border-emerald-300/5 rounded-full" />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-8">
            {/* Logo/Icon Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-white text-3xl font-bold"
                  >
                    💪
                  </motion.div>
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-2 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-3xl -z-10"
                />
              </div>
            </motion.div>

            {/* Title Animation */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-4"
            >
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent mb-2">
                DARWFIT
              </h1>
            </motion.div>

            {/* Subtitle Animation */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                رحلتك نحو اللياقة المثالية
              </p>
              <p className="text-lg text-gray-400 mt-2">
                Your Journey to Perfect Fitness
              </p>
            </motion.div>

            {/* Loading Animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="flex justify-center items-center space-x-2"
            >
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                    className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                  />
                ))}
              </div>
            </motion.div>

            {/* Inspirational Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-8"
            >
              <p className="text-emerald-300/80 text-sm font-light tracking-wider">
                تحويل الأحلام إلى واقع
              </p>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-emerald-400/20" />
            <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-emerald-400/20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-emerald-400/20" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-emerald-400/20" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}