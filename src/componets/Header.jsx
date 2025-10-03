import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset, getUser } from "../Features/auth/authSlice";
import Cart from "./Cart";
import img1 from "../assets/images/category1.png";
import img2 from "../assets/images/category2.png";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isAdmin, cart, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getUser());
  }, [isAuthenticated, isAdmin, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = useMemo(
    () => [
      {
        image: img1,
        title: "Vintage Tee",
        price: 24.99,
        qty: 1,
        variant: "Black / M",
      },
      { image: img2, title: "Canvas Tote", price: 18.5, qty: 2, variant: "Natural" },
    ],
    []
  );

  const itemCount = cart.reduce((sum, it) => sum + (it.qty || 1), 0);

  return (
    <>
      {/* Top Strip */}
      <div className="bg-gray-900 text-white text-sm py-2 px-4 flex justify-between items-center">
        <div>
          {isAdmin && isAuthenticated ? (
            <p>Welcome Admin</p>
          ) : (
            <p>Welcome to Delicio</p>
          )}
        </div>
        <div>
          <ul className="flex space-x-4">{/* extra top links here */}</ul>
        </div>
      </div>

      {/* Cart Component */}
      <Cart open={open} onClose={() => setOpen(false)} items={cart} />

      {/* Header / Navbar */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/images/logo.png" alt="logo" className="h-10" />
            </Link>

            {/* Desktop Nav */}
            <nav className={`reposiveHeader block sm:hidden md:flex space-x-6 items-center `}>
              <Link to="/" className="  hover:text-gray-600">Home</Link>
              <Link to="/products" className="hover:text-gray-600">Products</Link>

              {isAdmin && isAuthenticated ? (
                <>
                  <Link to="/admin" className="hover:text-gray-600">Admin</Link>
                  <Link to="/account" className="hover:text-gray-600">Profile</Link>
                </>
              ) : isAuthenticated ? (
                <Link to="/account" className="hover:text-gray-600">Profile</Link>
              ) : null}

              {isAuthenticated ? (
                <button
                  onClick={onLogout}
                  className="hover:text-gray-600 pe-5"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="hover:text-gray-600">Login</Link>
              )}

              {/* Cart button */}
              <button
                onClick={() =>
                  isAuthenticated ? setOpen(true) : alert("Please login to view cart")
                }
                aria-label="Open cart"
                className="relative inline-flex items-center justify-center rounded-md border px-3 py-2 hover:bg-gray-100 border-gray-300"
              >
                {/* Cart Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="black"
                  aria-hidden="true"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.16 14h9.45c.84 0 1.57-.52 1.86-1.3l2.6-6.77A1 1 0 0 0 20.15 4H6.21L5.27 2H2v2h2.23l3.84 8.14-1.45 2.62C6.23 15.37 6.54 16 7.16 16H20v-2H7.97l.69-1.25Z" />
                </svg>
                {/* Badge */}
                <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-600 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
                  {isAuthenticated ? itemCount : "0"}
                </span>
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className=" px-4 py-3 space-y-2">
              <Link to="/" className="block hover:text-gray-600">Home</Link>
              <Link to="/products" className="block hover:text-gray-600">Products</Link>

              {isAdmin && isAuthenticated ? (
                <>
                  <Link to="/admin" className="block hover:text-gray-600">Admin</Link>
                  <Link to="/account" className="block hover:text-gray-600">Profile</Link>
                </>
              ) : isAuthenticated ? (
                <Link to="/account" className="block hover:text-gray-600">Profile</Link>
              ) : null}

              {isAuthenticated ? (
                <button
                  onClick={onLogout}
                  className="w-full text-left rounded "
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="block hover:text-gray-600">Login</Link>
              )}

              {/* Cart in mobile */}
              <button
                onClick={() =>
                  isAuthenticated ? setOpen(true) : alert("Please login to view cart")
                }
                aria-label="Open cart"
                className="relative inline-flex items-center justify-center rounded-md border px-3 py-2 hover:bg-gray-100 border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="black"
                  aria-hidden="true"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.16 14h9.45c.84 0 1.57-.52 1.86-1.3l2.6-6.77A1 1 0 0 0 20.15 4H6.21L5.27 2H2v2h2.23l3.84 8.14-1.45 2.62C6.23 15.37 6.54 16 7.16 16H20v-2H7.97l.69-1.25Z" />
                </svg>
                <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-600 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
                  {isAuthenticated ? itemCount : "0"}
                </span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
