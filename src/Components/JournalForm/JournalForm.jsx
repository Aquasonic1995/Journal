import Button from "../Button/Button.jsx";
import "./JournalForm.css";
import {useEffect, useReducer} from "react";
import cn from "clsx";
import {formReducer, initialState} from "./JournalFormState.js";

const JournalForm = ({addPost}) => {
    const [formState, dispatchForm] = useReducer(formReducer, initialState, undefined);

    // Check if formState is not undefined before destructuring
    const {isValid, isFormReadyToSubmit, values} = formState || {};

    useEffect(() => {
        let timerId;
        console.log(initialState);
        if (formState && (!isValid.title || !isValid.date || !isValid.text)) {
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
            console.log("sdf");
            addPost(values);
        }
    }, [isFormReadyToSubmit]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        dispatchForm({type: "SUBMIT", payload: formProps});
    };

    return (
        <form className="journal-form" onSubmit={onFormSubmit}>
            <input type="text" name="title" className={cn({["warning"]: !isValid?.title})}/>
            <input type="date" name="date" className={cn({["warning"]: !isValid?.date})}/>
            <textarea name="text" cols="30" rows="10" className={cn({["warning"]: !isValid?.text})}/>
            <Button text="Сохранить" onClick={""}/>
        </form>
    );
};

export default JournalForm;