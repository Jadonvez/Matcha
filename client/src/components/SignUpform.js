import axios from 'axios';
import React, { useState } from 'react';
import '../styles/components/_SignUpform.scss';
import ErrorModal from '../components/errorModal';
import SignInform from './SignInform';

const SignUpform = () => {
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [mail, setMail] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [orientation, setOrientation] = useState("");
    const [error, setError] = useState();

    const [formSubmit, setFormSubmit] = useState(false);

    const errorHandler = () => {
        setError(null);
    };

    async function register(e)
    {
        e.preventDefault();
        let item = {firstname, name, login, mail, password, dob, gender, orientation}

        if (name.trim().length === 0 || firstname.trim().length === 0 ||
        mail.trim().length === 0 || password.trim().length === 0 ||
        login.trim().length === 0)
        {
            setError({
                title: "Un ou plusieurs champs sont vides",
                message: "Veuillez remplir les champs manquants"
            })
            return;
        }

        axios({
            method: "post",
            url: `http://localhost:5001/api/user/register`,
            withCredentials: true,
            data: {
                name,
                firstname,
                login,
                password,
                mail,
                dob,
                gender,
                orientation,
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log('enregistrement réussi form envoyé');
                    setFormSubmit(true);
                } else {
                    console.log(item);
                }
            })
            .catch((err) => {
                console.log(err);
                setError(true);
                if (err.response.data.error === "password invalide" || err.response.data.error === "Le mail existe deja")
                {
                    setError({
                        title: "Erreur de connection",
                        message: err.response.data.error
                    })
                }
            })
    };
    return (
        <div>
            {error && <ErrorModal 
            title={error.title}
            message={error.message}
            onConfirm={errorHandler}
            />}
            <>
            {formSubmit ? (
                <>
                <SignInform />
                <h4 className='success_register'>Enregistrement réussi, un email de vérification a été envoyé.</h4>
                </>
            ) : (                
                <div className="grid-container-signup">
                {/* <div className="img-signin">
                    <img src="./img/logo_create_acc.svg" height="280" alt="img-create-acc" />
                </div> */}
                <form onSubmit={register}>
                    <input type="text" value={firstname} onChange={(e)=>setFirstname(e.target.value)} id="nom" placeholder="Nom" />
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} id="prenom" placeholder="Prenom" />
                    <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)} id="login" placeholder="Login" />
                    <input type="text" value={mail} onChange={(e)=>setMail(e.target.value)} id="email" placeholder="email" />
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="password" />
                    <input id="dob" value={dob} onChange={(e)=>setDob(e.target.value)} type="date" required/>
                    <select name ="Genre" value={gender} onChange={(e)=>setGender(e.target.value)} id="genre" required>
                        <option value="">genre</option>
                        <option>Homme</option>
                        <option>Femme</option>
                    </select>
                    <select name="Orientation" value={orientation} onChange={(e)=>setOrientation(e.target.value)} id="orientation" required>
                        <option value="">orientation sexuelle</option>
                        <option>Heterosexuel</option>
                        <option>Homosexuel</option>
                        <option>Bisexuel</option>
                    </select>
                    <input /*onClick={() => register()}*/ type="submit" value="S'inscrire"/>
                </form>
            </div>
            )}
            </>
        </div>
    );
};

export default SignUpform;