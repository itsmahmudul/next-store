"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const { data: session } = useSession(); // Get logged-in user
    const pathname = usePathname();

    const links = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
    ];

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    NextStore
                </Link>

                {/* Navigation Links */}
                <ul className="flex gap-6 items-center">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`hover:text-blue-500 ${pathname === link.href ? "text-blue-600 font-semibold" : ""
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}

                    {/* Auth Links */}
                    {session ? (
                        <>
                            <li className="text-gray-700 dark:text-gray-300">
                                {session.user?.name}
                            </li>
                            {session.user?.image && (
                                <li>
                                    <img
                                        src={session.user.image}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </li>
                            )}
                            <li>
                                <button
                                    onClick={() => signOut()}
                                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    href="/login"
                                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300"
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
