import HeroCarousel from '@/app/components/hero/HeroCarousel';
import ServicesGrid from '@/app/components/services/ServicesGrid';
import ContactForm from '@/app/components/contact/ContactForm';
import BookingForm from '@/app/components/booking/BookingForm';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      
      <section id="services" className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">Our Services</h2>
          <p className="section-subtitle mx-auto">
            Comprehensive auto repair and maintenance services for all makes and models
          </p>
        </div>
        <ServicesGrid />
      </section>

      <section id="booking" className="section-container bg-brand-gray-light">
        <div className="text-center mb-12">
          <h2 className="section-title">Book Your Appointment</h2>
          <p className="section-subtitle mx-auto">
            Choose your service, select a time, and we'll take care of the rest
          </p>
        </div>
        <BookingForm />
      </section>

      <section id="contact" className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle mx-auto">
            Have questions? Send us a message and we'll get back to you shortly!
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
