import React from 'react'
import { Link, useNavigate, useSubmit } from 'react-router-dom'

import classes from './NoteItem.module.css';

const NoteItem = ({note}) => {
    const submit = useSubmit();
    const deleteHandler = () => {
        const proceed = window.confirm(`Are you sure you want to delete note: '${note.title}'`);
        if (proceed) {
            submit(null, {method: 'DELETE'}); // submit to action assoc with route
            return;
        }
    }
    console.log(note);
    return (
        <article className={classes.note}>
            <h1>{note.title}</h1>
            <div className={classes.description}> 
                <p>{note.content}</p>
            </div>
            <menu className={classes.actions}>
                <Link to='edit'>Edit</Link>
                <button onClick={deleteHandler}>Delete</button>
            </menu>
        </article>
    )
}

export default NoteItem;
