
import { useNavigate } from "react-router-dom";
import "./Header.css"
import { CustomLink } from "../../components/CustomLink/CustomLink";

export const Header = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));

    const logOut = () => {
        localStorage.removeItem("passport");
        navigate("/login");
    };

    return (
        <div className="headerDesign">

            <CustomLink title={"home"} destination={"/"} />

            {passport?.token ? (
                <div className="menu">
                    <CustomLink
                        title={passport?.decodificado?.first_name}
                        destination={"/profile"}
                    />
                    <div onClick={logOut}>
                        <CustomLink title={"log out"} destination={"/"} />
                    </div>
                </div>
            ) : (
                <div className="menu">
                    <CustomLink title={"register"} destination={"/register"} />
                    <CustomLink title={"login"} destination={"/login"} />
                </div>
            )}


        </div>
    )
}
