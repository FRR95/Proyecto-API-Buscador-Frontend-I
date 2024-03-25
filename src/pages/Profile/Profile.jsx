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



  useEffect(() => {
    if (appointments.length === 0) {
      const BringData = async () => {
        try {


          const fetched = await GetAppointments(tokenStorage)
          setAppointments(fetched.data)




        } catch (error) {
          console.log(error)
        }

      }


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
      const fetched = await UpdateProfile(tokenStorage, user)



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
      const fetched = await PostAppointment(tokenStorage, appointmentsCredentials)
      navigate("/profile");

    } catch (error) {
      return error
    }



  }

  const DeleteAppointment = async (appointment) => {
    try {
      const fetched = await DeleteUserAppointment(appointment, tokenStorage)
      console.log(fetched.message);
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <Header />
      <div className="profileDesign">

        {!loadedData ? (
          <div>CARGANDO</div>
        ) : (
          <div>
            <ProfileCard
              first_name={user.first_name}
              last_name={user.last_name}
              email={user.email}
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
              className={write === "" ? "customButtonGreen customButtonDesign" : "customButtonDesign"}
              title={write === "" ? "Confirm" : "Edit"}
              functionEmit={write === "" ? updateData : () => setWrite("")}
            />
          </div>

        )

        }

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

        <pre>{JSON.stringify(appointmentsCredentials, null, 2)}</pre>

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
          className={"customButtonGreen"}
          title={"Create appointment"}
          functionEmit={createAppointment}
        />



      </div>

    </>
  );

};
