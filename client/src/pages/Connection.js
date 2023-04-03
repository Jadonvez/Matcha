import React, { useState } from 'react';
import SignInForm from "../components/SignInform";
import SignUpForm from "../components/SignUpform";
import Navbar from "../components/navbar_unlog";
import '../styles/pages/_connection.scss';


const Connection = () => {

    const [signUpModal, setSignUpModal] = useState(true);
    const [signInModal, setSignInModal] = useState(false);

    const handleModals = (e) => {
        if (e.target.id === "register") {
        setSignInModal(false);
        setSignUpModal(true);
        } else if (e.target.id === "loginn") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }
    return (
        <div className="body-connection">
        <div>
            <Navbar />
            <div className="connection-form">
                <div className="form-container-connection">
                <div className="img-birds">
                    <img src="./img/birds-logo.svg" height="35" alt="img-birds-logo" />
                </div>
                    <ul className="ul-connection">
                        <li className={signUpModal ? "li-connection-activ ":"li-connection"} onClick={handleModals} id="register">S'inscrire</li>
                        <li className={signInModal ? "li-connection-activ ":"li-connection"} onClick={handleModals} id="loginn">Se connecter</li>
                    </ul>
                    {signUpModal && <SignUpForm />}
                    {signInModal && <SignInForm />}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Connection;