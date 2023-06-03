import { NavLink, useParams } from 'react-router-dom';

import classes from './NoteNavigation.module.css';

const NoteNavigation = () => {

    const {uid} = useParams();
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to={`/dashboard/${uid}/notes`}
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