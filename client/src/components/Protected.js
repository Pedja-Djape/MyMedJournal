import  { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Protected = ({children}) => {
    const navigate = useNavigate();
    const authState = useSelector(state => state);
    useEffect( () => {
        if (!authState.isAuthenticated) {
            navigate("/auth?mode=login");
        } 
    });
    return children
}

export default Protected