export function SubmitButton(props) {
  return (
    <>
      <button className="border border-black rounded-lg p-2">
        {props.buttonText}
      </button>
    </>
  );
}
