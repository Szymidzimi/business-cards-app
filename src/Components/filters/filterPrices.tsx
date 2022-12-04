import { useEffect, useState } from "react";
import Select from 'react-select'

type SelectOptionType = {
    label: string;
    value: string;
  };

const FilterPrices: React.FC = () => {

const options = [
    { value: 'Barley', label: 'Barley' },
    { value: 'Durum wheat', label: 'Durum wheat' },
    { value: 'Maize', label: 'Maize' },
    { value: 'Oat', label: 'Oat' },
    { value: 'Other cereals', label: 'Other cereals' },
    { value: 'Rye', label: 'Rye' },
    { value: 'Soft wheat', label: 'Soft wheat' },
    { value: 'Sorghum', label: 'Sorghum' },
    { value: 'Triticale', label: 'Triticale' },
  ];

    const [selectedOption, setSelectedOption] = useState<string>(options[0].value);
    const [usdCourse, setUsdCourse] = useState<number>(0);

    const handleChange = (selectedOption: SelectOptionType | null) => {
       selectedOption && setSelectedOption(selectedOption?.value);
    };
    
    const fetchUsdCourse=async()=>{
        try{
            const response =await fetch("https://api.exchangeratesapi.io/latest?base=USD");
            const data = await response.json();
            setUsdCourse(data.rates.USD);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUsdCourse()
    }, []);


    return (
        <div className="filters">
            <div className="filters__title">Filters</div>
            <div className="filters__list">
                <div className="filters__list__item">
                <Select options={options} onChange={handleChange} placeholder ="Sort by..."/>
                </div>
            </div>
        </div>

  
    );
  };
  
  export default FilterPrices;
  