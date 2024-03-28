const root = "http://localhost:4000/api/";

export const RegisterUser = async (user) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(`${root}auth/register`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const LoginUser = async (credenciales) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciales),
  };

  try {
    const response = await fetch(`${root}auth/login`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const GetProfile = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${root}user/profile`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const UpdateProfile = async (token, data) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(`${root}user/profile`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const GetAppointments = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  const response = await fetch(`${root}appointments`, options)
  const data = await response.json()

  return data;

}
export const PostAppointment = async (token, appointmentsCredentials) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(appointmentsCredentials)
  };
  const response = await fetch(`${root}appointments`, options)
  const data = await response.json()

  return data;

}

export const GetServices = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  };

  try {
    const response = await fetch(`${root}services`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const DeleteUserAppointment = async (appointment, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  try {
    const response = await fetch(`${root}appointments/${appointment}`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
}

export const GetUsers = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  try {
    const response = await fetch(`${root}users`, options);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;

  } catch (error) {
    return error
  }
}

export const DeleteUsers = async (userId, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  try {
    const response = await fetch(`${root}users/${userId}`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
}
export const SeeUsersProfile = async (userId, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  try {
    const response = await fetch(`${root}users/${userId}`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
}
export const GetAppointmentsUsersProfile = async (userId, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  try {
    const response = await fetch(`${root}${userId}/appointments`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
}
export const DeleteServiceById=async(serviceId,token)=>{
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  try {
    const response = await fetch(`${root}services/${serviceId}`, options);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data

  } catch (error) {
    return error;
  }


}
export const PostService=async(appointmentsCredentials,token)=>{
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(appointmentsCredentials)
  };
  try {
    const response = await fetch(`${root}services`, options);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data

  } catch (error) {
    return error;
  }


}
export const UpdateServiceById=async(servicesCredentials,ServiceId,token)=>{
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(servicesCredentials)
  };
  try {
    const response = await fetch(`${root}services/${ServiceId}`, options);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data

  } catch (error) {
    return error;
  }


}