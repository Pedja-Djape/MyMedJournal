import React from 'react'
import NoteForm from '../components/NoteForm'
import { useRouteLoaderData } from 'react-router-dom'

const EditNote = () => {
    const data = useRouteLoaderData('note-detail');
    
    return (
        <NoteForm method='PATCH' note={data.note}/>
    );
}

export default EditNote;