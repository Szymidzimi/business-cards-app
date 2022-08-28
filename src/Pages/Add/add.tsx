import "./add.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Add: React.FC = () => {
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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [enterpriseName, setEnterpriseName] = useState<string>("");
  const [enterpriseCity, setEnterpriseCity] = useState<string>("");
  const [enterpriseStreet, setEnterpriseStreet] = useState<string>("");
  const [enterpriseNumber, setEnterpriseNumber] = useState("");
  const [enterpriseZipCode, setEnterpriseZipCode] = useState<string>("");
  const [enterprisePhone, setEnterprisePhone] = useState("");
  const [enterpriseemail, setEnterpriseEmail] = useState<string>("");
  const [enterpriseVoivodeship, setEnterpriseVoivodeship] =useState<string>("");
  const [enterpriseDescription, setEnterpriseDescription] =useState<string>("");
  const [enterpriseNip, setEnterpriseNip] = useState("");
  const [enterpriseLogo, setEnterpriseLogo] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    };
    try {
      const response = await fetch("/enterprises/insertEnterprise", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(entrprise),
      });
      const data = await response.json();
      navigate("/search");
      console.log(data.message);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error);
    }
  };
  useEffect(() => {
    // fetch("/isUserAuth", {
    //   headers: {
    //     "x-access-token": localStorage.getItem("token") || "",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => (data.isLoggedIn ? navigate("/") : null))
    //   .catch(err => setErrorMessage(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
        <label>Logo</label>
        <input
          className="add-input-logo"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => setEnterpriseLogo(e.target.value)}
          placeholder="Enter your NIP..."
        />
        <button className="add-button">Register</button>
      </form>
    </div>
  );
};

export default Add;
