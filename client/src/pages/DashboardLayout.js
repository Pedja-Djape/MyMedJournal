import { Outlet, Await, Navigate } from "react-router-dom";

import React, { Suspense } from 'react'
import DashboardNavigation from "../components/DashboardNavigation";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    return (
    <>
    <Suspense>
        <Await resolve={isAuthenticated}>
            {(resolveAuth => {
                if (resolveAuth) {
                    return (
                        <div className="flex gap-4">
                            <DashboardNavigation />
                            <Outlet />
                        </div>
                    )
                }
                return <Navigate to='/auth?mode=login'/>
            })}
            
        </Await>
        
        
    </Suspense>
        
    </>
    )
}

export default DashboardLayout;