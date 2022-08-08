import "./navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faYoutube,faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function navbar() {
  return (
    <div className="top">
      <div className="topLeft">
        <i className="icon-media"><FontAwesomeIcon icon={faFacebook} /></i>
        <i className="icon-media"><FontAwesomeIcon icon={faYoutube} /></i>
        <i className="icon-media"><FontAwesomeIcon icon={faInstagram} /></i>

      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">HOME</li>
          <li className="topListItem">SEARCH ENTERPRISE</li>
          <li className="topListItem">ADD ENTERPRISE</li>
          <li className="topListItem">SIGN IN</li>
        </ul>
      </div>
      <div className="topRight">
        <img
          className="topImg"
          src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />

        <i className=""><FontAwesomeIcon icon={faSearch} /></i>
      </div>
    </div>
  );
}
