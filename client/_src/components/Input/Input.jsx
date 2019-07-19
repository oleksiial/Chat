import React, {useRef} from 'react';
import './Input.scss';

const Input = ({onSubmit, label}) => {
  const input = useRef();
  return (
    <div className="input">
      <input ref={input} type="text" />
      <button onClick={() => onSubmit(input.current.value)}>{label}</button>
    </div>
  );
};

export default Input;
