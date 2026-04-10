import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';

const FEATURED = [
  { id: 2,  brand: 'Porsche',       model: '911 Turbo S',      year: 2023, price_per_day: 385,  car_type: 'Sports', location: 'Los Angeles', is_available: true,  status: 'Available', image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop' },
  { id: 7,  brand: 'Ferrari',       model: 'Roma Spider',      year: 2024, price_per_day: 950,  car_type: 'Sports', location: 'Miami',       is_available: true,  status: 'Available', image_url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop' },
  { id: 9,  brand: 'Rolls-Royce',   model: 'Ghost',            year: 2023, price_per_day: 1200, car_type: 'Sedan',  location: 'New York',    is_available: true,  status: 'Available', image_url: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&auto=format&fit=crop' },
];

const stats = [
  { icon: Star,   value: '4.9★',   label: 'Customer Rating' },
  { icon: Shield, value: '100%',   label: 'Insured Fleet'   },
  { icon: Clock,  value: '24/7',   label: 'Support'         },
];

const Home = () => (
  <div className="pt-20">

    {/* ── Hero ──────────────────────────────────────────────────── */}
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Ambient blobs */}
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 14, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/25 rounded-full blur-[120px] pointer-events-none" />
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 20, repeat: Infinity, delay: 6 }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-700/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-dark pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1,  y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-5xl px-6 mt-16"
      >
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 backdrop-blur-md text-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-slate-300">15 premium vehicles available now</span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tighter">
          Drive the <span className="text-gradient">Future</span><br />of Luxury
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto font-light leading-relaxed">
          Instant booking. White-glove service. An uncompromised fleet of the world's finest automobiles.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/cars">
            <button className="bg-primary hover:bg-blue-600 text-lg px-10 py-5 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-primary/30 group">
              Explore Fleet <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link to="/auth">
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-lg px-10 py-5 rounded-full font-bold transition-all">
              Sign In
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center gap-6 md:gap-16 px-6"
      >
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Icon size={15} className="text-primary" />
              <span className="text-xl font-black">{value}</span>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{label}</p>
          </div>
        ))}
      </motion.div>
    </section>

    {/* ── Featured Fleet ────────────────────────────────────────── */}
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Hand-Picked</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-5">Editor's Picks</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">The vehicles our concierge team personally recommends this season.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
        {FEATURED.map((car, idx) => <CarCard key={car.id} car={car} index={idx} />)}
      </div>

      <div className="text-center">
        <Link to="/cars">
          <button className="border border-white/10 hover:border-primary hover:bg-primary/10 px-8 py-4 rounded-full font-bold transition-all">
            View Full Fleet →
          </button>
        </Link>
      </div>
    </section>
  </div>
);

export default Home;
