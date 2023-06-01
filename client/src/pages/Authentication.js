import { json } from 'react-router-dom'

import AuthForm from "../components/AuthForm";

const AuthenticationPage = () => {


    return <AuthForm />
}

export const action = async ({request}) => {
    // get search parameters from route
    const searchParams = new URL(request.url).searchParams;
    // creating account or logging in?
    const mode = searchParams.get('mode') || 'login';
    
    // get email and password
    const data = await request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password')
    };

    // tell backend to create request
    const response = await fetch('http://localhost:9000/auth/' + mode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    });

    if (response.status === 422 || response.status === 401 ) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not authenticate user.'}, {status: 500});
    }

    const resData = await response.json();
    const token = resData.token;

    return {
        token,
        id: resData.id
    }
}




export default AuthenticationPage;
