import { useEffect, useState } from "react";
import driverService from "../Services/driverService";

function Drivers() {

    const [drivers, setDrivers] = useState([]);
    const [driverUsers, setDriverUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        licenseNo: "",
        joiningDate: "",
    });

    const user = JSON.parse(localStorage.getItem("user"));
    const eCode = user?.eCode;

    /* LOAD DATA */

    const loadDrivers = async () => {
        const data = await driverService.getAll(eCode);
        setDrivers(Array.isArray(data) ? data : []);
    };

    const loadDriverUsers = async () => {
        const res = await fetch("http://localhost:8080/api/users/drivers");
        const data = await res.json();
        setDriverUsers(data || []);
        setLoading(false);
    };

    useEffect(() => {
        if (eCode) {
            loadDrivers();
            loadDriverUsers();
        }
    }, [eCode]);

    /* SUBMIT */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId)
            await driverService.update(editId, form, eCode);
        else
            await driverService.create(form, eCode);

        setEditId(null);
        setForm({
            name: "",
            mobile: "",
            licenseNo: "",
            joiningDate: "",
        });

        loadDrivers();
    };

    /* EDIT */

    const handleEdit = (d) => {
        setForm(d);
        setEditId(d.id);
    };

    return (
        <div>

            <h2 style={{marginBottom:20}}>🚚 Driver Management</h2>

            {/* ADD DRIVER */}
            <div className="card">
                <h3>{editId ? "Update Driver" : "Add Driver"}</h3>

                <form onSubmit={handleSubmit} className="form">

                    <select
                        value={form.name}
                        onChange={(e)=>setForm({...form,name:e.target.value})}
                        required
                    >
                        <option value="">Select Driver</option>
                        {driverUsers.map(u=>(
                            <option key={u.id}>{u.fullName}</option>
                        ))}
                    </select>

                    <input
                        placeholder="Mobile"
                        value={form.mobile}
                        onChange={(e)=>setForm({...form,mobile:e.target.value})}
                    />

                    <input
                        placeholder="License"
                        value={form.licenseNo}
                        onChange={(e)=>setForm({...form,licenseNo:e.target.value})}
                    />

                    <input
                        type="date"
                        value={form.joiningDate}
                        onChange={(e)=>setForm({...form,joiningDate:e.target.value})}
                    />

                    <button>
                        {editId ? "Update Driver" : "Add Driver"}
                    </button>
                </form>
            </div>

            {/* DRIVER TABLE */}
            <div className="card">
                <h3>Driver List</h3>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>License</th>
                            <th>Joining</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {drivers.map(d=>(
                            <tr key={d.id}>
                                <td>{d.name}</td>
                                <td>{d.mobile}</td>
                                <td>{d.licenseNo}</td>
                                <td>{d.joiningDate || "-"}</td>

                                <td>
                                    <span
                                        style={{cursor:"pointer"}}
                                        onClick={()=>handleEdit(d)}
                                    >
                                        ✏️
                                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* LOCAL STYLE ONLY */}
            <style>{`

                .form{
                    display:grid;
                    grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
                    gap:12px;
                }

                input,select{
                    padding:10px;
                    border:1px solid #ccc;
                    border-radius:6px;
                }

                button{
                    background:#2563eb;
                    color:white;
                    border:none;
                    padding:10px;
                    border-radius:6px;
                    cursor:pointer;
                }

                table{
                    width:100%;
                    border-collapse:collapse;
                }

                th,td{
                    padding:12px;
                    border-bottom:1px solid #eee;
                }

            `}</style>

        </div>
    );
}

export default Drivers;