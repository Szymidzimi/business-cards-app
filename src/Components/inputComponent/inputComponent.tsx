import "./inputComponent.css";

const InputComponent = (props:any) => {
  return (
    <input
    className="registerInput"
    placeholder={props.placeholder}/>

);
};

export default InputComponent;
