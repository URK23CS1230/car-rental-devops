import React from 'react';
import { motion } from 'framer-motion';
import { Users, Car, CalendarCheck } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Manage fleet, users, and platform analytics.</p>
        </div>
        <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-bold text-sm transition hidden sm:block">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-[2rem] flex items-center gap-6">
           <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
             <CalendarCheck size={32} />
           </div>
           <div>
             <p className="text-slate-400 font-bold mb-1">Active Bookings</p>
             <h3 className="text-4xl font-black">142</h3>
           </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-[2rem] flex items-center gap-6">
           <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
             <Car size={32} />
           </div>
           <div>
             <p className="text-slate-400 font-bold mb-1">Total Fleet</p>
             <h3 className="text-4xl font-black">86</h3>
           </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 rounded-[2rem] flex items-center gap-6">
           <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400">
             <Users size={32} />
           </div>
           <div>
             <p className="text-slate-400 font-bold mb-1">Registered Users</p>
             <h3 className="text-4xl font-black">2,401</h3>
           </div>
        </motion.div>
      </div>

      <div className="glass-card rounded-[2rem] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-bold">Recent Fleet Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5 text-slate-400 text-sm tracking-wider uppercase">
                <th className="p-5 font-bold">Vehicle</th>
                <th className="p-5 font-bold">Status</th>
                <th className="p-5 font-bold">Current User</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { vel: 'Porsche 911 Turbo S', status: 'Booked', user: 'j.smith@email.com' },
                { vel: 'Tesla Model S Plaid', status: 'Available', user: '-' },
                { vel: 'Lamborghini Urus', status: 'Maintenance', user: '-' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-5 font-bold">{row.vel}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.status === 'Available' ? 'bg-green-500/20 text-green-400' : row.status === 'Maintenance' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-5 text-slate-400">{row.user}</td>
                  <td className="p-5 text-right">
                    <button className="text-primary hover:text-white transition font-bold text-sm">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
