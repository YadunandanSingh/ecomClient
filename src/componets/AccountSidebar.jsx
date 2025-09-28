import React, { useState } from 'react'
import { Home, Users, BarChart3, Settings, FileText, ShoppingCart, Menu, X, Sliders, Tv2,Boxes , BookX,ListOrdered } from "lucide-react"
import { Link } from 'react-router-dom'

function AccountSidebar({ activePage, setActivePage }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const menuItems = [
        { id: "dashboard", icon: Home, label: "My Profile" },
        { id: "order", icon: Tv2, label: "my Orders " },
      
    ]

    const handleNavigation = (pageId) => {
        setActivePage(pageId)
        setIsMobileOpen(false)
    }
    return (
        <div>
            <>
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="lg:hidden  absolute top-4 left-4 p-2 bg-sidebar text-sidebar-foreground rounded-lg"
                >
                    {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {isMobileOpen && (
                    <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileOpen(false)} />
                )}

                <div
                    className={`
         lg:static absolute inset-y-0 bg-white z-40 w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
                >
                    <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="lg:hidden  absolute top-4 left-4 z-50 p-2 bg-sidebar text-sidebar-foreground rounded-lg"
                >
                    {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                    <div className="p-6 border-b border-sidebar-border">
                        <h1 className="text-xl font-bold text-sidebar-foreground">User Profile</h1>
                    </div>

                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => handleNavigation(item.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === item.id
                                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                                }`}
                                        >
                                            <Icon size={20} />
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <div className="p-4 border-t border-sidebar-border">
                        <div className="flex items-center gap-3 px-4 py-3 mb-2">
                            <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-sidebar-accent-foreground">JD</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
                                <p className="text-xs text-sidebar-foreground/70">Administrator</p>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        </div>
    )
}

export default AccountSidebar
