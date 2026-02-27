import axios from "axios";

const API = "http://localhost:8080/api/drivers";

const driverService = {

    // GET ALL
    getAll: async (eCode) => {
        const res = await axios.get(`${API}?eCode=${eCode}`);
        return res.data;
    },

    // CREATE
    create: async (driver, eCode) => {
        const res = await axios.post(`${API}?eCode=${eCode}`, driver);
        return res.data;
    },

    // ✅ UPDATE
    update: async (id, driver, eCode) => {
        const res = await axios.put(`${API}/${id}?eCode=${eCode}`, driver);
        return res.data;
    },

    // ✅ DELETE  ⭐ ADD THIS
    delete: async (id, eCode) => {
        const res = await axios.delete(`${API}/${id}?eCode=${eCode}`);
        return res.data;
    }
};

export default driverService;