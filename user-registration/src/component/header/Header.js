import React from 'react';
import {
    Navbar,
    NavbarBrand, NavItem,

} from 'reactstrap';
import './header.scss'
import {LogOut} from "react-feather";
function Header() {

    return (
        <div className='header mt-0 pt-0'>
            <Navbar
                className=""
                color="dark"
                dark
            >
                <NavbarBrand href="/">
                    Welcome ! {localStorage.getItem('UserType')}
                </NavbarBrand>
                <NavbarBrand>
                    <span> Logout <LogOut height={16}/> </span>
                </NavbarBrand>
            </Navbar>
        </div>
    );
}

export default Header;