import { useNavigate } from "react-router-dom";
import "./CustomLink.css"
export const CustomLink = ({ title, destination }) => {
    const navigate = useNavigate();
    return (
        <div className="customLinkDesign" onClick={() => navigate(destination)}>
            {title}
        </div>
    )
}