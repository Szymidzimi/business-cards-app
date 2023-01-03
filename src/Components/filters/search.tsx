
import { enterprise } from "../../config/types";

type Props = {
  enterprises: enterprise[];
  setSearchResult: (searchResult: enterprise[]) => void;
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
