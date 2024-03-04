export function InputBox(props) {
  return (
    <>
      <div>
        <label>{props.label}</label>
        <br />
        <input
          type="text"
          className="border border-black rounded-lg"
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </div>
    </>
  );
}
