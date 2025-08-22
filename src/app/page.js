"use client";
import Link from "next/link";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div>
      {/* Hero Section with Swiper */}
      <Hero />

      {/* Existing sections */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Welcome to NextStore</h1>
        <p className="text-gray-600">
          Your one-stop product showcase built with Next.js!
        </p>
      </section>

      <section className="px-4 py-8 max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Product Highlights</h2>
        <p className="text-gray-600">Check out our amazing products below.</p>
      </section>
    </div>
  );
}
