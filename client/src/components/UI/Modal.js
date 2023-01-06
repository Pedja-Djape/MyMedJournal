import ReactDom from 'react-dom';

const MODAL_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    padding: '50px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000
}

const Modal = (props) => {
    if (!props.open) return null;

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLE}>
                    <button type="button" onClick={props.onModalClose}>Close</button>
                    {props.children}
                </div>
            </div>
        </>,
        document.getElementById("modalPortal")
    )
}

export default Modal