import React from "react";
import { useContext } from "react";
import "../styles/components/_Navbar.scss";
import { UidContext } from "./AppContext";
import Logout from "./Logout";
import DropDownNav from "./DropDownNav";
import { useSelector } from "react-redux";

const Navbar = () => {
	const userData = useSelector((state) => state.userReducer);
	//const uid = useContext(UidContext);
	const uid = localStorage.getItem("token");
	console.log("uid", uid);

	return (
		<nav className="first-nav">
			<div className="nav-title">
				<a href="http://localhost:3001">
					<img
						className="logo-matcha-nav"
						src="../img/logo_site.svg"
						height="30px"
						alt="logo_matcha"
					/>
				</a>
				<h2 className="title-matcha">Matcha</h2>
			</div>
			<ul className="nav-list">
				{uid ? (
					<>
						<li className="nav-logo-right">
							<a className="home_link_nav" href="http://localhost:3001">
								Home
							</a>
							{/* <img src="../img/logo_messagerie.svg" height="20px" alt="message"/> */}
						</li>
						<li className="nav-logo-right">
							<p>Chat</p>
							{/* <img src="../img/logo-notif2.svg" height="24px" alt="login"/> */}
						</li>
						<li className="nav-logo-right">
							{userData && userData[0] ? (
								<a
									className="profil_link_nav"
									href={`http://localhost:3001/profil/${userData[0].id}`}
								>
									Profil
								</a>
							) : (
								<p>Profil</p>
							)}
						</li>
						<Logout />
						<li className="nav-item dropdown">
							<a className="nav-link" href="#">
								{userData && userData[0] ? (
									<img
										src={userData[0].ppicture}
										alt="user-pic"
										height="36px"
										width="36px"
									/>
								) : (
									""
								)}
							</a>
							<DropDownNav />
						</li>
					</>
				) : (
					<></>
					// <li className="nav-logo-login">
					//     <img src="../img/contour-blanc_on.svg" height="30px" alt="login"/>
					// </li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
