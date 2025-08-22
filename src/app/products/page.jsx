"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../hooks/axios";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products");
                setProducts(res.data);
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
            <p className="text-center mt-8 text-gray-600">Loading products...</p>
        );

    return (
        <div className="py-12 px-4 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
                All Products
            </h1>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col hover:shadow-lg transition-shadow"
                    >
                        {product.image && (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-xl mb-4"
                            />
                        )}

                        <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">
                            {product.name}
                        </h2>

                        <p className="text-blue-600 font-bold text-lg mb-1">
                            ${product.price}
                        </p>

                        <p className="text-gray-500 text-sm mb-4">
                            Category: {product.category || "N/A"}
                        </p>

                        <button
                            onClick={() => router.push(`/products/${product._id}`)}
                            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
