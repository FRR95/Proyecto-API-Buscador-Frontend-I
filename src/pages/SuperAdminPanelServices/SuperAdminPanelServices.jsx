import { useEffect, useState } from "react"
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router";
import "./SuperAdminPanelServices.css"
import { DeleteServiceById, GetServices, PostService, UpdateServiceById } from "../../services/apiCalls"
import { ServicesCard } from "../../components/ServicesCard/ServicesCard"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { validame } from "../../utils/functions"
export const SuperAdminPanelServices = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate();
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

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/");
        }
    }, [tokenStorage]);

    useEffect(() => {
        if (datosUser.decodificado.roleName !== "super_admin") {
            navigate("/");
        }

    }, [datosUser]);
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

            if (servicesCredentials.service_name === "" && servicesCredentials.description === "") {
                return setMsgError("Todos los campos tienen que estar rellenos");
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
            for (let elemento in servicesCredentials) {
                if (servicesCredentials[elemento] === "") {
                    return setMsgError("Todos los campos tienen que estar rellenos");
                }
            }


            const fetched = await UpdateServiceById(servicesCredentials, serviceId, tokenStorage)
            if (!fetched.success) {
                return setMsgError(fetched.message)
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
    const AddInfoToForm = async (service) => {
        setServicesCredentials({
            id: service.id,
            service_name: service.service_name,
            description: service.description,
        })
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
                                            <ServicesCard
                                                service_id={service.id}
                                                service_name={service.service_name}
                                                description={service.description}
                                            />
                                            <CustomButton
                                                className={"customButtonDesign"}
                                                title={"Borrar Servicio"}
                                                functionEmit={() => DeleteService(service.id)}
                                            />
                                            <CustomButton
                                                className={"customButtonDesign"}
                                                title={"Editar Servicio"}
                                                functionEmit={() => AddInfoToForm(service)}
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
                <div className="serviceFormSection">
                    <CustomInput
                        className={`inputDesign ${serviceError.idError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        placeholder={"serviceId"}
                        name={"id"}
                        disabled={"disabled"}
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

                        <img src=".\imgs\loadingspinner.gif" height="34em" width="34em" alt="" />

                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    )
}