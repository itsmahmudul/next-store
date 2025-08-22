// src/app/dashboard/page.js
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../hooks/axios';
import { useAuth } from '../providers/AuthProvider';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch all products from your backend using axios
        const response = await api.get('/products');

        const allProducts = response.data;

        // Filter products for the current user (you'll need to add userId to products in your backend)
        // For now, we'll show all products since your backend doesn't have user filtering yet
        const userProducts = allProducts; // Change this when you add user authentication to products

        // Calculate stats
        const totalProducts = userProducts.length;
        const lowStockProducts = userProducts.filter(product => product.stock > 0 && product.stock <= 5).length;
        const outOfStockProducts = userProducts.filter(product => product.stock === 0).length;

        setStats({
          totalProducts,
          lowStockProducts,
          outOfStockProducts
        });

        // Get 3 most recent products (sorted by _id which acts as timestamp)
        const sortedProducts = userProducts.sort((a, b) =>
          new Date(b._id?.getTimestamp() || 0) - new Date(a._id?.getTimestamp() || 0)
        );
        setRecentProducts(sortedProducts.slice(0, 3));

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name || user?.email?.split('@')[0]}!
        </h1>
        <p className="text-gray-600">Manage your products and track your inventory.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Products Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Products</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">📦</span>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/dashboard/add-product"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Add new product →
            </Link>
          </div>
        </div>

        {/* Low Stock Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Low Stock</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.lowStockProducts}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">Products with ≤ 5 stock</p>
          </div>
        </div>

        {/* Out of Stock Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Out of Stock</h3>
              <p className="text-3xl font-bold text-red-600">{stats.outOfStockProducts}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <span className="text-2xl">❌</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">Need restocking</p>
          </div>
        </div>
      </div>

      {/* Recent Products Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Products</h2>
          <Link
            href="/dashboard/add-product"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
          >
            Add New Product
          </Link>
        </div>

        {recentProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProducts.map((product) => (
              <div key={product._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-800 mb-2 truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">${product.price}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm px-2 py-1 rounded-full ${product.stock === 0
                      ? 'bg-red-100 text-red-800'
                      : product.stock <= 5
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                    {product.stock} in stock
                  </span>
                  <span className="text-xs text-gray-500 capitalize">{product.category}</span>
                </div>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mt-2"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No products yet</h3>
            <p className="text-gray-500 mb-4">Start by adding your first product to your store</p>
            <Link
              href="/dashboard/add-product"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block"
            >
              Add Your First Product
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/dashboard/add-product"
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-4">➕</span>
              <div>
                <h3 className="font-medium text-gray-800">Add New Product</h3>
                <p className="text-sm text-gray-600">List a new item for sale</p>
              </div>
            </div>
          </Link>

          <Link
            href="/products"
            className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-4">🏪</span>
              <div>
                <h3 className="font-medium text-gray-800">View Store</h3>
                <p className="text-sm text-gray-600">See your products in the store</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* User Info Footer */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Email: </span>
            <span className="text-gray-800">{user?.email}</span>
          </div>
          <div>
            <span className="text-gray-600">Total Products: </span>
            <span className="text-gray-800">{stats.totalProducts}</span>
          </div>
        </div>
      </div>
    </div>
  );
}