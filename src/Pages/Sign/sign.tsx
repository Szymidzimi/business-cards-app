import "./sign.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect ,useState} from "react";

const Sign: React.FC = () => {

  const navigate=useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("weszłlo 1");
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/");
      });
  }
  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? navigate("/") : null));
  }, []);

  return (
    <>
      <div className="sign">
        <span className="signTitle">Sign In</span>
        <form className="signForm" onSubmit={event=>handleSubmit(event)}>
          <label>Username / Email</label>
          <input
            className="signInput"
            type="text"
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Enter your username / email..."
          />
          <label>Password</label>
          <input
            className="signInput"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter your password..."
          />
          <button className="signButton" type="submit">SIGN IN</button>
        </form>

        <p>Don't Have an account? <Link to="../register">SIGN UP</Link></p>

      </div>
    </>
  );
};

export default Sign;
