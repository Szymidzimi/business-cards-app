import "./mainProfile.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getUserData, TokenUserData } from "../../config/decodeUser";
import UpdateCotainer from "../updatePassword/updateContainer";
import { useNavigate } from "react-router-dom";
import { enterprise } from "../../config/types";
import InputComponent from "../inputComponent/inputComponent";

const MainProfile = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [enterprises, setEnterprises] = useState<enterprise[]>([]);
  const [userDataToken, setUserDataToken] = useState<
    TokenUserData | null | undefined
  >();

  const fetchEnterpriseByOwnerName = async (nameOwner: string) => {
    const response = await fetch(
      `/enterprises/getEnterpriseByOwner/${nameOwner}`
    );
    const data = await response.json();
    setEnterprises(data);
  };
  const logoutProfile = () => {
    localStorage.removeItem("token");
    navigate("/");
    // window.location.reload();
  };

  // const fetchDeleteUser = async (id: string) => {
  //   const response = await fetch(`/users/deleteUser/${id}`, {
  //     method: "DELETE",
  //   });
  //   const data = await response.json();
  //   setEnterprises(data);
  // };

  //     const navigate=useNavigate();
  //     async function logout() {
  //     localStorage.removeItem("token")
  //     navigate("/");
  // }
  // const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setPassword(event.target.value);
  //   };

  const fetchDeleteEnterprise = async (id: number) => {
    const response = await fetch(
      `/enterprises/deleteEnterprise/${id}/${userDataToken?.id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    setEnterprises(data);
  };

  useEffect(() => {
    setUserDataToken(getUserData());
    userDataToken?.id && fetchEnterpriseByOwnerName(userDataToken.id);
  }, [userDataToken?.id]);

  return (
    <>
      <div className="main-container-to-profile">
        <div className="container-card-column">
          <label className="label-profile">Profil</label>
          <div className="container-profile-card">
            <div className="logo-card">
              <img
                src="https://www.pikpng.com/pngl/b/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
                alt="logo"
              ></img>
            </div>
            <div className="info-section-card">
              <div className="title-card">
                <h4>{userDataToken?.username}</h4>
              </div>
              <div className="contact-card">
                <p className="name-ent-list">
                  Liczba przedsiębiorstw: {enterprises.length}{" "}
                </p>
              </div>

              <div className="buttons-card">
                <button className="logoutButton" onClick={logoutProfile}>
                  Wyloguj
                </button>
              </div>

            </div>
          </div>
          <div>
            <form
              className="passwordsForm"
              // onSubmit={(event) => handleSubmit(event)}
            >
              <label>Podaj hasło</label>
              <InputComponent
                type="password"
                value={password}
                name="oldPassword"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                placeholder="Wpisz stare hasło..."
              />
              <button className="delete-buttonv2">Usuń konto</button>
            </form>
          </div>
        </div>

        <UpdateCotainer userDataToken={userDataToken}></UpdateCotainer>
        <div className="table-section">
          {enterprises.map((enterprise) => (
            <div className="one-line-own" key={enterprise._id}>
              <div className="one-line-own-text">
                Nazwa przedsiębiorstwa:
                <div className="name-ent-list">{enterprise.name}</div>
              </div>
              <div className="button-edit-enterprise">
                {" "}
                <button
                  className="edit-button"
                  title="Edit"
                  // onClick={() => filterEnterprisesByType("CropProduction")}
                >
                  <AiOutlineEdit />
                </button>
                <button
                  className="delete-buttonv2"
                  title="Delete"
                  onClick={() => fetchDeleteEnterprise(enterprise._id)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainProfile;
