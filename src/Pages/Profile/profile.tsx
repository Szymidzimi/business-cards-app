import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainProfile from "../../Components/mainProfile/mainProfile";
import Map from "../../Components/map/map"
import Slider from "../../Components/slider/slider";

export type imagesType={
  public_id:string;
  url:string;
}

export type enterprise = {
  _id: number;
  name: string;
  city: string;
  street: string;
  number: number;
  numberPhone: number;
  email: string;
  description: string;
  rating: number;
  typeOfEnterprises: [string];
  logoEnterprise: Object;
  voivodeship:string;
  zipCode:string;
  webside:string;
  latitude:number;
  longitude:number;
  imagesEnterprise:imagesType[]
};

const Profile = () => {
 

  return (
    <>
    <MainProfile/>
    </>
  );
};

export default Profile;
