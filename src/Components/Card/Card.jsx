import "./Card.css";
import cn from "clsx";
import {useContext, useEffect, useReducer} from "react";
import {formReducer, initialState} from "../JournalForm/JournalFormState.js";
import {UserContext} from "../../UserContext/userContext.jsx";

const Card = ({children, classname, id,data}) => {

    const {contextData, setContextData} = useContext(UserContext);
    const onJournalItemClick = (e) => {
       const postForEditing = data.filter(el=>el.id===e.currentTarget.id)[0];
       setContextData({userId:contextData.userId,editMode:true, editedPost: {...postForEditing}});

    };
    return (
        <div id={id}
            className={cn("card", {[classname]: classname})}
             onClick={onJournalItemClick}>{children}</div>

    );
};

export default Card;
