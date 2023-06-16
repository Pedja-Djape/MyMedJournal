import ReactDom from 'react-dom';
import classes from './Modal.module.css';


const Modal = (props) => {
    // if (!props.open) return null;

    return ReactDom.createPortal(
        <>
            <div className={classes.overlay}>
                <div className={classes.modal}>
                    {props.children}
                </div>
            </div>
        </>,
        document.getElementById("modalPortal")
    )
}

export default Modal