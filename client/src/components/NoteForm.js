import { Form, useNavigate, useNavigation, json, redirect } from 'react-router-dom'
import store from '../store'
 
import classes from './NoteForm.module.css'

const NoteForm = ({method, note}) => {
    const navigate = useNavigate();
    const navigation = useNavigation();

    const cancelEditHandler = () => {
        navigate('..');
    }

    const isSubmitting = navigation.state === 'submitting';
    return (
        <div className={classes.container}>
            <Form method={method} className={classes.form}>
                <p>
                    <label htmlFor='title'>Title</label>
                    <input 
                        id='title'
                        type='text'
                        name='title'
                        required
                        defaultValue={note ? note.title : ''}
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
                    <button disabled={isSubmitting}>
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
    

    const token = store.getState().token;
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