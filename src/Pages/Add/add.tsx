import "./add.css";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import AuthLayout from "../../Layout/authLayout";

const Add: React.FC = () => {


  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const resetInput = () => {
    ref.current.value="";
  };

  const deleteHandler=(image:any) => {
    setEnterpriseImages(enterpriseImages.filter((e:any) => e !== image));
    URL.revokeObjectURL(image);
  }

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
  const [enterpriseemail, setEnterpriseEmail] = useState<string>("");
  const [enterpriseVoivodeship, setEnterpriseVoivodeship] =
    useState<string>("");
  const [enterpriseDescription, setEnterpriseDescription] =
    useState<string>("");
  const [enterpriseNip, setEnterpriseNip] = useState("");
  const [enterpriseLogo, setEnterpriseLogo] = useState<any|null>();
  const [enterpriseImages, setEnterpriseImages] = useState<any | []>([]);
  const [loading, setLoading] = useState(false);

  const handleEnterprisesImagesUpload = (e: any) => {
    const files = Array.from(e.target.files);
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEnterpriseImages((tmp: any) => [...tmp, reader.result]);
      };
    });
  }
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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const entrprise = {
      name: enterpriseName,
      city: enterpriseCity,
      street: enterpriseStreet,
      number: enterpriseNumber,
      zipCode: enterpriseZipCode,
      voivodeship: enterpriseVoivodeship,
      numberPhone: enterprisePhone,
      email: enterpriseemail,
      nip: enterpriseNip,
      description: enterpriseDescription,
      logoEnterprise: enterpriseLogo,
      imagesEnterprise: enterpriseImages,
    };

    try {
      const response = await fetch("/enterprises/insertEnterprise", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(entrprise),
      });
      setLoading(false);
      const data = await response.json();
      navigate("/search");
      console.log(data.message);
    } catch (error: any) {
      console.log(error);
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
          <label>Logo</label>
          <input
            className="add-input-logo"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleLogoUpload}
          />
          <div>
            {enterpriseLogo ? (
              <>
                <img src={enterpriseLogo} alt="error!" />
              </>
            ) : (
              <p>Logo image upload preview will appear here!</p>
            )}
          </div>
          <label>City</label>
          <input
            className="add-input"
            type="text"
            onChange={(e) => setEnterpriseCity(e.target.value)}
            placeholder="Enter your City..."
          />
          <label>Street</label>
          <input
            className="add-input"
            type="text"
            onChange={(e) => setEnterpriseStreet(e.target.value)}
            placeholder="Enter your Street..."
          />
          <label>Number</label>
          <input
            className="add-input"
            type="number"
            onChange={(e) => setEnterpriseNumber(e.target.value)}
            placeholder="Enter your Number..."
          />
          <label>Zip Code</label>
          <input
            className="add-input"
            type="text"
            onChange={(e) => setEnterpriseZipCode(e.target.value)}
            placeholder="Enter your Code..."
          />
          <label>Number of Phone</label>
          <input
            className="add-input"
            type="tel"
            onChange={(e) => setEnterprisePhone(e.target.value)}
            placeholder="Enter your Phone..."
          />
          <label>Em@il</label>
          <input
            className="add-input"
            type="text"
            onChange={(e) => setEnterpriseEmail(e.target.value)}
            placeholder="Enter your email..."
          />
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

          <label>Description</label>
          <textarea
            rows={20}
            className="add-textarea"
            onChange={(e) => setEnterpriseDescription(e.target.value)}
            placeholder="Enter your Description..."
          />
          <label>NIP</label>
          <input
            className="add-input"
            type="number"
            onChange={(e) => setEnterpriseNip(e.target.value)}
            placeholder="Enter your NIP..."
          />
          <label>Images</label>
          <input
            className="add-input-logo"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleEnterprisesImagesUpload}
            placeholder="Upload photos from enterprise..."
            multiple
            ref={ref}
          />
          <button type="button" className="delete-button" onClick={resetInput}>
            reset
          </button>

          <div className="images">
            {enterpriseImages &&
              enterpriseImages.map((image:any, index:number) => {
                return (
                  <div key={image} className="image">
                    <img src={image} height="200" alt="upload" />
                    <button type="button" onClick={() => deleteHandler(image)}>delete image</button>
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