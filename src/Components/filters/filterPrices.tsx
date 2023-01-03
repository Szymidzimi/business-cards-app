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
    { value: 'ORGBRAS', label: 'Jęczmień' },
    { value: 'DUR', label: 'Pszenica konsumpcyjna' },
    { value: 'MAI', label: 'Kukurydza' },
    { value: 'AVO', label: 'Owies' },
    { value: 'SEGPAN', label: 'Żyto' },
    { value: 'BLTPAN', label: 'Pszenica' },
    { value: 'TRI', label: 'Pszenżyto' },
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
                <Select options={options} onChange={handleChange} placeholder ="Wybierz uprawę( domyślnie pszenica )..."/>
                </div>
            </div>
        </div>

  
    );
  };
  
  export default FilterPrices;
  