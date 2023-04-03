// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// //import Navbar from "../components/navbar_unlog";
// import '../styles/pages/_settingprofil.scss';
// import { useSelector } from 'react-redux';
// //import { differenceInYears } from 'date-fns';
// //import UploadImg from '../components/profil/UploadImg';
// import { UidContext } from '../components/AppContext';





import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar_unlog";
import '../styles/pages/_profil.scss';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from '../components/profil/UploadImg';

import { updateBio } from '../actions/user.actions';
import { updateName } from '../actions/user.actions';
import { updateFirstname } from '../actions/user.actions';
import { updateMail } from '../actions/user.actions';
import { updateGender } from '../actions/user.actions';
import { updateOrientation } from '../actions/user.actions';


const SettingProfil = () => {
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [mail, setMail] = useState('');
    const [gender, setGender] = useState('');
    const [orientation, setOrientation] = useState('');

    const [updateForm, setUpdateForm] = useState(false);
    const [updateFormName, setUpdateFormName] = useState(false);
    const [updateFormFirstname, setUpdateFormFirstname] = useState(false);
    const [updateFormMail, setUpdateFormMail] = useState(false);
    const [updateFormGender, setUpdateFormGender] = useState(false);
    const [updateFormOrientation, setUpdateFormOrientation] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if (userData) {
            setIsLoading(false);
        }
    }, [userData]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    //bio
    const handleUpdate = () => {
        dispatch(updateBio(userData[0].id, bio));
        setUpdateForm(false);
        window.location = "/setting_profil"
    }
    
    //name
    const handleUpdateName = () => {
        dispatch(updateName(userData[0].id, name));
        setUpdateFormName(false);
        window.location = "/setting_profil"
    }
    
    //firstname
    const handleUpdateFirstname = () => {
        dispatch(updateFirstname(userData[0].id, firstname));
        setUpdateFormFirstname(false);
        window.location = "/setting_profil"
    }
    
    //mail
    const handleUpdateMail = () => {
        dispatch(updateMail(userData[0].id, mail));
        setUpdateFormMail(false);
        window.location = "/setting_profil"
    }
    
    //gender
    const handleUpdateGender = () => {
        dispatch(updateGender(userData[0].id, gender));
        setUpdateFormGender(false);
        window.location = "/setting_profil"
    }
    
    //orientation
    const handleUpdateOrientation = () => {
        dispatch(updateOrientation(userData[0].id, orientation));
        setUpdateFormOrientation(false);
        window.location = "/setting_profil"
    }

    return (
        <div>
            <div className="first-profil-container">
            <Navbar />
            {/* <h1>{userData && userData[0] ? capitalizeFirstLetter(userData[0].name) + ' ' + capitalizeFirstLetter(userData[0].firstname) + ', ' + differenceInYears(new Date() ,new Date(userData[0].dob)) : ''}</h1> */}
            <h3>Image de profil</h3>
            {userData && userData[0] ? <img src={userData[0].ppicture} alt="user-pic" height="300px" width="300px"/> : '' }
            <UploadImg />
            <h3>Bio</h3>
                {updateForm === false && (
                    <>
                        {userData && userData[0] && userData[0].bio !== null ?
                        <p onClick={() => setUpdateForm(!updateForm)}>{userData[0].bio}</p>
                        : <p onClick={() => setUpdateForm(!updateForm)}>Ne manquez pas l'occasion de vous présenter et de rencontrer des personnes qui vous correspondent ! Complétez votre espace de présentation maintenant.</p> }
                    </>
                )}
                {updateForm && (
                    <>
                        {userData && userData[0] ?
                        <textarea type="text" defaultValue={userData[0].bio} onChange={(e) =>
                        setBio(e.target.value)}></textarea>
                        : "" }
                        <button onClick={handleUpdate}>update</button>
                    </>
                )}
            <h3>Name</h3>
                {updateFormName === false && (
                    <>
                        {userData && userData[0] && userData[0].name !== "" ?
                        <p onClick={() => setUpdateFormName(!updateFormName)}>{userData[0].name}</p>
                        : <p onClick={() => setUpdateFormName(!updateFormName)}>unknow</p> }
                    </>
                )}
                {updateFormName && (
                    <>
                        {userData && userData[0] ?
                        <textarea type="text" defaultValue={userData[0].name} onChange={(e) =>
                        setName(e.target.value)}></textarea>
                        : "" }
                        <button onClick={handleUpdateName}>update</button>
                    </>
                )}
            <h3>Firstname</h3>
                {updateFormFirstname === false && (
                    <>
                        {userData && userData[0] && userData[0].firstname !== "" ?
                        <p onClick={() => setUpdateFormFirstname(!updateFormFirstname)}>{userData[0].firstname}</p>
                        : <p onClick={() => setUpdateFormFirstname(!updateFormFirstname)}>unknow</p> }
                    </>
                )}
                {updateFormFirstname && (
                    <>
                        {userData && userData[0] ?
                        <textarea type="text" defaultValue={userData[0].firstname} onChange={(e) =>
                        setFirstname(e.target.value)}></textarea>
                        : "" }
                        <button onClick={handleUpdateFirstname}>update</button>
                    </>
                )}
            <h3>Mail</h3>
                {updateFormMail === false && (
                    <>
                        {userData && userData[0] && userData[0].mail !== "" ?
                        <p onClick={() => setUpdateFormMail(!updateFormMail)}>{userData[0].mail}</p>
                        : <p onClick={() => setUpdateFormMail(!updateFormMail)}>unknow</p> }
                    </>
                )}
                {updateFormMail && (
                    <>
                        {userData && userData[0] ?
                        <textarea type="text" defaultValue={userData[0].mail} onChange={(e) =>
                        setMail(e.target.value)}></textarea>
                        : "" }
                        <button onClick={handleUpdateMail}>update</button>
                    </>
                )}
            <h3>Gender</h3>
                {updateFormGender === false && (
                    <>
                        {userData && userData[0] && userData[0].gender !== "" ?
                        <p onClick={() => setUpdateFormGender(!updateFormGender)}>{userData[0].gender}</p>
                        : <p onClick={() => setUpdateFormGender(!updateFormGender)}>unknow</p> }
                    </>
                )}
                {updateFormGender && (
                    <>
                        {userData && userData[0] ?
                        <select type="text" defaultValue={userData[0].gender} onChange={(e) =>
                        setGender(e.target.value)}>
                            <option>Homme</option>
                            <option>Homme</option>Ò
                            <option>Femme</option>
                        </select>
                        : "" }
                        <button onClick={handleUpdateGender}>update</button>
                    </>
                )}
            <h3>Orientation</h3>
                {updateFormOrientation === false && (
                    <>
                        {userData && userData[0] && userData[0].orientation !== "" ?
                        <p onClick={() => setUpdateFormOrientation(!updateFormOrientation)}>{userData[0].orientation}</p>
                        : <p onClick={() => setUpdateFormOrientation(!updateFormOrientation)}>unknow</p> }
                    </>
                )}
                {updateFormOrientation && (
                    <>
                        {userData && userData[0] ?
                        <select type="text" defaultValue={userData[0].orientation} onChange={(e) =>
                        setOrientation(e.target.value)}>
                            <option>Heterosexuelle</option>
                            <option>Homosexuelle</option>
                            <option>Bisexuelle</option>
                        </select>
                        : "" }
                        <button onClick={handleUpdateOrientation}>update</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SettingProfil;













// const SettingProfil = () => {
    
//         const uid = useContext(UidContext);
//         const [name, setName] = useState("");
//         const [firstname, setFirstname] = useState("");
//         //const [password, setPassword] = useState("");
//         //const [newpassword, setNewPassword] = useState("");
//         const [mail, setMail] = useState("");
//         const [gender, setGender] = useState("");
//         const [orientation, setOrientation] = useState("");
//         const [bio, setBio] = useState("");
//         //const [error, setError] = useState();

//     const [isLoading, setIsLoading] = useState(true);
//     const userData = useSelector((state) => state.userReducer)

//     useEffect(() => {
//         if (userData) {
//             setIsLoading(false);
//         }
//     }, [userData]);

//     if (isLoading) {
//         return <div>Chargement...</div>;
//     }

//     //les fonctions sont ici
//     // async function update_name(e)
//     // {
//     //     e.preventDefault();
//     //     if (name.trim().length === 0)
//     //     {   
//     //         //gérer les erreurs ici
//     //         return ;
//     //     }

//     //     axios({
//     //         method: "post",
//     //         url: `http://localhost:5000/api/user/`,
//     //         withCredentials: true,
//     //         data: {
//     //             name,
//     //         }
//     //     })
//     // }


//     async function update_profil(e)
//     {
//         e.preventDefault();
            
//         if (userData && userData[0])
//         {
//             if (!name)
//                 setName(userData[0].name);
//             if (name.trim().length === 0)
//             {
//                 setName(userData[0].name);
//                 console.log("name : " + name)
//             }
//             if (firstname.trim().length === 0)
//             {
//                 setFirstname(userData[0].firstname);
//                 console.log("Firstname : " + firstname)
//             }
//             if (mail.trim().length === 0)
//             {
//                 setMail(userData[0].mail);
//                 console.log("mail : " + mail)
//             }
//         }

//         await axios({
//             method: "put",
//             url: `http://localhost:5000/api/user/update_profil`,
//             withCredentials: true,
//             data: {
//                 uid,
//                 name,
//                 firstname,
//                 mail,
//                 gender,
//                 orientation,
//                 bio,
//             }
//         })
//             .then((res) => {
//                 if (res.status === 200) {
//                     console.log('enregistrement réussi form envoyé');
//                     //setFormSubmit(true);
//                 } else {
//                     console.log("item");
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//                 //setError(true);
//                 // if (err.response.data.error === "password invalide" || err.response.data.error === "Le mail existe deja")
//                 // {
//                     // setError({
//                     //     title: "Erreur de connection",
//                     //     message: err.response.data.error
//                     // })
//                     console.log("Erreur de connection (mdp ou mail)")
//                 // }
//             })
//     };

//     //

//     return (
//         <div>
//             <form onSubmit={update_profil} className='little_form'>
//             <div>
//                 <h5>Prénom</h5>
//                 {userData && userData[0] ? <input className="" type="text" value={name} onChange={(e)=>setName(e.target.value)} id="Prénom" placeholder={userData[0].name} /> : ""}
//             </div>
//             <div>
//                 <h5>Nom</h5>
//                 {userData && userData[0] ? <input className="" type="text" value={firstname} onChange={(e)=>setFirstname(e.target.value)} id="Nom" placeholder={userData[0].firstname} /> : ""}
//             </div>
//             <div>
//                 <h5>Email</h5>
//                 {userData && userData[0] ? <input className="" type="text" value={mail} onChange={(e)=>setMail(e.target.value)} id="Email" placeholder={userData[0].mail} /> : ""}
//             </div>
//             <div>
//                 <h5>genre</h5>
//                 {userData && userData[0] ?
//                 <select name="Genre" className="" value={gender} onChange={(e)=>setGender(e.target.value)} id="genre"> 
//                     <option value={userData[0].gender}>genre</option>
//                     <option>Homme</option>
//                     <option>Femme</option>
//                 </select>
//                 : ""}
//             </div>
//             <div>
//                 <h5>orientation</h5>
//                 {userData && userData[0] ?
//                 <select name="Orientation" className="" value={orientation} onChange={(e)=>setOrientation(e.target.value)} id="orientation">
//                         <option value={userData[0].orientation}>orientation sexuelle</option>
//                         <option>Heterosexuel</option>
//                         <option>Homosexuel</option>
//                         <option>Bisexuel</option>
//                     </select>
//                     : ""}
//             </div>
//             <div>
//                 <h5>bio</h5>
//                 {userData && userData[0] ?
//                 <textarea className="" type="text" defaultValue={bio} placeholder={userData[0].bio} onChange={(e)=>setBio(e.target.value)} id="bio"></textarea>
//                 : ""}
//             </div>
//             <div>
//                 <h5>Photo de profil</h5>
//             </div>
//                 <input type="submit" value="Envoyer"/>
//             </form>
//         </div>
//     );
// };

// export default SettingProfil;