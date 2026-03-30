"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Trash2 } from "lucide-react";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface Order {
  orderId: string;
  createdAt: string;
  user: { id: string; username: string; email: string };
  deliveryLocation: string;
  items: OrderItem[];
  totals: { subtotal: number; tax: number; shipping: number; total: number };
  itemCount: number;
}

export default function OrderedPage() {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const storedOrders = localStorage.getItem("orders");
      if (!storedOrders) return [];
      return JSON.parse(storedOrders) as Order[];
    } catch (error) {
      console.error("Error parsing orders", error);
      localStorage.removeItem("orders");
      return [];
    }
  });

  const clearOrders = () => {
    localStorage.removeItem("orders");
    setOrders([]);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <CheckCircle2 size={64} className="mx-auto text-emerald-500 mb-6" />
          <h1 className="text-3xl text-gray-900 dark:text-white font-bold mb-2">No Orders Yet</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You haven’t placed any orders yet. Your checked out orders will appear here.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order History</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">You have {orders.length} ordered shipments.</p>
          </div>
          <button onClick={clearOrders} className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold underline">Clear Orders</button>
        </div>

        <div className="space-y-6">
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <div key={order.orderId} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order {order.orderId}</h2>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{new Date(order.createdAt).toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="text-gray-700 dark:text-gray-300">
                    <p><span className="font-semibold">User:</span> {order.user.username} (<span className="text-sm text-gray-500 dark:text-gray-400">{order.user.id}</span>)</p>
                    <p><span className="font-semibold">Email:</span> {order.user.email}</p>
                    <p><span className="font-semibold">Location:</span> {order.deliveryLocation}</p>
                    <p><span className="font-semibold">Items:</span> {order.itemCount}</p>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p><span className="font-semibold">Subtotal:</span> ${order.totals.subtotal.toFixed(2)}</p>
                    <p><span className="font-semibold">Tax (8%):</span> ${order.totals.tax.toFixed(2)}</p>
                    <p><span className="font-semibold">Shipping:</span> ${order.totals.shipping.toFixed(2)}</p>
                    <p className="text-lg font-bold"><span className="font-semibold">Total:</span> ${order.totals.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={`${order.orderId}-${item.id}`} className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                        <Image src={item.image || "/placeholder.png"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">{item.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-700 dark:text-gray-200">Qty: {item.quantity}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
