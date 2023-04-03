import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar_unlog";
import BarPhotoProfil from "../components/bar-photo-profil";
import Usersdisplay from '../components/usersdisplay';
import '../styles/pages/_home.scss';
import axios from 'axios';

const Home = () => {

    const [users, setUsers] = useState([])

    async function getUsers(){
        try{
            const response = await axios.get('http://localhost:5000/api/user/');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchUsers() {
            const users = await getUsers();
            setUsers(users);
        }
        fetchUsers();
    }, []);

    return (
        <div className="testzuby">
            <Navbar />
            <div className="research-container">
                <div className="box-research-bar">
                    <div className="icone-research"><img className="research-image" src="./img/searching-a-person.svg" height="20" alt="img-search-logo" /></div>
                    <div className="research-bar"><input className="input-research-bar" type="search" placeholder="Recherche un hashtag ..." /></div>
                    <div className="button-research"><button className="real-button-research">Rechercher</button></div>
                </div>
                <div className="container-hashtag"></div>
            </div>
            <Usersdisplay users={users} />
            {/* <div className="container-photo-profil">
                <div className="container-4-profil">
                    <div className="photo-profil">
                        <BarPhotoProfil />
                    </div>
                    <div className="photo-profil">
                        <BarPhotoProfil />
                    </div>
                    <div className="photo-profil">
                        <BarPhotoProfil />
                    </div>
                    <div className="photo-profil">
                        <BarPhotoProfil />
                    </div>
                </div>
                <div className="container-4-profil">
                    <div className="photo-profil">
                        <BarPhotoProfil />
                    </div>
                    <div className="photo-profil">
                        <BarPhotoProfil />
                    </div>
                    <div className="photo-profil">
                        <BarPhotoProfil />
                    </div>
                    <div className="photo-profil">
                        <BarPhotoProfil />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Home;