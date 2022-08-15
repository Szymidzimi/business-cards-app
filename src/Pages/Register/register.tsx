import "./register.css";
import { useNavigate } from "react-router";
import { useEffect ,useState} from "react";

const Register: React.FC = () => {

  const navigate=useNavigate();
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

    await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then((data) => {
      navigate("/sign");
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm"  onSubmit={event=>handleSubmit(event)}>
          <label>Username</label>
          <input
            className="registerInput"
            type="text"
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Enter your username..."
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="text"
            onChange={(e)=>setUserEmail(e.target.value)}
            placeholder="Enter your email..."
          />
          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            onChange={(e)=>setUserPassword(e.target.value)}
            placeholder="Enter your password..."
          />
          <button className="registerButton">Register</button>
        </form>

      

      <div className="social-block">
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
