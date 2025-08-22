"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const result = await signIn("google", {
      redirect: false, // handle redirect manually
    });

    if (result?.ok) {
      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/products");
      }, 1000); // short delay to show toast
    } else {
      toast.error("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-3xl text-black font-bold mb-6">Login to NextStore</h1>

      {/* Google login button */}
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
        disabled={loading}
      >
        {/* Loading spinner */}
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        )}
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
};

export default LoginPage;
