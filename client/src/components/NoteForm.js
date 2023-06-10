import { Form, useNavigate, useNavigation, json, redirect , useActionData} from 'react-router-dom';
import useInput from '../hooks/useInput';
import store from '../store'
 
import classes from './NoteForm.module.css'
import { useEffect } from 'react';

const NoteForm = ({method, note}) => {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const data = useActionData();

    const cancelEditHandler = () => {
        navigate('/dashboard/notes');
    }

    useEffect( () => {
        
    }, []);

    const {
        value: enteredTitle,
        hasError: titleHasError,
        isValid: titleIsValid,
        valueChangeHandler: titleChangedHandler,
    } = useInput((title) => title.trim() === '');

    const {
        value: enteredContent,
        hasError: contentHasError,
        isValid: contentIsValid,
    } = useInput((content) => content.trim() === '');


    const isSubmitting = navigation.state === 'submitting';
    return (
        <div className={classes.container}>
            {
                data && data.errors (
                    <ul className='text-red-500'>
                        {Object.values(data.errors).map((err) => (
                            <li key={err}>
                               <span className='text-red-500'>{err}</span> 
                            </li>
                        ))}
                    </ul>
                )
            }
            <Form method={method} className={classes.form}>
                <p>
                    <label htmlFor='title'>Title</label>
                    <input 
                        id='title'
                        type='text'
                        name='title'
                        required
                        defaultValue={note ? note.title : ''}
                        onChange={titleChangedHandler}
                    />
                </p>
                <p>
                    <label htmlFor='content'>Note content</label>
                    <textarea 
                        id='content'
                        name='content'
                        rows="5"
                        required
                        defaultValue={note ? note.content : ''}
                    />
                </p>
                <div className={classes.actions}>
                    <button type='button' onClick={cancelEditHandler} disabled={isSubmitting}>
                        Cancel.
                    </button>
                    <button disabled={isSubmitting || titleHasError || contentHasError }>
                        {isSubmitting ? "Saving changes ..." : "Save changes."}
                    </button>
                </div>
            </Form>
        </div>
    );
}

export const action = async ({request, params}) => {

    const method = request.method;
    const data = await request.formData();

    const noteData = {
        title: data.get('title'),
        content: data.get('content')
    }

    let url = `http://localhost:9000/notes/`

    if (method === "PATCH" || method === "DELETE") {
        url = `http://localhost:9000/notes/${params.noteId}`
    }
    

    const token = store.getState().auth.token;
    const response = await fetch(url,{
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(noteData)
    });
    if (response.status === 422) {
        return response
    }
    if (!response.ok) {
        throw json({message: 'Could not save note'}, {status: 500});
    }

    return redirect(`/dashboard/notes`);
}


export default NoteForm;