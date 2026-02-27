import React, { useState } from "react";
import { createRequisition } from "../Services/requisitionService";

function AddVehicleRequisition() {

    const storedUser =
        JSON.parse(localStorage.getItem("user") || "{}");

    const loginUserName =
        storedUser.fullName || "Unknown User";

    const department =
        storedUser.department || "Purchase";

    const [form, setForm] = useState({
        requisitionBy: loginUserName,
        requisitionDate: "",
        requisitionTime: "",
        projectName: "",
        locationFrom: "",
        locationTo: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await createRequisition(form, department);
            alert("✅ Created : " + res.data.requisitionNo);

            setForm({
                requisitionBy: loginUserName,
                requisitionDate: "",
                requisitionTime: "",
                projectName: "",
                locationFrom: "",
                locationTo: ""
            });

        } catch (err) {
            alert("❌ Creation Failed");
        }
    };

    return (
        <div className="req-container">

            <div className="req-card">
                <h2>Create Vehicle Requisition</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Requested By</label>
                            <input
                                name="requisitionBy"
                                value={form.requisitionBy}
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                name="requisitionDate"
                                value={form.requisitionDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Time</label>
                            <input
                                type="time"
                                name="requisitionTime"
                                value={form.requisitionTime}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Project Name</label>
                            <input
                                name="projectName"
                                placeholder="Enter Project"
                                value={form.projectName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Location From</label>
                            <input
                                name="locationFrom"
                                placeholder="From"
                                value={form.locationFrom}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Location To</label>
                            <input
                                name="locationTo"
                                placeholder="To"
                                value={form.locationTo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <button className="submit-btn" type="submit">
                        Create Requisition
                    </button>

                </form>
            </div>

            <style>{`

      .req-container {
        display: flex;
        justify-content: center;
        padding: 40px 0;
      }

      .req-card {
        background: #ffffff;
        padding: 30px;
        width: 100%;
        max-width: 900px;
        border-radius: 16px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.05);
      }

      .req-card h2 {
        margin-bottom: 25px;
        color: #1e293b;
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      .form-group label {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 6px;
        color: #64748b;
      }

      .form-group input {
        padding: 10px 12px;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        font-size: 14px;
        outline: none;
        transition: 0.2s;
      }

      .form-group input:focus {
        border-color: #7c3aed;
        box-shadow: 0 0 0 2px rgba(124,58,237,0.1);
      }

      .submit-btn {
        margin-top: 25px;
        padding: 12px 20px;
        background: #7c3aed;
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s;
      }

      .submit-btn:hover {
        background: #6d28d9;
      }

      `}</style>

        </div>
    );
}

export default AddVehicleRequisition;