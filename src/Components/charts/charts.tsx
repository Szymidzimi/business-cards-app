import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import FilterPrices from "../filters/filterPrices";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
    } from 'chart.js';
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
    );

export type cereal={
    memberStateCode: string,
    memberStateName: string,
    beginDate: string,
    endDate: string,
    weekNumber: number,
    price: string,
    unit: string,
    productName: string,
    marketName: string,
    stageName: string,
}
const ChartsComponent = () => {
    
    const [usdCourse, setUsdCourse] = useState<number>(0);
    const [cereal, setCereal] = useState<string>("ORGBRAS");
    const [dataCereal, setDataCereal] = useState<any>([]);

    const getDataToChart = (dataCereal: cereal[]) => {
        const data: any = {
            labels:  dataCereal.map((item:cereal)=>item.beginDate),
            datasets: [
              {
                label:'zboże',
                data: dataCereal.map((item:cereal)=>(parseFloat(item.price.substring(1)))*usdCourse),
                fill: true,
                backgroundColor: "#00000033",
                borderColor: "#278686",

              },
            ],
          Option: {
            legend: {
              labels: {
                fontColor: "blue",
                fontSize: 18
            }
            },
            scales: {
                xAxes: [{
            		ticks: {
                	reverse: true,
                  beginAtZero: true
                }
            }]
              }
          },
        };
        return data;
      };

    const fetchUSDCours=async()=>{
        try{
            const response =await fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json");
            const data = await response.json();  
            setUsdCourse(data.rates[0].mid);
        }catch(error){
            console.log(error);
        }
    }
    const fetchDatasCereal=async(name:string)=>{
        try{
            const response =await fetch(`/prices/getDataSingleCereal/${name}`);
            const data = await response.json();
            setDataCereal(data.reverse());
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUSDCours();
        fetchDatasCereal(cereal);
    }, []);


  return (
    <>
    <FilterPrices setCereal={setCereal} fetchDatasCereal={fetchDatasCereal}/>
    {usdCourse && dataCereal && <Line
        data={getDataToChart(dataCereal)}
      />}
      </>
  );
};


export default ChartsComponent;