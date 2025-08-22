"use client";

import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
            {/* Product Image */}
            {product.image && (
                <div className="w-full h-64 bg-gray-50 flex items-center justify-center p-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-2xl shadow-lg"
                    />
                </div>
            )}

            {/* Product Info */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 truncate">
                    {product.name}
                </h3>

                <p className="text-blue-600 font-bold text-lg mb-2">
                    ${product.price}
                </p>

                <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm mb-4 w-max">
                    {product.category || "Uncategorized"}
                </span>

                <Link
                    href={`/products/${product._id}`}
                    className="mt-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold py-3 rounded-xl shadow-lg text-center hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
