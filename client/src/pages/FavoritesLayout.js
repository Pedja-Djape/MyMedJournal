import React from 'react'
import { Outlet } from 'react-router-dom'

const FavoritesLayout = () => {
  return (
    <div className='flex justify-center w-full'>
        <Outlet />
    </div>
  )
}

export default FavoritesLayout