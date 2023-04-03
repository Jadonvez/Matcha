import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar_unlog";
import '../styles/pages/_profil.scss';
import { useSelector } from 'react-redux';
import { differenceInYears } from 'date-fns';
import axios from 'axios';

const Profil = () => {

    const userData = useSelector((state) => state.userReducer)
    const [user, setUser] = useState(null);
    const { id } = useParams();

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

    if (!userData[0] || !user)
        return <div>Chargement...</div>;

    return (
        <div>
            <div className="first-profil-container">
            <Navbar />
            <h1>{user && user[0] ? user[0].name+ ' ' + user[0].firstname + ', ' + differenceInYears(new Date() ,new Date(user[0].dob)) : ''}</h1>
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
    <div class="container">
        <div class="carousel">
            <input className="input_carousel" type="radio" name="slides" checked="checked" id="slide-1"/>
            <input className="input_carousel" type="radio" name="slides" id="slide-2"/>
            <input className="input_carousel" type="radio" name="slides" id="slide-3"/>
            <input className="input_carousel" type="radio" name="slides" id="slide-4"/>
            <input className="input_carousel" type="radio" name="slides" id="slide-5"/>
            <ul class="carousel__slides">
                <li class="carousel__slide">
                    <figure>
                        <div>
                            <img src="https://picsum.photos/id/1041/800/450" alt=""/>
                        </div>
                        <figcaption>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            <span class="credit">Photo: Tim Marshall</span>
                        </figcaption>
                    </figure>
                </li>
                <li class="carousel__slide">
                    <figure>
                        <div>
                            <img src="https://picsum.photos/id/1043/800/450" alt=""/>
                        </div>
                        <figcaption>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            <span class="credit">Photo: Christian Joudrey</span>                            
                        </figcaption>
                    </figure>
                </li>
                <li class="carousel__slide">
                    <figure>
                        <div>
                            <img src="https://picsum.photos/id/1044/800/450" alt=""/>
                        </div>
                        <figcaption>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            <span class="credit">Photo: Steve Carter</span>                            
                        </figcaption>
                    </figure>
                </li>
                <li class="carousel__slide">
                    <figure>
                        <div>
                            <img src="https://picsum.photos/id/1045/800/450" alt=""/>
                        </div>
                        <figcaption>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            <span class="credit">Photo: Aleksandra Boguslawska</span>                            
                        </figcaption>
                    </figure>
                </li>
                <li class="carousel__slide">
                    <figure>
                        <div>
                            <img src="https://picsum.photos/id/1049/800/450" alt=""/>
                        </div>
                        <figcaption>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            <span class="credit">Photo: Rosan Harmens</span>                            
                        </figcaption>
                    </figure>
                </li>
            </ul>    
            <ul class="carousel__thumbnails">
                <li>
                    <label for="slide-1"><img src="https://picsum.photos/id/1041/150/150" alt=""/></label>
                </li>
                <li>
                    <label for="slide-2"><img src="https://picsum.photos/id/1043/150/150" alt=""/></label>
                </li>
                <li>
                    <label for="slide-3"><img src="https://picsum.photos/id/1044/150/150" alt=""/></label>
                </li>
                <li>
                    <label for="slide-4"><img src="https://picsum.photos/id/1045/150/150" alt=""/></label>
                </li>
                <li>
                    <label for="slide-5"><img src="https://picsum.photos/id/1049/150/150" alt=""/></label>
                </li>
            </ul>
        </div>
    </div>
</section>
        </div>
    );
};

export default Profil;