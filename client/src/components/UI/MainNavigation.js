import { NavLink, Form } from "react-router-dom";
import { useSelector } from 'react-redux';

import React from 'react'

import classes from './MainNavigation.module.css';

const MainNavigation = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


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
                        <li>
                            <NavLink 
                                to='/' 
                                className={({ isActive }) => isActive ? classes.active : undefined }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="text-white">
                            <NavLink 
                                to='/search'
                                className={({ isActive }) => isActive ? classes.active : undefined }
                            >
                                Search
                            </NavLink>
                        </li>
                        <li>
                            <Form action="/">
                                <button>Logout</button>
                            </Form>
                        </li>
                    </ul>
                </div>
                
            </nav>
        </header>
  )
}

export default MainNavigation
