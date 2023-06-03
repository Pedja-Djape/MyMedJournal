import React from 'react'
import { Form } from 'react-router-dom'

import classes from './NoteForm.module.css'

const NoteForm = () => {
    console.log('hey hey')
  return (
    <div className={classes.container}>
        <Form method='patch' className={classes.form}>
            <p>
                <label htmlFor='title'>Title</label>
                <input 
                    id='title'
                    type='text'
                    name='title'
                    required
                    // defaultValue={}
                />
                <label htmlFor='content'>Note content</label>
            </p>
            <p>
                <textarea 
                    id='content'
                    name='content'
                    rows="5"
                    required
                    // defaultValue={}
                />
            </p>
            <div className={classes.actions}>
                <button type='button'>
                    Cancel.
                </button>
                <button>
                    Save changes.
                </button>
            </div>
        </Form>
    </div>
  )
}

export default NoteForm