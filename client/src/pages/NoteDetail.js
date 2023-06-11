import React, { Suspense } from 'react'
import NoteItem from '../components/NoteItem';
import { Await, defer, json, useRouteLoaderData } from 'react-router-dom';

import store from '../store';

const NoteDetail = () => {
	const data = useRouteLoaderData('note-detail');
	return (
		<>
		{
			data && data.errors && (
				<ul className='text-red-500'>
					{Object.values(data.errors).map(err => (
						<li key={err}>
							{err}
						</li>
					))}
				</ul>
			)
		}
		{ data && data.note (
			<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
				<Await resolve={data.note}>
					{loadedNote => <NoteItem note={loadedNote}/>}
				</Await>
			</Suspense>
		)}
			
		</>
	)
}

const loadNote = async (noteId) => {
	const token = store.getState().auth.token;
	const response = await fetch(`http://localhost:9000/notes/${noteId}`, {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	});
	if (response.status === 422) {
		return response;
	}
	if (!response.ok) {
		throw json(
			{message: "Could not fetch notes"},
			{status: 500}
		)
	} 
	
	const resData = await response.json();
	return resData.note;

}

export const loader =  async ({ params}) => {
	const {noteId} = params;
	const note = await loadNote(noteId)
	return defer({note});
}

export default NoteDetail;
