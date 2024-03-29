import './JournalItem.css';
const JournalItem = ({date, title, text}) => {


	return (
		<>
			<h2 className="journal-item__header">{title}</h2>
			<div className="journal-item__body">
				<div className="journal-item__date">{date}</div>
				<div className="journal-item__text">{text}</div>
			</div>
		</>
	);
};

export default JournalItem;