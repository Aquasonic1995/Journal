import "./Button.css";

const Button = ({text, onClick}) => {
	return (<div>
		<button className="button accent" onClick={onClick}>{text}</button>
	</div>
	);
};

export default Button;
