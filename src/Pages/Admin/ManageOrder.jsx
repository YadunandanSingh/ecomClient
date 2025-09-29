

import { useEffect, useState, useMemo } from "react"

import { useDispatch, useSelector } from 'react-redux'
import { getAllPaymentData ,UpdateSippmentStatus } from "../../Features/Payment/PaymentSlice"



const statusConfig = {
  Pending: {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    darkColor: "bg-orange-900/20 text-orange-400 border-orange-800/30",
    icon: "⏳",
    label: "Pending",
  },
  Confirmed: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    darkColor: "bg-blue-900/20 text-blue-400 border-blue-800/30",
    icon: "✅",
    label: "Confirmed",
  },
  Shipped: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    darkColor: "bg-purple-900/20 text-purple-400 border-purple-800/30",
    icon: "🚚",
    label: "Shipped",
  },
  Delivered: {
    color: "bg-green-100 text-green-800 border-green-200",
    darkColor: "bg-green-900/20 text-green-400 border-green-800/30",
    icon: "📦",
    label: "Delivered",
  },
}

export default function ManageOrder() {
  const dispatch = useDispatch()
  const { Payment, loading, error } = useSelector((state) => state.Payment || {})

  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isUpdating, setIsUpdating] = useState(null)

 

  const orders = useMemo(() => {
    if (!Payment || !Array.isArray(Payment)) {
      console.log("[v0] Payment data is not an array:", Payment)
      return [Payment]
    }
   

    return Payment
  }, [Payment])
  console.log(Payment)
  const filteredOrders = useMemo(() => {
    let filtered = orders

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter((order) => order.SippmentStatus?.toLowerCase() === activeTab.toLowerCase())
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.userId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.userShipping?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return filtered
  }, [orders, activeTab, searchQuery])

  const handleStatusUpdate = async (orderId, newStatus) => {
    setIsUpdating(orderId)
    try {
      await dispatch(
        UpdateSippmentStatus({
          OrderId: orderId,
          SippmentStatus: newStatus, // Fixed the typo from original code
        }),
      )
    } catch (error) {
      console.error("[v0] Error updating status:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  const formatOrderDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusCounts = () => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.SippmentStatus === "Pending").length,
      confirmed: orders.filter((o) => o.SippmentStatus === "Confirmed").length,
      shipped: orders.filter((o) => o.SippmentStatus === "Shipped").length,
      delivered: orders.filter((o) => o.SippmentStatus === "Delivered").length,
    }
  }

  const statusCounts = getStatusCounts()


 useEffect(() => {
    dispatch(getAllPaymentData())
  }, [dispatch])


  if (error) {
    return (
      <div className="p-6">
        <div className="border border-red-200 bg-red-50 dark:border-red-800/30 dark:bg-red-900/20 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-400">
            Error loading orders: {error.message || "Something went wrong"}
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="border border-red-200 bg-red-50 dark:border-red-800/30 dark:bg-red-900/20 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-400">
           Loading... 
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Order Management</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage and track all customer orders
            </p>
          </div>
          <div className="relative w-full sm:w-80">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="flex overflow-x-auto sm:grid sm:grid-cols-5">
              {[
                { key: "all", label: `All Orders (${statusCounts.all})` },
                { key: "pending", label: `Pending (${statusCounts.pending})` },
                { key: "confirmed", label: `Confirmed (${statusCounts.confirmed})` },
                { key: "shipped", label: `Shipped (${statusCounts.shipped})` },
                { key: "delivered", label: `Delivered (${statusCounts.delivered})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-shrink-0 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-b-2 border-blue-500"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-24 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-32 sm:w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                      <div className="h-8 w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                  <div className="text-4xl sm:text-6xl mb-4">📦</div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No orders found
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center px-4">
                    {searchQuery ? "Try adjusting your search criteria" : "No orders match the selected status"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {[...filteredOrders].reverse().map((order, index) => {
                  const statusInfo = statusConfig[order.SippmentStatus] || statusConfig.Pending
                  return (
                    <div
                      key={order._id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                          <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                            <div className="bg-blue-100 dark:bg-blue-900/20 rounded-lg p-2 sm:p-3 flex-shrink-0">
                              <span className="text-sm sm:text-lg font-bold text-blue-700 dark:text-blue-400">
                                {index + 1}
                              </span>
                            </div>

                            <div className="flex-1 space-y-3 min-w-0">
                              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base ">
                                    Order #{order.orderId}
                                  </h3>
                                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    {formatOrderDate(order.orderDate)} • Customer: {order.userId}
                                  </p>
                                </div>
                                <span
                                  className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.darkColor} self-start sm:self-auto`}
                                >
                                  <span className="mr-1">{statusInfo.icon}</span>
                                  {statusInfo.label}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="sm:col-span-2 lg:col-span-1">
                                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Order Items
                                  </h4>
                                  <div className="space-y-2">
                                    {order.orderItem?.map((item, idx) => (
                                      <div key={idx} className="flex items-center space-x-2">
                                        <img
                                          src={
                                            item.imagePath?.startsWith("http")
                                              ? item.imagePath
                                              : import.meta.env.VITE_API_URL + `${item.imagePath}`
                                          }
                                          alt={item.name}
                                          className="w-6 h-6 sm:w-8 sm:h-8 rounded object-cover bg-gray-100 dark:bg-gray-700 flex-shrink-0"
                                        />
                                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ">
                                          {item.name}
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
                                    ${order.amount}
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
                                      <p className="">{order.userShipping?.name}</p>
                                      <p className="">{order.userShipping?.address}</p>
                                      <p className="">{order.userShipping?.Phone}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end lg:ml-4">
                            <select
                              value={order.SippmentStatus}
                              onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                              disabled={isUpdating === order._id}
                              className="w-full sm:w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
