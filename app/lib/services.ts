import { Service } from '@/app/types';

export const SERVICES: Service[] = [
  {
    id: 'oil-change',
    name: 'Oil Change',
    description: 'Complete oil change service with filter replacement and multi-point inspection',
    price: 49.99,
    estimatedDuration: 30,
    icon: 'Droplet',
    popular: true,
  },
  {
    id: 'tune-up',
    name: 'Engine Tune-Up',
    description: 'Comprehensive engine tune-up to optimize performance and fuel efficiency',
    price: 149.99,
    estimatedDuration: 90,
    icon: 'Wrench',
    popular: true,
  },
  {
    id: 'brake-service',
    name: 'Brake Service',
    description: 'Complete brake inspection, pad replacement, and rotor resurfacing',
    price: 199.99,
    estimatedDuration: 120,
    icon: 'CircleStop',
  },
  {
    id: 'ac-compressor',
    name: 'AC Compressor',
    description: 'AC system diagnosis, repair, and refrigerant recharge',
    price: 299.99,
    estimatedDuration: 180,
    icon: 'Wind',
  },
  {
    id: 'suspension',
    name: 'Suspension Repair',
    description: 'Suspension system inspection and repair for a smooth ride',
    price: 249.99,
    estimatedDuration: 150,
    icon: 'MoveVertical',
  },
  {
    id: 'abs-repair',
    name: 'ABS System',
    description: 'Anti-lock brake system diagnostics and repair',
    price: 179.99,
    estimatedDuration: 120,
    icon: 'Shield',
  },
  {
    id: 'bumper-replacement',
    name: 'Bumper Replacement',
    description: 'Professional bumper repair and replacement service',
    price: 399.99,
    estimatedDuration: 240,
    icon: 'ShieldAlert',
  },
  {
    id: 'headlight-service',
    name: 'Headlight Service',
    description: 'Headlight restoration, alignment, and replacement',
    price: 89.99,
    estimatedDuration: 60,
    icon: 'Lightbulb',
  },
  {
    id: 'engine-repair',
    name: 'Engine Repair',
    description: 'Complete engine diagnostics and repair services',
    price: 599.99,
    estimatedDuration: 360,
    icon: 'Cog',
    popular: true,
  },
];

export const BUSINESS_INFO = {
  name: 'Call REGI Auto Repair',
  tagline: 'Expert Auto Care You Can Trust',
  phones: {
    primary: '786-681-2854',
    secondary: '786-823-1162',
  },
  email: 'info@regiautorepair.com',
};
