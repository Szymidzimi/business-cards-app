import "./sign.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import InputComponent from "../../Components/inputComponent/inputComponent";
import { validateLogin, validateNotEmptyInput} from "../../Components/inputComponent/validation";

const Sign: React.FC = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginValid, setLoginValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [badCredentials, setBadCredentials] = useState(false);

  const validateInput = (user:{username:string; password:string}) => {
    setLoginValid(validateLogin(user.username));
    setPasswordValid(validateNotEmptyInput(user.password));
    return validateLogin(user.username) && validateNotEmptyInput(user.password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username: login,
      password: password,
    };

   if(validateInput(user)){ 
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        setBadCredentials(false);
        navigate("/",{ replace: true });
        // window.location.reload();
      }
      else{
        setBadCredentials(true);
      }
      console.log(data.message);
    } catch (error: any) {
      console.log(error.message);
    }}
  };

  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? navigate("/") : null));
  }, [navigate]);

  return (
    <div className="sign">
      <span className="signTitle">Zaloguj</span>
      <form className="signForm" onSubmit={(event) => handleSubmit(event)}>
        <label>Nazwa użytkownika / Email</label>
        <InputComponent
          type="text"
          name="login"
          value={login}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLogin(e.target.value)
          }
          placeholder="Wprowadź swoją nazwę/email..."
        />
        {!loginValid && <p className="error">Login is not valid</p>}
        <label>Hasło</label>
        <InputComponent
          type="password"
          name="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="Wprowadź swoje hasło..."
        />
        {badCredentials && <p className="error">Nie poprawny login lub hasło</p>}
        <button className="signButton" type="submit">
          Zaloguj
        </button>
      </form>

      <p>
        Nie posiadasz jeszcze konta? <Link to="../register"><span className="register-button">ZAREJESTRUJ SIĘ</span></Link>
      </p>
    </div>
  );
};

export default Sign;
