import { SubmitButton } from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";

export function Root() {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="">
          <SubmitButton
            buttonText="Sign Up"
            onClick={() => {
              navigate("/signup");
            }}
          />
          <SubmitButton
            buttonText="Sign In"
            onClick={() => {
              navigate("/signin");
            }}
          />
        </div>
      </div>
    </>
  );
}
