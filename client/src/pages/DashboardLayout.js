import { Outlet } from "react-router-dom";

import React from 'react'
import DashboardNavigation from "../components/DashboardNavigation";

const DashboardLayout = () => {
    return (
    <>
        <div className="flex gap-4">
            <DashboardNavigation />
            <Outlet />
        </div>
        
    </>
    )
}

export default DashboardLayout;