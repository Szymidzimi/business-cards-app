import React, { useEffect, useState } from "react";
import Filters from "../../Components/filters/filters";
import SearchBar from "../../Components/filters/search";
import Pagination from "../../Components/Pagination/pagination";
import SingleCard from "../../Components/singleCard/singleCard";
import "./search.css";
import Select from "react-select";
import { enterprise } from "../../config/types";
import Modal from "react-modal";
import MapSearch from "../../Components/filters/mapSearch";
import { AiOutlineClose } from "react-icons/ai";

const options = [
  { value: "up", label: "Sortuj według ocen rosnąco" },
  { value: "down", label: "Sortuj według ocen malejąco" },
];

const distanceOptions = [
  { value: "5", label: "5 Km" },
  { value: "15", label: "15 Km" },
  { value: "25", label: "25 Km" },
  { value: "50", label: "50 Km" },
  { value: "75", label: "75 Km" },
  { value: "100", label: "100 Km" },
  { value: "200", label: "200 Km" },
];

type SelectOptionType = {
  label: string;
  value: string;
};

const Search = () => {
  const [enterprises, setEnterprises] = useState<enterprise[]>([]);
  const [searchResult, setSearchResult] = useState<enterprise[]>([]);
  const [sort, setSort] = useState<SelectOptionType | null>(null); //to update state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [distance, setDistance] = useState<number>(200);
  const [latLng, setLatLng] = useState({ lat: 52.229676, lng: 21.012229 });

  //function open Modal

  const openModal = () => {
    setIsOpen(true);
  };

  //function close Modal

  const closeModal = () => {
    setIsOpen(false);
  };

  //function to sort enterprises by rating ascending or descending
  const sortEnterprises = (sort: SelectOptionType | null) => {
    if (sort?.value === "up") {
      const sortedEnterprises = enterprises.sort((a, b) => {
        return a.rating - b.rating;
      });
      console.log(sortedEnterprises);
      setSearchResult(sortedEnterprises);
    } else if (sort?.value === "down") {
      const sortedEnterprises = enterprises.sort((a, b) => {
        return b.rating - a.rating;
      });
      console.log(sortedEnterprises);
      setSearchResult(sortedEnterprises);
    }
    setSort(sort);
  };

  const handleChange = (selectedOption: SelectOptionType | null) => {
    selectedOption && setDistance(parseInt(selectedOption?.value));
  };

  const fetchEnterprisesByDistance = async () => {
    console.log(latLng, distance);

    const jsonEnterprises = await fetch(
      `/enterprises/getEnterpriseByDistance/${latLng.lat}/${latLng.lng}/${distance}`
    );

    const enterprises = await jsonEnterprises.json();
    setEnterprises(enterprises);
    console.log(enterprises);
    setSearchResult(enterprises);
    setCurrentPage(1);
  };

  const fetchEnterprises = async () => {
    const jsonEnterprises = await fetch("/enterprises/getEnterprises");
    const enterprises = await jsonEnterprises.json();
    setEnterprises(enterprises);
    console.log(enterprises);
    setSearchResult(enterprises);
    setCurrentPage(1);
  };
  const fetchEnterprisesByType = async (type: string) => {
    const jsonEnterprises = await fetch(
      `enterprises/getEnterpriseByType/${type}`
    );
    const enterprises = await jsonEnterprises.json();
    setEnterprises(enterprises);
    console.log(enterprises);
    setSearchResult(enterprises);
    setCurrentPage(1);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = searchResult.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    fetchEnterprises();
  }, []);

  return (
    <>
      <div className="filters-container">
        <div className="row-container">
          {enterprises && (
            <SearchBar
              enterprises={enterprises}
              setSearchResult={setSearchResult}
            />
          )}
          <div className="width-select">
            <Select
              options={options}
              onChange={sortEnterprises}
              placeholder="Sortuj według oceny..."
            />
          </div>
          <div>
            <button className="searchLocation" onClick={openModal}>
              Lokalizacja
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <h2>Lokalizacja</h2>
              <div className="flex-butt">
                <button
                  className="button-search"
                  onClick={() => {
                    fetchEnterprisesByDistance();
                    closeModal();
                  }}
                >
                  Szukaj
                </button>
              </div>
              <button className="button-close-modal" onClick={closeModal}>
                <AiOutlineClose></AiOutlineClose>
              </button>
              <Select
                className="index-up"
                options={distanceOptions}
                onChange={handleChange}
                placeholder="Wybierz odleglość ..."
              />
              <MapSearch setLatLng={setLatLng} />
            </Modal>
          </div>
        </div>
        <Filters
          fetchEnterprises={fetchEnterprises}
          fetchEnterprisesByType={fetchEnterprisesByType}
        />
      </div>
      <div className="main-container-enterprise">
        {currentPosts.length > 0 ? (
          currentPosts.map((enterprise) => (
            <SingleCard key={enterprise._id} enterprise={enterprise} />
          ))
        ) : (
          <div className="lack-off">Brak wyszukiwanych wyników.</div>
        )}
      </div>
      <Pagination
        numberOfEnterprises={searchResult.length}
        enterprisesPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default Search;
