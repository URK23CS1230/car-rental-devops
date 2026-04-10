import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterBar from '../components/FilterBar';
import CarCard from '../components/CarCard';

const API_BASE = import.meta.env.VITE_API_BASE || '/api/cars';

// Fallback mock data in case API is unreachable
const MOCK_CARS = [
  { id: 1, brand: 'Tesla', model: 'Model S Plaid', year: 2024, price_per_day: 190, car_type: 'Sedan', location: 'New York', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop' },
  { id: 2, brand: 'Porsche', model: '911 Turbo S', year: 2023, price_per_day: 385, car_type: 'Sports', location: 'Los Angeles', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop' },
  { id: 3, brand: 'Mercedes', model: 'G63 AMG', year: 2024, price_per_day: 420, car_type: 'SUV', location: 'Miami', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop' },
  { id: 4, brand: 'Lamborghini', model: 'Urus Performante', year: 2024, price_per_day: 850, car_type: 'SUV', location: 'Miami', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop' },
  { id: 5, brand: 'BMW', model: 'M8 Competition', year: 2023, price_per_day: 300, car_type: 'Sports', location: 'New York', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop' },
  { id: 6, brand: 'Audi', model: 'RS e-tron GT', year: 2023, price_per_day: 240, car_type: 'Sedan', location: 'Los Angeles', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop' },
  { id: 7, brand: 'Ferrari', model: 'Roma Spider', year: 2024, price_per_day: 950, car_type: 'Sports', location: 'Miami', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop' },
  { id: 8, brand: 'Range Rover', model: 'Sport SVR', year: 2023, price_per_day: 310, car_type: 'SUV', location: 'Chicago', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop' },
  { id: 9, brand: 'Rolls-Royce', model: 'Ghost', year: 2023, price_per_day: 1200, car_type: 'Sedan', location: 'New York', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&auto=format&fit=crop' },
  { id: 10, brand: 'McLaren', model: '720S Spider', year: 2023, price_per_day: 780, car_type: 'Sports', location: 'Los Angeles', is_available: false, status: 'Booked', image_url: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&auto=format&fit=crop' },
  { id: 11, brand: 'Bentley', model: 'Continental GT', year: 2024, price_per_day: 680, car_type: 'Sports', location: 'Chicago', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&auto=format&fit=crop' },
  { id: 12, brand: 'Aston Martin', model: 'DBX707', year: 2024, price_per_day: 590, car_type: 'SUV', location: 'Miami', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1562141961-b8a7b2d79b65?w=800&auto=format&fit=crop' },
  { id: 13, brand: 'Maserati', model: 'GranTurismo', year: 2023, price_per_day: 450, car_type: 'Sports', location: 'New York', is_available: false, status: 'Maintenance', image_url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop' },
  { id: 14, brand: 'Porsche', model: 'Cayenne Turbo GT', year: 2024, price_per_day: 290, car_type: 'SUV', location: 'Los Angeles', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop' },
  { id: 15, brand: 'Mercedes', model: 'EQS 580', year: 2024, price_per_day: 230, car_type: 'Sedan', location: 'Chicago', is_available: true, status: 'Available', image_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop' },
];

const Cars = () => {
  const [filters, setFilters] = useState({ location: '', car_type: '', max_price: 1200 });
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch from API or fall back to mock
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (filters.location) params.append('location', filters.location);
        if (filters.car_type) params.append('car_type', filters.car_type);
        if (filters.max_price) params.append('max_price', filters.max_price);

        const response = await fetch(`${API_BASE}/cars?${params.toString()}`);
        if (!response.ok) throw new Error('API not reachable');
        const data = await response.json();
        setAllCars(data);
      } catch {
        // API not available yet — use local mock and apply client-side filtering
        const filtered = MOCK_CARS.filter(c =>
          (!filters.location || c.location === filters.location) &&
          (!filters.car_type || c.car_type === filters.car_type) &&
          (c.price_per_day <= (Number(filters.max_price) || 1200))
        );
        setAllCars(filtered);
        setError('Using local data (API offline)');
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchCars, 300);
    return () => clearTimeout(debounce);
  }, [filters]);

  return (
    <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen pb-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
          Our <span className="text-gradient">Fleet</span>
        </h1>
        <p className="text-slate-400 text-lg">
          {allCars.length} vehicles available — filter to find your perfect match.
        </p>
        {error && <p className="text-xs text-yellow-500/70 mt-2">{error}</p>}
      </motion.div>

      <FilterBar filters={filters} setFilters={setFilters} />

      {isLoading ? (
        <div className="flex justify-center items-center py-28">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {allCars.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {allCars.map((car, idx) => (
                <CarCard key={car.id} car={car} index={idx} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-28 text-center glass-card rounded-[2rem]"
            >
              <p className="text-4xl mb-4">🚗</p>
              <h3 className="text-2xl font-bold mb-2">No matches found</h3>
              <p className="text-slate-500">Try adjusting your filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Cars;
