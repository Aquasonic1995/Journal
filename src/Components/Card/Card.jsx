import "./Card.css";
import cn from "clsx";
const Card= ({children, classname}) => {
    return (
            <div className={cn("card", {[classname]: classname})}>{children}</div>

    );
};

export default Card;
