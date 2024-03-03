import { SubmitButton } from "../components/SubmitButton";

export function Root() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="border border-red-700">
          <SubmitButton buttonText="Sign Up" />
          <SubmitButton buttonText="Sign In" />
        </div>
      </div>
    </>
  );
}
