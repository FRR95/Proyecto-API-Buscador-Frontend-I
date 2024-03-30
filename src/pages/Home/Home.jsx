
import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import "./Home.css";
import { ServicesCard } from "../../components/ServicesCard/ServicesCard";
import { GetServices } from "../../services/apiCalls";

export const Home = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        if (services.length === 0) {
            const BringData = async () => {
                try {


                    const fetched = await GetServices()
                    setServices(fetched.data)

                } catch (error) {
                    console.log(error)
                }
            }
            BringData()
        }

    }, [services])

    return (
        <>
        <Header />
        <div className="servicesDesign">
            <h1>NUESTROS SERVICIOS</h1>
            {
                services.length > 0
                    ? (
                        <div>
                            {services.map(
                                service => {
                                    return (

                                        <>

                                            <div className="serviceSection">
                                                <ServicesCard
                                                    service_name={service.service_name}
                                                    description={service.description}
                                                />
                                            </div>

                                        </>
                                    )
                                }
                            )
                            }
                        </div>)
                    : (
                        <p>Los servicios estan viniendo </p>
                    )
            }
        </div>
    </>
    )
}