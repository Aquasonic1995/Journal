import {UserContext} from "../../UserContext/userContext.jsx";
import {useContext} from "react";
import {v1} from "uuid";

const Select = () => {

    const {contextData, setContextData} = useContext(UserContext);
    const names = ["Вася", "Лёша", "Настя"];
    const changeUser = (e) => {
        setContextData({userId: e.target.selectedIndex, editMode: false});
    };
    return (
        <select name="user" id="user" value={names[contextData.userId]} onChange={changeUser}>
            {names.map(name => (
                <option value={name} key={v1()}>{name}</option>
            ))}
        </select>
    );

};

export default Select;