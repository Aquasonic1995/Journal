import Button from "../Button/Button.jsx";
import "./JournalForm.css";
import {useContext, useEffect, useReducer, useRef} from "react";
import cn from "clsx";
import {formReducer, initialState} from "./JournalFormState.js";
import {UserContext} from "../../UserContext/userContext.jsx";
import {useOnClickOutside} from "usehooks-ts";
import Input from "../Input/Input.jsx";


const JournalForm = ({addPost, deletePost}) => {
    const {contextData, setContextData} = useContext(UserContext);
    const {editMode, editedPost} = contextData || {};

    const [formState, dispatchForm] = useReducer(formReducer, initialState, undefined);

    // Check if formState is not undefined before destructuring
    const {isValid, isFormReadyToSubmit, values} = formState || {};
    const formRef = useRef(null);
    const titleRef = useRef(null);
    const dateRef = useRef(null);
    const textRef = useRef(null);

    const handleClickOutside = () => {
        if (editMode) {
            const confirmed = confirm("Выйти из режима редактирования?");
            if (confirmed) {
                setContextData(state => ({...state, editMode: false,}));
            } else {
                // If not confirmed, focus on the title input
                setTimeout(() => {
                    titleRef.current.focus();
                }, 0);
            }
        }
    };

    useOnClickOutside(formRef, handleClickOutside);
    const deleteThisPost =()=>{
        deletePost(editedPost);
        setContextData(state => ({...state, editMode: false,}));
    };
    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.text:
                textRef.current.focus();
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        titleRef.current.focus();
        // dispatchForm({type: "EDIT", payload: editedPost});
        if (editMode) {
            titleRef.current.value = editedPost.title;
            dateRef.current.value = editedPost.date;
            textRef.current.value = editedPost.text;
        } else {
            titleRef.current.value = '';
            dateRef.current.value = '';
            textRef.current.value = '';
        }

    }, [editedPost, editMode]);

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
            dispatchForm({type: "CLEAR"});
            formRef.current.reset(); // Reset the formRef fields
        }
    }, [isFormReadyToSubmit, values, addPost]);


    const onFormSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);
            editMode
                ? dispatchForm({type: "SUBMIT", payload: {...formProps, id: editedPost.id}})
                : dispatchForm({type: "SUBMIT", payload: formProps});
            setContextData(state => ({...state, editMode: false, editedPost: {}}));
        }
    ;

    return (
        <>

            <form className={cn("journal-form", {"edit-mode": editMode})} onSubmit={onFormSubmit} ref={formRef}>
                <Input name="title" ref={titleRef} classname={cn("input-title", {["warning"]: !isValid?.title})}
                       type="text">
                    <button type="button" className="archive-button" onClick={deleteThisPost}>
                        {editMode? <img src="/archive.svg" className="archive"/> : null }
                    </button>
                </Input>
                <input type="date" name="date" className={cn({["warning"]: !isValid?.date})} ref={dateRef}/>
                <textarea name="text" cols="30" rows="10" className={cn({["warning"]: !isValid?.text})}
                          ref={textRef}/>
                <Button text="Сохранить"/>
            </form>
        </>

    );
};

export default JournalForm;