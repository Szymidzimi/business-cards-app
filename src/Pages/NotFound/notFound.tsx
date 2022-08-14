import { Link } from "react-router-dom";
import "./notFound.css";
const notFound: React.FC = () => {
 
  return (
    <div className='notFoundContainer'>
      <div className="textMain">
      <h1>404</h1>
      <h3>Page Not Found</h3>
      </div>
      <p>The link you clicked may be broken or the page may have been removed.</p>
      <Link to="./" className='button'>Homepage</Link>
    </div>);
};

export default notFound;
