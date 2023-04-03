import React from 'react';
import '../styles/components/_Navbar.scss';


const DropDownNav = () => {

    return (
        <ul className="dropdown-menu">
            <li className="dropdown-item"><a className="dropdown_menu_link" href="http://localhost:3001/edit_profil">Edit profil</a></li>
            <li className="dropdown-item"><a className="dropdown_menu_link" href="http://localhost:3001/setting_profil">Setting profil</a></li>
        </ul>
    );
};

export default DropDownNav;