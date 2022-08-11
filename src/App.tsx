import Nav from "./Components/navBar/navbar";

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Search from "./Pages/Search/search";
import Add from "./Pages/Add/add";
import Sign from "./Pages/Sign/sign";
import NotFound from "./Pages/NotFound/notFound";


function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/add" element={<Add />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
