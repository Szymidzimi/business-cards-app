import "./register.css";
import InputComponent from "../../Components/inputComponent/inputComponent";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import {
  validateEmail,
  validateLogin,
  validateNotEmptyInput,
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
    setPasswordValid(validateNotEmptyInput(user.password));
    return (
      validateLogin(user.username) &&
      validateEmail(user.email) &&
      validateNotEmptyInput(user.password)
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
        if (data.message === "User already exists") {
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
        <span className="registerTitle">Register</span>
        <form
          className="registerForm"
          onSubmit={(event) => handleSubmit(event)}
        >
          <label>Username</label>
          <InputComponent
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder="Enter your username..."
          />
          {!usernameValid && (
            <span className="registerError">
              Username must be at least 3 characters long
            </span>
          )}
          <label>Email</label>
          <InputComponent
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserEmail(e.target.value)
            }
            placeholder="Enter your email..."
          />
          {!emailValid && (
            <span className="registerError">Email is not valid</span>
          )}
          <label>Password</label>
          <InputComponent
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserPassword(e.target.value)
            }
            placeholder="Enter your password..."
          />
          {!passwordValid && (
            <span className="registerError">
              Password must be at least 6 characters long
            </span>
          )}
          {userExists && <p className="error">User exist</p>}

          <button className="registerButton">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
