import './App.css';
import JournalItem from "./Components/JournalItem/JournalItem.jsx";
import Card from "./Components/Card/Card.jsx";
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Header from "./Header/Header.jsx";
import JournalAdd from "./Components/JournalAdd/JournalAdd.jsx";
import JournalList from "./Components/JournalList/JournalList.jsx";
import Main from "./Main/Main.jsx";
import JournalForm from "./Components/JournalForm/JournalForm.jsx";

function App() {
    const data = [{
        title: "1",
        date: new Date(),
        text: "Горные походы открывают удивительные природные ландшафты"
    },
        {
            title: "2",
            date: new Date(),
            text: "Горные походы открывают удивительные природные ландшафты"
        },
    ];
    return (
        <div className="app">
            <LeftPanel>
                <Header/>
                <JournalAdd/>
                <JournalList>
                    <Card>
                        <JournalItem
                            title={data[0].title}
                            date={data[0].date}
                            text={data[0].text}
                        />
                    </Card>
                    <Card><JournalItem
                        title={data[1].title}
                        date={data[1].date}
                        text={data[1].text}
                    />
                    </Card>
                </JournalList>
            </LeftPanel>
            <Main>
             <JournalForm/>
            </Main>
        </div>

    );
}

export default App;
