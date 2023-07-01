import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../../store/authSlice";

import React from 'react'

import classes from './MainNavigation.module.css';

const MainNavigation = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.isAuthenticated);

    const logoutHandler = () => {
        dispatch(authActions.manageToken({
            isAuthenticated: false,
            token: null
        }));
        return navigate('/');
    }


    return (
        <header className="w-full p-4  text-white">
            <nav className="flex justify-between items-center">
                <div className="flex text-2xl">
                    <NavLink 
                        to='/' 
                        end
                    >
                        MyMedJournal
                    </NavLink>
                </div>
                <div>
                    <ul className={classes.list}>
                        {
                            isAuthenticated && (
                                <li>
                                    <NavLink 
                                        to='/dashboard'
                                        className={({ isActive }) => isActive ? classes.active : undefined }
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                            )
                        }
                        <li>
                            <NavLink 
                                to='/' 
                                className={({ isActive }) => isActive ? classes.active : undefined }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to='/search'
                                className={({ isActive }) => isActive ? classes.active : undefined }
                            >
                                Search
                            </NavLink>
                        </li>
                        {!isAuthenticated && (
                            <li>
                                <NavLink to='/auth?mode=login'>
                                    Login
                                </NavLink>
                            </li>
                        )}
                        {
                            isAuthenticated && (
                                <li>
                                    <button onClick={logoutHandler}>Logout</button>
                                </li>
                            )
                        }
                        
                    </ul>
                </div>

            </nav>
        </header>
  )
}

export default MainNavigation
