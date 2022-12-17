import React, { useEffect, useState } from "react";
import Filters from "../../Components/filters/filters";
import SearchBar from "../../Components/filters/search";
import Pagination from "../../Components/Pagination/pagination";
import SingleCard from "../../Components/singleCard/singleCard";
import "./search.css";
import Select from 'react-select'

export type imagesType={
  public_id:string;
  url:string;
}

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
  voivodeship:string;
  zipCode:string;
  webside:string;
  latitude:number;
  longitude:number;
  imagesEnterprise:imagesType[]
};

const options = [
  { value: 'up', label: 'Sort by rating ascending' },
  { value: 'down', label: 'Sort by rating descending' }
]

type SelectOptionType = {
  label: string;
  value: string;
};

const Search = () => {
  const [enterprises, setEnterprises] = useState<enterprise[]>([]);
  const [searchResult, setSearchResult] = useState<enterprise[]>([]);
  const [sort,setSort] = useState<SelectOptionType | null>(null); //to update state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  

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


  const fetchEnterprises = async () => {
    const jsonEnterprises = await fetch("/enterprises/getEnterprises");
    const enterprises = await jsonEnterprises.json();
    setEnterprises(enterprises);
    console.log(enterprises);
    setSearchResult(enterprises);
    setCurrentPage(1);
  };
  const fetchEnterprisesByType = async (type: string) => {
    const jsonEnterprises = await fetch(`enterprises/getEnterpriseByType/${type}`);
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
     {enterprises && <SearchBar enterprises={enterprises} setSearchResult={setSearchResult} />}
     <div className="width-select"><Select options={options} onChange={sortEnterprises} placeholder ="Sort by..."/>
     </div></div>
     <Filters fetchEnterprises={fetchEnterprises} fetchEnterprisesByType={fetchEnterprisesByType}/>
    </div>
      <div className="main-container-enterprise">
        {currentPosts.map((enterprise) => (
          <SingleCard
            key={enterprise._id}
            enterprise={enterprise}
          />
        ))}
      </div>
      <Pagination
                totalPosts={searchResult.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}                
            />
      

    </>
  );
};

export default Search;
