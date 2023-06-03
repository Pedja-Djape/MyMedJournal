import React from 'react'
import { Outlet } from 'react-router-dom'
import NoteNavigation from '../components/NoteNavigation'

const NotesLayout = () => {
  return (
    <>
      <div className='flex flex-col justify-center w-full'>
        <div className='flex justify-center'>
          <NoteNavigation />
        </div>
        <div className='flex justify-center'>
          <Outlet />
        </div>
        
      </div>
        
    </>
  )
}

export default NotesLayout