import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  verifyOtpThunk,
  forgetPasswordThunk,
} from "../../../Redux/Thunks/UserApi";
import { useNavigate } from "react-router-dom";
// CSS
import "./ForgetPass.scss";
// Images
import OTP from "../../../assets/OTP.png";

function EnterOtp() {
  const verified_email = localStorage.getItem("verified_email");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const onChange = (text) => {
    console.log("onChange:", text);
    dispatch(verifyOtpThunk({ otp: text, navigate, email }));
  };
  const sharedProps = {
    onChange,
  };

  useEffect(() => {
    setEmail(verified_email);
  }, []);

  return (
    <>
      {/* --- Old Code --- */}
      {/* <div className="h-[100vh] w-full flex justify-center items-center bg-stone-200">
        <div className="bg-blue w-[400px] h-[300px] bg-white">
          <div className="flex flex-col justify-center items-center p-4 gap-3 h-full">
            <h1 className="text-2xl font-bold">Enter OTP</h1>
            <p className="text-center">An OTP has been sent to {email}</p>
            <Form style={{ width: "100%" }}>
              <Form.Item>
                <Input.OTP
                  length={4}
                  style={{ width: "100%" }}
                  formatter={(str) => str.toUpperCase()}
                  {...sharedProps}
                />
              </Form.Item>
            </Form>
            <Button
              type="link"
              onClick={() =>
                dispatch(
                  forgetPasswordThunk({ email: verified_email, navigate })
                )
              }
            >
              Resend OTP
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
              <img src={OTP} alt="NA" />
            </div>
            {/* Part 2 */}
            <div className="Forget_Heading">
              <h1>Enter OTP</h1>
              <p>An OTP has been sent to {email}</p>
            </div>
            {/* Part 3 */}
            <div className="Forget_MyForm">
              <Form style={{ width: "100%" }}>
                <Form.Item>
                  <Input.OTP
                    length={4}
                    style={{ width: "100%" }}
                    formatter={(str) => str.toUpperCase()}
                    {...sharedProps}
                  />
                </Form.Item>
              </Form>
              <Button
                type="link"
                onClick={() =>
                  dispatch(
                    forgetPasswordThunk({ email: verified_email, navigate })
                  )
                }
                className="My_Back_Btn"
              >
                Resend OTP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnterOtp;
