import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "../../Components/map/map"
import "./singleEnterprise.css";

type enterprise = {
  _id: number;
  name: string;
  city: string;
  street: string;
  number: number;
  numberPhone: number;
  email: string;
  description: string;
  rating: number;
  typeOfEnterprises: string;
  logoEnterprise: string;
  voivodeship:string;
  zipCode:string;
  webside:string;
  latitude:number;
  longitude:number;
};

const SingleEnterprise = () => {
  let { name } = useParams();
  const [singleEnterprise, setSingleEnterprises] = useState<enterprise | null>(
    null
  );
  const fetchEnterprises = async () => {
    const jsonEnterprise = await fetch(
      `/enterprises/getEnterpriseByName/${name}`
    );

    const enterprise = await jsonEnterprise.json();
    if (enterprise.length > 0) {
      setSingleEnterprises(enterprise[0]);
    }
  };
  useEffect(() => {
    fetchEnterprises();
  }, []);

  return (
    <>
      <div className="main-container-to-enterprise">
        <div className="entrprise-content">
          <div className="entrprise-header">
            <h5 className="entrprise-title">{singleEnterprise?.name}</h5>
          </div>
          <div className="entrprise-body">
            {/* <!-- Location --> */}
            <div className="block-2">
              <div className="title-section">Dane adresowe:</div>
              <div className="details-section">
              Adres (ulica): {singleEnterprise?.street} Nr. {singleEnterprise?.number}<br/>
              Kod Pocztowy: {singleEnterprise?.zipCode} <br/>
              Miasto: {singleEnterprise?.city} <br/>
              Województwo: {singleEnterprise?.voivodeship}
           
              </div>
            </div>
            {/* <!-- About --> */}
            <div className="block-2">
              <div className="title-section">Dane kontaktowe:</div>
              <div className="details-section">
              Tel: {singleEnterprise?.numberPhone} <br/>
              Email: {singleEnterprise?.email} <br/>
              Strona <a href="{singleEnterprise?.webside}">{singleEnterprise?.webside}</a><br/>
              </div>
            </div>
            {/* <!-- About --> */}
            <div className="block-2">
              <div className="title-section">Opis Firmy:</div>
              <div className="details-section">
                {singleEnterprise?.description}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-enterprise">
          <div className="info-section-card">
            <div className="title-enterprise">
              <h3>{singleEnterprise?.name}</h3>
            </div>
            <div className="contact-card">Dane adresowe:
              {singleEnterprise?.city}
              {singleEnterprise?.city}
              {singleEnterprise?.city}
              Dane kontaktowe:
            </div>
            <div className="information-card">Opis Firmy: {singleEnterprise?.description}</div>
            <div className="information-card">Opis działalności: {singleEnterprise?.description}</div>
          </div>
          <div className="logo-enterpise">LOGO</div>
        </div> */}
        <div className="album-photo">fotki</div>
        <div className="map-section">      
          <Map name={singleEnterprise?.name} city={singleEnterprise?.city} longitude={singleEnterprise?.longitude} latitude={singleEnterprise?.latitude}/>
      </div>
      </div>
    </>
  );
};

export default SingleEnterprise;
