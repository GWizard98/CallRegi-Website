export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDuration: number;
  icon: string;
  popular?: boolean;
}

export interface Booking {
  id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  preferredDate: Date;
  preferredTime: string;
  notes?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentAmount?: number;
  paymentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  PARTIAL = 'partial',
  REFUNDED = 'refunded',
  FAILED = 'failed',
}

export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: {
    text: string;
    link: string;
  };
}
