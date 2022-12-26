import { Link, useResolvedPath, useMatch } from "react-router-dom";
import classes from './Navbar.module.css';

const CustomLink= ({to, children, ...props}) => {
    // make sure path is the full relative path
    const resolvedPath = useResolvedPath(to);
    // 
    const isActive = useMatch({
        path: resolvedPath.pathname,
        end: true
    });
    return (
        <li className={isActive ? classes.active : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

const Navbar = () => {
    
    return (
        <nav className={classes.nav}>
            <Link to="/" className={classes["site-title"]}>
                MedSearchViz
            </Link>
            <ul>
                <CustomLink to="search">Search</CustomLink>
                <CustomLink to="about">About</CustomLink>
            </ul>
        </nav>
    );
}

export default Navbar;
