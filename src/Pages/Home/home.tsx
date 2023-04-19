import { useEffect, useState } from "react";
import ChartsComponent from "../../Components/charts/charts";
import SingleCard from "../../Components/singleCard/singleCard";
import { enterprise } from "../../config/types";



const Home: React.FC = () => {
  const [enterprises, setEnterprises] = useState<enterprise[]>([]);


  const fetchEnterprises = async () => {
    const jsonEnterprises = await fetch("/enterprises/getFourRandomEnterprises");
    const enterprises = await jsonEnterprises.json();
    setEnterprises(enterprises);
  };

  useEffect(() => {
    fetchEnterprises();
    const intervalId = setInterval(() => {
      fetchEnterprises();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);
  return (

      <>
        <ChartsComponent/>

        <div className="main-container-enterprise-in-home">
        <span className="home-Title">Sugerowane</span>
        <div className="main-container-enterprise">
        {
          enterprises && enterprises.map((enterprise) => (
            <SingleCard key={enterprise._id} enterprise={enterprise} />
          ))
        }
      </div>  
      </div>
      </>
  )
};

export default Home;
