import "./sign.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect ,useState} from "react";
import InputComponent from "../../Components/inputComponent/inputComponent"

const Sign: React.FC = () => {

  const navigate=useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("weszłlo 1");
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    try {
      
    const response=await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      const data =await response.json()
      if(data && data.token){
      localStorage.setItem("token", data.token)};
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
    //   .then((data) => (data.isLoggedIn ? navigate("/sign") : null))
    //   .catch(err => setErrorMessage(err)) 
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="sign">
        <span className="signTitle">Sign In</span>
        <form className="signForm" onSubmit={event=>handleSubmit(event)}>
          <label>Username / Email</label>
          <InputComponent
            type="text"
            value={username}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)}
            placeholder="Enter your username / email..."
          />
          <label>Password</label>
          <InputComponent
            type="password"
            value={password}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
            placeholder="Enter your password..."
          />
          <button className="signButton" type="submit">SIGN IN</button>
        </form>

        <p>Don't Have an account? <Link to="../register">SIGN UP</Link></p>
        <p> {errorMessage}</p>
      </div>
    </>
  );
};

export default Sign;
