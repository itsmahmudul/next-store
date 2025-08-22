// src/app/LayoutWrapper.js
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {/* Show Navbar only on NON-dashboard pages */}
      {!isDashboard && <Navbar />}
      
      <main className="min-h-[calc(100vh-116px)] bg-white">
        {children}
      </main>
      
      {/* Show Footer only on NON-dashboard pages */}
      {!isDashboard && <Footer />}
    </>
  );
}