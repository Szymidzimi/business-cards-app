
import React, { useState } from "react";

type Props = {
  enterprises: enterprise[];
  setSearchResult: (searchResult: enterprise[]) => void;
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

const SearchBar=({enterprises ,setSearchResult}:Props) => {

  const filterEnterprisesByName = (name: string) => {

    const filteredEnterprises = enterprises.filter((enterprise) => {
      return enterprise.name.toLowerCase().includes(name.toLowerCase());
    });
    setSearchResult(filteredEnterprises);
  };

  return (
    <>
    <div className="search-container">
    <input
      type="text"
      placeholder="Wyszukaj"
      className="search-input"
      onChange={(e) => filterEnterprisesByName(e.target.value)}
    />
  </div>
    </>
  );
};

export default SearchBar;
