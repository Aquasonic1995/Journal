import {UserContext} from "../../UserContext/userContext.js";
import {useContext} from "react";


const Select = () => {
    const {names} = useContext(UserContext);
    console.log(names);

    return (
        <select>
            {names.map(name=>(
                <option key={name}>{name}</option>
            ))}
        </select>
    );
};

export default Select;