import './App.css';
import React from "react";
import UserLogin from "./component/auth/login/UserLogin";
import {BrowserRouter as Router,useRoutes} from 'react-router-dom';
import Registration from "./component/auth/registration/registration";
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from "./component/auth/login/AdminLogin";
import AdminDashboard from "./component/dashboard/admin-dashboard/AdminDashboard";
const App  = (props) => {
    console.log(props)
    let routes = useRoutes([
        { path: "/", element: <UserLogin /> },
        { path: "login", element: <UserLogin /> },
        { path: "admin-login", element: <AdminLogin /> },
        { path: "registration", element: <Registration /> },
        { path: "admin", element: <AdminDashboard /> },
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
