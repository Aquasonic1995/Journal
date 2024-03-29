import {createContext, useState} from "react";

export const UserContext = createContext({
    contextData: {
        userId: 0,
        editMode: false,
        editedPost:{}
    }


});

export const UserContextProvider = ({children}) => {
    const [contextData, setContextData] = useState({userId: 0,
        editMode: false,editedPost:{}});
    return <UserContext.Provider value={{contextData, setContextData}}>
        {children}
    </UserContext.Provider>;
};
