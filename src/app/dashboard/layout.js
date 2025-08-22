// src/app/dashboard/layout.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useAuth } from '../providers/AuthProvider';
import { useState, useEffect } from 'react';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024); // lg breakpoint
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Close sidebar when navigating on mobile
    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [pathname, isMobile]);

    // Redirect if not authenticated
    if (!loading && !user) {
        router.push('/login');
        return null;
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const navItems = [
        { href: '/dashboard', label: 'Your Profile', icon: '👤' },
        { href: '/dashboard/add-product', label: 'Add Product', icon: '➕' },
    ];

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                        <span className="text-2xl">🍔</span>
                    </button>

                    <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

                    <div className="w-10"></div> {/* Spacer for balance */}
                </div>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 z-40 lg:hidden" // Removed bg color
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 bg-white shadow-lg min-h-screen fixed z-50 lg:z-auto
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                <div className="p-6 h-screen overflow-y-auto">
                    {/* Close button for mobile */}
                    <div className="lg:hidden flex justify-end mb-4">
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                            <span className="text-2xl">✕</span>
                        </button>
                    </div>

                    {/* Home Button */}
                    <Link
                        href="/"
                        className="flex items-center px-4 py-3 mb-6 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                        <span className="mr-3 text-lg">🏠</span>
                        <span className="font-medium">Back to Home</span>
                    </Link>

                    {/* User welcome */}
                    <div className="mb-8">
                        <h1 className="text-xl font-bold text-gray-800">Welcome back!</h1>
                        <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                    </div>

                    {/* Navigation */}
                    <nav>
                        <ul className="space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                }`}
                                            onClick={() => isMobile && setIsSidebarOpen(false)}
                                        >
                                            <span className="mr-3 text-lg">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Logout button */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                            <span className="mr-3">🚪</span>
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className={`
                transition-all duration-300 min-h-screen
                ${isSidebarOpen && isMobile ? 'ml-0' : 'lg:ml-64'}
                p-4 lg:p-6
            `}>
                <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}