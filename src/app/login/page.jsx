"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);

    // Google login handler
    const handleGoogleLogin = () => {
        setLoading(true);
        toast.success("Redirecting to Google...");

        // NextAuth will handle redirect automatically
        signIn("google", { callbackUrl: "/products" });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-white">
            {/* Toast container */}
            <Toaster position="top-center" reverseOrder={false} />

            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center">
                <h1 className="text-3xl text-gray-800 font-bold mb-6">Login to NextStore</h1>

                {/* Google login button */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
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
                    {loading ? "Redirecting..." : "Sign in with Google"}
                </button>

                <p className="mt-6 text-gray-500 text-sm text-center">
                    By logging in, you agree to our{" "}
                    <span className="text-blue-600 hover:underline cursor-pointer">
                        Terms & Conditions
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
