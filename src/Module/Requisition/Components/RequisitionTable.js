import axios from "axios";

const API = "http://localhost:8080/api/vehicle-requisition";

export const createRequisition = (data, department) => {
    return axios.post(API, data, {
        headers: {
            department: department
        }
    });
};

export const getRequisitions = () => {
    return axios.get(API);
};