import { useEffect, useState } from "react"
import { Header } from "../../common/Header/Header"
import "./SuperAdmin.css"
import { ProfileCard } from "../../components/ProfileCard/ProfileCard"
import { GetUsers } from "../../services/apiCalls"
import { CustomButton } from "../../components/CustomButton/CustomButton"
export const SuperAdminPanel = () => {
    const [users, setUsers] = useState([])
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);

    useEffect(() => {
        if (users.length === 0) {
            const BringData = async () => {
                try {


                    const fetched = await GetUsers(tokenStorage)
                    setUsers(fetched.data)

                } catch (error) {
                    console.log(error)
                }
            }
            BringData()
        }

    }, [users])

    const DeleteUser = (email) => {
        console.log(email)
    }

    return (
        <>
            <Header />
            <div className="superAdminPanelDesign">
                {
                    users.length > 0
                        ? (<div className="superAdminPanelDesign">

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
                                                title={"Borrar cita"}
                                                functionEmit={() => DeleteUser(user.email)}
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
            </div>
        </>
    )
}