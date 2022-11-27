import "./add.css";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import AuthLayout from "../../Layout/authLayout";
import MapFromAdd from "../../Components/mapFromAdd/mapFromAdd";
import { validateEmail, validateNotEmptyInput, validateNotEmptyInputWithSpaces, validateNotEmptyNumber, validatePhone, validateZipCode } from "../../Components/inputComponent/validation";
import { FiUpload } from "react-icons/fi";
const Add: React.FC = () => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  // const resetInput = () => {
  //   ref.current.value = "";
  // };

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

  const navigate = useNavigate();
  const [enterpriseName, setEnterpriseName] = useState<string>("");
  const [enterpriseCity, setEnterpriseCity] = useState<string>("");
  const [enterpriseStreet, setEnterpriseStreet] = useState<string>("");
  const [enterpriseNumber, setEnterpriseNumber] = useState("");
  const [enterpriseZipCode, setEnterpriseZipCode] = useState<string>("");
  const [enterprisePhone, setEnterprisePhone] = useState("");
  const [enterpriseEmail, setEnterpriseEmail] = useState<string>("");
  const [enterpriseVoivodeship, setEnterpriseVoivodeship] =
    useState<string>("");
  const [enterpriseDescription, setEnterpriseDescription] =
    useState<string>("");
  const [enterpriseNip, setEnterpriseNip] = useState("");
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
  const [enterpriseLatError, setEnterpriseLatError] = useState<string>("");
  const [enterpriseLngError, setEnterpriseLngError] = useState<string>("");

  const validateInputs = (enterprise:{
   
      name: string,
      city:  string,
      street:  string,
      number:  string,
      zipCode:  string,
      voivodeship:  string,
      numberPhone:  string,
      email:  string,
      nip:  string,
      description:  string,
      logoEnterprise:  string,
      imagesEnterprise:  string,
      lat: number,
      lng: number,
  }) => {
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
    if (!validateNotEmptyInput(enterprise.number)) {
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
    if (!validateNotEmptyInput(enterprise.nip)) {
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
      setEnterpriseLatError("Musisz znależć miejsce na mapie");
      isValid = false;
    } else {
      setEnterpriseLatError("");
    }
    if (!validateNotEmptyNumber(enterprise.lng)) {

      setEnterpriseLngError("Musisz znależć miejsce na mapie");
      isValid = false;
    } else {
      setEnterpriseLngError("");
    }
    return isValid;
  };


  if (dataFromMap) {
    const dataFormLabels = dataFromMap.label.split(", ");
    if (dataFormLabels[dataFormLabels.length - 1] === "Polska") {
      setEnterpriseCity(dataFormLabels[0]);
      setEnterpriseLat(dataFromMap.x);
      setEnterpriseLng(dataFromMap.y);
      if (dataFormLabels.length === 6) {
        setEnterpriseZipCode(dataFormLabels[4]);
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

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEnterpriseLogo(reader.result);
      };
    } else {
      setEnterpriseLogo("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enterprise = {
      name: enterpriseName,
      city: enterpriseCity,
      street: enterpriseStreet,
      number: enterpriseNumber,
      zipCode: enterpriseZipCode,
      voivodeship: enterpriseVoivodeship,
      numberPhone: enterprisePhone,
      email: enterpriseEmail,
      nip: enterpriseNip,
      description: enterpriseDescription,
      logoEnterprise: enterpriseLogo,
      imagesEnterprise: enterpriseImages,
      lat: enterpriseLat,
      lng: enterpriseLng,
    };

    if(validateInputs(enterprise)){
      setLoading(true);

      try {
        const response = await fetch("/enterprises/insertEnterprise", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(enterprise),
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
        <span className="add-title">Add Enterprise</span>
        <form className="add-form" onSubmit={(event) => handleSubmit(event)}>
          <label>Name Enterprise</label>
          <input
            className="add-input"
            type="text"
            onChange={(e) => setEnterpriseName(e.target.value)}
            placeholder="Enter your Name..."
          />
          <span className="add-error">{enterpriseNameError}</span>
          <label>Logo</label>

            <label className="upload-image" htmlFor="logo"><FiUpload/></label>

          <input
            id="logo"
            className="add-input-logo"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleLogoUpload}
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
          <span className="add-error">{enterpriseLatError}</span>
          <label>City</label>
          <input
            className="add-input"
            type="text"
            value={enterpriseCity}
            onChange={(e) => setEnterpriseCity(e.target.value)}
            placeholder="Enter your City..."
          />
          <span className="add-error">{enterpriseCityError}</span>
          <label>Street</label>
          <input
            className="add-input"
            type="text"
            onChange={(e) => setEnterpriseStreet(e.target.value)}
            placeholder="Enter your Street..."
          />
          <span className="add-error">{enterpriseStreetError}</span>
          <label>Number</label>
          <input
            className="add-input"
            type="number"
            onChange={(e) => setEnterpriseNumber(e.target.value)}
            placeholder="Enter your Number..."
          />
          <span className="add-error">{enterpriseNumberError}</span>
          <label>Zip Code</label>
          <input
            className="add-input"
            type="text"
            value={enterpriseZipCode}
            onChange={(e) => setEnterpriseZipCode(e.target.value)}
            placeholder="Enter your Code..."
          />
          <span className="add-error">{enterpriseZipCodeError}</span>
          <label>Number of Phone</label>
          <input
            className="add-input"
            type="tel"
            onChange={(e) => setEnterprisePhone(e.target.value)}
            placeholder="Enter your Phone..."
          />
          <span className="add-error">{enterprisePhoneError}</span>
          <label>Em@il</label>
          <input
            className="add-input"
            type="text"
            onChange={(e) => setEnterpriseEmail(e.target.value)}
            placeholder="Enter your email..."
          />
          <span className="add-error">{enterpriseEmailError}</span>
          <label>Voivodeship</label>
          <select
            className="add-input"
            value={enterpriseVoivodeship}
            onChange={(e) => setEnterpriseVoivodeship(e.target.value)}
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
            onChange={(e) => setEnterpriseDescription(e.target.value)}
            placeholder="Enter your Description..."
          />
          <span className="add-error">{enterpriseDescriptionError}</span>
          <label>NIP</label>
          <input
            className="add-input"
            type="number"
            onChange={(e) => setEnterpriseNip(e.target.value)}
            placeholder="Enter your NIP..."
          />
          <span className="add-error">{enterpriseNipError}</span>
          <label>Images</label>


            <label className="upload-image" htmlFor="images"><FiUpload/></label>

          <input
            id="images"
            className="add-input-images"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleEnterprisesImagesUpload}
            placeholder="Upload photos from enterprise..."
            multiple
            ref={ref}
          />

          <span className="add-error">{enterpriseImagesError}</span>

          {/* <button type="button" className="delete-button" onClick={resetInput}>
            reset
          </button> */}

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
