import "./Header.css";
import Select from "../Select/Select.jsx";

const Header = () => {
    return (<>
            <img src="/logo.svg" alt="logo" className="logo"/>
            <Select/>
        </>
    );
};
export default Header;