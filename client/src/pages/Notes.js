import {Suspense} from 'react'
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import NotesList from "../components/NotesList";
import store from '../store';
import getBackendHostname from '../util/host';

// Suspense allows us to delay the rendering of the page until we have the events

const NotesPage = () => {

    const {notes} = useLoaderData();
    return (
        
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading ...</p>}>
            <Await resolve={notes}>
                {(loadedData) => 
                    <div className="text-center">
                        <NotesList notes={loadedData.notes} />
                    </div>
                }
            </Await>
        </Suspense>
            
    )
}

const loadNotes = async () => {
    const token = store.getState().auth.token;
    const response = await fetch(getBackendHostname() + '/notes/', {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    if (response.status === 422) {
        return response;
    }
    if (!response.ok) {
        throw json(response);
    }
    const data = await response.json();
    return data;
}

export function loader() {
    return defer({
        notes: loadNotes()
    })
}

export default NotesPage;