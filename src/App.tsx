import Nav from "./Components/navBar/navbar";

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Search from "./Pages/Search/search";
import Add from "./Pages/Add/add";
import Sign from "./Pages/Sign/sign";
import Register from "./Pages/Register/register";
import NotFound from "./Pages/NotFound/notFound";
import SingleEnterprise from "./Pages/SingleEnterprise/singleEnterprise";
// import AuthWrapper from "./Pages/AuthWrapper/authWrapper";


function App() {
  return (
    // <AuthWrapper>
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/add" element={<Add />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/register" element={<Register />} />
        <Route path="/singleEnterprise/:name" element={<SingleEnterprise />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </>
    // </AuthWrapper>
  );
}

export default App;
