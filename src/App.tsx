import Nav from "./Components/navBar/navbar";

import React from "react";
import {BrowserRouter, Routes, Route  } from 'react-router-dom'
import Home from "./Pages/Home/home";
import Search from "./Pages/Search/search";
import Add from "./Pages/Add/add";
import Sign from "./Pages/Sign/sign";

function App() {

  // fetch("http://localhost:8080/enterprises/getEnterprises")
  // .then((response) => response.json())
  // .then((data) => console.log(data));
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        
        <Route path="/" element ={<Home/>}/>
        <Route path="/search"element ={<Search/>}/>
        <Route path="/add" element ={<Add/>}/>
        <Route path="/sign" element ={<Sign/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
