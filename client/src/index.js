// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// //import './styles/index.scss';

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// import React from 'react';
// import App from './App';
// import ReactDOM from "react-dom/client";
// //import { createRoot } from 'react-dom/client';

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
// <React.StrictMode>
// <App />
// </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//import Navbar from "./components/navbar_unlog";
//import reportWebVitals from "./reportWebVitals";

//    devtools
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk, logger))
);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<Router>
				<App />
			</Router>
		</React.StrictMode>
	</Provider>
);

//reportWebVitals();
