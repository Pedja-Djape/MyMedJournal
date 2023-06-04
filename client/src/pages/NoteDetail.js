import React, { Suspense } from 'react'
import NoteItem from '../components/NoteItem';
import { Await, defer, json, useRouteLoaderData } from 'react-router-dom';

import store from '../store';

const NoteDetail = () => {
	const {note} = useRouteLoaderData('note-detail');
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

const loadNote = async () => {
	const token = store.getState().token;
	const response = await fetch('http://localhost:9000/notes/', {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	});
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

export const loader =  async ({request, params}) => {
	const note = await loadNote()
	return defer({
		note: note
	});
}

export default NoteDetail;
