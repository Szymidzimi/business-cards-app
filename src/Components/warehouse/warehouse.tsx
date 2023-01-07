import "./warehouse.css";
import InputComponent from "../inputComponent/inputComponent";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { TokenUserData } from "../../config/decodeUser";
import Modal from "react-modal";
import FilterPrices from "../filters/filterPrices";
import { GiWheat } from "react-icons/gi";

type Props = {
  userDataToken: TokenUserData | null | undefined;
};
// {userDataToken}:Props

const Warehouse = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cereal, setCereal] = useState<string>();
  const [nameOfPlant, setNameOfPlant] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [warehouse, setWarehouse] = useState({
    quantity: 0,
    area: 0,
    date: "",
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWarehouse((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const fetchAddGrain = async () => {
    const grainToSend = {
      nameOfPlant: nameOfPlant,
      quantity: warehouse.quantity,
      area: warehouse.area,
      date: warehouse.date,
    };

    if (
      grainToSend.nameOfPlant ||
      grainToSend.quantity ||
      grainToSend.area ||
      grainToSend.date
    ) {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(grainToSend),
      });
      const data = await response.json();
      console.log(data);
    } else {
      setMessage("Wypełnij wszystkie pola");
    }
  };

  return (
    <>
      <div className="warehouse-of-agricultural-products">
        <div className="warehouse-of-agricultural-products-title">Magazyn</div>
        <div className="warehouse-of-agricultural-products-button-section">
          <div className="warehouse-of-agricultural-products-button-text">
            Dodaj produkty rolne pochodzące z twojej uprawy
          </div>
          <button className="add-button" onClick={openModal}>
            Dodaj
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h2>Produkt rolny pochodzący z twojej uprawy</h2>
          <button className="button-close-modal" onClick={closeModal}>
            <AiOutlineClose></AiOutlineClose>
          </button>

          <FilterPrices setCereal={setCereal} setNameOfPlant={setNameOfPlant} />

          {cereal && (
            <div className="form-warehouse">
              <div className="name-plant">
                <span>
                  Wybrana Roślina: {nameOfPlant}
                  <span className="name-plant-icon">
                    {" "}
                    <GiWheat></GiWheat>
                  </span>
                </span>
              </div>

              <label>Podaj masę w kilogramach</label>
              <input
                className="add-input"
                type="number"
                name="quantity"
                onChange={handleChange}
                placeholder="Masa wyprodukowanego towaru..."
              />
              <label>Podaj areał z jakiego zebrano roślinę w hektarach</label>
              <input
                className="add-input"
                type="number"
                name="area"
                onChange={handleChange}
                placeholder="Areał..."
              />
              <label>Podaj datę zebrania rośliny</label>
              <input
                className="add-input"
                type="date"
                name="date"
                onChange={handleChange}
                placeholder="Data..."
              />
              <label>
                Uzyskana wydajność t/ha:{" "}
                {warehouse.quantity &&
                  warehouse.area &&
                  warehouse.quantity / warehouse.area}
              </label>
              <div className="flex-butt">
                <button
                  className="button-search"
                  onClick={() => {
                    fetchAddGrain();
                    closeModal();
                  }}
                >
                  Dodaj
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Warehouse;
