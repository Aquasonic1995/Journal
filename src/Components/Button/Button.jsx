import "./Button.css";

const Button = ({text}) => {
	return (<div>
		<button className="button accent" >{text}</button>
	</div>
	);
};

export default Button;
