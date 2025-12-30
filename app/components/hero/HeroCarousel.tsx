'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { CarouselSlide } from '@/app/types';

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: 'Expert Oil Changes',
    subtitle: 'Keep Your Engine Running Smooth',
    description: 'Professional oil change service with multi-point inspection included',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920',
    cta: { text: 'Book Now', link: '#booking' },
  },
  {
    id: 2,
    title: 'Brake & Suspension Specialists',
    subtitle: 'Safety First, Always',
    description: 'Complete brake system service and suspension repair by certified technicians',
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=1920',
    cta: { text: 'Schedule Service', link: '#booking' },
  },
  {
    id: 3,
    title: 'Engine Repair & Diagnostics',
    subtitle: 'Advanced Technology Meets Expert Care',
    description: 'State-of-the-art diagnostics and comprehensive engine repair services',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920',
    cta: { text: 'Get Quote', link: '#contact' },
  },
  {
    id: 4,
    title: 'AC & Electrical Services',
    subtitle: 'Stay Cool & Powered',
    description: 'Complete AC system service and electrical diagnostics and repair',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920',
    cta: { text: 'Learn More', link: '#services' },
  },
  {
    id: 5,
    title: 'Call Today!',
    subtitle: 'Your Trusted Auto Repair Partner',
    description: 'Same-day service available • Free estimates • Quality guaranteed',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920',
    cta: { text: 'Contact Us', link: '#contact' },
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      if (newDirection > 0) {
        return (prev + 1) % slides.length;
      } else {
        return prev === 0 ? slides.length - 1 : prev - 1;
      }
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-brand-black">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 to-brand-black/40 z-10" />

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          />

          <div className="relative z-20 h-full flex items-center">
            <div className="section-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-3xl"
              >
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-brand-orange text-lg md:text-xl font-semibold mb-4 tracking-wide"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-5xl md:text-7xl font-bold text-white mb-6 font-display leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <a
                    href={slides[currentSlide].cta.link}
                    className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
                  >
                    {slides[currentSlide].cta.text}
                  </a>

                  <a
                    href="tel:786-681-2854"
                    className="btn-outline bg-white/10 backdrop-blur-sm hover:bg-brand-orange border-white text-white inline-flex items-center justify-center gap-2 text-lg"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-brand-orange p-3 rounded-full transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-brand-orange p-3 rounded-full transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-brand-orange'
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
