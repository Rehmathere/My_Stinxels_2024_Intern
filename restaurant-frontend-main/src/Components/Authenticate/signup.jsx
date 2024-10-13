import React, { useState, useEffect } from "react";
// useNavigate
import { useNavigate } from "react-router-dom";
// Login CSS
import "./login.scss";
// Img
import login from "../../assets/signup.png";

function Signup() {
  // useNavigate Variable
  const navigate = useNavigate();
  // Password Logic
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleMouseDown = () => {
    setIsPasswordVisible(true);
  };
  const handleMouseUp = () => {
    setIsPasswordVisible(false);
  };

  // Main Body
  return (
    <div className="My_Parent_Login">
      {/* --- 1 - Login --- */}
      <div className="Parent_Login_Whole">
        <div className="Sub_Login_Whole">
          <div className="Login_Main">
            <div className="Login_Main_Part_2">
              <img src={login} alt="NA" />
              <p>Join us by creating an account with your email</p>
            </div>
            <div className="Login_Main_Part_1">
              <h1>Sign Up</h1>
              <div className="Login_Main_Part_Sub">
                <p className="Login_P">Create Your New Account</p>
                {/* Field Box */}
                <div className="Login_Field_Box">
                  <input type="text" placeholder="Enter Your Name " />
                </div>
                {/* Field Box */}
                <div className="Login_Field_Box">
                  <input type="text" placeholder="Enter Your Email " />
                </div>
                {/* Field Box */}
                <div className="Login_Field_Box">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter Your Password"
                  />
                  {/* Eye icon for toggling visibility */}
                  <div
                    className="My_Pass_Box"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    <i
                      className={
                        isPasswordVisible ? "fa fa-eye-slash" : "fa fa-eye"
                      }
                    />
                  </div>
                </div>
                {/* Field Box */}
                <div className="Login_Field_Box">
                  <button>Sign Up</button>
                </div>
                {/* Field Box Last */}
                <div className="Login_Field_Box_Last">
                  <div className="Login_Last_Part_1">
                    <p>Already Have Account ?</p>
                  </div>
                  <div className="Login_Last_Part_2">
                    <p onClick={() => navigate("/login")}>Sign In</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
