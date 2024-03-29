import "./JournalList.css";
import Card from "../Card/Card.jsx";
import JournalItem from "../JournalItem/JournalItem.jsx";
import {useContext} from "react";
import {UserContext} from "../../UserContext/userContext.jsx";

const JournalList = ({children, data}) => {
    const {contextData} = useContext(UserContext);
    const userId = contextData.userId;

    const sortData = (a, b) => {
        if (a.date > b.date) {
            return -1;
        } else {
            return 1;
        }
    };
    return (<>
            {children}
            {data.length === 0 && <p>Записей нет</p>}
            {data.length > 0 &&
                data.sort(sortData).filter(item=>item.userId===userId).map(el => (
                    <Card key={el.id} id={el.id} data={data}
                    >
                        <JournalItem
                            id={el.id}
                            title={el.title}
                            date={el.date}
                            text={el.text}
                        />
                    </Card>)
                )}
        </>
    );
};

export default JournalList;