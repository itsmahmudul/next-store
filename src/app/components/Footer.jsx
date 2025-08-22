"use client";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-blue-50 w-full py-6 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 animate-fadeIn">
                {/* Left: Copyright */}
                <p className="text-gray-600 text-sm">
                    © 2025 NextStore. All rights reserved.
                </p>

                {/* Right: Links */}
                <div className="flex gap-4">
                    <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                        Contact
                    </a>
                </div>
            </div>

            <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
