import "./inputComponent.css";

const InputComponent = (props:any) => {
  return (
    <input
    className="registerInput"
    type={props.type}
    placeholder={props.placeholder}/>

);
};

export default InputComponent;
