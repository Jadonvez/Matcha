import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar_unlog";
import '../styles/pages/_profil.scss';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInYears } from 'date-fns';
import axios from 'axios';
import { pushLike } from '../actions/user.actions';
import { getLikers } from '../actions/liker.actions';
import { getLikeds } from '../actions/liked.actions';
import { createMatch, getMatchs, deleteMatch, checkMatch } from '../actions/match.actions';

const Profil = () => {
    
    const likedProfiles = useSelector(state => state.likedReducer);
    const likerProfiles = useSelector(state => state.likerReducer);
    const matchProfiles = useSelector(state => state.matchReducer);
    const userData = useSelector((state) => state.userReducer)
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
                setUser(null);
                // afficher/redirect sur une page 404 not found
            }
        };
        
        fetchUser();
    }, [id]);
    
    useEffect(() => {
        if (userData[0])
        {
            setIsLoggedIn(true);
        }
    }, [userData]);

    useEffect(() => {
        if (isLoggedIn)
        {
            dispatch(getLikers(userData[0].uid));            
            dispatch(getLikeds(userData[0].uid));
            dispatch(checkMatch(userData[0].uid, user[0].uid))           
            dispatch(getMatchs(userData[0].uid))          
        }
    }, [dispatch, userData, user,isLoggedIn]);
    
    if (!userData[0] || !user)
    return <div>Chargement...</div>;
    
    let heartImg = null;
    // if (Array.isArray(matchProfiles))
    // {
    //     const matchUser_1 = matchProfiles.findIndex(item => item.uid === user[0].uid);

    // }

    if (Array.isArray(likerProfiles) && Array.isArray(likedProfiles))
    {
        const likerUserIndex = likerProfiles.findIndex(item => item.liker_uid === user[0].uid);
        const userIndex = likedProfiles.findIndex(item => item.liked_uid === user[0].uid);
        if (likerUserIndex !== -1)
        {
          // L'utilisateur est aimé par ce profil
          heartImg = <img src="../img/coeur_liker.svg" alt="liker-heart" height="50px" width="50px" />;
        } 
        else if (userIndex !== -1) {
            // L'utilisateur a aimé ce profil
            heartImg = <img src="../img/coeur_liked.svg" alt="liked-heart" height="50px" width="50px" />;
        }
        else {
          // L'utilisateur n'est pas aimé par ce profil
          heartImg = <img src="../img/coeur_unmatch.svg" alt="nomatch-heart" height="50px" width="50px" /> ;
        }
    }
    // if (Array.isArray(likedProfiles))
    // {
    //     const userIndex = likedProfiles.findIndex(item => item.liked_uid === user[0].uid);
    //     if (userIndex !== -1) {
    //       // L'utilisateur a aimé ce profil
    //       heartImg = <img src="../img/coeur_liked.svg" alt="liked-heart" height="50px" width="50px" />;
    //     } else {
    //       // L'utilisateur n'a pas aimé ce profil
    //       heartImg = <img src="../img/coeur_unmatch.svg" alt="nomatch-heart" height="50px" width="50px" /> ;
    //     }
    //   } else {
    //     // likedProfiles n'est pas un tableau
    //     heartImg = <img src="../img/coeur_unmatch.svg" alt="nomatch-heart" height="50px" width="50px" /> ;
    //   }

        const sendLike = () => {
            dispatch(pushLike(userData[0].uid, user[0].uid));
            if (Array.isArray(likerProfiles))
            {
                const likerUserIndex = likerProfiles.findIndex(item => item.liker_uid === user[0].uid);
                if (likerUserIndex !== -1)
                {
                    //dispatch(deleteMatch(userData[0].uid, user[0].uid))
                    dispatch(createMatch(userData[0].uid, user[0].uid))
                    //console.log("ca passe par le delete match");
                    console.log("ca passe par le create match")
                    setLiked(true);
                }
            }
        }

    return (
        <div>
            <div className="first-profil-container">
            <Navbar />
            <h1>{user && user[0] ? user[0].name+ ' ' + user[0].firstname + ', ' + differenceInYears(new Date() ,new Date(user[0].dob)) : ''}</h1>
            {liked ? "" : <button onClick={sendLike}>like</button>}
            {heartImg}
            <div className="top-profil-container">
                <div className="profil-picture">
                    {user && user[0] ? <img src={user[0].ppicture} alt="user-pic" height="300px" width="300px"/> : '' }
                </div>
                <div className="profil-description">{user && user[0] && user[0].bio !== null ? <p>{user[0].bio}</p> : <p>Ne manquez pas l'occasion de vous présenter et de rencontrer des personnes qui vous correspondent ! </p> }</div>
            </div>
            <p>{user && user[0] ? 'name : ' + user[0].name : ''}</p>
            <p>{user && user[0] ? 'firstname : ' + user[0].firstname : ''}</p>
            <p>{user && user[0] ? 'orientation : ' + user[0].orientation : ''}</p>
            <p>{user && user[0] ? 'gender : ' + user[0].gender : ''}</p>
            </div>

            {/* // try carroussel */}
            <section>
    <div className="container">
        <div className="carousel">
            <input className="input_carousel" type="radio" name="slides" defaultChecked="checked" id="slide-1"/>
            <input className="input_carousel" type="radio" name="slides" id="slide-2"/>
            <input className="input_carousel" type="radio" name="slides" id="slide-3"/>
            <input className="input_carousel" type="radio" name="slides" id="slide-4"/>
            <input className="input_carousel" type="radio" name="slides" id="slide-5"/>
            <ul className="carousel__slides">
                <li className="carousel__slide">
                    <figure>
                        <div>
                            <img src="https://picsum.photos/id/1041/800/450" alt=""/>
                        </div>
                        <figcaption>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            <span className="credit">Photo: Tim Marshall</span>
                        </figcaption>
                    </figure>
                </li>
                <li className="carousel__slide">
                    <figure>
                        <div>
                            <img src="https://picsum.photos/id/1043/800/450" alt=""/>
                        </div>
                        <figcaption>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            <span className="credit">Photo: Christian Joudrey</span>                            
                        </figcaption>
                    </figure>
                </li>
                <li className="carousel__slide">
                    <figure>
                        <div>
                            <img src="https://picsum.photos/id/1044/800/450" alt=""/>
                        </div>
                        <figcaption>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            <span className="credit">Photo: Steve Carter</span>                            
                        </figcaption>
                    </figure>
                </li>
                <li className="carousel__slide">
                    <figure>
                        <div>
                            <img src="https://picsum.photos/id/1045/800/450" alt=""/>
                        </div>
                        <figcaption>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            <span className="credit">Photo: Aleksandra Boguslawska</span>                            
                        </figcaption>
                    </figure>
                </li>
                <li className="carousel__slide">
                    <figure>
                        <div>
                            <img src="https://picsum.photos/id/1049/800/450" alt=""/>
                        </div>
                        <figcaption>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            <span className="credit">Photo: Rosan Harmens</span>                            
                        </figcaption>
                    </figure>
                </li>
            </ul>    
            <ul className="carousel__thumbnails">
                <li>
                    <label htmlFor="slide-1"><img src="https://picsum.photos/id/1041/150/150" alt=""/></label>
                </li>
                <li>
                    <label htmlFor="slide-2"><img src="https://picsum.photos/id/1043/150/150" alt=""/></label>
                </li>
                <li>
                    <label htmlFor="slide-3"><img src="https://picsum.photos/id/1044/150/150" alt=""/></label>
                </li>
                <li>
                    <label htmlFor="slide-4"><img src="https://picsum.photos/id/1045/150/150" alt=""/></label>
                </li>
                <li>
                    <label htmlFor="slide-5"><img src="https://picsum.photos/id/1049/150/150" alt=""/></label>
                </li>
            </ul>
        </div>
    </div>
</section>
        </div>
    );
};

export default Profil;