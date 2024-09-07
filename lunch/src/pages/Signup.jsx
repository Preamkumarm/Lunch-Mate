import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import named from '../assests/unnamed.png';
import "./App1.css";

function Signup(props) {
  const navigate = useNavigate();
  const user =props.user
  const setUser = props.setuser;

  const [euser, seteuser] = useState("");
  const [epass, setepass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const nameRegex = /^[a-zA-Z]+$/;
  const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
  const passwordRegex = /^[a-zA-Z0-9]+$/;

  const handleuser = (evt) => seteuser(evt.target.value);
  const handlepass = (evt) => setepass(evt.target.value);
  const handleconfirmpass = (evt) => setConfirmPass(evt.target.value);
  const handleEmail = (evt) => setEmail(evt.target.value);
  const handlePhoneNumber = (evt) => setPhoneNumber(evt.target.value);
  const handleRole = (evt) => setRole(evt.target.value);

  const validateForm = () => {
    const newErrors = {
      username: !nameRegex.test(euser),
      email: !emailRegex.test(email),
      password: !passwordRegex.test(epass),
      confirmPassword: epass !== confirmPass,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error === true);
  };

  const addcheckuser = () => {
    if (validateForm()) {
      axios.post("http://localhost:3001/User/SignUp", {
        userName: euser,
        emailId: email,
        password: epass,
        confirmPassword:confirmPass,
        phoneNumber: phoneNumber,
      }) 
      .then((data) => {
        console.log(data.data)
        console.log("User signed up successfully:", data.data);
        setUser([{ userName: euser, emailId: email, password: epass, confirmPassword:confirmPass,phoneNumber:phoneNumber }]);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing up the user:", error);
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9ff", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div style={{ width: "350px", height: "550px", padding: "20px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "box-shadow 0.3s ease", position: "relative" }}>
      <div style={{ position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)" }}>
        <img src={named} alt="Logo" style={{ width: "90px", height: "50px" }} />
      </div>
      <h1 style={{ fontWeight: "thin", color: "#1d1f2a", textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)", fontFamily: "'Montserrat', sans-serif", letterSpacing: "2px", padding: "30px 0", fontSize: "32px" }}>WELCOME</h1>
      <div style={{ display: "flex", flexDirection: "column", width: "90%", gap: "10px", marginTop: "10px" }}>
        <input
          type="text"
          style={{ width: "110%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px", position: "relative", right: "10px", top: "-40px" }}
          placeholder="Username"
          onChange={handleuser}
          value={euser}
        />
        {errors.username && <span style={{ color: "red", position: "relative", top: "-40px" }}>Invalid username</span>}

        <input
          type="text"
          style={{ width: "110%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px", position: "relative", right: "10px", top: "-40px" }}
          placeholder="Email"
          onChange={handleEmail}
          value={email}
        />
        {errors.email && <span style={{ color: "red", position: "relative", top: "-40px" }}>Invalid email</span>}

        <input
          type="password"
          style={{ width: "110%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px", position: "relative", right: "10px", top: "-40px" }}
          placeholder="Password"
          onChange={handlepass}
          value={epass}
        />
        {errors.password && <span style={{ color: "red", position: "relative", top: "-40px" }}>Invalid password</span>}

        <input
          type="password"
          style={{ width: "110%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px", position: "relative", right: "10px", top: "-40px" }}
          placeholder="Confirm Password"
          onChange={handleconfirmpass}
          value={confirmPass}
        />
        {errors.confirmPassword && <span style={{ color: "red", position: "relative", top: "-40px" }}>Passwords do not match</span>}

        <input
          type="text"
          style={{ width: "110%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px", position: "relative", right: "10px", top: "-40px" }}
          placeholder="Phone Number"
          onChange={handlePhoneNumber}
          value={phoneNumber}
        />

        <input
          type="text"
          style={{ width: "110%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px", position: "relative", right: "10px", top: "-40px" }}
          placeholder="Role"
          onChange={handleRole}
          value={role}
        />

        <button style={{ padding: "10px", backgroundColor: "#1d1f2a", color: "#fff", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", transition: "background-color 0.3s ease", position: "relative", top: "-35px" }} onClick={addcheckuser}>SIGNUP</button>
      </div>
      <p style={{ position: "relative", top: "-25px" }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  </div>
  );
}

export default Signup;