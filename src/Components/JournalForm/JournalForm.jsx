import Button from "../Button/Button.jsx";
import "./JournalForm.css";
import {useEffect, useReducer, useRef} from "react";
import cn from "clsx";
import {formReducer, initialState} from "./JournalFormState.js";

const JournalForm = ({addPost}) => {
    const [formState, dispatchForm] = useReducer(formReducer, initialState, undefined);
    // Check if formState is not undefined before destructuring
    const {isValid, isFormReadyToSubmit, values} = formState || {};
    const formRef = useRef(null);
    const titleRef = useRef(null);
    const dateRef = useRef(null);
    const textRef = useRef(null);
    const focusError=(isValid)=>
    {
      switch (true){
          case !isValid.title: titleRef.current.focus();
          break;
          case !isValid.date: dateRef.current.focus();
          break;
          case !isValid.text: textRef.current.focus();
          break;
          default: break;
      }
    };
    useEffect(() => {

        let timerId;
        if (formState && (!isValid.title || !isValid.date || !isValid.text)) {
            focusError(isValid);
            timerId = setTimeout(() => {
                dispatchForm({type: "RESET_VALIDITY"});
            }, 2000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [formState, isValid]);

    useEffect(() => {
        if (isFormReadyToSubmit) {
            addPost(values);
            dispatchForm({type:"CLEAR"});
            formRef.current.reset(); // Reset the formRef fields
        }
    }, [isFormReadyToSubmit, values, addPost]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const formProps = Object.fromEntries(formData);

        dispatchForm({type: "SUBMIT", payload: formProps});
    };

    return (
        <form className="journal-form" onSubmit={onFormSubmit} ref={formRef}>
            <input type="text" name="title" className={cn({["warning"]: !isValid?.title})} ref={titleRef}/>
            <input type="date" name="date"   className={cn({["warning"]: !isValid?.date})} ref={dateRef}/>
            <textarea name="text" cols="30" rows="10"  className={cn({["warning"]: !isValid?.text})} ref={textRef}/>
            <Button text="Сохранить" />
        </form>


    );
};

export default JournalForm;