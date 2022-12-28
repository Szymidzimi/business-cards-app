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
        <span className="passwordTitle">Update Password</span>
        <form
          className="passwordsForm"
          onSubmit={(event) => handleSubmit(event)}
        >
          <label>Old Password</label>
          <InputComponent
            type="password"
            value={passwrordsForm.oldPassword}
            name="oldPassword"
            onChange={onChangeHenler}
            placeholder="Write your old password..."
          />
            {!oldPasswordValid && <p className="error">Old password is required</p>}
          <label>New Password</label>
          <InputComponent
            type="password"
            name="newPassword"
            onChange={onChangeHenler}
           value={passwrordsForm.newPassword}
            placeholder="Enter your new password..."
          />
            {!newPasswordValid && <p className="error">New password is required, must be at least 8 characters long and must meet the requirements</p>}
          <label>Confirm password</label>
          <InputComponent
            type="password"
            value={passwrordsForm.confirmPassword}
            name="confirmPassword"
            onChange={onChangeHenler}
            
            placeholder="Confirm your new password..."
          />
            {!passwordValid && <p className="error">Confirm password is required and must match the new password</p>}
          <button className="registerButton">Update</button>
          {message && <span  className={message === "Password has been updated" ? "success" : "bad"} >{message}</span>}
        </form>
      </div>
    </>
  );
};

export default UpdateCotainer;
