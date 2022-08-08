import Nav from "./navBar/navbar";


function App() {

  fetch("http://localhost:8080/enterprises/getEnterprises")
  .then((response) => response.json())
  .then((data) => console.log(data));
  return (
    <div>
    <Nav/></div>
    
  );
}

export default App;
