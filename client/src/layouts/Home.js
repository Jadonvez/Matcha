import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile";
import Chat from "../pages/Chat";
import Matcha from "../pages/Matcha";

const Home = () => {
	const user = useSelector((state) => state.userReducer);

	if (user) {
		return (
			<div>
				<Navbar />
				<Routes>
					<Route path="/" element={<Matcha />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/profil" element={<Profile />} />
				</Routes>
			</div>
		);
	} else {
		return <h1>loading</h1>;
	}
};

export default Home;
