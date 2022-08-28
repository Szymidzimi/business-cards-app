import { useEffect, useState } from "react";
import SingleCard from "../../Components/singleCard/singleCard";
import "./search.css";

// type Props = {
//   enterprise: {
//     _id: number;
//     name: string;
//     city: string;
//     street: string;
//     number: number;
//     numberPhone: number;
//     email: string;
//     description: string;
//     rating: number;
//     typeOfEnterprises: string;
//   };
// };

const Search = () => {
  const [enterprises, setEnterprises] = useState([]);

  const fetchEnterprises = async () => {
    const jsonEnterprises = await fetch("/enterprises/getEnterprises");
    const enterprises = await jsonEnterprises.json();
    setEnterprises(enterprises);
  };
  useEffect(() => {
    fetchEnterprises();
  }, []);

  return (
    <div className="main-containerv1">
      {enterprises.map((enterprise, index) => (
        <SingleCard enterprise={enterprise} key={"enterprise" + index} />
      ))}
    </div>
  );
};

export default Search;
