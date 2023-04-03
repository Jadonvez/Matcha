import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import '../styles/components/_Navbar.scss';


const Logout = () => {

    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 });
        }
    };

    const logout = async () => {
        await axios({
            method:'get',
            url: `http://localhost:5000/api/user/logout`,
            withCredentials: true
        })
        .then(() => removeCookie('access-token'))
        .catch((err) => console.log(err))

        window.location = "/";
    }

    return (
            <li className="nav-logo-right" onClick={logout}>Logout</li>
    );
};

export default Logout;