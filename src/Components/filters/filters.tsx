import { BiHotel, BiDotsHorizontalRounded } from "react-icons/bi";
import { HiDocument } from "react-icons/hi";
import { GoOrganization } from "react-icons/go";
import "./styles.css";

import {
  GiWheat,
  GiFarmTractor,
  GiCow,
  GiBarn,
  GiFlowerPot,
  GiFarmer,
  GiVacuumCleaner,
  GiWoodBeam,
  GiEcology,
  GiFruitBowl,
} from "react-icons/gi";
import React from "react";

type Props = {
fetchEnterprises: () => void;
fetchEnterprisesByType: (type: string) => void;
};

export type imagesType = {
  public_id: string;
  url: string;
};

export type enterprise = {
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
  logoEnterprise: imagesType;
  voivodeship: string;
  zipCode: string;
  webside: string;
  latitude: number;
  longitude: number;
  imagesEnterprise: imagesType[];
};
const Filters = ({ fetchEnterprises,fetchEnterprisesByType }: Props) => {
    const [filter, setFilter] = React.useState("");
  const filterEnterprisesByType = (type: string) => {
    setFilter(type);

    if (type === "All") {
        fetchEnterprises();
    } else {
        fetchEnterprisesByType(type);
      };
  };

  return (
    <>
      <div className="filter-buttons">
        <button 
        className={filter === "All" ? "filter-button-active" : "filter-button"} 
        onClick={() => filterEnterprisesByType("All")}>
          All
        </button>
        <button 
        className={filter === "agriculturalMachinery" ? "filter-button-active" : "filter-button"}
          title="Maszyny rolnicze, Narzędzia rolnicze, Serwis, Części"
          onClick={() => filterEnterprisesByType("machinery")}
        >
          <GiFarmTractor />
        </button>
        <button 
        className={filter === "CropProduction" ? "filter-button-active" : "filter-button"}
          title="Produkcja roślinna, Nasiennictwo, Sadownictwo, Nawozy, Uprawa roślin, Środki ochrony roślin"
          onClick={() => filterEnterprisesByType("crop")}
        >
          <GiWheat />
        </button>
        <button 
        className={filter === "AnimalProduction" ? "filter-button-active" : "filter-button"}
          title="Produkcja zwierzęca, Hodowla zwierząt, Pasze, Leki, Preparaty"
          onClick={() => filterEnterprisesByType("animal")}
        >
          <GiCow />
        </button>
        <button 
        className={filter === "agriculturalConstruction" ? "filter-button-active" : "filter-button"}
          title="Budownictwo rolnicze, Obiekty inwentarskie, Wyposażenie budynków rolniczych"
          onClick={() => filterEnterprisesByType("construction")}
        >
          <GiBarn />
        </button>
        <button 
        className={filter === "Gardening" ? "filter-button-active" : "filter-button"}
          title="Ogrodnictwo, Sprzęt ogrodniczy, Wyposażenie ogrodów, Kwiaty, Aranżacja"
          onClick={() => filterEnterprisesByType("garden")}
        >
          <GiFlowerPot />
        </button>
        <button 
        className={filter === "agriculture" ? "filter-button-active" : "filter-button"}
          title="Gospodarstwa rolne"
          onClick={() => filterEnterprisesByType("farms")}
        >
          <GiFarmer />
        </button>
        <button
        className={filter === "Waste" ? "filter-button-active" : "filter-button"}
          title="Odpady, Czystość, Higiena , Recycling, Opakowania, Folie"
          onClick={() => filterEnterprisesByType("waste")}
        >
          <GiVacuumCleaner />
        </button>
        <button
        className={filter === "Wood" ? "filter-button-active" : "filter-button"}
          title="Drewno, Leśnictwo, Grzyby, Pieczarkarnie"
          onClick={() => filterEnterprisesByType("wood")}
        >
          <GiWoodBeam />
        </button>
        <button
        className={filter === "RenewableEnergy" ? "filter-button-active" : "filter-button"}
          title="Energia odnawialna, Biopaliwa, Środowisko, Ekologia, Bio, Lab, Badania"
          onClick={() => filterEnterprisesByType("renewableEnergy")}
        >
          <GiEcology />
        </button>
        <button
        className={filter === "EcoFood" ? "filter-button-active" : "filter-button"}
          title="Żywnośc ekologiczna"
          onClick={() => filterEnterprisesByType("ecoFood")}
        >
          <GiFruitBowl />
        </button>
        <button
        className={filter === "Agritourism" ? "filter-button-active" : "filter-button"}
          title="Agroturystyka"
          onClick={() => filterEnterprisesByType("agritourism")}
        >
          <BiHotel />
        </button>
        <button
        className={filter === "AgriculturalConsulting" ? "filter-button-active" : "filter-button"}
          title="Doradztwo rolnicze, Dotacje dla rolników, Dopłaty dla rolników, Szkolenia, Agencje"
          onClick={() => filterEnterprisesByType("consulting")}
        >
          <HiDocument />
        </button>
        <button
        className={filter === "AgriculturalOrganizations" ? "filter-button-active" : "filter-button"}
          title="Organizacje rolnicze, zrzeszenia rolników, instytuty; szkolnictwo rolnicze"
          onClick={() => filterEnterprisesByType("organizations")}
        >
          <GoOrganization />
        </button>
        <button
        className={filter === "Other" ? "filter-button-active" : "filter-button"}
          title="Inne usługi dla rolnictwa, Hurtownie, Handel rolniczy"
          onClick={() => filterEnterprisesByType("other")}
        >
          <BiDotsHorizontalRounded />
        </button>
      </div>
    </>
  );
};

export default Filters;
