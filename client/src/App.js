import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Profil from "./pages/Profil"
import SettingProfil from "./pages/SettingProfil"
import EditProfil from "./pages/EditProfil"
import Connection from "./pages/Connection"
import ConfirmEmail from './pages/Confirm_email';

import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';
// import { getLikers } from './actions/liker.actions';

const App = () => {
  const navigate = useNavigate();
  const [uid, setUid] = React.useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async() => {
      await axios({
        method: "get",
        url: `http://localhost:5001/jwtid`,
        withCredentials: true,
      })
      .then((res) => setUid(res.data))
      .catch((err) => {
        console.log("No token react part")
        navigate("/connection"); //redirection general 
    });
    }
    fetchToken();

    if (uid)
      dispatch(getUser(uid))
  }, [uid]);
  
  return (
    <UidContext.Provider value={uid}>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/connection" element={ <Connection />} />
        <Route path="/profil/:id" element={ <Profil />} />
        <Route path="/setting_profil" element={ <SettingProfil />} />
        <Route path="/edit_profil" element={ <EditProfil />} />
        <Route path="/confirm_email" element={ <ConfirmEmail /> } />
      </Routes>
    </UidContext.Provider>
  );
};

export default App;
