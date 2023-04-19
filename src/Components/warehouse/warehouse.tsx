import "./warehouse.css";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";

import { getUserData, TokenUserData } from "../../config/decodeUser";
import Modal from "react-modal";
import FilterPrices from "../filters/filterPrices";
import { GiWheat } from "react-icons/gi";
import { grain } from "../../config/types";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);



const Warehouse = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cereal, setCereal] = useState<string>();
  const [nameOfPlant, setNameOfPlant] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [grains, setGrains] = useState<grain[]>([]);
  const [userDataToken, setUserDataToken] = useState<
    TokenUserData | null | undefined
  >();
  const [warehouse, setWarehouse] = useState({
    quantity: 0,
    area: 0,
    price: 0,
    cropCost: 0,
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

  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  // get data for dougnut chart from grains, count the individual share of crops in the entire warehouse if name of plant is the same

  const data = {
    labels: grains.map((grain: grain) => grain.nameOfPlant),
    datasets: [
      {
        label: "Ilość w kilogramach",
        data: grains.map((grain: grain) => grain.quantity),
        backgroundColor: grains.map((grain: grain) => getRandomColor()),
        hoverOffset: 4,
        borderWidth: 2,
      },
    ],
  };
  const data2 = {
    labels: grains.map((grain: grain) => grain.nameOfPlant),
    datasets: [
      {
        label: "Obszar w hektarach",
        data: grains.map((grain: grain) => grain.area),
        backgroundColor: grains.map((grain: grain) => getRandomColor()),
        hoverOffset: 4,
        borderWidth: 2,
      },
    ],
  };

  const data3 = {
    labels: grains.map((grain: grain) => grain.nameOfPlant),
    datasets: [
      {
        label: "Średenia wydajność w t/ha",
        data: grains.map((grain: grain) => (grain.quantity/1000)/grain.area),
        backgroundColor: grains.map((grain: grain) => getRandomColor()),
        hoverOffset: 4,
        borderWidth: 2,
      },
    ],
  };

  //add all costs multiply by all areas and divide by 1000 to get costs in t/ha


  const koszt = grains.map((grain: grain) => grain.cropCost*grain.area).reduce((a, b) => a + b, 0)
  const zysk = grains.map((grain: grain) => grain.price*grain.quantity).reduce((a, b) => a + b, 0)/1000;
  const data4 = {
    labels: ["Koszt uprawy", "Zysk"],
    datasets: [
      {
        label: "Koszt uprawy i zysk",
        data: [koszt, zysk],
        backgroundColor: ["#FF0000", "#00FF00"],
        hoverOffset: 4,
        borderWidth: 2,

      },
    ],
  };


  const fetchGetGrains = async (userId: string) => {
    const response = await fetch(`/warehouse/getCrops/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGrains(data);
  };

  const fetchAddGrain = async () => {
    const grainToSend = {
      nameOfPlant: nameOfPlant,
      quantity: warehouse.quantity,
      unit: "kg",
      area: warehouse.area,
      price: warehouse.price,
      cropCost: warehouse.cropCost,
      userId: userDataToken?.id,
    };

    if (
      grainToSend.nameOfPlant ||
      grainToSend.quantity!==0 ||
      grainToSend.area!==0 ||
      grainToSend.price!==0
    ) {
      const response = await fetch("/warehouse/insertCrop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(grainToSend),
      });
      const data = await response.json();
      if(data.message === "Uprawa już istnieje") {
        setMessage(data.message);
      } else {
        userDataToken?.id && fetchGetGrains(userDataToken?.id);
        closeModal();
      }
    } else {
      setMessage("Wypełnij wszystkie pola");
    }
    setWarehouse({
      quantity: 0,
      area: 0,
      price: 0,
      cropCost: 0,
    });

  };

  const fetchDeleteGrain = async (id: string) => {
    const response = await fetch(`/warehouse/deleteCrop/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    userDataToken?.id && fetchGetGrains(userDataToken?.id);
  };

  useEffect(() => {
    setUserDataToken(getUserData());
    userDataToken?.id && fetchGetGrains(userDataToken.id);
  }, [userDataToken?.id]);

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
          <h2>Twoja uprawa</h2>
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

              <label>Podaj aktualną cenę za 1 tonę w twojej okolicy</label>
              *Możesz posiłkować sić notowaniami na stronie głównej
              <input
                className="add-input"
                type="number"
                name="price"
                onChange={handleChange}
                placeholder="Cena"
              />
               <label>Podaj szacunkowy koszt poniesiony na hektar uprawy</label>
              <input
                className="add-input"
                type="number"
                name="cropCost"
                onChange={handleChange}
                placeholder="Cena"
              />
              <label>
                Uzyskana wydajność t/ha:
                {warehouse.quantity &&
                  warehouse.area &&
                  (warehouse.quantity/1000) / warehouse.area}
                 t.
              </label>

              {message && <div className="message-crop-warning">{message}!!!</div>}
              <div className="flex-butt">
                <button
                  className="button-search"
                  onClick={() => {
                    fetchAddGrain();
                    
                  }}
                >
                  Dodaj
                </button>
              </div>
            </div>
          )}
        </Modal>

        <div className="table-section">
          <span className="passwordTitle">Twoje plony</span>
          {grains.map((crop: grain, index: number) => (
            <div className="one-line-own" key={index}>
              <div className="one-line-own-text">
                Nazwa rośliny:
                <div className="name-ent-list">{crop.nameOfPlant}</div>
              </div>
              <div className="one-line-own-text">
                Ilość:
                <div className="name-ent-list">
                  {crop.quantity} {crop.unit}
                </div>
              </div>
              <div className="one-line-own-text">
                Areał:
                <div className="name-ent-list">{crop.area} ha</div>
              </div>
              <div className="one-line-own-text">
                Aktualna wartość:
                <div className="name-ent-list">{crop.price *crop.quantity/1000} zł przy cenie {crop.price} zł/t</div>
              </div>
              <div className="button-edit-enterprise">
                <button
                  className="delete-buttonv2"
                  title="Delete"
                  onClick={() => fetchDeleteGrain(crop._id)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="doughnut-crop top-crop">
          <div className="dought-one">
            <label>Ilośc posiadanego zboża z podziałem na rodzaj</label>
            {grains && <Doughnut data={data} />}
          </div>

          <div className="dought-two top-crop">
            <label>Ilośc areału na którym rosły zebrane rośliny</label>
            {grains && <Doughnut data={data2} />}
          </div>
          <div className="dought-three top-crop">
            <label>Srednie wydajności uzyskane dla twoich upraw</label>
            {grains && <Doughnut data={data3} />}
          </div>
          <div className="dought-three top-crop">
            <label>Koszty poniesionej uprawy oraz uzyskany zysk</label>
            {grains && <Doughnut data={data4} />}
          </div>
          </div>

      </div>
    </>
  );
};

export default Warehouse;
