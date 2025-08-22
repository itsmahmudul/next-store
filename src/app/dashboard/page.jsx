"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="min-h-[calc(100vh-116px)] flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col gap-6">
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

        <h2 className="text-xl font-bold mt-4">Dashboard</h2>

        {/* Navigation Links */}
        {session && (
          <Link
            href="/dashboard/add-product"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
          >
            Add Product
          </Link>
        )}

        <Link
          href="/dashboard/products"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-center"
        >
          Product List
        </Link>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
        <p>Dashboard content goes here...</p>
      </main>
    </div>
  );
};

export default DashboardPage;
