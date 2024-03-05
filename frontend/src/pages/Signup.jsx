import { useState } from "react";
import { BoxTitle } from "../components/BoxTitle";
import { InputBox } from "../components/InputBox";
import { SubmitButton } from "../components/SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen ">
        <div className="border border-black rounded-xl p-8">
          <BoxTitle title="Sign Up" />
          <InputBox
            label="Username"
            placeholder="John"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            label="Email"
            placeholder="John12@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            label="Password"
            placeholder="John123#*$"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <SubmitButton
            buttonText="SignUp"
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username,
                  email,
                  password,
                }
              );

              localStorage.setItem(
                "authorization",
                "Bearer " + response.data.token
              );
              // if(response.)
              navigate("/dashboard");
            }}
          />
        </div>
      </div>
    </>
  );
}
