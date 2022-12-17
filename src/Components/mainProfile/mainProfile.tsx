import "./mainProfile.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { enterprise } from "../filters/filters";
import { useEffect, useState } from "react";
import { getUserData } from "../../config/decodeUser";

const MainProfile = () => {

  const [enterprises, setEnterprises] = useState<enterprise[]>([]);
  

const fetchEnterpriseByOwnerName = async (nameOwner:string) => {
    const response = await fetch(`/enterprises/getEnterpriseByOwner/${nameOwner}`,
  
    );
    const data = await response.json();
    setEnterprises(data);
  };

  
  useEffect(() => {
    const userDataToken = getUserData();
    userDataToken && fetchEnterpriseByOwnerName(userDataToken.id);
    console.log(userDataToken);
  }, []);


  return (
    <>
      <div className="main-container-to-enterprise">
        <div className="container-profile-card">
          <div className="logo-card">
            <img
              src="https://www.pikpng.com/pngl/b/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
              alt="logo"
            ></img>
          </div>
          <div className="info-section-card">
            <div className="title-card">
              <h4>Nazwa użytkownika</h4>
            </div>
            <div className="contact-card">
              <p>Adres mailowy: </p>
              <p>Data założenia konta: </p>
            </div>

            <div className="buttons-card">
              <button
                className="edit-button"
                title="Edit"
                // onClick={() => filterEnterprisesByType("CropProduction")}
              >
                <AiOutlineEdit />
              </button>
              <button
                className="delete-buttonv2"
                title="Delete"
                // onClick={() => filterEnterprisesByType("agriculturalMachinery")}
              >
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        </div>
        <div className="table-section"> 
        {enterprises.map((enterprise) => (  
        <div className="one-line-own"  key={enterprise._id}>
         <div className="one-line-own-text">Name of enterprise:{enterprise.name}</div><div className="button-edit-enterprise"> <button
                className="edit-button"
                title="Edit"
                // onClick={() => filterEnterprisesByType("CropProduction")}
              >
                <AiOutlineEdit />
              </button>
              <button
                className="delete-buttonv2"
                title="Delete"
                // onClick={() => filterEnterprisesByType("agriculturalMachinery")}
              >
                <AiOutlineDelete />
              </button></div>
        </div> ))}  
      </div>
      </div>
    </>
  );
};

export default MainProfile;
