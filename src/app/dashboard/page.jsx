"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden absolute top-4 left-4 z-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-700 text-2xl focus:outline-none"
        >
          {sidebarOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 flex flex-col gap-6 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        {/* User Profile */}
        {session && (
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <img
                src={session.user?.image}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
              />
              <span className="absolute bottom-0 right-0 block w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <p className="font-medium text-gray-700">{session.user?.name}</p>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-blue-600 hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        <h2 className="text-xl text-gray-800 font-bold mt-4">Dashboard</h2>

        {/* Navigation Links */}
        {session && (
          <Link
            href="/dashboard/add-product"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
          >
            Add Product
          </Link>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 ml-0 md:ml-64 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to your Dashboard</h1>
        <p className="text-gray-800">Dashboard content goes here...</p>
      </main>
    </div>
  );
};

export default DashboardPage;
