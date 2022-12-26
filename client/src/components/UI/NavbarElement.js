import { NavLink } from "react-router-dom";
import classes from './NavbarElement.module.css'

const NavbarElement = (props) => {
    const activeStyle = {
        backgroundColor: "whitemoke",
    }
    return (
        <div className={classes.nve}>
            <a>
                <NavLink 
                    to={props.link}
                >
                    {props.label}
                </NavLink>
            </a>
        </div>
    )
}

export default NavbarElement;
