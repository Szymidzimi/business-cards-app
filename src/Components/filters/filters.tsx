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
        className={filter === "machinery" ? "filter-button-active" : "filter-button"}
          title="Maszyny rolnicze, Narzędzia rolnicze, Serwis, Części"
          onClick={() => filterEnterprisesByType("machinery")}
        >
          <GiFarmTractor />
        </button>
        <button 
        className={filter === "crop" ? "filter-button-active" : "filter-button"}
          title="Produkcja roślinna, Nasiennictwo, Sadownictwo, Nawozy, Uprawa roślin, Środki ochrony roślin"
          onClick={() => filterEnterprisesByType("crop")}
        >
          <GiWheat />
        </button>
        <button 
        className={filter === "animal" ? "filter-button-active" : "filter-button"}
          title="Produkcja zwierzęca, Hodowla zwierząt, Pasze, Leki, Preparaty"
          onClick={() => filterEnterprisesByType("animal")}
        >
          <GiCow />
        </button>
        <button 
        className={filter === "construction" ? "filter-button-active" : "filter-button"}
          title="Budownictwo rolnicze, Obiekty inwentarskie, Wyposażenie budynków rolniczych"
          onClick={() => filterEnterprisesByType("construction")}
        >
          <GiBarn />
        </button>
        <button 
        className={filter === "garden" ? "filter-button-active" : "filter-button"}
          title="Ogrodnictwo, Sprzęt ogrodniczy, Wyposażenie ogrodów, Kwiaty, Aranżacja"
          onClick={() => filterEnterprisesByType("garden")}
        >
          <GiFlowerPot />
        </button>
        <button 
        className={filter === "farms" ? "filter-button-active" : "filter-button"}
          title="Gospodarstwa rolne"
          onClick={() => filterEnterprisesByType("farms")}
        >
          <GiFarmer />
        </button>
        <button
        className={filter === "waste" ? "filter-button-active" : "filter-button"}
          title="Odpady, Czystość, Higiena , Recycling, Opakowania, Folie"
          onClick={() => filterEnterprisesByType("waste")}
        >
          <GiVacuumCleaner />
        </button>
        <button
        className={filter === "wood" ? "filter-button-active" : "filter-button"}
          title="Drewno, Leśnictwo, Grzyby, Pieczarkarnie"
          onClick={() => filterEnterprisesByType("wood")}
        >
          <GiWoodBeam />
        </button>
        <button
        className={filter === "renewableEnergy" ? "filter-button-active" : "filter-button"}
          title="Energia odnawialna, Biopaliwa, Środowisko, Ekologia, Bio, Lab, Badania"
          onClick={() => filterEnterprisesByType("renewableEnergy")}
        >
          <GiEcology />
        </button>
        <button
        className={filter === "ecoFood" ? "filter-button-active" : "filter-button"}
          title="Żywnośc ekologiczna"
          onClick={() => filterEnterprisesByType("ecoFood")}
        >
          <GiFruitBowl />
        </button>
        <button
        className={filter === "agritourism" ? "filter-button-active" : "filter-button"}
          title="Agroturystyka"
          onClick={() => filterEnterprisesByType("agritourism")}
        >
          <BiHotel />
        </button>
        <button
        className={filter === "consulting" ? "filter-button-active" : "filter-button"}
          title="Doradztwo rolnicze, Dotacje dla rolników, Dopłaty dla rolników, Szkolenia, Agencje"
          onClick={() => filterEnterprisesByType("consulting")}
        >
          <HiDocument />
        </button>
        <button
        className={filter === "organizations" ? "filter-button-active" : "filter-button"}
          title="Organizacje rolnicze, zrzeszenia rolników, instytuty; szkolnictwo rolnicze"
          onClick={() => filterEnterprisesByType("organizations")}
        >
          <GoOrganization />
        </button>
        <button
        className={filter === "other" ? "filter-button-active" : "filter-button"}
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
