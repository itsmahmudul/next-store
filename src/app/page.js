"use client";
import Hero from "./components/hero";
import HomeProducts from "./components/HomeProducts";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <HomeProducts />
    </div>
  );
}
