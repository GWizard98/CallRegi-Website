'use client';

import { motion } from 'framer-motion';
import { 
  Droplet, 
  Wrench, 
  Disc, 
  Wind, 
  MoveVertical, 
  Shield, 
  ShieldAlert, 
  Lightbulb, 
  Cog,
  Clock,
  DollarSign
} from 'lucide-react';
import { SERVICES } from '@/app/lib/services';

const iconMap: Record<string, any> = {
  Droplet,
  Wrench,
  CircleStop: Disc,
  Wind,
  MoveVertical,
  Shield,
  ShieldAlert,
  Lightbulb,
  Cog,
};

export default function ServicesGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {SERVICES.map((service) => {
        const IconComponent = iconMap[service.icon];
        
        return (
          <motion.div
            key={service.id}
            variants={cardVariants}
            className="card group relative overflow-hidden"
          >
            {service.popular && (
              <div className="absolute top-4 right-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
            )}

            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-brand-orange/10 rounded-lg group-hover:bg-brand-orange group-hover:scale-110 transition-all duration-300">
                {IconComponent && (
                  <IconComponent className="w-6 h-6 text-brand-orange group-hover:text-white transition-colors duration-300" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-brand-black mb-2 group-hover:text-brand-orange transition-colors duration-300">
                  {service.name}
                </h3>
              </div>
            </div>

            <p className="text-brand-gray-medium mb-4 leading-relaxed">
              {service.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-brand-gray-medium">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{service.estimatedDuration} min</span>
              </div>

              <div className="flex items-center gap-1 text-brand-orange font-bold text-xl">
                <DollarSign className="w-5 h-5" />
                <span>{service.price.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-4 btn-primary text-sm">
              Book This Service
            </button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
