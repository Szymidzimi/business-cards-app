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
        navigate("/");
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
      <span className="signTitle">Sign In</span>
      <form className="signForm" onSubmit={(event) => handleSubmit(event)}>
        <label>Username / Email</label>
        <InputComponent
          type="text"
          value={login}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLogin(e.target.value)
          }
          placeholder="Enter your username / email..."
        />
        {!loginValid && <p className="error">Login is not valid</p>}
        <label>Password</label>
        <InputComponent
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="Enter your password..."
        />
        {!passwordValid && <p className="error">Password is not valid</p>}
        {badCredentials && <p className="error">Bad credentials</p>}
        <button className="signButton" type="submit">
          SIGN IN
        </button>
      </form>

      <p>
        Don't Have an account? <Link to="../register">SIGN UP</Link>
      </p>
    </div>
  );
};

export default Sign;
