import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
// useNavigate
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpThunk } from "../../Redux/Thunks/UserApi";
// Login CSS
import "./login.scss";
// Img
import login from "../../assets/signup.png";
import Back from "../../assets/back.png";

function Signup() {
  // useNavigate Variable
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socketId = useSelector((state) => state.userSlice.socketId);
  // Password Logic

  const handleFinish = (body) => {
    dispatch(signUpThunk({ ...body, socketId, navigate }));
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
      {/* --- 1 - Signup --- */}
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
                <div className="Login_Field_Box_Signup">
                  <Form onFinish={handleFinish}>
                    <Form.Item name={"name"}>
                      <Input
                        className="My_Signup_Inp"
                        placeholder="Enter Name"
                      ></Input>
                    </Form.Item>
                    <Form.Item name={"email"}>
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

                    <Form.Item>
                      <Button className="My_Signup_Inp_Btn" htmlType="submit">
                        Sign Up
                      </Button>
                    </Form.Item>
                  </Form>
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
