import "./add.css";
import { useNavigate } from "react-router";
import { FormEvent, useRef, useState } from "react";
import AuthLayout from "../../Layout/authLayout";
import MapFromAdd from "../../Components/mapFromAdd/mapFromAdd";
import { validateEmail, validateNotEmptyInput, validateNotEmptyInputWithSpaces, validateNotEmptyNumber, validatePhone, validateZipCode } from "../../Components/inputComponent/validation";
import { FiUpload } from "react-icons/fi";
import { getUserData } from "../../config/decodeUser";
import Select, {  MultiValue } from 'react-select';
import { categoryOptions } from "../../config/categoryValue";

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
  };

  const deleteHandlerLogo = (image: any) => {
    setEnterpriseLogo(null);
    URL.revokeObjectURL(image);
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


  const validateInputs = (enterprise:enterpriseType) => {
    let isValid = true;
    if (validateNotEmptyInputWithSpaces(enterprise.name)) {
      setEnterpriseNameError("Pole nie może być puste");
      isValid = false;
    } else {
      setEnterpriseNameError("");
    }
    if (validateNotEmptyInputWithSpaces(enterprise.city)) {
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
    if (enterprise.logoEnterprise == null) {
      setEnterpriseLogoError("Brak logo");
      isValid = false;
    } else {
      setEnterpriseLogoError("");
    }
    if (enterprise.imagesEnterprise.length === 0) {
      setEnterpriseImagesError("Brak zdjęć");
      isValid = false;
    } else {
      setEnterpriseImagesError("");
    }
    if (!validateNotEmptyNumber(enterprise.lat)) {
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
      setEnterpriseLat(dataFromMap.y);
      setEnterpriseLng(dataFromMap.x);
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
  


  return (
    <AuthLayout>
      <div className="add-enterprise">
        <span className="add-title">Dodaj przedsiębiorstwo</span>
        <form className="add-form" onSubmit={(event) => handleSubmit(event)}>
          <label>Nazwa przedsiębiorstwa</label>
          <input
            className="add-input"
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Wprowadź nazwę..."
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

               <div className="image logo-image">
                <img className="logo-img" src={enterpriseLogo} alt="error!" />
                <button className="delete-button" type="button" onClick={() => deleteHandlerLogo(enterpriseLogo)}>
                      X
                </button>
                </div>

            )}
          </div>
          <div className="map-section">
            <MapFromAdd setDataFromMap={setDataFromMap} city={enterprise.city} />
          </div>
          <span className="add-error">{enterpriseLatLngError}</span>
          <label>Miejscowość</label>
          <input
            className="add-input"
            type="text"
            name="city"
            onChange={handleChange}
            value={enterprise.city}
           
            placeholder="Wprowadź miejscowość..."
          />
          <span className="add-error">{enterpriseCityError}</span>
          <label>Ulica</label>
          <input
            className="add-input"
            type="text"
            name="street"
            onChange={handleChange}
            placeholder="Wprowadź ulicę..."
          />
          <span className="add-error">{enterpriseStreetError}</span>
          <label>Numer posesji</label>
          <input
            className="add-input"
            type="number"
            name="number"
            onChange={handleChange}
            placeholder="Wprowadź numer..."
          />
          <span className="add-error">{enterpriseNumberError}</span>
          <label>Kod pocztowy</label>
          <input
            className="add-input"
            type="text"
            name="zipCode"
            value={enterprise.zipCode}
            onChange={handleChange}
            placeholder="Wprowadź kod pocztowy.."
          />
          <span className="add-error">{enterpriseZipCodeError}</span>
          <label>Numer telefonu</label>
          <input
            className="add-input"
            type="tel"
            name="numberPhone"
            onChange={handleChange}
            placeholder="Wprowadź numer telefonu..."
          />
          <span className="add-error">{enterprisePhoneError}</span>
          <label>Em@il</label>
          <input
            className="add-input"
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Wprowadź email..."
          />
          <span className="add-error">{enterpriseEmailError}</span>
          <label>Województwo</label>
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
          <label>Opis</label>
          <textarea
            rows={20}
            className="add-textarea"
            name="description"
            onChange={handleChange}
            placeholder="Wprowadź Opis..."
          />
           <label>Kategoria</label>
          <Select
                isMulti
                isClearable
                isSearchable
                onChange={updateTypeOfEnterpriseData }
                name="typeOfEnterprise"
                options={categoryOptions}
                // menuIsOpen={menuIsOpen}
                placeholder="Wybierz kategorie..."
              />

          <span className="add-error">{enterpriseDescriptionError}</span>
          <label>NIP</label>
          <input
            className="add-input"
            type="number"
            name="nip"
            onChange={handleChange}
            placeholder="Wprowadź NIP..."
          />
          <span className="add-error">{enterpriseNipError}</span>
          <label>Zdjęcia</label>


            <label className="upload-image" htmlFor="images"><FiUpload/></label>

          <input
            id="images"
            className="add-input-images"
            type="file"
            name="imagesEnterprise"
            accept=".png, .jpg, .jpeg"
            onChange={handleEnterprisesImagesUpload}
            placeholder="Dodaj zdjęcia..."
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
            {loading ? "Ładowanie..." : "Dodaj"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Add;
