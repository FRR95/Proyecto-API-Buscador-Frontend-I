
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
        <>
        
        <div className="headerDesign">
        <img className="logoImg" src=".\imgs\tattoogear-tattoo8.png" alt="" />

            <CustomLink title={"Home"} destination={"/"} />
            <CustomLink title={"Nuestros servicios"} destination={"/services"} />

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
            {passport?.token && passport?.decodificado?.roleName==="super_admin" ? (
                <div className="menu">
              <CustomLink title={"Super Admin Panel"} destination={"/superadminpanel"} />
                </div>
            ) : (
                <div className="menu">
                </div>
            )}


        </div>
        </>
    )
}
