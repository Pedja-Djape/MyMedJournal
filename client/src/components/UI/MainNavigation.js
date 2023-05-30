import { NavLink } from "react-router-dom";

import React from 'react'

const MainNavigation = () => {


    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' end>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/search'>
                            Search
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
  )
}

export default MainNavigation
