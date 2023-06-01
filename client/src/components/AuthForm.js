import React, { useEffect } from 'react'
import {
    Form,
    Link,
    useSearchParams,
    useActionData,
    useNavigate
} from 'react-router-dom';

import classes from './AuthForm.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';

let isFirst = true;

const AuthForm = () => {
    const navigate = useNavigate();
    const data = useActionData();
    const dispatch = useDispatch();

    const token =  data?.token
    
    useEffect( () => {
        if (isFirst) {
            isFirst = false;
            return;
        }
        if ( token !== undefined) {
            const payload = {
                isAuthenticated: token === null ? false : true,
                token
            }
            dispatch(authActions.manageToken(payload));
            navigate("/");
            return;
        }
    }
    , [token, navigate, dispatch]);

    const [ searchParams ] = useSearchParams();

    const isLogin = searchParams.get('mode') === 'login';

    return (
        <>
        <Form method="post" className={classes.form}>
            <h1>{isLogin ? 'Log in' : 'Create an account.'}</h1>
                {data && data.errors && (
                    <ul>
                        {Object.values(data.errors).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
            {data && data.message && <p>{data.message}</p>}
            <p>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required />
            </p>
            <label htmlFor="image">Password</label>

            <input id="password" type="password" name="password" required  />
           
            <div className={classes.actions}>
                <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                    {isLogin ? 'Create an account.' : 'Login.'}
                </Link>
                <button disabled={false}>   
                    Save
                </button>
            </div>
        </Form>
        </>
    )
}

export default AuthForm