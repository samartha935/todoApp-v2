export function SubmitButton(props) {
  return (
    <>
      <button className="border border-black rounded-lg p-2" onClick={props.onClick} >
        {props.buttonText}
      </button>
    </>
  );
}
