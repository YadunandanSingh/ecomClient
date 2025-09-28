"use client"

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaymentData } from "../Features/Payment/PaymentSlice"

import { getUser } from "../Features/auth/authSlice";
import OrderTrack from "./OrderTrack";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { Payment, loading, error } = useSelector((state) => state.Payment);
  // const fillterOreder = Payment.filter((order) =>  order.userId == user._id)
console.log(Payment)
   const [userPayments, setUserPayments] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser());
      dispatch(getAllPaymentData());
    }
  }, [isAuthenticated, dispatch]);


   // Effect 2: Filter payments when the user or payment data changes
  useEffect(() => {
    // Check if both user and payments data are available
    if (user && Payment.length > 0) {
      const filteredPayments = Payment.filter(
        (payment) => payment.userId === user._id
      );
      setUserPayments(filteredPayments);
      console.log('Filtered Payments:', filteredPayments);
    }
  }, [user, Payment]);
    
  
  // Normalize MongoDB user data into UI-friendly shape
  const normalizedUser = useMemo(() => {
    if (!user) return null;

    return {
      _id: user._id?.$oid || user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: parseInt(user.role?.$numberInt ?? user.role, 10),
      cart: user.cart?.map((c) => ({
        productId: c.productId,
        name: c.name,
        price: c.price,
        quantity: c.quantity,
        imagePath: c.imagePath,
      })) || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      address:
        user.address?.map((a) => ({
          id: a.addressId,
          type: a.firstname, // Could make this dynamic later
          street: `${a.houseNo}, ${a.colony}`,
          city: a.city,
          state: a.landmark, // API doesn’t provide state

          zipCode: a.pincode,
          country: a.country,
        })) || [],
    };
  }, [user]);

  const [activeTab, setActiveTab] = useState("overview");

  if (!normalizedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading user profile...
      </div>
    );
  }



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRoleText = (role) => {
    const roles = {
      0: "Customer",
      1: "Admin",
      2: "Super Admin",
    };
    return roles[role] || "Unknown";
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };



  //   payment data

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 bg-black text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-card border border-border rounded-lg p-6 sm:p-8 bg-[#7f574c]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl sm:text-2xl font-bold">
              {getInitials(normalizedUser.name)}
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {normalizedUser.name}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                {normalizedUser.email}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {getRoleText(normalizedUser.role)}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                  ID: {normalizedUser._id.slice(-8)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                Edit Profile
              </button>
              <button className="flex-1 sm:flex-none px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium">
                View Orders
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-card border border-border bg-[#7f574c] rounded-lg">
          <div className="border-b border-border bg-[#6e463b]">
            <nav className="flex overflow-x-auto">
              {[
                { id: "overview", label: "Overview" },
                { id: "contact", label: "Contact Info" },
                { id: "addresses", label: "Addresses" },
                { id: "activity", label: "Activity" },
                { id: "Delivery", label: "My Orders " },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap bg-[#5d352c] border-b-2 transition-colors ${activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-[#4c241c] border-border"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Account Stats */}
                <div className="bg-accent/50 rounded-lg p-6 border border-bordery bg-[#5d352c] ">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">
                    Account Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Cart Items</span>
                      <span className="font-medium text-foreground">
                        {normalizedUser.cart.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Addresses</span>
                      <span className="font-medium text-foreground">
                        {normalizedUser.address.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Role Level</span>
                      <span className="font-medium text-foreground">
                        {normalizedUser.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-accent/50 rounded-lg p-6 border border-border bg-[#5d352c] ">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-secondary-foreground">
                      Reset Password
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-secondary-foreground">
                      View Order History
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-secondary-foreground">
                      Manage Permissions
                    </button>
                  </div>
                </div>

                {/* Account Timeline */}
                <div className="bg-accent/50 rounded-lg p-6 border border-border bg-[#5d352c] ">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">
                    Account Timeline
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Account Created
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(normalizedUser.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-chart-2 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Last Updated
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(normalizedUser.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info Tab */}
            {activeTab === "contact" && (
              <div className="max-w-2xl space-y-6">
                <div className="bg-accent/50 rounded-lg p-6 border border-border bg-[#5d352c] ">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Full Name
                      </label>
                      <div className="px-4 py-3 bg-input rounded-lg border border-border text-foreground">
                        {normalizedUser.name}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Email Address
                      </label>
                      <div className="px-4 py-3 bg-input rounded-lg border border-border text-foreground">
                        {normalizedUser.email}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Phone Number
                      </label>
                      <div className="px-4 py-3 bg-input rounded-lg border border-border text-foreground">
                        +{normalizedUser.phone}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        User Role
                      </label>
                      <div className="px-4 py-3 bg-input rounded-lg border border-border text-foreground">
                        {getRoleText(normalizedUser.role)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground">
                    Saved Addresses
                  </h3>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                    Add New Address
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {normalizedUser.address.map((addr, index) => (
                    <div
                      key={addr.id || index}
                      className="bg-accent/50 rounded-lg p-6 border bg-[#5d352c]  border-border"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          {addr.type}
                        </span>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-foreground font-medium">
                          {addr.street}
                        </p>
                        <p className="text-muted-foreground">
                          {addr.city}, {addr.state} {addr.zipCode}
                        </p>
                        <p className="text-muted-foreground">{addr.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Recent Activity
                </h3>
                <div className="bg-accent/50 rounded-lg p-6 border bg-[#5d352c]  border-border">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-primary-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Profile Updated
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(normalizedUser.updatedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
                      <div className="w-8 h-8 bg-chart-2 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Cart Updated
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Items in cart: {normalizedUser.cart.length}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
                      <div className="w-8 h-8 bg-chart-3 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Account Created
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(normalizedUser.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery  Tab */}
            {activeTab === "Delivery" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">
                  All Orders
                </h3>

                {userPayments.map(( orderData ,idx) => {
                  return ( <div  key={idx} className=" bg-accent/50 rounded-lg  border bg-[#5d352c]  border-border">
                    <div className="space-y-4">
                      <div
                       
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="p-3 sm:p-6">
                          <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                            <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-lg p-2 sm:p-3 flex-shrink-0">
                                <span className="text-sm sm:text-lg font-bold text-blue-700 dark:text-blue-400">
                                  {idx +1}
                                </span>
                              </div>

                              <div className="flex-1 space-y-3 min-w-0">
                                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                  <div className="min-w-0">
                                    <div className="font-semibold md:h3 text-gray-900 dark:text-white text-sm sm:text-base h5 lg:h3">
                                      Order #{orderData.orderId}
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                      {/* {formatOrderDate(order.orderDate)} • Customer: {order.userId}
                                     */}
                                      {formatDate(orderData.orderDate)} • Customer: {orderData.userId}
                                    </p>
                                  </div>

                                </div>
                                <OrderTrack currentStatus={orderData.SippmentStatus} />

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                  <div className="sm:col-span-2 lg:col-span-1">
                                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-2">
                                      Order Items
                                    </h4>
                                    <div className="space-y-2">
                                      {orderData.orderItem?.map((item, idx) => (
                                      <div className="flex items-center space-x-2">
                                        <img
                                          src={
                                           
                                               `http://localhost:8000${item.imagePath}`
                                          }
                                          alt={'imafe'}
                                          className="w-6 h-6 sm:w-8 sm:h-8 rounded object-cover bg-gray-100 dark:bg-gray-700 flex-shrink-0"
                                        />
                                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ">
                                          {item.name} 
                                        
                                        </span>
                                         <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ">
                                          Quantity: 
                                         { item.quantity}
                                        </span>
                                      </div>
                                      ))} 
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-2">
                                      Amount
                                    </h4>
                                    <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                                      ${orderData.amount}
                                      
                                    </p>
                                  </div>

                                  <div className="sm:col-span-2 lg:col-span-1">
                                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-2">
                                      Shipping Address
                                    </h4>
                                    <div className="flex items-start space-x-2">
                                      <svg
                                        className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                      </svg>
                                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 min-w-0">
                                        <p className="">{orderData.userShipping?.name}</p>
                                      <p className="">{orderData.userShipping?.address}</p>
                                      <p className="">{orderData.userShipping?.Phone}</p>
                                       
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end lg:ml-4">
                              {/* <select
                              value={order.SippmentStatus}
                              onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                              disabled={isUpdating === order._id}
                              className="w-full sm:w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)
                 
                })}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
