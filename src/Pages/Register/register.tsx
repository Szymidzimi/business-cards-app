import "./register.css";
import InputComponent from "../../Components/inputComponent/inputComponent"
import { useNavigate } from "react-router";
import React, { useEffect ,useState} from "react";

const Register: React.FC = () => {

  const navigate=useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [username, setUsername] = useState<string>("");
  const [email, setUserEmail] = useState<string>("");
  const [password, setUserPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("weszłlo 1");
    e.preventDefault();

    const user = {
      username: username,
      email:email,
      password: password,
    };
    try {
    const response=await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
     const data =await response.json()
      navigate("/sign");
      setErrorMessage(data.message);
      console.log(data.message);
    } catch (error:any) {
      console.log(error)
      setErrorMessage(error)
    }
   
  }
  useEffect(() => {
    // fetch("/isUserAuth", {
    //   headers: {
    //     "x-access-token": localStorage.getItem("token") || "",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => (data.isLoggedIn ? navigate("/") : null))
    //   .catch(err => setErrorMessage(err)) 
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm"  onSubmit={event=>handleSubmit(event)}>
          <label>Username</label>
          <InputComponent
            type="text"
            value={username}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)}
            placeholder="Enter your username..."
          />
          <label>Email</label>
          <InputComponent
            type="text"
            value={email}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setUserEmail(e.target.value)}
            placeholder="Enter your email..."
          />
          <label>Password</label>
          <InputComponent
            type="password"
            value={password}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setUserPassword(e.target.value)}
            placeholder="Enter your password..."
          />
          <button className="registerButton">Register</button>
        </form>

      

      <div className="social-block">
        <p>{errorMessage}</p>
        <a className="btn btn-block" href="/auth/google" role="button">
          <i className="fab fa-google"></i>
          Sign Up with Google
        </a>
      </div>
      </div>
    </>
  );
};

export default Register;
