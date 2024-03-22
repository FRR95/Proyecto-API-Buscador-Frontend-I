import { useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import "./Register.css";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { RegisterUser } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

export const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password_hash: "",
  });

  const [userError, setUserError] = useState({
    first_nameError: "",
    last_nameError: "",
    emailError: "",
    password_hashError: "",
  });

  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");

  //funcion emit que está aqui en el padre... que se la pasamos al custom input
  const inputHandler = (e) => {
    //voy a proceder a bindear....
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
      //el truco del almendruco nos dice que seria... nameError: error, o emailError: error
    }));
  };

  //function emit que también está aqui en el padre...en este caso para registrar...
  const registerMe = async () => {
    try {
      for (let elemento in user) {
        if (user[elemento] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }

      const fetched = await RegisterUser(user);

      setMsgSuccess(fetched.message)

      setTimeout(()=>{
        navigate("/login")
      },1200)

    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <div className="registerDesign">
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <CustomInput
        className={`inputDesign ${
          userError.first_nameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        placeholder={"first_name"}
        name={"first_name"}
        value={user.first_name || ""}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
      />
      <div className="error">{userError.first_nameError}</div>
      <CustomInput
        className={`inputDesign ${
          userError.last_nameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        placeholder={"last_name"}
        name={"last_name"}
        value={user.last_name || ""}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
      />
      <div className="error">{userError.last_nameError}</div>
      <CustomInput
        className={`inputDesign ${
          userError.emailError !== "" ? "inputDesignError" : ""
        }`}
        type={"email"}
        placeholder={"email"}
        name={"email"}
        value={user.email || ""}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
      />
      <div className="error">{userError.emailError}</div>
      <CustomInput
        className={`inputDesign ${
          userError.password_hashError !== "" ? "inputDesignError" : ""
        }`}
        type={"password"}
        placeholder={"password"}
        name={"password_hash"}
        value={user.password_hash || ""}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
      />
      <div className="error">{userError.password_hashError}</div>
      <CustomButton
        className={"customButtonDesign"}
        title={"Register"}
        functionEmit={registerMe}
      />
      <div className="error">{msgError}</div>
      <div className="successMessage">{msgSuccess}</div>
    </div>
  );
};