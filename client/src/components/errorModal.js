import React from 'react';
import '../styles/components/_errorModal.scss'

const ErrorModal = (props) => {
    return (
        <div onClick={props.onConfirm} className="blackdrop">
        <div className="modal_err_container">
            <header className="err_header">
                <h4>{props.title}</h4>
            </header>
            <div className="err_content">
                <p>{props.message}</p>
            </div>
            <footer>
                <button onClick={props.onConfirm} className="err_button">ok</button>
            </footer>
        </div>
        </div>
    );
};

export default ErrorModal;