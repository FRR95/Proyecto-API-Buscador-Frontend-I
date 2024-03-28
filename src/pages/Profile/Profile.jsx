import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";
import { DeleteUserAppointment, GetAppointments, GetProfile, PostAppointment, UpdateProfile } from "../../services/apiCalls";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { validame } from "../../utils/functions";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard";
import { Header } from "../../common/Header/Header";


export const Profile = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([])
  const [appointmentsCredentials, setAppointmentsCredentials] = useState({
    appointment_date: "",
    service_id: "",
  });

  const appointmentInputHandler = (e) => {
    setAppointmentsCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [write, setWrite] = useState("disabled");
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  const [loadedData, setLoadedData] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });


  const [userError, setUserError] = useState({
    first_nameError: "",
    last_nameError: "",
    emailError: "",
  });

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");
  const [loading, setLoading] = useState(false)

  const BringData = async () => {
    try {


      const fetched = await GetAppointments(tokenStorage)
      setAppointments(fetched.data)




    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    if (appointments.length === 0) {



      BringData()

    }

  }, [appointments])

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage]);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const fetched = await GetProfile(tokenStorage);
        setLoadedData(true);


        setUser({
          first_name: fetched.data.first_name,
          last_name: fetched.data.last_name,
          email: fetched.data.email,
        });

      } catch (error) {
        console.log(error);
      }
    };

    if (!loadedData) {
      getUserProfile();
    }
  }, [user]);

  const updateData = async () => {

    try {
      setLoading(true)
      const fetched = await UpdateProfile(tokenStorage, user)

      setMsgSuccess(fetched.message)
      setLoading(false)

      setUser({
        first_name: fetched.dataFetched.first_name,
        last_name: fetched.dataFetched.last_name,
        email: fetched.dataFetched.email
      })

      setWrite("disabled")


    } catch (error) {
      console.log(error)
    }
  }

  const createAppointment = async () => {
    try {
      for (let elemento in appointmentsCredentials) {
        if (appointmentsCredentials[elemento] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }
      setLoading(true)
      const fetched = await PostAppointment(tokenStorage, appointmentsCredentials)

      setLoading(false)
      setMsgSuccess(fetched.message);

      BringData()

    } catch (error) {
      setMsgError(error.message)
    }



  }

  const DeleteAppointment = async (appointment) => {
    try {
      const fetched = await DeleteUserAppointment(appointment, tokenStorage)
      setMsgSuccess(fetched.message);
      BringData()
    } catch (error) {
      setMsgError(error)
    }

  }

  return (
    <>
      <Header />
      <div className="profileDesign">
        <div className="error">{msgError}</div>
        <div className="success">{msgSuccess}</div>
        {loading ? (

          <span>Loading...</span>

        ) : (
          ""
        )}

        {!loadedData ? (
          <div>CARGANDO</div>
        ) : (
          <div>
            <h3>TU PERFIL</h3>
            <ProfileCard
              first_name={`Nombre: ${user.first_name}`}
              last_name={`Apellidos: ${user.last_name}`}
              email={`Email: ${user.email}`}
            />
            <CustomInput
              className={`inputDesign ${userError.first_nameError !== "" ? "inputDesignError" : ""
                }`}
              type={"text"}
              placeholder={""}
              name={"first_name"}
              disabled={write}
              value={user.first_name || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.first_nameError}</div>
            <CustomInput
              className={`inputDesign ${userError.last_nameError !== "" ? "inputDesignError" : ""
                }`}
              type={"text"}
              placeholder={""}
              name={"last_name"}
              disabled={write}
              value={user.last_name || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.last_nameError}</div>
            <CustomInput
              className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                }`}
              type={"email"}
              placeholder={""}
              name={"email"}
              disabled={"disabled"}
              value={user.email || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.emailError}</div>
            <CustomButton
              className={"customButtonDesign"}
              title={write === "" ? "Confirm" : "Edit"}
              functionEmit={write === "" ? updateData : () => setWrite("")}
            />
          </div>

        )

        }
        <h3>TUS CITAS</h3>
        <div className="UsersSection">
          {appointments.map(
            appointment => {
              return (

                <>



                  <AppointmentCard
                    service_id={appointment.service.service_name}
                    appointment_date={appointment.appointment_date}
                  />
                  <CustomButton
                    className={"customButtonDesign"}
                    title={"Borrar cita"}
                    functionEmit={() => DeleteAppointment(appointment.id)}
                  />

                </>

              )
            }
          )

          }
        </div>

        <div className="UsersSection">
          <h3>CREAR CITA</h3>
          <CustomInput
            className={`inputDesign`}
            type={"date"}
            placeholder={""}
            name={"appointment_date"}
            value={appointmentsCredentials.appointment_date || ""}
            onChangeFunction={(e) => appointmentInputHandler(e)}
          />
          <CustomInput
            className={`inputDesign`}
            type={"text"}
            placeholder={""}
            name={"service_id"}
            value={appointmentsCredentials.service_id || ""}
            onChangeFunction={(e) => appointmentInputHandler(e)}
          />

          <CustomButton
            className={"customButtonDesign"}
            title={"Crear cita"}
            functionEmit={createAppointment}
          />


        </div>
      </div>

    </>
  );

};
