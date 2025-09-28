import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import Dashbord from '../../Pages/Admin/Dashbord'
import { Routes, Route } from 'react-router-dom';
import EditSlider from '../../Pages/Admin/EditSlider';
import EditUser from '../../Pages/Admin/EditUser';
import AdminProjectRoute from '../Routing/AdminProjectRoute';
import ManageCategory from '../../Pages/Admin/ManageCategory';
import ManageProducts from '../../Pages/Admin/ManageProducts';
import ManageOrder from '../../Pages/Admin/ManageOrder';

function AdminLayout() {
    const [activePage, setActivePage] = useState("dashboard");

    const renderMainContent = () => {
        switch (activePage) {
            case "Slider":
                return <AdminProjectRoute> <EditSlider /></AdminProjectRoute>
            case "Category":
                return <ManageCategory />
            case "Products":
                return <ManageProducts />

            case "Orders":
                return <ManageOrder/>
            default:
                return <Dashbord />
        }
    }

    return (
        <div className="flex   bg-background">

            {/* sidebar */}
            <AdminSidebar activePage={activePage} setActivePage={setActivePage} />


            <div className="bg-amber-100 flex-1 flex-col overflow-hidden lg:ml-0">
                {/* Header */}
                {/* <AdminHeader/> */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    {/* main body  */}

                    {renderMainContent()}
                </main>
            </div>

        </div>



    )
}

export default AdminLayout
