import React, {  useEffect, useState } from 'react'
import './Nav.css';

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            }
            else {
                handleShow(false);
            }
        });

        return () => {
            window.removeEventListener();
        }
    }, [])

    return (
        <div className={`nav ${show && "nav__black"} `}>
            <img className="nav__logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="Netflix" />
            <img className="nav__avtar" src="https://secure.gravatar.com/avatar/9ec87f6d30c54d6d1162f7a9ad4da4d9.jpg?s=150"  alt="Avatar"/>
        </div>
    )
}

export default Nav
