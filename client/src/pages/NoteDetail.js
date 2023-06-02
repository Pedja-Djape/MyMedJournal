import React from 'react'
import NoteItem from '../components/NoteItem';

const NoteDetail = () => {
	return (
		<>
			<NoteItem 
				note={
					{
						id: 0, 
						title: 'My thoughts', 
						description: 'Article'
					}
				}
			/>
		</>
	)
}

export default NoteDetail