import "./inputComponent.css";

type Props = {
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const InputComponent = (props: Props) => {
  return (
    <input
      className="registerInput"
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};

export default InputComponent;