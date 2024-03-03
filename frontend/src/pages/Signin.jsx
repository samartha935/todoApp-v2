import { BoxTitle } from "../components/BoxTitle";
import { InputBox } from "../components/InputBox";
import { SubmitButton } from "../components/SubmitButton";

export function Signin() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen ">
        <div className="border border-black rounded-xl p-8">
          <BoxTitle title="Sign In" />
          <InputBox label="Username" placeholder="John" />
          <InputBox label="Password" placeholder="John123#*$" />
          <SubmitButton buttonText="SignIn" />
        </div>
      </div>
    </>
  );
}
