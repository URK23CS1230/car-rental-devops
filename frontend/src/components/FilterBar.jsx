import React from 'react';
import { motion } from 'framer-motion';

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-4 flex flex-col md:flex-row gap-4 mb-10 items-end justify-between"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs text-slate-400 uppercase tracking-wider font-bold px-1">Location</label>
          <select 
            name="location" 
            onChange={handleChange}
            className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition appearance-none cursor-pointer"
          >
            <option value="">All Locations</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Miami">Miami</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs text-slate-400 uppercase tracking-wider font-bold px-1">Car Type</label>
          <select 
            name="car_type" 
            onChange={handleChange}
            className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition appearance-none cursor-pointer"
          >
            <option value="">All Types</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Sports">Sports</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs text-slate-400 uppercase tracking-wider font-bold px-1">Max Price / Day: ${Number(filters.max_price) >= 1200 ? 'Any' : '$'+filters.max_price}</label>
          <input 
            type="range" 
            name="max_price" 
            min="50" max="1200" step="50" 
            defaultValue="1200"
            onChange={handleChange}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer mt-4 accent-primary"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
