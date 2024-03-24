import { useState } from "react"
import { ServicesCard } from "../../components/ServicesCard/ServicesCard"
import { GetServices } from "../../services/apiCalls"
import "./Services.css"
import { useEffect } from "react"
export const Services=()=>{
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


    return(
        <>
        {
            services.length > 0
                ? (<div className="servicesDesign">

                    {services.map(
                        service => {
                            return (
                        
                         
                                    <ServicesCard
                                    service_name={service.service_name}
                                    description={service.description}
                                    />
                            )
                        }
                    )
                    }
                </div>)
                : (<p>Los servicios estan viniendo </p>)
        }
        </>
    )
}