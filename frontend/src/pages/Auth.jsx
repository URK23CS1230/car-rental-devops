import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen pt-32 px-6 pb-20 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card max-w-md w-full p-8 md:p-10 rounded-[2rem] relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-slate-400">Unlock your premium driving experience.</p>
        </div>

        <form className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Username</label>
              <input type="text" required placeholder="LuxuryDriver" className="w-full bg-slate-900/80 border border-slate-700 p-4 rounded-xl focus:border-primary focus:outline-none transition" />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-2">Email Address</label>
            <input type="email" required placeholder="driver@luxeride.com" className="w-full bg-slate-900/80 border border-slate-700 p-4 rounded-xl focus:border-primary focus:outline-none transition" />
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-400 mb-2">Password</label>
             <input type="password" required placeholder="••••••••" className="w-full bg-slate-900/80 border border-slate-700 p-4 rounded-xl focus:border-primary focus:outline-none transition" />
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-blue-600 font-bold text-lg py-4 rounded-full transition-transform transform hover:scale-[1.02] shadow-xl shadow-primary/20">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-800 pt-6">
          <p className="text-slate-400 flex justify-center gap-2">
            {isLogin ? "Don't have an account?" : "Already a member?"} 
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-bold transition">
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
