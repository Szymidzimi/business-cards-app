import "./add.css";
import { useNavigate } from "react-router";
import { FormEvent, useEffect, useRef, useState } from "react";
import AuthLayout from "../../Layout/authLayout";
import MapFromAdd from "../../Components/mapFromAdd/mapFromAdd";
import { validateEmail, validateNotEmptyInput, validateNotEmptyInputWithSpaces, validateNotEmptyNumber, validatePhone, validateZipCode } from "../../Components/inputComponent/validation";
import { FiUpload } from "react-icons/fi";
import { getUserData } from "../../config/decodeUser";
import Select, { ActionMeta, InputActionMeta, MultiValue } from 'react-select';
import { CategoryOption, categoryOptions } from "../../config/categoryValue";
import { enterprise } from "../SingleEnterprise/singleEnterprise";

export type imagesType={
  public_id:string;
  url:string;
}

export type enterpriseType = {

  name: string;
  city: string;
  street: string;
  number: number;
  numberPhone: number;
  email: string;
  description: string;
  nip: number;
  typeOfEnterprise:string[];
  logoEnterprise: Object;
  voivodeship:string;
  zipCode:string;
  lat:number;
  lng:number;
  imagesEnterprise:imagesType[]
};

const Add: React.FC = () => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const deleteHandler = (image: any) => {
    setEnterpriseImages(enterpriseImages.filter((e: any) => e !== image));
    URL.revokeObjectURL(image);
    // ref.current.value=enterpriseImages;
  };

  const options = [
    { value: "Dolnośląskie", text: "Dolnośląskie" },
    { value: "Śląskie", text: "Śląskie" },
    { value: "Kujawsko-Pomorskie", text: "Kujawsko-Pomorskie" },
    { value: "Lubelskie", text: "Lubelskie" },
    { value: "Lubuskie", text: "Lubuskie" },
    { value: "Łódzkie", text: "Łódzkie" },
    { value: "Małopolskie", text: "Małopolskie" },
    { value: "Mazowieckie", text: "Mazowieckie" },
    { value: "Opolskie", text: "Opolskie" },
    { value: "Podkarpackie", text: "Podkarpackie" },
    { value: "Podlaskie", text: "Podlaskie" },
    { value: "Pomorskie", text: "Pomorskie" },
    { value: "Świętokrzyskie", text: "Świętokrzyskie" },
    { value: "Warmińsko-Mazurskie", text: "Warmińsko-Mazurskie" },
    { value: "Wielkopolskie", text: "Wielkopolskie" },
    { value: "Zachodnio-Pomorskie", text: "Zachodnio-Pomorskie" },
  ];

  const [enterprise, setEnterprise] = useState<enterpriseType>({
    name: "",
    city:  "",
    street:  "",
    number:  0,
    zipCode:  "",
    voivodeship:  "",
    numberPhone:  0,
    email:  "",
    nip: 0,
    typeOfEnterprise:[],
    description:  "",
    logoEnterprise:  "",
    imagesEnterprise:[],
    lat: 0,
    lng: 0,
  });

  const navigate = useNavigate();

  const [enterpriseLogo, setEnterpriseLogo] = useState<any | null>();
  const [enterpriseImages, setEnterpriseImages] = useState<any | []>([]);
  const [enterpriseLat, setEnterpriseLat] = useState<number>(0);
  const [enterpriseLng, setEnterpriseLng] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [dataFromMap, setDataFromMap] = useState<any | null>(null);

  const [enterpriseNameError, setEnterpriseNameError] = useState<string>("");
  const [enterpriseCityError, setEnterpriseCityError] = useState<string>("");
  const [enterpriseStreetError, setEnterpriseStreetError] =

    useState<string>("");
  const [enterpriseNumberError, setEnterpriseNumberError] =
    useState<string>("");
  const [enterpriseZipCodeError, setEnterpriseZipCodeError] =
    useState<string>("");
  const [enterprisePhoneError, setEnterprisePhoneError] =
    useState<string>("");
  const [enterpriseEmailError, setEnterpriseEmailError] =
    useState<string>("");
  const [enterpriseVoivodeshipError, setEnterpriseVoivodeshipError] =
    useState<string>("");
  const [enterpriseDescriptionError, setEnterpriseDescriptionError] =
    useState<string>("");
  const [enterpriseNipError, setEnterpriseNipError] = useState<string>("");
  const [enterpriseLogoError, setEnterpriseLogoError] = useState<string>("");
  const [enterpriseImagesError, setEnterpriseImagesError] = useState<string>("");
  const [enterpriseLatLngError, setEnterpriseLatLngError] = useState<string>("");
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>();
   const [typeOfEnterprises, setTypeOfEnterprises] = useState<any>();

  const validateInputs = (enterprise:enterpriseType) => {
    let isValid = true;
    if (validateNotEmptyInputWithSpaces(enterprise.name)) {
      console.log(enterprise.name);
      setEnterpriseNameError("Pole nie może być puste");
      isValid = false;
    } else {
      setEnterpriseNameError("");
    }
    if (!validateNotEmptyInput(enterprise.city)) {
      setEnterpriseCityError("Pole nie może być puste");
      isValid = false;
    } else {
      setEnterpriseCityError("");
    }
    if (validateNotEmptyInputWithSpaces(enterprise.street)) {
      setEnterpriseStreetError("Pole nie może być puste");
      isValid = false;
    } else {
      setEnterpriseStreetError("");
    }
    if (!validateNotEmptyNumber(enterprise.number)) {
      setEnterpriseNumberError("Pole nie może być puste");
      isValid = false;
    } else {
      setEnterpriseNumberError("");
    }
    if (!validateZipCode(enterprise.zipCode)) {
      setEnterpriseZipCodeError("Niepoprawny kod pocztowy");
      isValid = false;
    } else {
      setEnterpriseZipCodeError("");
    }
    if (!validatePhone(enterprise.numberPhone)) {
      console.log((!validatePhone(enterprise.numberPhone)));
      setEnterprisePhoneError("Niepoprawny numer telefonu");
      isValid = false;
    } else {
      setEnterprisePhoneError("");
    }
    if (!validateEmail(enterprise.email)) {
      setEnterpriseEmailError("Niepoprawny adres email");
      isValid = false;
    } else {
      setEnterpriseEmailError("");
    }
    if (!validateNotEmptyInput(enterprise.voivodeship)) {
      setEnterpriseVoivodeshipError("Pole nie może być puste");
      isValid = false;
    } else {
      setEnterpriseVoivodeshipError("");
    }
    if (validateNotEmptyInputWithSpaces(enterprise.description)) {
      setEnterpriseDescriptionError("Pole nie może być puste");
      isValid = false;
    } else {
      setEnterpriseDescriptionError("");
    }
    if (!validateNotEmptyNumber(enterprise.nip)) {
      setEnterpriseNipError("Pole nie może być puste");

      isValid = false;
    } else {
      setEnterpriseNipError("");
    }
    // if (!validateNotEmptyInput(enterprise.logoEnterprise)) {
    //   setEnterpriseLogoError("Pole nie może być puste");
    //   isValid = false;
    // } else {
    //   setEnterpriseLogoError("");
    // }
    // if (!validateNotEmptyInput(enterprise.imagesEnterprise)) {
    //   setEnterpriseImagesError("Pole nie może być puste");
    //   isValid = false;
    // } else {
    //   setEnterpriseImagesError("");
    // }
    if (!validateNotEmptyNumber(enterprise.lat)) {
      console.log(enterprise.lat);
      setEnterpriseLatLngError("Musisz znależć miejsce na mapie");
      isValid = false;
    } else {
      setEnterpriseLatLngError("");
    }

    return isValid;
  };


  if (dataFromMap) {
    const dataFormLabels = dataFromMap.label.split(", ");
    if (dataFormLabels[dataFormLabels.length - 1] === "Polska") {
      enterprise.city=dataFormLabels[0];
      setEnterpriseLat(dataFromMap.x);
      setEnterpriseLng(dataFromMap.y);
      if (dataFormLabels.length === 6) {
        enterprise.zipCode=dataFormLabels[4];
      }
      setDataFromMap(null);
    }
  }

  const handleEnterprisesImagesUpload = (e: any) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setEnterpriseImagesError("Możesz dodać maksymalnie 3 zdjęcia");
    } else {
      files.forEach((file: any) => {
        if (file.size / 1024 / 1024 > 2) {
          setEnterpriseImagesError("Maksymalny rozmiar zdjęcia to 2MB");
        } else {
          setEnterpriseImagesError("");
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setEnterpriseImages((tmp: any) => [...tmp, reader.result]);
          };
        }
      });
    }
  };

  const handleLogoUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file && file.size / 1024 / 1024 < 3) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEnterpriseLogo(reader.result);
      };
    } else {
      setEnterpriseLogo("");
      setEnterpriseLogoError("Maksymalny rozmiar zdjęcia to 3MB");
    }
  };

  // const [lat,setLat]=useState<number>()
  // const [lon,setLon]=useState<number>()

  // useEffect(()=>{
  //     navigator.geolocation.getCurrentPosition((postion)=>{
  //         setLat(postion.coords.latitude)
  //         setLon(postion.coords.longitude)
  //     })
  // })
  // console.log(lat,lon);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLTextAreaElement>) => 
  setEnterprise(prevState => ({...prevState, [e.target.name]: e.target.value}))

  const updateTypeOfEnterpriseData = (
    typeOfEnterprise: MultiValue<{ value: string; label: string }>
  ) => {
    let typeOfEnterpriseClean: string[] = typeOfEnterprise.map(
      (toe) => toe.value
    );
    setEnterprise({ ...enterprise, typeOfEnterprise: typeOfEnterpriseClean });
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enterpriseToSend = {
      name: enterprise.name,
      city: enterprise.city,
      street: enterprise.street,
      number: enterprise.number,
      zipCode: enterprise.zipCode,
      voivodeship: enterprise.voivodeship,
      numberPhone: enterprise.numberPhone,
      email: enterprise.email,
      nip: enterprise.nip,
      description: enterprise.description,
      logoEnterprise: enterpriseLogo,
      imagesEnterprise: enterpriseImages,
      lat: enterpriseLat,
      lng: enterpriseLng,
      typeOfEnterprise: enterprise.typeOfEnterprise,
    };
    const userDataToken = getUserData();


    if(validateInputs(enterpriseToSend)&& userDataToken){
      setLoading(true);
  

      try {
        const response = await fetch("/enterprises/insertEnterprise", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          // body: JSON.stringify(enterpriseToSend),
          body: JSON.stringify({...enterpriseToSend, creatorId: userDataToken.id}),

        });
        setLoading(false);

        const data = await response.json();
        navigate("/search");
        console.log(data.message);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  // const onInputChange = (
  //   inputValue: string,
  //   { action, prevInputValue }: InputActionMeta
  // ) => {
  //   if (action === "input-change") return inputValue;
  //   if (action === "menu-close") {
  //     if (prevInputValue) setMenuIsOpen(true);
  //     else setMenuIsOpen(undefined);
  //   }
  //   // setEnterprise(prevState => ({...prevState, typeOfEnterprises: inputValue}))
  //   console.log(action);
  //   // setEnterprise(enterprise, typeOfEnterprises[]: prevInputValue})
  // };
  // function handleSelect(data:any) {
  //   console.log(data);
  //   setTypeOfEnterprises(data)
  //   console.log(typeOfEnterprises)
  // }

//function to handle the change of the select and save data to array enterprise.typeOfEnterprises
  // const handleSelect = (e: any) => {
  //   console.log(e)
  //   setEnterprise(prevState => ({...prevState, typeOfEnterprises: e}))
  //   console.log(enterprise);
  // }


  return (
    <AuthLayout>
      <div className="add-enterprise">
        <span className="add-title">Add Enterprise</span>
        <form className="add-form" onSubmit={(event) => handleSubmit(event)}>
          <label>Name Enterprise</label>
          <input
            className="add-input"
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter your Name..."
          />
          <span className="add-error">{enterpriseNameError}</span>
          <label>Logo</label>

            <label className="upload-image" htmlFor="logo"><FiUpload/></label>

          <input
            id="logo"
            className="add-input-logo"
            type="file"
            onChange={handleLogoUpload}
            accept=".png, .jpg, .jpeg"
          />
          <span className="add-error">{enterpriseLogoError}</span>
          <div className="previewLogo">
            {enterpriseLogo && (
              <>
                <img className="image" src={enterpriseLogo} alt="error!" />
              </>
            )}
          </div>
          <div className="map-section">
            <MapFromAdd setDataFromMap={setDataFromMap} />
          </div>
          <span className="add-error">{enterpriseLatLngError}</span>
          <label>City</label>
          <input
            className="add-input"
            type="text"
            name="city"
            onChange={handleChange}
            value={enterprise.city}
           
            placeholder="Enter your City..."
          />
          <span className="add-error">{enterpriseCityError}</span>
          <label>Street</label>
          <input
            className="add-input"
            type="text"
            name="street"
            onChange={handleChange}
            placeholder="Enter your Street..."
          />
          <span className="add-error">{enterpriseStreetError}</span>
          <label>Number</label>
          <input
            className="add-input"
            type="number"
            name="number"
            onChange={handleChange}
            placeholder="Enter your Number..."
          />
          <span className="add-error">{enterpriseNumberError}</span>
          <label>Zip Code</label>
          <input
            className="add-input"
            type="text"
            name="zipCode"
            value={enterprise.zipCode}
            onChange={handleChange}
            placeholder="Enter your Code..."
          />
          <span className="add-error">{enterpriseZipCodeError}</span>
          <label>Number of Phone</label>
          <input
            className="add-input"
            type="tel"
            name="numberPhone"
            onChange={handleChange}
            placeholder="Enter your Phone..."
          />
          <span className="add-error">{enterprisePhoneError}</span>
          <label>Em@il</label>
          <input
            className="add-input"
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email..."
          />
          <span className="add-error">{enterpriseEmailError}</span>
          <label>Voivodeship</label>
          <select
            className="add-input"
            name="voivodeship"
            value={enterprise.voivodeship}
            onChange={handleChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <span className="add-error">{enterpriseVoivodeshipError}</span>
          <label>Description</label>
          <textarea
            rows={20}
            className="add-textarea"
            name="description"
            onChange={handleChange}
            placeholder="Enter your Description..."
          />
           <label>Category</label>
          <Select
                isMulti
                isClearable
                isSearchable
                onChange={updateTypeOfEnterpriseData }
                name="typeOfEnterprise"
                options={categoryOptions}
                // menuIsOpen={menuIsOpen}
              />

          <span className="add-error">{enterpriseDescriptionError}</span>
          <label>NIP</label>
          <input
            className="add-input"
            type="number"
            name="nip"
            onChange={handleChange}
            placeholder="Enter your NIP..."
          />
          <span className="add-error">{enterpriseNipError}</span>
          <label>Images</label>


            <label className="upload-image" htmlFor="images"><FiUpload/></label>

          <input
            id="images"
            className="add-input-images"
            type="file"
            name="imagesEnterprise"
            accept=".png, .jpg, .jpeg"
            onChange={handleEnterprisesImagesUpload}
            placeholder="Upload photos from enterprise..."
            multiple
            ref={ref}
          />

          <span className="add-error">{enterpriseImagesError}</span>

          <div className="previewImages">
            {enterpriseImages &&
              enterpriseImages.map((image: any, index: number) => {
                return (
                  <div key={image} className="image">
                    <img src={image} alt="upload" />
                    <button className="delete-button" type="button" onClick={() => deleteHandler(image)}>
                      X
                    </button>
                  </div>
                );
              })}
          </div>
          
          <button className="add-button">
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Add;
