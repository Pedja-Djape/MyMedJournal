import React, { Suspense } from 'react'
import NoteItem from '../components/NoteItem';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

const NoteDetail = () => {
	const {note} = useLoaderData();
	return (
		<>
			<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
				<Await resolve={note}>
					{loadedNote => <NoteItem note={loadedNote}/>}
				</Await>
			</Suspense>
		</>
	)
}

const loadNote = async (uid, id) => {
	const response = await fetch('http://localhost:9000/notes/' + uid + '/'  + id);
	if (!response.ok) {
		throw json(
			{message: "Could not fetch notes"},
			{status: 500}
		)
	} else {
		const resData = await response.json();
		return resData.note;
	}
}

export const loader =  ({request, params}) => {
	const {uid, noteId} = params;
	return defer({
		note: loadNote(uid, noteId)
	});
}

export default NoteDetail;
