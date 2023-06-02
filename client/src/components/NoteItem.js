import React from 'react'
import { Link } from 'react-router-dom'

import classes from './NoteItem.module.css';

const NoteItem = ({note}) => {

    const deleteHandler = () => {
        console.log("Delete");
    }

    return (
        <article className={classes.note}>
            <h1>{note.title}</h1>
            <div className={classes.description}> 
                <p>{note.description}</p>
            </div>
            <menu className={classes.actions}>
                <Link to=''>Edit</Link>
                <button onClick={deleteHandler}>Delete</button>
            </menu>
        </article>
    )
}

export default NoteItem