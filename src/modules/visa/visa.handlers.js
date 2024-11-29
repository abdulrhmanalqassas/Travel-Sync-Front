import { instance } from "../../network/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const deleted = () => toast.success("The agency deleted successfully.");
const added = () => toast.success("The agency added successfully.");
const edited = () => toast.success("The agency edited successfully.");

const cookie = Cookies.get("auth-token-data");
const token = JSON.parse(cookie ? cookie : "null")?.token;
// const token = Cookies.get("authUserToken");

async function getVisa(country,setData, setIsLoading ) {
  setIsLoading(true);
  let data = await instance
    .get(`/api/v1/visa-requirement/country/${country}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });

  if (data?.status === 200) {
    setData(data.data);
    setIsLoading(false);
    return data.data;
  }
}

async function DeleteVisa(id, callback) {
  let data = await instance
    .delete(`/api/v1/visa-requirement/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.error(error.message);
    });

  console.log(data);

  if (data?.status === 204) {
    deleted();
    callback();
  }
}

async function addVisa(values, setIsLoading, callback) {
  console.log(values);
  // Set loading state to true
  setIsLoading(true);

  try {
    // Make POST request to add a user
    await instance.post("/api/v1/visa-requirement", values, {
      headers: {
        Authorization: "Bearer " + token, // Include bearer token in the header
      },
    });
    callback();
    added();
  } catch (error) {
    // If error occurs, log error response data, set API error state, and throw the error
    console.error(error.response.data?.message);
    throw error; // Throw the error for further handling if needed
  } finally {
    // Set loading state to false regardless of success or failure
    setIsLoading(false);
  }
}


async function editVisa(values, id, setIsLoading, callback) {
  // Set loading state to true
  setIsLoading(true);

  try {
    // Make POST request to add a user
    await instance.patch(`/api/v1/visa-requirement/${id}`, values, {
      headers: {
        Authorization: "Bearer " + token, // Include bearer token in the header
      },
    });
    // If successful, clear API error and log success message
    callback();
    edited();
  } catch (error) {
    // If error occurs, log error response data, set API error state, and throw the error
    console.error(error);
    throw error; // Throw the error for further handling if needed
  } finally {
    // Set loading state to false regardless of success or failure
    setIsLoading(false);
  }
}
async function getVisaByImg(country ,setData, setIsLoading) {
    setIsLoading(true);
    let data = await instance
      .get("/api/v1/ready-visa/country/" + country)
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  
    if (data?.status === 200) {
      setData(data.data);
      setIsLoading(false);
    }
  }
  
  async function DeleteVisaByImg(id, callback) {
    let data = await instance
      .delete(`/api/v1/ready-visa/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.error(error.message);
      });
  
    console.log(data);
  
    if (data?.status === 204) {
      deleted();
      callback();
    }
  }
  
  async function addVisaByImg(values, setIsLoading, callback) {
    console.log(values);
    // Set loading state to true
    setIsLoading(true);
  
    try {
      // Make POST request to add a user
      await instance.post("/api/v1/ready-visa", values, {
        headers: {
          Authorization: "Bearer " + token, // Include bearer token in the header
        },
      });
      callback();
      added();
    } catch (error) {
      // If error occurs, log error response data, set API error state, and throw the error
      console.error(error.response.data?.message);
      throw error; // Throw the error for further handling if needed
    } finally {
      // Set loading state to false regardless of success or failure
      setIsLoading(false);
    }
  }
  
  
  async function editVisaByImg(values, id, setIsLoading, callback) {
    // Set loading state to true
    setIsLoading(true);
  
    try {
      // Make POST request to add a user
      await instance.patch(`/api/v1/ready-visa/${id}`, values, {
        headers: {
          Authorization: "Bearer " + token, // Include bearer token in the header
        },
      });
      // If successful, clear API error and log success message
      callback();
      edited();
    } catch (error) {
      // If error occurs, log error response data, set API error state, and throw the error
      console.error(error);
      throw error; // Throw the error for further handling if needed
    } finally {
      // Set loading state to false regardless of success or failure
      setIsLoading(false);
    }
  }
export { getVisa, DeleteVisa, addVisa, editVisa,getVisaByImg, DeleteVisaByImg, addVisaByImg, editVisaByImg };
