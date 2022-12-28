import "./singleCard.css";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { countRating } from "../../config/countRating";
import { enterprise } from "../../config/types";


interface Props {
  enterprise: enterprise;
}

const SingleCard = ({ enterprise }: Props) => {
  return (

    <Link to={`/singleEnterprise/${enterprise.name}`}>
    {/* <Route path="/search/:${enterprise.name}" element={SingleEnterprise} > */}
        <div className="container-single-card">
          <div className="logo-card"><img src={enterprise.logoEnterprise?.url} alt="error"/></div>
          <div className="info-section-card">
            <div className="title-card">
              <h3>{enterprise.name}</h3>
            </div>
            <div className="info-card">
            <Rating
                  iconsCount={6}
                  initialValue={countRating(enterprise)}
                  readonly={true}
                  allowFraction={true}
                  /* Available Props */
            />
            </div>
            <div className="contact-card">Dane kontaktowe: 
            <p>tel:{enterprise.numberPhone}</p><p>Adres:{enterprise.city},{enterprise.street},{enterprise.number}</p></div>
            <div className="next-to">
            </div>
          </div>
        </div>
        {/* </Route> */}
      </Link>
    
  );
};

export default SingleCard;
