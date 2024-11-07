import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { forgetPasswordThunk } from "../../../Redux/Thunks/UserApi";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
// CSS
import "./ForgetPass.scss";
// Image
import ForgetPass from "../../../assets/ForgetPass.png";

function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = (body) => {
    dispatch(forgetPasswordThunk({ ...body, navigate }));
  };

  return (
    <>
      {/* --- Old Code --- */}
      {/* <div className="h-[100vh] w-full flex justify-center items-center bg-stone-200">
        <div className="bg-blue w-[400px] h-[300px] bg-white">
          <div className="flex flex-col justify-center items-center p-4 gap-3">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-center">
              Enter the email address and we’ll send a confirmation code on that
              email to reset your password
            </p>
            <Form style={{ width: "100%" }} onFinish={handleFinish}>
              <Form.Item
                name={"email"}
                rules={[
                  { required: true, message: "Enter Email" },
                  { type: "email" },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter Email"
                  ></Input>
              </Form.Item>

              <Form.Item>
                <Button type="primary" block htmlType="submit">
                  Send Code
                </Button>
              </Form.Item>
            </Form>
            <Button
              type="link"
              onClick={() => navigate("/login")}
              className="pb-4"
            >
              <IoArrowBack /> Back to Login
            </Button>
          </div>
        </div>
      </div> */}
      {/* --- New Code --- */}
      <div className="Parent_ForgetPass_Whole">
        <div className="Parent_ForgetPass_Whole_Sub">
          {/* Box */}
          <div className="ForgetPass_Box">
            {/* Part 1 */}
            <div className="Forget_Img">
              <img src={ForgetPass} alt="NA" />
            </div>
            {/* Part 2 */}
            <div className="Forget_Heading">
              <h1>Fogot</h1>
              <h2>Your Password?</h2>
              <p>
                Enter the email address and we'll send a confirmation code on
                that email to reset your password
              </p>
            </div>
            {/* Part 3 */}
            <div className="Forget_MyForm">
              <Form style={{ width: "100%" }} onFinish={handleFinish}>
                <Form.Item
                  name={"email"}
                  rules={[
                    { required: true, message: "Enter Email" },
                    { type: "email" },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    className="MyInput"
                    placeholder="Enter Your Email"
                  ></Input>
                </Form.Item>

                <Form.Item>
                  <Button className="MySubmitBtn" type="primary" block htmlType="submit">
                    Send Code
                  </Button>
                </Form.Item>
              </Form>
              <Button
                type="link"
                onClick={() => navigate("/login")}
                className="My_Back_Btn"
              >
                <IoArrowBack /> Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
