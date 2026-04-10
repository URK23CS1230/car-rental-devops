import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusConfig = {
  Available: { dot: 'bg-green-400 animate-pulse', text: 'text-green-400', bg: 'bg-green-500/15', label: 'Available' },
  Booked:    { dot: 'bg-red-500',                 text: 'text-red-400',   bg: 'bg-red-500/15',   label: 'Booked'    },
  Maintenance:{ dot:'bg-yellow-400',              text: 'text-yellow-400',bg: 'bg-yellow-500/15',label: 'Maintenance'},
};

const CarCard = ({ car, index }) => {
  const s = statusConfig[car.status] || statusConfig['Available'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -10, transition: { duration: 0.25 } }}
      className="glass-card rounded-[2rem] overflow-hidden flex flex-col group relative cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={car.image_url}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop'; }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Status badge */}
        <div className={`absolute top-3 right-3 ${s.bg} backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5`}>
          <span className={`w-2 h-2 rounded-full ${s.dot}`} />
          <span className={s.text}>{s.label}</span>
        </div>

        {/* Type tag */}
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-slate-300 font-medium">
          {car.car_type}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors duration-200">
              {car.brand} {car.model}
            </h3>
            <p className="text-slate-500 text-sm font-medium">{car.year}</p>
          </div>
          <div className="text-right shrink-0 ml-2">
            <p className="text-2xl font-black text-white">${car.price_per_day}</p>
            <p className="text-xs text-slate-500 font-medium">/day</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-6">
          <MapPin size={14} className="text-primary shrink-0" />
          <span>{car.location}</span>
        </div>

        <Link
          to={car.status === 'Available' ? `/booking?carId=${car.id}` : '#'}
          className="mt-auto"
          onClick={e => car.status !== 'Available' && e.preventDefault()}
        >
          <button
            disabled={car.status !== 'Available'}
            className={`w-full py-3.5 rounded-2xl flex justify-center items-center gap-2 font-bold text-sm transition-all duration-300 ${
              car.status === 'Available'
                ? 'bg-white/5 border border-white/10 hover:bg-primary hover:border-primary hover:shadow-[0_0_25px_rgba(29,78,216,0.4)] active:scale-95'
                : 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
            }`}
          >
            {car.status === 'Available' ? (
              <><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /> Reserve Now</>
            ) : car.status === 'Booked' ? (
              <><Shield size={16} /> Currently Booked</>
            ) : (
              <><Zap size={16} /> In Maintenance</>
            )}
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CarCard;
