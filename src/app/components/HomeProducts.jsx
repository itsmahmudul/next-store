"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/app/hooks/axios";
import ProductCard from "./ProductCard"; // import the card component

const HomeProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products");
                setProducts(res.data.slice(0, 12)); // show only 12 products
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center mt-16">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Featured Products
            </h2>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className="text-center mt-8">
                <Link
                    href="/products"
                    className="inline-block bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition"
                >
                    Show More Products
                </Link>
            </div>
        </section>
    );
};

export default HomeProducts;
