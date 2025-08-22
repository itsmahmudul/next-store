"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();

    const links = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
    ];

    return (
        <nav className="backdrop-blur-md bg-white/70 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-extrabold text-blue-600 hover:text-blue-500 transition-colors"
                >
                    NextStore
                </Link>

                {/* Navigation Links */}
                <ul className="flex gap-6 items-center">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`relative px-2 py-1 rounded-lg font-medium transition-all hover:bg-blue-100 ${pathname === link.href ? "bg-blue-100 text-blue-600" : "text-gray-700"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}

                    {/* Auth Links */}
                    {session ? (
                        <>
                            {session.user?.image && (
                                <li className="relative group">
                                    {/* Avatar */}
                                    <div className="relative w-10 h-10">
                                        <img
                                            src={session.user.image}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow-md"
                                        />
                                        {/* Blue online circle */}
                                        <span className="absolute bottom-0 right-0 block w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
                                    </div>
                                    {/* Tooltip below avatar */}
                                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap bg-blue-600 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out translate-y-1 group-hover:translate-y-0 shadow-lg">
                                        {session.user.name}
                                    </span>
                                </li>
                            )}
                            <li>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md transition-all"
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
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md transition-all"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 shadow-md transition-all"
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
