import { useEffect, useState } from "react";
import Select from 'react-select'


type Props = {
    // enterprises: enterprise[];
    setCereal: (cereal:string) => void;
    fetchDatasCereal: (type: string) => void;
    };

type SelectOptionType = {
    label: string;
    value: string;
  };

const FilterPrices = ({setCereal, fetchDatasCereal }:Props) => {

const options = [
    { value: 'ORGBRAS', label: 'Barley' },
    { value: 'DUR', label: 'Durum wheat' },
    { value: 'MAI', label: 'Maize' },
    { value: 'AVO', label: 'Oat' },
    { value: 'SEGPAN', label: 'Rye' },
    { value: 'BLTPAN', label: 'Wheat' },
    { value: 'TRI', label: 'Triticale' },
  ];

    const handleChange = (selectedOption: SelectOptionType | null) => {
      selectedOption && fetchDatasCereal(selectedOption?.value);
      selectedOption && setCereal(selectedOption?.value);
    };

    return (
        <div className="filters">
            <div className="filters__title"></div>
            <div className="filters__list">
                <div className="filters__list__item">
                <Select options={options} onChange={handleChange} placeholder ="Sort by..."/>
                </div>
            </div>
        </div>

  
    );
  };
  
  export default FilterPrices;
  