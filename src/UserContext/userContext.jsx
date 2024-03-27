import {createContext, useState} from "react";

export const UserContext = createContext({
        userId: 0
});

export const UserContextProvider = ({children}) => {
    const [userId, setUserId] = useState(0);
    return <UserContext.Provider value={{userId, setUserId}}>
        {children}
    </UserContext.Provider>;
};
