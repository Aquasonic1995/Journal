import {useState} from "react";
import Button from "../Button/Button.jsx";
import "./JournalForm.css";

const JournalForm = () => {
    const [inputData, setInputData] = useState('');
    const onInputChange = (event) => {
        setInputData(event.target.value);
    };
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        console.log(formProps);
    };
    return (
        <form className="journal-form" onSubmit={onFormSubmit}>
            <input type="text" name="text" value={inputData} onChange={onInputChange}/>
            <input type="date" name = "date"/>
            <textarea name="post" cols="30" rows="10"/>
            <Button/>

        </form>);
};

export default JournalForm;