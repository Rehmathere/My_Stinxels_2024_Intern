import React, { useState, useEffect } from "react";
import { getUserId } from "../../../Utils/getUserId";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewPasswordThunk } from "../../../Redux/Thunks/UserApi";
import { Form, Input, Button } from "antd";
// CSS
import "./ForgetPass.scss";
// Image
import ForgetPass from "../../../assets/NewPass.png";


function CreateNewPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const { role } = getUserId();

    if (role != "passwordReset") {
      return <Navigate to={"/"} />;
    }
  }, []);

  const handleFinish = (body) => {
    const email = localStorage.getItem("verified_email");

    body = { ...body, email, navigate };

    dispatch(createNewPasswordThunk(body));
  };

  return (
    <>
      {/* --- Old Code --- */}
      {/* <div className="h-[100vh] w-full flex justify-center items-center bg-stone-200">
        <div className="bg-blue w-[400px] h-[300px] bg-white">
          <div className="flex flex-col justify-center items-center p-4 gap-3 h-full">
            <h1 className="text-2xl font-bold">Create New Password</h1>
            <p className="text-center">Please Create New Password</p>
            <Form style={{ width: "100%" }} onFinish={handleFinish}>
              <Form.Item
                name={"newPassword"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Password",
                  },
                  {
                    pattern: new RegExp(/^(?=.*[A-Z]).*$/),
                    message: "At least one Uppercase letter",
                  },
                  {
                    pattern: new RegExp(/^(?=.*[a-z]).*$/),
                    message: "At least one Lowercase letter",
                  },
                  {
                    pattern: new RegExp(/^(?=.*[0-9]).*$/),
                    message: "At least one number",
                  },
                  {
                    pattern: new RegExp(
                      /^(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~\-]).*$/
                    ),
                    message: "At least one special character",
                  },
                  {
                    pattern: new RegExp(/^.{8,}$/),
                    message: "Password must be at least 8 characters long",
                  },
                ]}
              >
                <Input.Password placeholder="Enter Password"></Input.Password>
              </Form.Item>

              <Form.Item>
                <Button type="primary" block htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
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
              <h1>Create New Password</h1>
              <p>Please Create New Password</p>
            </div>
            {/* Part 3 */}
            <div className="Forget_MyForm">
              <Form style={{ width: "100%" }} onFinish={handleFinish}>
                <Form.Item
                  name={"newPassword"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password",
                    },
                    {
                      pattern: new RegExp(/^(?=.*[A-Z]).*$/),
                      message: "At least one Uppercase letter",
                    },
                    {
                      pattern: new RegExp(/^(?=.*[a-z]).*$/),
                      message: "At least one Lowercase letter",
                    },
                    {
                      pattern: new RegExp(/^(?=.*[0-9]).*$/),
                      message: "At least one number",
                    },
                    {
                      pattern: new RegExp(
                        /^(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~\-]).*$/
                      ),
                      message: "At least one special character",
                    },
                    {
                      pattern: new RegExp(/^.{8,}$/),
                      message: "Password must be at least 8 characters long",
                    },
                  ]}
                >
                  <Input.Password
                    className="MyInput"
                    placeholder="Enter Password"
                  ></Input.Password>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" block htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewPassword;
