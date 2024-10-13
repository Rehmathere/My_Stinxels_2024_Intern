import React, { useState, useEffect } from "react";
// useNavigate
import { useNavigate } from "react-router-dom";
// Login CSS
import "./login.scss";
// Img
import login from "../../assets/login.png"

function Login() {
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
            <div className="Login_Main_Part_1">
              <h1>Sign In</h1>
              <div className="Login_Main_Part_Sub">
                <p className="Login_P">Kindly provide your valid Credentials to continue</p>
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
                  <button>Sign In</button>
                </div>
                {/* Field Box Last */}
                <div className="Login_Field_Box_Last">
                  <div className="Login_Last_Part_1">
                    <p>Don't Have An Account ?</p>
                  </div>
                  <div className="Login_Last_Part_2">
                    <p onClick={() => navigate("/signup")}>Sign Up</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="Login_Main_Part_2">
              <img src={login} alt="NA" />
              <p>Use your email to log in and stay connected with dashboard and exclusive features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
