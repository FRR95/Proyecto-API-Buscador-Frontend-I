import { useEffect, useState } from "react"
import { Header } from "../../common/Header/Header"
import "./SuperAdmin.css"
import { ProfileCard } from "../../components/ProfileCard/ProfileCard"
import { DeleteUsers, GetAppointmentsUsersProfile, GetUsers, SeeUsersProfile } from "../../services/apiCalls"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard"
import { CustomLink } from "../../components/CustomLink/CustomLink"


export const SuperAdminPanel = () => {
    const [users, setUsers] = useState([])
    const [userProfile, setUserProfile] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: ""
    })
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



                {
                    users.length > 0
                        ? (<div className="superAdminPanelDesign">
                            <div className="error">{msgError}</div>
                            <div className="success">{msgSuccess}</div>

                            {userProfile.id !== ""
                                ?
                                (
                                    <>
                                        <ProfileCard
                                            user_id={userProfile.id}
                                            first_name={userProfile.first_name}
                                            last_name={userProfile.last_name}
                                            email={userProfile.email}
                                        />

                                        <CustomButton
                                            className={"customButtonDesign"}
                                            title={`Ver citas de ${userProfile.first_name}`}
                                            functionEmit={() => GetUsersAppointments(userProfile.id)}
                                        />
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
                                            <ProfileCard
                                                first_name={user.first_name}
                                                last_name={user.last_name}
                                                email={user.email}
                                            />
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
                                        <AppointmentCard
                                            service_id={appointment.service.service_name}
                                            appointment_date={appointment.appointment_date}
                                        />
                                    </>
                                )
                            }
                        )
                        :
                        ("")
                }

                <CustomLink 
                destination={"/superadminpanelservices"}
                title={"Ver servicios de admin"}
                />

            </div>
        </>
    )
}