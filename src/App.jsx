import './App.css';
import JournalItem from "./Components/JournalItem/JournalItem.jsx";
import Card from "./Components/Card/Card.jsx";
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Header from "./Header/Header.jsx";
import JournalAdd from "./Components/JournalAdd/JournalAdd.jsx";
import JournalList from "./Components/JournalList/JournalList.jsx";
import Main from "./Main/Main.jsx";
import JournalForm from "./Components/JournalForm/JournalForm.jsx";
import {useEffect, useState} from "react";
import {v1} from "uuid";

function App() {
//     const initialState = [{
//         id:v1(),
//     title: "1",
//     date: new Date(),
//     text: "Горные походы открывают удивительные природные ландшафты"
// },
//     {
//         "id":1,
//         "title":"Заголовок",
//         "date":"2024/03/03",
//         "text":"Горные походы открывают удивительные природные ландшафты"
//     }
// ];
//     [{
//         "id":1,
//         "title":"Заголовок",
//         "date":"2024/03/03",
//         "text":"Горные походы открывают удивительные природные ландшафты"
//     }]
    const [data, setData] = useState([]);
    const json = JSON.parse(localStorage.getItem("data"));
    useEffect(() => {
            if(json){
                setData(json.map(item=>({
                    ...item, date:new Date(item.date)
                })));
            }
    }, []);
    useEffect(() => {
if(data.length){
    localStorage.setItem("data", JSON.stringify(data));
}
    }, [data]);

    const addPost = (post) => {
        setData(data => [...data,
            {
                title:post.title,
                date: new Date(post.date),
                text: post.text,
                id:v1(),
        } ]);
    };
    const sortData = (a,b) =>{
        if (a.date > b.date){
            return -1;
        }
        else {
            return 1;
        }
    };
    return (
        <div className="app">
            <LeftPanel>
                <Header/>
                <JournalAdd/>
                <JournalList>
                    {data.length === 0 && <p>Записей нет</p>}
                    {data.length >0 &&
                         data.sort(sortData).map(el => (
                        <Card key={el.id}
                        >
                        <JournalItem
                            title={el.title}
                            date={el.date}
                            text={el.text}
                        />
                    </Card>)

                        )}

                </JournalList>
            </LeftPanel>
            <Main>
                <JournalForm addPost={addPost}/>
            </Main>
        </div>

    );
}

export default App;
