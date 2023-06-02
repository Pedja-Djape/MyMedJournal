import {Suspense} from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom';
import NotesList from "../components/NotesList";

// Suspense allows us to delay the rendering of the page until we have the events

const NotesPage = () => {
    const { notes } = useLoaderData();
    return (
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading ...</p>}>
            <Await resolve={notes}>
                {(loadedNotes) => <div className="text-center">
                <NotesList notes={loadedNotes.notes} />
            </div>}
            </Await>
            
        </Suspense>
        
            
    )
}

const loadNotes = async (userId) => {
    const response = await fetch(`http://localhost:9000/notes/${userId}`);
    const data = await response.json();
    return data;
}

export function loader({params}) {
    return defer({
        notes: loadNotes(params.uid)
    })
}

export default NotesPage;