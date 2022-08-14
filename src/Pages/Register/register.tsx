import "./register.css";

const Register: React.FC = () => {
  return (
    <>
      <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm">
          <label>Username</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your username..."
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your email..."
          />
          <label>Password</label>
          <input
            className="registerInput"
            type="password"
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
