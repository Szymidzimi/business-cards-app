import "./navbar.css";
import React, { useState } from "react"
import {Link, useNavigate} from "react-router-dom";
import {faBars,faTimes} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FaUserCircle} from "react-icons/fa"
import { getUserData } from "../../config/decodeUser";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  // const [userDataToken, setUserDataToken] = useState<TokenUserData | null| undefined>();


  const [Mobile, setMobile] = useState(false)

  // const getUserData = (): TokenUserData | null => {
  //   const token = localStorage.getItem("token")?.replace("Bearer ", "");
  //   if (token) {
  //     const user: TokenUserData = jwtDecode(token);
  //     return user
  //   //   return { id: user.id, username: user.userName};
  //   }
  //   return null;
  // };

  return (
    <header>
    <nav>
    <Link to='/'><h3 className="logo">AgroHand</h3></Link>
       <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
          <Link to='/'><li className="topListItem">HOME</li></Link>
          <Link to='/search'><li className="topListItem">SEARCH ENTERPRISE</li></Link>
          <Link to='/add'><li className="topListItem">ADD ENTERPRISE</li></Link>
          {/* {(localStorage.getItem('token'))?<Link to='/profile'><li className="topListUser"><FaUserCircle size={40}></FaUserCircle></li></Link>:<Link to='/sign'><li className="topListItem">SIGN IN</li></Link>}*/}
          {(localStorage.getItem('token'))?<Link to='/profile'><li><div className="topListUser"><FaUserCircle size={40}></FaUserCircle><div className="user-name">{getUserData()?.username}</div></div></li></Link>:<Link to='/sign'><li className="topListItem">SIGN IN</li></Link>} 

        </ul>
        <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
          {Mobile ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
    </nav>
    </header>
  );
};

export default Navbar;
