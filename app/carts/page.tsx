"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

interface CartItem {
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
  items: CartItem[];
  totals: { subtotal: number; tax: number; shipping: number; total: number };
  itemCount: number;
}

const createOrder = (
  items: CartItem[],
  user: { id: string; username: string; email: string },
  deliveryLocation: string,
  totals: { subtotal: number; tax: number; shipping: number; total: number },
  itemCount: number,
): Order => ({
  orderId: `ORD-${Date.now()}`,
  createdAt: new Date().toISOString(),
  user,
  deliveryLocation,
  items,
  totals,
  itemCount,
});

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount
  } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Calculate totals
  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const handleCheckout = async () => {
    const userLocation = prompt("Enter your delivery address:", localStorage.getItem("deliveryLocation") || "");
    if (!userLocation) {
      alert("Please enter a delivery location to proceed with checkout.");
      return;
    }
    localStorage.setItem("deliveryLocation", userLocation);

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    const order = createOrder(
      cartItems,
      isAuthenticated && user
        ? { id: user.id, username: user.username, email: user.email }
        : { id: "guest", username: "Guest", email: "guest@guest.com" },
      userLocation,
      {
        subtotal,
        tax,
        shipping,
        total,
      },
      getCartItemCount(),
    );

    const existingOrders = JSON.parse(localStorage.getItem("orders") ?? "[]");
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    clearCart();
    setIsLoading(false);

    router.push("/ordered");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="mb-8">
              <ShoppingBag size={80} className="mx-auto text-gray-300 dark:text-gray-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Looks like you have not added any items to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {getCartItemCount()} {getCartItemCount() === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.png";
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Category: {item.category}
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 50 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  "Checkout"
                )}
              </button>

              <Link
                href="/"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}