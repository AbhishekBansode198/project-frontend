import axios from "axios";

const API = "http://localhost:8080/api/vehicles";

/*
   Fetch vehicles assigned to driver using eCode
*/
const getDriverVehicles = async (eCode) => {
    const res = await axios.get(`${API}/assigned?eCode=${eCode}`);
    return res.data;
};

export default {
    getDriverVehicles,
};
