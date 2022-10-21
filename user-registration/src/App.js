import './App.css';
import React from "react";
import Login from "./component/auth/login/Login";
import {BrowserRouter as Router,useRoutes} from 'react-router-dom';
import Registration from "./component/auth/registration/registration";

const App  = () => {
    let routes = useRoutes([
        { path: "/", element: <Login /> },
        { path: "component2", element: <Registration /> },
    ]);
    return routes;
};

function AppWrapper () {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper ;
