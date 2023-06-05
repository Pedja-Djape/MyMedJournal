import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex flex-col items-center w-full pt-6'>
        <h1>Hi, welcome to your dashboard!</h1>
        <div className='flex justify-center gap-8'>
            <Link to='/dashboard/notes'>
                <div className='
                    w-[30rem] h-[30rem] bg-[#f2c11d]
                    text-center text-white 
                    rounded-xl border-black border-3 
                    flex justify-center items-center
                '>
                        <h1 >Notes</h1>
                </div>
            </Link>
            <Link to='/dashboard/favorites'>
                <div className='
                    w-[30rem] h-[30rem] bg-[#f2c11d]
                    text-center text-white 
                    rounded-xl border-black border-3 
                    flex justify-center items-center'
                >
                    <h1>Favorites</h1>
                </div>
            </Link>
            
        </div>
    </div>
  )
}

export default Dashboard