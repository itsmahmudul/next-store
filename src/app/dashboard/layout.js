// src/app/dashboard/layout.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useAuth } from '../providers/AuthProvider';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const { user, loading } = useAuth();
    const router = useRouter();

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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg min-h-screen fixed">
                    <div className="p-6">


                        {/* User welcome */}
                        <div className="mb-8">
                            <h1 className="text-xl font-bold text-gray-800">Welcome back!</h1>
                            <p className="text-sm text-gray-600">{user?.email}</p>
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
                            {/* Home Button */}
                            <Link
                                href="/"
                                className="flex items-center px-4 py-3 mt-4 mb-6 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                            >
                                <span className="mr-3 text-lg">🏠</span>
                                <span className="font-medium">Back to Home</span>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 ml-64 p-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}