import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        <div className="container-enterprise">
          <div className="info-section-card">
            <div className="title-enterprise">
              <h3>{singleEnterprise?.name}</h3>
            </div>
            <div className="information-card">{singleEnterprise?.description}</div>
            <div className="contact-card">kontakt</div>
          </div>
          <div className="logo-enterpise">LOGO</div>
        </div>
        <div className="album-photo">fotki</div>
        <div className="map-section">Mapa</div>
      </div>
    </>
  );
};

export default SingleEnterprise;
