import React, { useState } from "react";

export default function ReposiveHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="text-xl font-bold text-gray-800">
                    MyShop
                </div>
                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">Products</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
                </nav>
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-600 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {/* Mobile Nav */}
            {menuOpen && (
                <nav className="md:hidden bg-white px-4 pb-4">
                    <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Home</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Products</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">About</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Contact</a>
                </nav>
            )}
        </header>
    );
}