import { Outlet, Link } from "react-router-dom";
import classes from './Layout.module.css';
import NavbarElement from "./NavbarElement";


const Layout = () => {
    return (
        <>
        <header className={classes.header}>
            <nav>
                <ul>
                    <a style={{fontSize: 25}}><b>MedSearchViz</b></a>
                    <li>
                        <NavbarElement link='/' label="Home" />
                    </li>
                    <li>
                        <NavbarElement link='/search' label='Search' />
                    </li>
                    <li>
                        <NavbarElement link='/contact' label='Contact' />
                    </li>
                </ul>

            </nav>
        </header>

            <Outlet />
        </>
    )
};

export default Layout;
