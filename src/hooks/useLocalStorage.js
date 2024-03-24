import {useEffect, useState} from "react";

export function useLocalStorage (key){
    const [data, setData] = useState();
    useEffect(() => {
        const res= JSON.parse(localStorage.getItem(key));
        if(res.length){
           setData(res);
        }
    }, [data]);
    const saveData =(newData)=>{
        localStorage.setItem(key, JSON.stringify(data));
        setData(newData);
    };
    return[data, saveData];
}