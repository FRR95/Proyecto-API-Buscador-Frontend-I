
import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import "./Home.css";
import { ServicesCard } from "../../components/ServicesCard/ServicesCard";
import { GetServices } from "../../services/apiCalls";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate()

    const navigateToServices = () => {
        navigate("/services")
    }
    return (
        <>
            <Header />
            <div className="homeDesign">

                <div className="center">
                    <div className="title">Bienvenido a nuestra tienda</div>
                </div>
                <CustomButton
                    functionEmit={navigateToServices}
                    title={"Mira nuestros servicios"}
                    className={"customButtonDesign"}
                />
            </div>
        </>
    )
}