import React, { useEffect } from 'react'
import {
    Form,
    Link,
    useSearchParams,
    useActionData,
    useNavigate,
    useNavigation
} from 'react-router-dom';

import classes from './AuthForm.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import useInput from '../hooks/useInput';

const invalidStyling = {
    border: '1px solid #b40e0e',
    backgroundColor: '#d1b6b6'
}


let isFirst = true;

const AuthForm = () => {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const data = useActionData();
    const dispatch = useDispatch();

    const token =  data?.token;
    const userId = data?.id;
    
    useEffect( () => {
        if (isFirst) {
            isFirst = false;
            return;
        }
        if ( token !== undefined) {
            const payload = {
                isAuthenticated: token === null ? false : true,
                token,
                id: userId
            }
            dispatch(authActions.manageToken(payload));
            navigate("/dashboard");
            return;
        }
    }
    , [token, navigate, dispatch, userId]);

    const {
        value: enteredEmail,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useInput( (email) => email.includes('@'));

    const {
        value: enteredPassword,
        hasError: passwordHasError,
        isValid: passwordIsValid,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword
    } = useInput( (password) => password.length > 7);


    const [ searchParams ] = useSearchParams();

    const isLogin = searchParams.get('mode') === 'login';
    // to prevent from multiple successive requests during submission
    const isSubmitting = navigation.state === 'submitting'
    
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
                <label htmlFor="email">Email</label>
                <input 
                    id="email" 
                    type="email" 
                    name="email" 
                    onChange={emailChangedHandler}
                    onBlur={emailBlurHandler}
                    value={enteredEmail}
                    style={emailHasError ? invalidStyling : null}
                    required 
                />
            {emailHasError && <p className='error-text'>Entered email must be a valid email address!</p>}
            <label htmlFor="image">Password</label>
            <input 
                id="password" 
                type="password" 
                name="password" 
                value={enteredPassword} 
                onChange={passwordChangedHandler}
                onBlur={passwordBlurHandler}
                style={passwordHasError ? invalidStyling : null}
                required  
            />
            {passwordHasError && <p className='error-text'>Entered password must be at least 8 characters long!</p>}
            <div className={classes.actions}>
                <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                    {isLogin ? 'Create an account.' : 'Login.'}
                </Link>
                <button disabled={isSubmitting || !emailIsValid || !passwordIsValid}>   
                    {isSubmitting ? 'Submitting ...' : 'Submit.'}
                </button>
            </div>
        </Form>
        </>
    )
}

export default AuthForm