import "./updateContainer.css";
import InputComponent from "../../Components/inputComponent/inputComponent";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import {
  validateNotEmptyInput, validatePassword,

} from "../../Components/inputComponent/validation";
import { TokenUserData } from "../../config/decodeUser";

type Props = {
    userDataToken: TokenUserData | null | undefined;
    };

const UpdateCotainer= ({userDataToken}:Props) => {
  const navigate = useNavigate();

    const [passwrordsForm, setPasswrordsForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    });
    const [oldPasswordValid, setOldPasswordValid] = useState(true);
    const [newPasswordValid, setNewPasswordValid] = useState(true);
    const [message, setMessage] = useState<string>("");
    const [passwordValid, setPasswordValid] = useState(true);

  const validateInput = (passwordForm: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    }) => {
    setOldPasswordValid(validateNotEmptyInput(passwordForm.oldPassword));
    setNewPasswordValid(validateNotEmptyInput(passwordForm.newPassword));
    setPasswordValid(validateNotEmptyInput(passwordForm.confirmPassword));
    return ( oldPasswordValid && newPasswordValid);
    };

  const onChangeHenler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswrordsForm((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const passwordForm = {
            oldPassword: passwrordsForm.oldPassword,
            newPassword: passwrordsForm.newPassword,
            confirmPassword: passwrordsForm.confirmPassword,
        };

        if (validateInput(passwordForm)&& userDataToken) {
            try {
                const response = await fetch(`/user/updatePassword/${userDataToken.id}`, {
                    method: "PUT",
                    headers: {
                        "x-access-token": localStorage.getItem("token") || "",
                        "Content-Type": "application/json",
                      },
                    body: JSON.stringify(passwordForm),
                });
                const data = await response.json();
                setMessage(data.message);
            } catch (error: any) {
                console.log(error);
            }
        }
    };



  return (
    <>
      <div className="passwords">
        <span className="passwordTitle">Zmień hasło</span>
        <form
          className="passwordsForm"
          onSubmit={(event) => handleSubmit(event)}
        >
          <label>Stare hasło</label>
          <InputComponent
            type="password"
            value={passwrordsForm.oldPassword}
            name="oldPassword"
            onChange={onChangeHenler}
            placeholder="Wpisz stare hasło..."
          />
            {!oldPasswordValid && <p className="error">Stare hasło jest wymagane</p>}
          <label>Nowe hasło</label>
          <InputComponent
            type="password"
            name="newPassword"
            onChange={onChangeHenler}
           value={passwrordsForm.newPassword}
            placeholder="Wpisz nowe hasło..."
          />
            {!newPasswordValid && <p className="error">Nowe hasło jest wymagane, musi mieć co najmniej 8 znaków i spełniać wymagania</p>}
          <label>Potwierdź hasło</label>
          <InputComponent
            type="password"
            value={passwrordsForm.confirmPassword}
            name="confirmPassword"
            onChange={onChangeHenler}
            
            placeholder="Potwierdź hasło..."
          />
            {!passwordValid && <p className="error">Potwierdzenie hasła jest wymagane i musi być zgodne z nowym hasłem</p>}
          <button className="registerButton">Zmień</button>
          {message && <span  className={message === "Password has been updated" ? "success" : "bad"} >{message}</span>}
        </form>
      </div>
    </>
  );
};

export default UpdateCotainer;
