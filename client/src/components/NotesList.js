import React from 'react'
import { Link } from 'react-router-dom'
import NoteCard from './NoteCard'

const NotesList = ({notes}) => {
    
    return (
        <div className="flex flex-col items-center justify-center ">
            <div className="text-4xl text-center mb-8">
                <h1 className='text-white'>Your notes.</h1>
            </div>
            <div className="flex flex-wrap gap-8 w-full">
                {
                    notes.map((note) => (
                        <Link key={note._id} to={`/dashboard/notes/${note._id}`}>
                            <NoteCard title={note.title} content={note.content}/>
                        </Link>
                    ))
                }
            </div>
        </div>
        
    )
}

export default NotesList