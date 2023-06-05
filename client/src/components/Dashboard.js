import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex flex-col items-center w-full pt-6'>
        <h1>Welcome to your dashboard!</h1>
        <div className='flex justify-center gap-8'>
            <Link to='/dashboard/notes'>
                <div className='w-[30rem] h-[30rem] bg-[#f2c11d] text-center text-white rounded-xl relative'>
                    <h1 className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>Notes</h1>
                </div>
            </Link>
            <Link to='/dashbpard/favorites'>
                <div className='w-[30rem] h-[30rem] bg-[#f2c11d] text-center text-white rounded-xl relative'>
                    <h1 className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>Favorites</h1>
                </div>
            </Link>
            
        </div>
    </div>
  )
}

export default Dashboard