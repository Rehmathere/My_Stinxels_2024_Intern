import React, { useState, useEffect } from "react";
// useNavigate
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { signInThunk } from "../../Redux/Thunks/UserApi";
import { useDispatch } from "react-redux";
// Login CSS
import "./login.scss";
// Img
import login from "../../assets/login.png";
import Back from "../../assets/back.png";

function Login() {
  // useNavigate Variable
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFinish = (body) => {
    dispatch(signInThunk({ ...body, navigate }));
  };

  // Main Body
  return (
    <div className="My_Parent_Login">
      {/* --- 0 - Login Navbar --- */}
      <div className="Parent_LoginNav_Whole">
        <div className="Parent_LoginNav_Whole_Sub">
          <div className="LoginNav_Box">
            <div className="LoginNav_Box_Part1">
              <img src={Back} alt="NA" onClick={() => navigate("/")} />
            </div>
          </div>
        </div>
      </div>
      {/* --- 1 - Login --- */}
      <div className="Parent_Login_Whole">
        <div className="Sub_Login_Whole">
          <div className="Login_Main">
            <div className="Login_Main_Part_1">
              <h1>Sign In</h1>
              <div className="Login_Main_Part_Sub">
                <p className="Login_P">
                  Kindly provide your valid Credentials to continue
                </p>

                {/* Field Box */}
                <div className="Login_Field_Box_Signup">
                  <Form onFinish={handleFinish}>
                    <Form.Item
                      name={"email"}
                      rules={[
                        { required: true, message: "Please input your Email" },
                        {
                          type: "email",
                        },
                      ]}
                    >
                      <Input
                        className="My_Signup_Inp"
                        type="email"
                        placeholder="Enter Email"
                      ></Input>
                    </Form.Item>
                    <Form.Item name={"password"}>
                      <Input.Password
                        className="My_Signup_Inp_Pass"
                        type="email"
                        placeholder="Enter Password"
                      ></Input.Password>
                    </Form.Item>
                    {/* --- Forget Pass --- */}
                    <p
                      className="My_ForgetPass"
                      onClick={() => navigate("/forgetPassword")}
                    >
                      Forget Password?
                    </p>
                    {/* --- Forget Pass --- */}
                    <Form.Item>
                      <Button className="My_Signup_Inp_Btn" htmlType="submit">
                        Sign In
                      </Button>
                    </Form.Item>
                  </Form>
                </div>

                {/* Field Box */}
                {/* <div className="Login_Field_Box">
                  <button>Sign In</button>
                </div> */}
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
              <p>
                Use your email to log in and stay connected with dashboard and
                exclusive features
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
