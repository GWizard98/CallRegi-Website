'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Send to Supabase (we'll add this later)
      console.log('Form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brand-black mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-medium" />
            <input
              {...register('name')}
              type="text"
              id="name"
              className="input-field pl-12"
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brand-black mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-medium" />
            <input
              {...register('email')}
              type="email"
              id="email"
              className="input-field pl-12"
              placeholder="john@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brand-black mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-medium" />
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className="input-field pl-12"
              placeholder="(305) 555-0123"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-brand-black mb-2">
            Subject *
          </label>
          <input
            {...register('subject')}
            type="text"
            id="subject"
            className="input-field"
            placeholder="How can we help you?"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-brand-black mb-2">
            Message *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-brand-gray-medium" />
            <textarea
              {...register('message')}
              id="message"
              rows={5}
              className="input-field pl-12 resize-none"
              placeholder="Tell us about your vehicle and what service you need..."
            />
          </div>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
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
            <p>Thank you! We'll get back to you within 24 hours.</p>
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
            <p>Something went wrong. Please try again or call us directly.</p>
          </motion.div>
        )}
      </form>

      {/* Contact Info */}
      <div className="mt-12 p-6 bg-brand-gray-light rounded-xl">
        <h3 className="font-bold text-xl mb-4 text-brand-black">Or Call Us Directly</h3>
        <div className="space-y-3">
          <a href="tel:786-681-2854" className="flex items-center gap-3 text-brand-orange hover:text-brand-orange-dark transition-colors">
            <Phone className="w-5 h-5" />
            <span className="font-semibold text-lg">786-681-2854</span>
          </a>
          <a href="tel:786-823-1162" className="flex items-center gap-3 text-brand-orange hover:text-brand-orange-dark transition-colors">
            <Phone className="w-5 h-5" />
            <span className="font-semibold text-lg">786-823-1162</span>
          </a>
        </div>
      </div>
    </div>
  );
}
