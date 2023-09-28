import { Route, Routes } from "react-router-dom";
import Connection from "../pages/Connection";
import Connected from "../wrappers/Connected";
import Logout from "../pages/Logout";
import ConfirmEmail from "../pages/ConfirmEmail";

function App() {
	return (
		<Routes>
			<Route path="*" element={<Connected />} />
			<Route path="/logout" element={<Logout />} />
			<Route path="/confirm_email" element={<ConfirmEmail />} />
			<Route path="/connexion" element={<Connection />} />
		</Routes>
	);
}

export default App;
