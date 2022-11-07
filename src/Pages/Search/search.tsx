import { useEffect, useState } from "react";
import SingleCard from "../../Components/singleCard/singleCard";
import "./search.css";

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
  typeOfEnterprises: string;
  logoEnterprise: imagesType;
  voivodeship:string;
  zipCode:string;
  webside:string;
  latitude:number;
  longitude:number;
  imagesEnterprise:imagesType[]
};

const Search = () => {
  const [enterprises, setEnterprises] = useState<enterprise[]>([]);
  const [searchResult, setSearchResult] = useState<enterprise[]>([]);

//function to sort enterprises by rating
  const sortEnterprisesByRating = (enterprises: enterprise[]) => {
    const sortedEnterprises = enterprises.sort((a, b) => {
      return b.rating - a.rating;
    });
    return sortedEnterprises;
  };
  //function to filter enterprises by name
  const filterEnterprisesByName = (enterprises: enterprise[], name: string) => {
    const filteredEnterprises = enterprises.filter((enterprise) => {
      return enterprise.name.toLowerCase().includes(name.toLowerCase());
    });
    setSearchResult(filteredEnterprises);
  };

  const fetchEnterprises = async () => {
    const jsonEnterprises = await fetch("/enterprises/getEnterprises");
    const enterprises = await jsonEnterprises.json();
    setEnterprises(enterprises);
    setSearchResult(enterprises);
  };
  useEffect(() => {
    fetchEnterprises();
  }, []);

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Wyszukaj"
          className="search-input"
          onChange={(e) => filterEnterprisesByName(enterprises, e.target.value)}
        />
      </div>
      <div className="main-container-enterprise">
        {searchResult.map((enterprise) => (
          <SingleCard
            key={enterprise._id}
            enterprise={enterprise}
          />
        ))}
      </div>
    </>
    //     {enterprises.map((enterprise, index) => (
    //       <SingleCard enterprise={enterprise} key={"enterprise" + index} />
    //     ))}
    //   </div>
    // </>
  );
};

export default Search;
