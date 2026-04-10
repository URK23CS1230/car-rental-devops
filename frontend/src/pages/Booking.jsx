import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Calendar, CreditCard, ArrowLeft } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || '/api/cars';

// Mirrors MOCK_CARS from Cars.jsx so Booking page can always find a car
const MOCK_CARS = [
  { id: 1, brand: 'Tesla', model: 'Model S Plaid', year: 2024, price_per_day: 190, car_type: 'Sedan', location: 'New York', status: 'Available', image_url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop' },
  { id: 2, brand: 'Porsche', model: '911 Turbo S', year: 2023, price_per_day: 385, car_type: 'Sports', location: 'Los Angeles', status: 'Available', image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop' },
  { id: 3, brand: 'Mercedes', model: 'G63 AMG', year: 2024, price_per_day: 420, car_type: 'SUV', location: 'Miami', status: 'Available', image_url: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop' },
  { id: 4, brand: 'Lamborghini', model: 'Urus Performante', year: 2024, price_per_day: 850, car_type: 'SUV', location: 'Miami', status: 'Available', image_url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop' },
  { id: 5, brand: 'BMW', model: 'M8 Competition', year: 2023, price_per_day: 300, car_type: 'Sports', location: 'New York', status: 'Available', image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop' },
  { id: 6, brand: 'Audi', model: 'RS e-tron GT', year: 2023, price_per_day: 240, car_type: 'Sedan', location: 'Los Angeles', status: 'Available', image_url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop' },
  { id: 7, brand: 'Ferrari', model: 'Roma Spider', year: 2024, price_per_day: 950, car_type: 'Sports', location: 'Miami', status: 'Available', image_url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop' },
  { id: 8, brand: 'Range Rover', model: 'Sport SVR', year: 2023, price_per_day: 310, car_type: 'SUV', location: 'Chicago', status: 'Available', image_url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop' },
  { id: 9, brand: 'Rolls-Royce', model: 'Ghost', year: 2023, price_per_day: 1200, car_type: 'Sedan', location: 'New York', status: 'Available', image_url: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&auto=format&fit=crop' },
  { id: 10, brand: 'McLaren', model: '720S Spider', year: 2023, price_per_day: 780, car_type: 'Sports', location: 'Los Angeles', status: 'Booked', image_url: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&auto=format&fit=crop' },
  { id: 11, brand: 'Bentley', model: 'Continental GT', year: 2024, price_per_day: 680, car_type: 'Sports', location: 'Chicago', status: 'Available', image_url: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&auto=format&fit=crop' },
  { id: 12, brand: 'Aston Martin', model: 'DBX707', year: 2024, price_per_day: 590, car_type: 'SUV', location: 'Miami', status: 'Available', image_url: 'https://images.unsplash.com/photo-1562141961-b8a7b2d79b65?w=800&auto=format&fit=crop' },
  { id: 13, brand: 'Maserati', model: 'GranTurismo', year: 2023, price_per_day: 450, car_type: 'Sports', location: 'New York', status: 'Maintenance', image_url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop' },
  { id: 14, brand: 'Porsche', model: 'Cayenne Turbo GT', year: 2024, price_per_day: 290, car_type: 'SUV', location: 'Los Angeles', status: 'Available', image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop' },
  { id: 15, brand: 'Mercedes', model: 'EQS 580', year: 2024, price_per_day: 230, car_type: 'Sedan', location: 'Chicago', status: 'Available', image_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop' },
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const carId = Number(searchParams.get('carId'));

  const [car, setCar] = useState(null);
  const [carLoading, setCarLoading] = useState(true);
  const [bookingState, setBookingState] = useState('filling'); // filling | processing | confirmed
  const [formData, setFormData] = useState({ startDate: '', endDate: '', name: '', email: '', cardNumber: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Calculate total price
  const days = formData.startDate && formData.endDate
    ? Math.max(1, Math.round((new Date(formData.endDate) - new Date(formData.startDate)) / 86400000))
    : 1;
  const total = car ? car.price_per_day * days : 0;

  useEffect(() => {
    if (!carId) { setCarLoading(false); return; }
    const fetchCar = async () => {
      try {
        const res = await fetch(`${API_BASE}/cars/${carId}`);
        if (!res.ok) throw new Error();
        setCar(await res.json());
      } catch {
        setCar(MOCK_CARS.find(c => c.id === carId) || null);
      } finally {
        setCarLoading(false);
      }
    };
    fetchCar();
  }, [carId]);

  const handleBooking = e => {
    e.preventDefault();
    setBookingState('processing');
    setTimeout(() => setBookingState('confirmed'), 2200);
  };

  if (!carId) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-4">
      <p className="text-2xl font-bold">No car selected.</p>
      <button onClick={() => navigate('/cars')} className="text-primary hover:underline flex items-center gap-2"><ArrowLeft size={16} /> Browse Fleet</button>
    </div>
  );

  if (carLoading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/cars')} className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Fleet
        </button>

        {bookingState === 'filling' && car && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* Left: Car Details Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 glass-card rounded-[2rem] overflow-hidden sticky top-28"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={car.image_url}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop'; }}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-black mb-1">{car.brand} {car.model}</h2>
                <p className="text-slate-500 text-sm mb-5">{car.year} · {car.car_type}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <MapPin size={15} className="text-primary shrink-0" />
                    <span>{car.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CreditCard size={15} className="text-primary shrink-0" />
                    <span>${car.price_per_day} / day</span>
                  </div>
                  {formData.startDate && formData.endDate && (
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <Calendar size={15} className="text-primary shrink-0" />
                      <span>{days} day{days !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
                {formData.startDate && formData.endDate && (
                  <div className="mt-6 pt-5 border-t border-slate-800">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Total</span>
                      <span className="text-3xl font-black text-gradient">${total.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Checkout Form */}
            <motion.form
              onSubmit={handleBooking}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 glass-card rounded-[2rem] p-8 md:p-10"
            >
              <h1 className="text-3xl font-black mb-8">Secure Reservation</h1>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Rental Period</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">Pick-up</label>
                      <input type="date" required name="startDate" onChange={handleChange}
                        className="w-full bg-slate-900/80 border border-slate-700 p-3.5 rounded-xl focus:border-primary focus:outline-none transition text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">Return</label>
                      <input type="date" required name="endDate" onChange={handleChange}
                        min={formData.startDate}
                        className="w-full bg-slate-900/80 border border-slate-700 p-3.5 rounded-xl focus:border-primary focus:outline-none transition text-sm" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Personal Details</h3>
                  <div className="space-y-4">
                    <input type="text" required name="name" placeholder="Full Name" onChange={handleChange}
                      className="w-full bg-slate-900/80 border border-slate-700 p-3.5 rounded-xl focus:border-primary focus:outline-none transition text-sm" />
                    <input type="email" required name="email" placeholder="Email Address" onChange={handleChange}
                      className="w-full bg-slate-900/80 border border-slate-700 p-3.5 rounded-xl focus:border-primary focus:outline-none transition text-sm" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Payment</h3>
                  <input type="text" required name="cardNumber" placeholder="0000 0000 0000 0000" onChange={handleChange}
                    className="w-full bg-slate-900/80 border border-slate-700 p-3.5 rounded-xl focus:border-primary focus:outline-none transition font-mono text-sm" />
                </div>

                <button type="submit"
                  className="w-full bg-primary hover:bg-blue-600 font-bold text-base py-4 rounded-2xl transition-all transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(29,78,216,0.5)] active:scale-95 mt-2">
                  Confirm — {total > 0 ? `$${total.toLocaleString()} Total` : 'Reserve Now'}
                </button>
              </div>
            </motion.form>
          </div>
        )}

        {bookingState === 'processing' && (
          <div className="flex flex-col items-center justify-center py-40 glass-card rounded-[2rem]">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
            <h2 className="text-2xl font-bold">Processing Verification…</h2>
            <p className="text-slate-400 mt-2">Contacting Booking Service securely.</p>
          </div>
        )}

        {bookingState === 'confirmed' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 glass-card rounded-[2rem] text-center px-8"
          >
            <CheckCircle className="text-green-400 w-24 h-24 mb-6" />
            <h2 className="text-4xl font-black mb-3">Booking Confirmed!</h2>
            {car && <p className="text-lg text-slate-300 mb-1">{car.brand} {car.model}</p>}
            <p className="text-slate-400 max-w-md mb-10">Your vehicle is secured for {days} day{days !== 1 ? 's' : ''}. A confirmation has been sent to {formData.email}.</p>
            <button onClick={() => navigate('/cars')} className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-full font-bold transition">
              Back to Fleet
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Booking;
