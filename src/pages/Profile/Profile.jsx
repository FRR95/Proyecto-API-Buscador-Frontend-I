import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";
import { GetProfile } from "../../services/apiCalls";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";


export const Profile = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();

 
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  const [loadedData, setLoadedData] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });





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



  return (
    <>
     <div className="profileDesign">
        {!loadedData ? (
          <div>CARGANDO</div>
        ) : (
        <ProfileCard
        first_name={user.first_name}
        last_name={user.last_name}
        email={user.email}
        />
        )
        }
      </div>
    </>
  );
};