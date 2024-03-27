import {UserContext} from "../../UserContext/userContext.jsx";
import {useContext} from "react";
import {v1} from "uuid";

const Select = () => {

    const { userId, setUserId } = useContext(UserContext);
   const  names= ["Вася", "Лёша","Настя"];
    const changeUser =(e) => {
        setUserId(e.target.selectedIndex);
    };

    return (
        <select name="user" id="user" value={names[userId]} onChange={changeUser}>
            {names.map(name=>(
                <option value={name} key={v1()}>{name}</option>
            ))}
        </select>
    );

};

export default Select;