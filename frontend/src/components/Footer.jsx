import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-dark py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-bold tracking-tighter mb-4">
            LUXE<span className="text-primary">RIDE</span>
          </div>
          <p className="text-slate-400 max-w-sm">Experience the thrill of dynamic luxury. Providing premium performance vehicle rentals worldwide with instant confirmations and white-glove service.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Navigation</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-primary transition">Home</a></li>
            <li><a href="#" className="hover:text-primary transition">Our Fleet</a></li>
            <li><a href="#" className="hover:text-primary transition">Locations</a></li>
            <li><a href="#" className="hover:text-primary transition">Support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition">Rental Agreement</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} LuxeRide Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
