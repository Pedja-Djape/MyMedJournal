import { NavLink } from 'react-router-dom';

import classes from './NoteNavigation.module.css';

const NoteNavigation = () => {

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to={`/dashboard/notes`}
                            className={({isActive}) => isActive ? classes.active : undefined}
                            end
                        >
                            All notes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='new'
                            className={({isActive}) => isActive ? classes.active : undefined}
                        >
                            New Note.
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NoteNavigation