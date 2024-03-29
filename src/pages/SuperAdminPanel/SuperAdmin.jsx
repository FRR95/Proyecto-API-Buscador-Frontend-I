import { useEffect, useState } from "react"
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router";
import "./SuperAdmin.css"
import { ProfileCard } from "../../components/ProfileCard/ProfileCard"
import { DeleteUsers, GetAppointmentsUsersProfile, GetUsers, SeeUsersProfile, UpdateUserById } from "../../services/apiCalls"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard"
import { CustomLink } from "../../components/CustomLink/CustomLink"
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { validame } from "../../utils/functions";


export const SuperAdminPanel = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [userProfile, setUserProfile] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: ""
    })
    const [userError, setUserProfileError] = useState({
        first_nameError: "",
        last_nameError: "",
        emailError: ""
    });

    const inputHandler = (e) => {
        setUserProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value);

        setUserProfileError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };


    const [userAppointmenProfile, setUserAppointmentProfile] = useState({
        appointment_date: "",
        service_id: ""
    })
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);

    const [msgError, setMsgError] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");

    //Get Users
    const BringData = async () => {
        try {


            const fetched = await GetUsers(tokenStorage)
            setUsers(fetched.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (users.length === 0) {

            BringData()
        }

    }, [users])

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


    //Delete User
    const DeleteUser = async (userId) => {
        try {


            const fetched = await DeleteUsers(userId, tokenStorage)
            if (!fetched.success) {
                return setMsgError(fetched.message)
            }
            setMsgSuccess(fetched.message)

            BringData()
        } catch (error) {
            setMsgError(error)
        }

    }

    const UpdateUserProfile = async (userId) => {
        try {
            const fetched = await UpdateUserById(userProfile, userId, tokenStorage)
            if (!fetched.success) {
                return setMsgError(fetched.message)
            }
            setMsgSuccess(fetched.message)

            BringData()
        } catch (error) {
            setMsgError(error)
        }
    }

    //Get user appointments
    const GetUsersAppointments = async (userId) => {
        try {


            const fetched = await GetAppointmentsUsersProfile(userId, tokenStorage)
            if (!fetched.success) {
                return setMsgError(fetched.message)
            }

            setUserAppointmentProfile(fetched.data)
            setMsgSuccess(fetched.message)



        } catch (error) {
            setMsgError(error)
        }

    }

    //See User profile
    const SeeUserProfile = async (userId) => {
        try {
            const fetched = await SeeUsersProfile(userId, tokenStorage)
            if (!fetched.success) {
                return setMsgError(fetched.message)
            }
            setMsgSuccess(fetched.message)
            setUserProfile(fetched.data)

        } catch (error) {
            setMsgError(error)
        }

    }

    return (
        <>
            <Header />
            <div className="superAdminPanelDesign">


                <div className="error">{msgError}</div>
                <div className="success">{msgSuccess}</div>

                {
                    users.length > 0
                        ? (<div className="superAdminPanelDesign">




                            {userProfile.id !== ""
                                ?
                                (
                                    <>
                                        <div className="UsersSection">
                                            <ProfileCard
                                                user_id={userProfile.id}
                                                first_name={userProfile.first_name}
                                                last_name={userProfile.last_name}
                                                email={userProfile.email}
                                            />
                                            <CustomInput
                                                className={`inputDesign ${userError.first_nameError !== "" ? "inputDesignError" : ""
                                                    }`}
                                                type={"text"}
                                                placeholder={""}
                                                name={"first_name"}
                                                value={userProfile.first_name || ""}
                                                onChangeFunction={(e) => inputHandler(e)}
                                                onBlurFunction={(e) => checkError(e)}
                                            />
                                            <CustomInput
                                                className={`inputDesign ${userError.last_nameError !== "" ? "inputDesignError" : ""
                                                    }`}
                                                type={"text"}
                                                placeholder={""}
                                                name={"last_name"}
                                                value={userProfile.last_name || ""}
                                                onChangeFunction={(e) => inputHandler(e)}
                                                onBlurFunction={(e) => checkError(e)}
                                            />


                                            <CustomButton
                                                className={"customButtonDesign"}
                                                title={`Ver citas de ${userProfile.first_name}`}
                                                functionEmit={() => GetUsersAppointments(userProfile.id)}
                                            />
                                            <CustomButton
                                                className={"customButtonDesign"}
                                                title={`Editar perfil de ${userProfile.first_name}`}
                                                functionEmit={() => UpdateUserProfile(userProfile.id)}
                                            />
                                        </div>
                                    </>
                                )
                                :
                                (
                                    ""
                                )
                            }

                            {users.map(
                                user => {
                                    return (

                                        <>
                                            <div className="UsersSection">
                                                <ProfileCard
                                                    first_name={user.first_name}
                                                    last_name={user.last_name}
                                                    email={user.email}
                                                ></ProfileCard>
                                                <CustomButton
                                                    className={"customButtonDesign"}
                                                    title={`Borrar a ${user.first_name}`}
                                                    functionEmit={() => DeleteUser(user.id)}
                                                />
                                                <CustomButton
                                                    className={"customButtonDesign"}
                                                    title={`Ver perfil de ${user.first_name}`}
                                                    functionEmit={() => SeeUserProfile(user.id)}
                                                />
                                            </div>
                                        </>

                                    )
                                }
                            )
                            }


                        </div>)
                        : (<div className="superAdminPanelDesign">
                            <p>Los servicios estan viniendo </p>
                        </div>)

                }

                {

                    userAppointmenProfile.appointment_date !== ""
                        ?
                        userAppointmenProfile.map(
                            appointment => {
                                return (
                                    <>
                                        <div className="UsersSection">
                                            <h2>{`Cita de ${appointment.user.first_name}`}</h2>
                                            <AppointmentCard
                                                service_id={appointment.service.service_name}
                                                appointment_date={appointment.appointment_date}
                                            />
                                        </div>
                                    </>
                                )
                            }
                        )
                        :
                        ("No hay citas disponibles")
                }

                <CustomLink
                    destination={"/superadminpanelservices"}
                    title={"Ver servicios de admin"}
                />

            </div>
        </>
    )
}