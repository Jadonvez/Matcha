import React from 'react';
import '../styles/components/_BarPhotoProfil.scss';

const BarPhotoProfil = () => {
    return (
        <div className="bar-photo-profil">
            <div className="icon-bar"><img src="./img/logo_site.svg" height="24px" alt="logo_site_bar"/></div>
            <div className="icon-bar"><img src="./img/person-circle.svg" height="24px" alt="logo_personcircle_bar"/></div>
        </div>
    );
};

export default BarPhotoProfil;