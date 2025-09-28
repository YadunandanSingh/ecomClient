import React, { useState } from 'react'
import { Search, Bell, User } from "lucide-react"

function AdminHeader() {
   

    
    return (
        <div className="h-16 w-full bg-card border-b border-border flex lg:flex-row xs:flex-col items-center justify-between px-4 lg:px-6">
                <div className="ml-12 lg:ml-0">
                    <h2 className="text-xl lg:text-2xl font-bold text-foreground">Dashboard</h2>
                    <p className="text-sm text-muted-foreground hidden sm:block">Welcome back, John!</p>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-2 lg:gap-4">
                    {/* Search Bar */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 w-48 lg:w-64 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                        />
                    </div>

                    <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Search size={20} />
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
                    </button>

                    {/* User Profile */}
                    <button className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <User size={16} className="text-primary-foreground" />
                        </div>
                    </button>
                </div>
            </div>
    )
}

export default AdminHeader
