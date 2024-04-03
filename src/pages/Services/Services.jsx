import { useState } from "react"
import { ServicesCard } from "../../components/ServicesCard/ServicesCard"
import { GetServices } from "../../services/apiCalls"
import "./Services.css"
import { useEffect } from "react"
import { Header } from "../../common/Header/Header"
export const Services = () => {
    const [services, setServices] = useState([])

    const BringData = async () => {
        try {


            const fetched = await GetServices()
            setServices(fetched.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (services.length === 0) {
         
            BringData()
        }

    }, [services])

    useEffect(() => {
        if (services === undefined) {
            
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