import "./register.css";
import InputComponent from "../../Components/inputComponent/inputComponent";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import {
  validateEmail,
  validateLogin,
  validateNotEmptyInput,
  validatePassword,
} from "../../Components/inputComponent/validation";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setUserEmail] = useState<string>("");
  const [password, setUserPassword] = useState<string>("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [userExists, setUserExists] = useState(false);

  const validateInput = (user: {
    username: string;
    email: string;
    password: string;
  }) => {
    setUsernameValid(validateLogin(user.username));
    setEmailValid(validateEmail(user.email));
    setPasswordValid(validatePassword(user.password));
    return (
      validateLogin(user.username) &&
      validateEmail(user.email) &&
      validatePassword(user.password)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username: username,
      email: email,
      password: password,
    };
    if (validateInput(user)) {
      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (data.message === "Użytkownik o takiej nazwie lub emailu już istnieje") {
          setUserExists(true);
        } else {
          setUserExists(false);
          navigate("/sign");
        }
      } catch (error: any) {
        console.log(error);
      }
    }
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
    <>
      <div className="register">
        <span className="registerTitle">Rejestracja</span>
        <form
          className="registerForm"
          onSubmit={(event) => handleSubmit(event)}
        >
          <label>Nazwa użytkownika</label>
          <InputComponent
            type="text"
            name="username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder="Wprowadź swoją nazwe użytkownika..."
          />
          {!usernameValid && (
            <span className="registerError">
              Nazwa użytkownika musi mieć co najmniej 3 znaki!
            </span>
          )}
          <label>Email</label>
          <InputComponent
            type="text"
            name="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserEmail(e.target.value)
            }
            placeholder="Wprowadź swój email..."
          />
          {!emailValid && (
            <span className="registerError">Email nie jest prawidłowy!</span>
          )}
          <label>Hasło</label>
          <InputComponent
            type="password"
            name="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserPassword(e.target.value)
            }
            placeholder="Wprowadź swoje hasło..."
          />
          {!passwordValid && (
            <span className="registerError">
              Hasło musi mieć co najmniej 8 znaków w tym jedną cyfrę i znak specjalny!
            </span>
          )}
          {userExists && <p className="error">Użytkownik istnieje!</p>}

          <button className="registerButton">Zarejestruj</button>
        </form>
      </div>
    </>
  );
};

export default Register;
