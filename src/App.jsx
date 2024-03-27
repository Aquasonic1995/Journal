import './App.css';
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Header from "./Components/Header/Header.jsx";
import JournalAdd from "./Components/JournalAdd/JournalAdd.jsx";
import JournalList from "./Components/JournalList/JournalList.jsx";
import Main from "./Components/Main/Main.jsx";
import JournalForm from "./Components/JournalForm/JournalForm.jsx";
import {useContext, useEffect, useState} from "react";
import {v1} from "uuid";
import {UserContext} from "./UserContext/userContext.jsx";


function App() {
    const {userId} = useContext(UserContext);

    const [data, setData] = useState([]);
    const json = JSON.parse(localStorage.getItem("data"));
    useEffect(() => {
        if (json) {
            setData(json.map(item => ({
                ...item
            })));
        }
    }, []);
    useEffect(() => {
        if (data.length) {
            localStorage.setItem("data", JSON.stringify(data));
        }
    }, [data]);

    const addPost = (post) => {

        setData(data => [...data,
            {
                title: post.title,
                date: post.date,
                text: post.text,
                id: v1(),
                userId
            }]);
    };


    return (

        <div className="app">
            <LeftPanel>
                <Header/>
                <JournalAdd/>
                <JournalList data={data}>

                </JournalList>
            </LeftPanel>
            <Main>
                <JournalForm addPost={addPost}/>
            </Main>
        </div>

    );
}

export default App;
