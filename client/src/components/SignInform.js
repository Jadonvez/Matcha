import React, { useState } from 'react';
import axios from 'axios';
import '../styles/components/_SignInform.scss';
import ErrorModal from '../components/errorModal';
//import { useNavigate } from "react-router-dom";


const SignInform = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    //const navigate = useNavigate();

    const [error, setError] = useState();

    const errorHandler = () => {
        setError(null);
    };
    
    async function login(e)
    {
        e.preventDefault();
        //const mailError = document.querySelector('.email.error');
        //const passwordError = document.querySelector('.password.error');
        let item = {mail, password}

        if (mail.trim().length === 0 || password.trim().length === 0)
        {
            setError({
                title: "Un ou plusieurs champs sont vides",
                message: "Entrer votre email et/ou votre mot de passe"
            })
            return;
        }
        //console.log(item);

        // let result = await fetch("http://localhost:5000/api/user/login", {
        //     method: 'POST',
        //     body: JSON.stringify(item),
        //     credentials: 'same-origin',
        //     headers:{
        //         "Content-Type":'application/json',
        //     }
        // })
        // result = await result.json();
        // console.warn("result", result);

        axios({
            method: "post",
            url: `http://localhost:5001/api/user/login`,
        //     headers: { 'Access-Control-Allow-Origin' : '*',
        //                 'Acces-Control-Allow-Credentials' : 'true'
        // },
            //credentials: 'include',
            withCredentials: true,
            data: {
                mail,
                password,
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log('try la redirect');
                    //navigate("/");
                    window.location = "/";
                    //mailError.innerHTML = res.data.errors.mail;
                    //passwordError.innerHTML = res.data.errors.password;
                } else {
                    //window.location = "/home";
                    console.log(item);
                }
            })
            .catch((err) => {
                console.log(err);
                //console.log(err.response.data);
                setError(true);
                setError({
                    title: "Erreur de connection",
                    message: err.response.data
                })
                if (err.response.data === "Mot de passe incorrect.")
                    console.log('ca marche ya zuby');
            })
    };
    return (
        <div>
            {error && <ErrorModal 
            title={error.title}
            message={error.message}
            onConfirm={errorHandler}
            />}
            <div className="grid-container-signin">
                {/* <div className="img-signin">
                    <img src="./img/logo_login_acc.svg" height="280" alt="img-login-acc" />
                </div> */}
                <form onSubmit={login}>
                    {/*<label htmlFor="email">Email</label>*/}
                    <input type="text" value={mail} onChange={(e)=>setMail(e.target.value)} id="email" placeholder="email" />
                    <div className="email_error"></div>
                    {/*<label htmlFor="password">Password</label>*/}
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="password" />
                    <div className="password_error"></div>
                    <input type="submit" value="Se connecter"/>
                </form>
            </div>
        </div>
    );
};

export default SignInform;