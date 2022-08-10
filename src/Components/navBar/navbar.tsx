import "./navbar.css";
import React, { useState } from "react"
import {Link} from "react-router-dom";
import {faBars,faTimes} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import React, { useRef } from "react";
const Navbar: React.FC = () => {
  // const navRef = useRef<HTMLElement>(null);

  // const showNavbar = () => {
  //   if (!navRef.current) {
  //     return;
  //   }
  //   navRef.current.classList.toggle("hideNav");
  // };
  const [Mobile, setMobile] = useState(false)
  return (
    <header>
    <nav>
      <h3 className="logo">Logo</h3>
       <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
          <Link to='/'><li className="topListItem">HOME</li></Link>
          <Link to='/search'><li className="topListItem">SEARCH ENTERPRISE</li></Link>
          <Link to='/add'><li className="topListItem">ADD ENTERPRISE</li></Link>
          <Link to='/sign'><li className="topListItem">SIGN IN</li></Link>
        </ul>
        <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
          {Mobile ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
    </nav>
    </header>


    // <header>
    //   <a href="/#" className="logo">
    //     <span>C</span>ards<span>O</span>f<span>agriculture</span>
    //   </a>
    //   <nav ref={navRef}>
    //     <a href="/#">HOME</a>
    //     <a href="/#">SEARCH ENTERPRISE</a>
    //     <a href="/#">ADD ENTERPRISE</a>
    //     <a href="/#">SIGN IN</a>
    //     <button className="nav-btn nav-close-btn" onClick={showNavbar}>
    //       <FontAwesomeIcon icon={faTimes} />
    //     </button>
    //   </nav>
    //   <button className="nav-btn" onClick={showNavbar}>
        
    //     <FontAwesomeIcon icon={faBars} />
    //   </button>
    // </header>
    
  );
};

export default Navbar;
