import "./singleCard.css";
import { Link, Route } from "react-router-dom";
import SingleEnterprise from "../../Pages/SingleEnterprise/singleEnterprise";

export type imagesType={
  public_id:string;
  url:string;
}

type Props = {
  enterprise: {
    _id: number;
  name: string;
  city: string;
  street: string;
  number: number;
  numberPhone: number;
  email: string;
  description: string;
  rating: number;
  typeOfEnterprises: [string];
  logoEnterprise:{
    public_id:string;
    url:string;
  };
  voivodeship:string;
  zipCode:string;
  webside:string;
  };
};



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
            {/* {enterprise.description} */}
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
