import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo_site.svg";
import { useSelector } from "react-redux";

const Navbar = () => {
	const user = useSelector((state) => state.userReducer);
	const routes = {
		"/chat": "Chat",
		"/profil": "Profil",
		"/settings": "Réglages",
		"/logout": "Deconnexion",
	};
	return (
		<nav>
			<NavLink end to={"/"}>
				<div className="nav-title">
					<img className="logo" src={logo} alt="Logo Matcha" />
					<h2 className="title">Matcha</h2>
				</div>
			</NavLink>
			{user ? (
				<ul className="nav-links">
					{Object.entries(routes).map(([route, name]) => (
						<li key={route}>
							<NavLink className="link" end to={route}>
								{name}
							</NavLink>
						</li>
					))}
				</ul>
			) : (
				<></>
			)}
		</nav>
	);
};

export default Navbar;
