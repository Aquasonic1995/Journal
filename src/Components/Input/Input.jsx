import "./Input.css";
import "../JournalForm/JournalForm.css";
import {forwardRef} from "react";

const Input = forwardRef(function Input ({children, type, name, classname}, ref) {
    return (
        <div className="input-wrapper">
            {children}
            <input type={type} name={name} className={classname} ref={ref}/>
        </div>

    );
});

export default Input;