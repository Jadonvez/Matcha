import React from 'react';
import '../styles/pages/_confirm_email.scss';

const Confirm_email = () => {
    return (
        <div className="first_box">
            <div className="second_box">
                <div className="first_text">L'email a bien été verifié</div>
                <img className="logo_validate" src="./img/check_icone.svg" height="180" alt="img-birds-logo" />
                <div className="second_text">Vous pouvez maintenant vous connecter</div>
                <div className="third_text">@Matcha</div>
            </div>
        </div>
    );
};

export default Confirm_email;