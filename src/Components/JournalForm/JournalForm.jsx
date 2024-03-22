
import Button from "../Button/Button.jsx";
import "./JournalForm.css";
import {useState} from "react";
import cn from "clsx";

const JournalForm = ({addPost}) => {
const [validState, setValidState] = useState({
    title:true,
    data:true,
    text:true
});
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        let isFormValid = true;
        if (!formProps.title.trim().length) {
            setValidState(state=>({...state, title: false}));
            isFormValid = false;
        }
        if (!formProps.text.trim().length) {
            setValidState(state=>({...state, text: false}));
            isFormValid = false;
        }
        if (!formProps.date) {
            setValidState(state=>({...state, date: false}));
            isFormValid = false;
        }
        if (!isFormValid){
           return;
        }
        addPost(formProps);
    };
    return (
        <form className="journal-form" onSubmit={onFormSubmit}>
            <input type="text" name="title" className={cn({["warning"]:!validState.title})} />
            <input type="date" name = "date" className={cn({["warning"]:!validState.text})} />
            <textarea name="text" cols="30" rows="10" className={cn({["warning"]:!validState.title})}/>
            <Button text="Сохранить" onClick={""}/>

        </form>);
};

export default JournalForm;