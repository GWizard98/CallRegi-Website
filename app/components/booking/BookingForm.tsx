'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Car,
  Wrench,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { SERVICES } from '@/app/lib/services';

const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Please enter a valid email'),
  customerPhone: z.string().min(10, 'Please enter a valid phone number'),
  vehicleMake: z.string().min(2, 'Please enter vehicle make'),
  vehicleModel: z.string().min(2, 'Please enter vehicle model'),
  vehicleYear: z.number().min(1900).max(new Date().getFullYear() + 1),
  preferredDate: z.date({
    required_error: 'Please select a date',
  }),
  preferredTime: z.string().min(1, 'Please select a time'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedService, setSelectedService] = useState<string>('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      vehicleYear: new Date().getFullYear(),
    },
  });

  const watchedServiceId = watch('serviceId');
  const service = SERVICES.find(s => s.id === watchedServiceId);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Send to Supabase (we'll add this later)
      console.log('Booking data:', {
        ...data,
        serviceName: service?.name,
        servicePrice: service?.price,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Service Selection */}
        <div className="card">
          <h3 className="text-xl font-bold text-brand-black mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-brand-orange" />
            Select Service
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((svc) => (
              <label
                key={svc.id}
                className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  watchedServiceId === svc.id
                    ? 'border-brand-orange bg-brand-orange/5'
                    : 'border-gray-200 hover:border-brand-orange/50'
                }`}
              >
                <input
                  {...register('serviceId')}
                  type="radio"
                  value={svc.id}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-brand-black">{svc.name}</span>
                    {svc.popular && (
                      <span className="text-xs bg-brand-orange text-white px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-brand-gray-medium">
                    <span>${svc.price.toFixed(2)}</span>
                    <span>•</span>
                    <span>{svc.estimatedDuration} min</span>
                  </div>
                </div>
                {watchedServiceId === svc.id && (
                  <CheckCircle className="w-5 h-5 text-brand-orange ml-2" />
                )}
              </label>
            ))}
          </div>
          {errors.serviceId && (
            <p className="mt-2 text-sm text-red-600">{errors.serviceId.message}</p>
          )}
        </div>

        {/* Customer Information */}
        <div className="card">
          <h3 className="text-xl font-bold text-brand-black mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-brand-orange" />
            Your Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="customerName" className="block text-sm font-semibold text-brand-black mb-2">
                Full Name *
              </label>
              <input
                {...register('customerName')}
                type="text"
                id="customerName"
                className="input-field"
                placeholder="John Doe"
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="customerEmail" className="block text-sm font-semibold text-brand-black mb-2">
                Email *
              </label>
              <input
                {...register('customerEmail')}
                type="email"
                id="customerEmail"
                className="input-field"
                placeholder="john@example.com"
              />
              {errors.customerEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.customerEmail.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="customerPhone" className="block text-sm font-semibold text-brand-black mb-2">
                Phone *
              </label>
              <input
                {...register('customerPhone')}
                type="tel"
                id="customerPhone"
                className="input-field"
                placeholder="(305) 555-0123"
              />
              {errors.customerPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.customerPhone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="card">
          <h3 className="text-xl font-bold text-brand-black mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-brand-orange" />
            Vehicle Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="vehicleMake" className="block text-sm font-semibold text-brand-black mb-2">
                Make *
              </label>
              <input
                {...register('vehicleMake')}
                type="text"
                id="vehicleMake"
                className="input-field"
                placeholder="Honda"
              />
              {errors.vehicleMake && (
                <p className="mt-1 text-sm text-red-600">{errors.vehicleMake.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="vehicleModel" className="block text-sm font-semibold text-brand-black mb-2">
                Model *
              </label>
              <input
                {...register('vehicleModel')}
                type="text"
                id="vehicleModel"
                className="input-field"
                placeholder="Civic"
              />
              {errors.vehicleModel && (
                <p className="mt-1 text-sm text-red-600">{errors.vehicleModel.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="vehicleYear" className="block text-sm font-semibold text-brand-black mb-2">
                Year *
              </label>
              <input
                {...register('vehicleYear', { valueAsNumber: true })}
                type="number"
                id="vehicleYear"
                className="input-field"
                placeholder="2020"
              />
              {errors.vehicleYear && (
                <p className="mt-1 text-sm text-red-600">{errors.vehicleYear.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Date & Time Selection */}
        <div className="card">
          <h3 className="text-xl font-bold text-brand-black mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-orange" />
            Preferred Date & Time
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-brand-black mb-2">
                Date *
              </label>
              <Controller
                control={control}
                name="preferredDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    className="input-field w-full"
                    placeholderText="Select a date"
                  />
                )}
              />
              {errors.preferredDate && (
                <p className="mt-1 text-sm text-red-600">{errors.preferredDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-sm font-semibold text-brand-black mb-2">
                Time *
              </label>
              <select
                {...register('preferredTime')}
                id="preferredTime"
                className="input-field"
              >
                <option value="">Select a time</option>
                {TIME_SLOTS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.preferredTime && (
                <p className="mt-1 text-sm text-red-600">{errors.preferredTime.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="card">
          <label htmlFor="notes" className="block text-sm font-semibold text-brand-black mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            {...register('notes')}
            id="notes"
            rows={4}
            className="input-field resize-none"
            placeholder="Any specific concerns or requests?"
          />
        </div>

        {/* Price Summary */}
        {service && (
          <div className="card bg-brand-orange/5 border-2 border-brand-orange">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-brand-black">Selected Service</h4>
                <p className="text-brand-gray-medium">{service.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-brand-gray-medium">Estimated Price</p>
                <p className="text-2xl font-bold text-brand-orange">${service.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing Booking...
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5" />
              Book Appointment
            </>
          )}
        </motion.button>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
          >
            <CheckCircle className="w-5 h-5" />
            <div>
              <p className="font-semibold">Booking Confirmed!</p>
              <p className="text-sm">We'll send you a confirmation email shortly. See you soon!</p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
          >
            <AlertCircle className="w-5 h-5" />
            <p>Something went wrong. Please try again or call us at 786-681-2854</p>
          </motion.div>
        )}
      </form>
    </div>
  );
}
