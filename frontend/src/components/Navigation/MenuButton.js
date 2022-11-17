import React, { useState, useEffect } from "react";
// import { NavLink } from 'react-router-dom';

import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

import './Navigation.css';

export default function MenuButton({ setIsLoaded }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            // console.log(e.target)
            // console.log(e.target.classList)
            if (!e.target.classList.contains('menu-dropdown')) setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div className="menu-all-wrapper">
            <button className="navBar-button" onClick={openMenu}>
                <div>
                    <i className="fa-solid fa-bars"></i>
                </div>
                {/* <div><span>Menu</span></div> */}
            </button>
            {showMenu && (
                <div className="navlinks">
                    <div className="menu-dropdown">
                        <div className="menu-dropdown-sub">
                            <button onClick={() => setShowSignInModal(true)}><b>Log In</b></button>
                        </div>
                        <div className="menu-dropdown-sub">
                            <button onClick={() => setShowSignUpModal(true)}>Sign up</button>
                        </div>
                    </div>
                </div>
            )}
            {showSignInModal && (
                <Modal onClose={() => setShowSignInModal(false)} >
                    <LoginFormPage setShowSignInModal={setShowSignInModal} setIsLoaded={setIsLoaded} />
                </Modal>
            )}
            {showSignUpModal && (
                <Modal onClose={() => setShowSignUpModal(false)} >
                    <SignupFormPage setShowSignUpModal={setShowSignUpModal} setIsLoaded={setIsLoaded} />
                </Modal>
            )}
        </div>
    )
}