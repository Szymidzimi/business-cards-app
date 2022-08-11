
const Search: React.FC = () => {

  fetch("http://localhost:8080/enterprises/getEnterprises")
  .then((response) => response.json())
  // .then((data) => console.log(data));
 
  return (
    <div className='hero'><h2>search</h2></div>);
};

export default Search;
