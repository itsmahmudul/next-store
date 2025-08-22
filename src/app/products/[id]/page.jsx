"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import api from "@/app/hooks/axios";

const ProductDetailsPage = ({ params }) => {
    const { id } = params;
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch product details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading)
        return <p className="text-center mt-12 text-gray-500 text-lg">Loading product...</p>;
    if (!product)
        return <p className="text-center mt-12 text-gray-500 text-lg">Product not found.</p>;

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4">
            <Toaster position="top-center" />
            <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
                {/* Product Image */}
                {product.image && (
                    <div className="md:w-1/2 flex justify-center items-center bg-gray-50 p-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-2xl shadow-lg"
                        />
                    </div>
                )}

                {/* Product Info */}
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                            {product.name}
                        </h1>
                        <p className="text-gray-700 text-lg mb-6">{product.description}</p>

                        <div className="flex items-center space-x-6 mb-4">
                            <p className="text-2xl font-bold text-blue-600">
                                ${product.price}
                            </p>
                            <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
                                {product.category || "Uncategorized"}
                            </span>
                        </div>

                        <p className="text-gray-500 mb-6">Stock: {product.stock || 0}</p>
                    </div>

                    <button
                        onClick={() => toast.success("Proceeding to buy...")}
                        className="mt-4 w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold py-4 rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
