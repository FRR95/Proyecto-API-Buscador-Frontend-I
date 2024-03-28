import { useEffect, useState } from "react"
import { Header } from "../../common/Header/Header"
import "./SuperAdminPanelServices.css"
import { DeleteServiceById, GetServices, PostService, UpdateServiceById } from "../../services/apiCalls"
import { ServicesCard } from "../../components/ServicesCard/ServicesCard"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { validame } from "../../utils/functions"
export const SuperAdminPanelServices = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));

    const [serviceError, setServiceError] = useState({
        idError: "",
        service_nameError: "",
        descriptionError: "",
    });
    const [msgError, setMsgError] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");
    const [loading, setLoading] = useState(false)
    const [write, setWrite] = useState("disabled");
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);

    const [services, setServices] = useState([])
    const [servicesCredentials, setServicesCredentials] = useState({
        id: "",
        service_name: "",
        description: "",
    })
    const inputHandler = (e) => {
        setServicesCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value);

        setServiceError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    const BringData = async () => {
        try {


            const fetched = await GetServices()
            setServices(fetched.data)

        } catch (error) {
            setMsgError(error)
        }
    }

    const CreateService = async () => {
        try {
            for (let elemento in services) {
                if (services[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }
            setLoading(true)
            const fetched = await PostService(servicesCredentials, tokenStorage)
            if (!fetched.success) {
                setLoading(false)
                return setMsgError(fetched.message)
            }

            setMsgSuccess(fetched.message)
            setLoading(false)
            setTimeout(() => {
                BringData()
            }, 1000);
        } catch (error) {
            setMsgError(error)
        }
    }

    useEffect(() => {
        if (services.length === 0) {

            BringData()
        }

    }, [services])

    const UpdateService = async (serviceId) => {
        try {
            const fetched = await UpdateServiceById(servicesCredentials, serviceId, tokenStorage)
            if (!fetched.success) {
                setMsgError(fetched.message)
            }
            setMsgSuccess(fetched.message)
            setTimeout(() => {
                BringData()
            }, 1000);
        } catch (error) {
            setMsgError(error)
        }
    }

    const DeleteService = async (serviceId) => {
        const fetched = await DeleteServiceById(serviceId, tokenStorage)
        if (!fetched.success) {
            setMsgError(fetched.message)
        }
        setMsgSuccess(fetched.message)
        setTimeout(() => {
            BringData()
        }, 2000);
    }
    return (
        <>
            <Header />
            <div className="superadminpanelservicesDesign">

                {
                    services.length > 0
                        ? (<div className="superadminpanelservicesDesign">

                            {services.map(
                                service => {
                                    return (
                                        <>

                                            {/* <CustomInput
                                                className={`inputDesign ${serviceError.service_nameError !== "" ? "inputDesignError" : ""
                                                    }`}
                                                type={"text"}
                                                placeholder={"service_name"}
                                                name={"service_name"}
                                                disabled={write}
                                                value={service.service_name || ""}
                                                onChangeFunction={(e) => inputHandler(e)}
                                                onBlurFunction={(e) => checkError(e)}
                                            />
                                            <div className="error">{serviceError.service_nameError}</div>
                                            <CustomInput
                                                className={`inputDesign ${serviceError.descriptionError !== "" ? "inputDesignError" : ""
                                                    }`}
                                                type={"text"}
                                                placeholder={""}
                                                name={"description"}
                                                disabled={write}
                                                value={service.description || ""}
                                                onChangeFunction={(e) => inputHandler(e)}
                                                onBlurFunction={(e) => checkError(e)}
                                            />
                                            <div className="error">{serviceError.descriptionError}</div>

                                            <CustomButton
                                                className={write === "" ? "customButtonGreen customButtonDesign" : "customButtonDesign"}
                                                title={write === "" ? "Confirm" : "Edit"}
                                                functionEmit={write === "" ? () => updateData(service.id) : () => setWrite("")}
                                            />
                                            <CustomButton
                                                className={"customButtonDesign"}
                                                title={"Borrar"}
                                                functionEmit={() => DeleteService(service.id)}
                                            /> */}

                                            <ServicesCard
                                                service_id={service.id}
                                                service_name={service.service_name}
                                                description={service.description}
                                            />
                                            <CustomButton
                                                className={"customButtonDesign"}
                                                title={"Borrar"}
                                                functionEmit={() => DeleteService(service.id)}
                                            />
                                        </>
                                    )
                                }
                            )
                            }
                        </div>)
                        : (<div className="superadminpanelservicesDesign">
                            <p>Los servicios estan viniendo </p>
                        </div>)
                }
                <CustomInput
                    className={`inputDesign ${serviceError.idError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    placeholder={"serviceId"}
                    name={"id"}
                    value={servicesCredentials.id || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{serviceError.idError}</div>
                <CustomInput
                    className={`inputDesign ${serviceError.service_nameError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    placeholder={"service_name"}
                    name={"service_name"}
                    value={servicesCredentials.service_name || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{serviceError.service_nameError}</div>
                <CustomInput
                    className={`inputDesign ${serviceError.descriptionError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    placeholder={"description"}
                    name={"description"}
                    value={servicesCredentials.description || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{serviceError.descriptionError}</div>
                <CustomButton
                    className={"customButtonDesign"}
                    title={"Crear servicio"}
                    functionEmit={CreateService}
                />

                <CustomButton
                    className={"customButtonDesign"}
                    title={"Actualizar serivicio"}
                    functionEmit={() => UpdateService(servicesCredentials.id)}
                />
                <div className="error">{msgError}</div>
                <div className="success">{msgSuccess}</div>
                {loading ? (

                    <span>Loading...</span>

                ) : (
                    ""
                )}
            </div>
        </>
    )
}