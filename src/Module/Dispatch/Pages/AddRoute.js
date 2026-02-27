// import { useEffect, useState } from "react";
// import axios from "axios";
// import vehicleService from "../Services/vehicleService";
// import driverService from "../Services/driverService";
// import LiveTracking from "../Pages/LiveTracking";
//
// function AddRoute() {
//     const [vehicles, setVehicles] = useState([]);
//     const [drivers, setDrivers] = useState([]);
//     const [selectedVehicle, setSelectedVehicle] = useState("");
//     const [selectedDriverId, setSelectedDriverId] = useState(""); // store driver ID
//     const [selectedDriverName, setSelectedDriverName] = useState(""); // store driver name
//     const [points, setPoints] = useState(["", ""]);
//     const [description, setDescription] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//
//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user?.eCode) {
//             setErrorMessage("User eCode not found. Please login again.");
//             return;
//         }
//
//         const loadData = async () => {
//             try {
//                 const vehicleData = await vehicleService.getAll(user.eCode);
//                 setVehicles(Array.isArray(vehicleData) ? vehicleData : []);
//
//                 const driverData = await driverService.getAll(user.eCode);
//                 setDrivers(Array.isArray(driverData) ? driverData : []);
//
//             } catch (err) {
//                 console.error("Failed to load data:", err);
//                 setErrorMessage("Failed to load vehicles/drivers.");
//             }
//         };
//
//         loadData();
//     }, []);
//
//     const handlePointChange = (index, value) => {
//         const updatedPoints = [...points];
//         updatedPoints[index] = value;
//         setPoints(updatedPoints);
//     };
//
//     const addPointField = () => setPoints([...points, ""]);
//
//     const removePointField = (index) => {
//         if (points.length > 2) {
//             setPoints(points.filter((_, i) => i !== index));
//         } else {
//             setErrorMessage("At least 2 points are required.");
//         }
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         if (!selectedVehicle || !selectedDriverId || points.some(p => !p)) {
//             setErrorMessage("All fields must be filled!");
//             return;
//         }
//
//         try {
//             const vehicleObj = vehicles.find(v => v.id === parseInt(selectedVehicle));
//             if (!vehicleObj) return setErrorMessage("Selected vehicle not found!");
//
//             // payload sends both driverId and driverName
//             const payload = {
//                 vehicleId: parseInt(selectedVehicle),
//                 vehicleNumber: vehicleObj.vehicleNumber,
//                 driverId: parseInt(selectedDriverId),
//                 driverName: selectedDriverName,
//                 description,
//                 points,
//                 status: "Planned"
//             };
//
//             await axios.post("http://localhost:8080/api/trips/planned", payload);
//
//             alert("Route created successfully!");
//
//             setSelectedVehicle("");
//             setSelectedDriverId("");
//             setSelectedDriverName("");
//             setPoints(["", ""]);
//             setDescription("");
//             setErrorMessage("");
//
//         } catch (err) {
//             console.error(err);
//             setErrorMessage("Failed to create route. Check vehicle/driver data.");
//         }
//     };
//
//     return (
//         <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//             <h1>Add Route</h1>
//
//             {errorMessage && (
//                 <div style={{ color: "red", marginBottom: "10px" }}>
//                     {errorMessage}
//                 </div>
//             )}
//
//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
//                 <div style={{ marginBottom: "15px" }}>
//                     <label style={{ fontWeight: "bold" }}>Vehicle:</label>
//                     <select
//                         value={selectedVehicle}
//                         onChange={e => setSelectedVehicle(e.target.value)}
//                         style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
//                     >
//                         <option value="">Select Vehicle</option>
//                         {vehicles.map(v => (
//                             <option key={v.id} value={v.id}>
//                                 {v.vehicleNumber}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//
//                 <div style={{ marginBottom: "15px" }}>
//                     <label style={{ fontWeight: "bold" }}>Driver:</label>
//                     <select
//                         value={selectedDriverId}
//                         onChange={e => {
//                             const driver = drivers.find(d => d.id === parseInt(e.target.value));
//                             if (driver) {
//                                 setSelectedDriverId(driver.id);
//                                 setSelectedDriverName(driver.fullName || driver.name || "");
//                             } else {
//                                 setSelectedDriverId("");
//                                 setSelectedDriverName("");
//                             }
//                         }}
//                         style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
//                     >
//                         <option value="">Select Driver</option>
//                         {drivers.map(d => (
//                             <option key={d.id} value={d.id}>
//                                 {d.fullName || d.name || d.driverName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//
//                 <div style={{ marginBottom: "15px" }}>
//                     <label style={{ fontWeight: "bold" }}>Route Points:</label>
//                     {points.map((point, idx) => (
//                         <div key={idx} style={{ display: "flex", marginBottom: "10px" }}>
//                             <input
//                                 type="text"
//                                 value={point}
//                                 onChange={e => handlePointChange(idx, e.target.value)}
//                                 required
//                                 style={{
//                                     padding: "10px",
//                                     width: "calc(100% - 60px)",
//                                     marginRight: "10px",
//                                     borderRadius: "5px"
//                                 }}
//                             />
//                         </div>
//                     ))}
//                     <button type="button" onClick={addPointField}>
//                         Add Point
//                     </button>
//                 </div>
//
//                 <div style={{ marginBottom: "15px" }}>
//                     <label style={{ fontWeight: "bold" }}>Description:</label>
//                     <textarea
//                         value={description}
//                         onChange={e => setDescription(e.target.value)}
//                         rows={3}
//                         style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
//                     />
//                 </div>
//
//                 <button type="submit">
//                     Create Route
//                 </button>
//             </form>
//         </div>
//     );
// }
//
// export default AddRoute;


//
//
// import { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import vehicleService from "../Services/vehicleService";
// import driverService from "../Services/driverService";
// import { FaTruck, FaUser, FaMapMarkerAlt, FaPlus, FaTrash, FaRoute, FaMousePointer, FaSearch, FaCheckCircle } from "react-icons/fa";
//
// // Leaflet Icon Fix
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// let DefaultIcon = L.icon({
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
// });
// L.Marker.prototype.options.icon = DefaultIcon;
//
// function MapController({ onMapClick, searchCoords }) {
//     const map = useMap();
//     useEffect(() => {
//         if (searchCoords) map.flyTo(searchCoords, 12);
//     }, [searchCoords, map]);
//     useMapEvents({ click: (e) => onMapClick(e.latlng) });
//     return null;
// }
//
// function AddRoute() {
//     const [vehicles, setVehicles] = useState([]);
//     const [drivers, setDrivers] = useState([]);
//     const [selectedVehicle, setSelectedVehicle] = useState("");
//     const [selectedDriverId, setSelectedDriverId] = useState("");
//     const [selectedDriverName, setSelectedDriverName] = useState("");
//     const [points, setPoints] = useState(["", ""]);
//     const [pointCoords, setPointCoords] = useState([null, null]);
//     const [activePointIndex, setActivePointIndex] = useState(null);
//     const [searchText, setSearchText] = useState("");
//     const [searchCoords, setSearchCoords] = useState(null);
//     const [totalDistance, setTotalDistance] = useState(0);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//
//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem("user"));
//         const loadData = async () => {
//             try {
//                 const vData = await vehicleService.getAll(user?.eCode);
//                 setVehicles(Array.isArray(vData) ? vData : []);
//                 const dData = await driverService.getAll(user?.eCode);
//                 setDrivers(Array.isArray(dData) ? dData : []);
//             } catch (err) { console.error("Load failed", err); }
//         };
//         loadData();
//     }, []);
//
//     const handleSearch = async (e) => {
//         e.preventDefault();
//         if (!searchText) return;
//         try {
//             const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`);
//             if (res.data.length > 0) {
//                 const { lat, lon } = res.data[0];
//                 setSearchCoords([parseFloat(lat), parseFloat(lon)]);
//             }
//         } catch (err) { console.error("Search error", err); }
//     };
//
//     const handleMapClick = async (latlng) => {
//         if (activePointIndex === null) return;
//         const { lat, lng } = latlng;
//         const newCoords = [...pointCoords];
//         newCoords[activePointIndex] = [lat, lng];
//         setPointCoords(newCoords);
//
//         try {
//             const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//             const address = res.data.display_name.split(',').slice(0, 2).join(',');
//             const newPoints = [...points];
//             newPoints[activePointIndex] = address;
//             setPoints(newPoints);
//         } catch (err) {
//             const newPoints = [...points];
//             newPoints[activePointIndex] = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
//             setPoints(newPoints);
//         }
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrorMessage("");
//
//         // Validation
//         if (!selectedVehicle || !selectedDriverId || points.some(p => !p.trim())) {
//             setErrorMessage("Please fill all fields and route points.");
//             return;
//         }
//
//         setIsSubmitting(true);
//         try {
//             const vehicleObj = vehicles.find(v => v.id === parseInt(selectedVehicle));
//             const payload = {
//                 vehicleId: parseInt(selectedVehicle),
//                 vehicleNumber: vehicleObj?.vehicleNumber,
//                 driverId: parseInt(selectedDriverId),
//                 driverName: selectedDriverName,
//                 points: points,
//                 estimatedDistance: totalDistance,
//                 status: "Planned"
//             };
//
//             await axios.post("http://localhost:8080/api/trips/planned", payload);
//             alert("Route Submitted Successfully!");
//
//             // Reset Form
//             setPoints(["", ""]);
//             setPointCoords([null, null]);
//             setSelectedVehicle("");
//             setSelectedDriverId("");
//         } catch (err) {
//             setErrorMessage("Failed to submit route. Please check connection.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//
//     return (
//         <div style={styles.pageWrapper}>
//             <div style={styles.mainLayout}>
//
//                 <form onSubmit={handleSubmit} style={styles.formCard}>
//                     <div style={styles.header}>
//                         <div style={styles.iconCircle}><FaRoute /></div>
//                         <div>
//                             <h2 style={styles.title}>Dispatch Route</h2>
//                             <p style={styles.subtitle}>Enter locations or select from map</p>
//                         </div>
//                     </div>
//
//                     {errorMessage && <div style={styles.error}>{errorMessage}</div>}
//
//                     <div style={styles.row}>
//                         <div style={styles.inputGroup}>
//                             <label style={styles.label}>Vehicle</label>
//                             <select required style={styles.select} value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)}>
//                                 <option value="">Select Vehicle</option>
//                                 {vehicles.map(v => <option key={v.id} value={v.id}>{v.vehicleNumber}</option>)}
//                             </select>
//                         </div>
//                         <div style={styles.inputGroup}>
//                             <label style={styles.label}>Driver</label>
//                             <select required style={styles.select} value={selectedDriverId} onChange={e => {
//                                 const d = drivers.find(drv => drv.id === parseInt(e.target.value));
//                                 setSelectedDriverId(e.target.value);
//                                 setSelectedDriverName(d?.fullName || d?.name || "");
//                             }}>
//                                 <option value="">Select Driver</option>
//                                 {drivers.map(d => <option key={d.id} value={d.id}>{d.fullName || d.name}</option>)}
//                             </select>
//                         </div>
//                     </div>
//
//                     <div style={styles.section}>
//                         <div style={styles.sectionHeader}>
//                             <label style={styles.label}>Stops Sequence</label>
//                             <span style={styles.distBadge}>{totalDistance} KM</span>
//                         </div>
//
//                         {points.map((p, idx) => (
//                             <div key={idx}
//                                  style={{...styles.pointRow, border: activePointIndex === idx ? '2px solid #7c3aed' : '1px solid #e2e8f0'}}
//                                  onClick={() => setActivePointIndex(idx)}>
//                                 <div style={styles.pointBadge}>{idx === 0 ? "START" : idx === points.length-1 ? "END" : `STOP ${idx}`}</div>
//                                 <input
//                                     type="text"
//                                     value={p}
//                                     onChange={(e) => {
//                                         const newP = [...points];
//                                         newP[idx] = e.target.value;
//                                         setPoints(newP);
//                                     }}
//                                     placeholder="Click to type or select map..."
//                                     style={styles.inputHidden}
//                                 />
//                                 <FaMousePointer style={{color: activePointIndex === idx ? '#7c3aed' : '#cbd5e1'}} />
//                             </div>
//                         ))}
//
//                         <button type="button" onClick={() => {setPoints([...points, ""]); setPointCoords([...pointCoords, null])}} style={styles.addPointBtn}>+ Add Stop</button>
//                     </div>
//
//                     <button type="submit" disabled={isSubmitting} style={styles.submitBtn}>
//                         {isSubmitting ? "Processing..." : "Submit Route Plan"}
//                     </button>
//                 </form>
//
//                 <div style={styles.mapCard}>
//                     <form onSubmit={handleSearch} style={styles.searchOverlay}>
//                         <input
//                             type="text"
//                             placeholder="Find a city..."
//                             style={styles.searchInput}
//                             value={searchText}
//                             onChange={(e) => setSearchText(e.target.value)}
//                         />
//                         <button type="submit" style={styles.searchBtn}><FaSearch /></button>
//                     </form>
//
//                     <MapContainer center={[19.076, 72.877]} zoom={6} style={{ height: "100%", width: "100%" }}>
//                         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                         <MapController onMapClick={handleMapClick} searchCoords={searchCoords} />
//                         {pointCoords.map((coord, i) => coord && (
//                             <Marker key={i} position={coord}><Popup>{points[i]}</Popup></Marker>
//                         ))}
//                         {pointCoords.filter(c => c !== null).length > 1 && (
//                             <Polyline positions={pointCoords.filter(c => c !== null)} color="#7c3aed" weight={4} dashArray="5, 10" />
//                         )}
//                     </MapContainer>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// const styles = {
//     pageWrapper: { background: "#f1f5f9", minHeight: "100vh", padding: "20px", fontFamily: "Inter, sans-serif" },
//     mainLayout: { display: "grid", gridTemplateColumns: "400px 1fr", gap: "20px", maxWidth: "1500px", margin: "0 auto", height: "85vh" },
//     formCard: { background: "#fff", padding: "25px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", overflowY: "auto" },
//     mapCard: { borderRadius: "16px", overflow: "hidden", position: "relative", border: "1px solid #e2e8f0" },
//     error: { background: "#fee2e2", color: "#ef4444", padding: "10px", borderRadius: "8px", marginBottom: "15px", fontSize: "13px" },
//     searchOverlay: { position: "absolute", top: 15, left: 15, zIndex: 1000, display: "flex", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
//     searchInput: { border: "none", padding: "10px 15px", outline: "none", width: "180px" },
//     searchBtn: { background: "#7c3aed", color: "#fff", border: "none", padding: "10px 15px", cursor: "pointer" },
//     header: { display: "flex", gap: "15px", marginBottom: "20px", alignItems: "center" },
//     iconCircle: { width: "40px", height: "40px", background: "#7c3aed", color: "#fff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" },
//     title: { margin: 0, fontSize: "18px" },
//     subtitle: { margin: 0, fontSize: "12px", color: "#64748b" },
//     row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" },
//     inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
//     label: { fontSize: "12px", fontWeight: "600", color: "#475569" },
//     select: { padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" },
//     section: { background: "#f8fafc", padding: "15px", borderRadius: "12px", border: "1px solid #e2e8f0" },
//     sectionHeader: { display: "flex", justifyContent: "space-between", marginBottom: "10px" },
//     distBadge: { background: "#10b981", color: "#fff", padding: "2px 8px", borderRadius: "10px", fontSize: "10px", fontWeight: "bold" },
//     pointRow: { background: "#fff", padding: "12px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", cursor: "pointer" },
//     pointBadge: { fontSize: "9px", fontWeight: "bold", color: "#7c3aed", width: "40px" },
//     inputHidden: { border: "none", outline: "none", flex: 1, fontSize: "13px" },
//     addPointBtn: { width: "100%", padding: "8px", border: "2px dashed #cbd5e1", borderRadius: "8px", background: "none", color: "#64748b", cursor: "pointer" },
//     submitBtn: { width: "100%", padding: "14px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", marginTop: "15px", transition: "0.3s", opacity: (props) => props.disabled ? 0.6 : 1 }
// };
//
// export default AddRoute;


import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import vehicleService from "../Services/vehicleService";
import driverService from "../Services/driverService";
import { FaTruck, FaUser, FaMapMarkerAlt, FaPlus, FaTrash, FaRoute, FaMousePointer, FaPrint, FaTimes, FaSave } from "react-icons/fa";

// Leaflet Icon Fix
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapController({ onMapClick }) {
    useMapEvents({ click: (e) => onMapClick(e.latlng) });
    return null;
}

function AddRoute() {
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [selectedDriverId, setSelectedDriverId] = useState("");
    const [selectedDriverName, setSelectedDriverName] = useState("");
    const [points, setPoints] = useState(["", ""]);
    const [pointCoords, setPointCoords] = useState([null, null]);
    const [activePointIndex, setActivePointIndex] = useState(0);
    const [totalDistance, setTotalDistance] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const loadData = async () => {
            try {
                const vData = await vehicleService.getAll(user?.eCode);
                setVehicles(Array.isArray(vData) ? vData : []);
                const dData = await driverService.getAll(user?.eCode);
                setDrivers(Array.isArray(dData) ? dData : []);
            } catch (err) { console.error(err); }
        };
        loadData();
    }, []);

    // Road Distance Calculation Logic
    useEffect(() => {
        const getRoadDistance = async () => {
            const valid = pointCoords.filter(c => c !== null);
            if (valid.length < 2) return setTotalDistance(0);

            const coordStr = valid.map(c => `${c[1]},${c[0]}`).join(';');
            try {
                const res = await axios.get(`https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=false`);
                setTotalDistance((res.data.routes[0].distance / 1000).toFixed(2));
            } catch (e) { console.log("Distance error"); }
        };
        getRoadDistance();
    }, [pointCoords]);

    // Handle Manual Text Input + Auto-Geocode
    const handleManualInput = async (idx, val) => {
        const newPoints = [...points];
        newPoints[idx] = val;
        setPoints(newPoints);

        // Try to get coordinates for distance calculation if text is long enough
        if (val.length > 3) {
            try {
                const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${val}`);
                if (res.data[0]) {
                    const newCoords = [...pointCoords];
                    newCoords[idx] = [parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)];
                    setPointCoords(newCoords);
                }
            } catch (e) { }
        }
    };

    const handleMapClick = async (latlng) => {
        const { lat, lng } = latlng;
        const newCoords = [...pointCoords];
        newCoords[activePointIndex] = [lat, lng];
        setPointCoords(newCoords);

        const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const address = res.data.display_name.split(',').slice(0, 2).join(',');
        const newPoints = [...points];
        newPoints[activePointIndex] = address;
        setPoints(newPoints);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const vehicleObj = vehicles.find(v => v.id === parseInt(selectedVehicle));
        const payload = {
            tripId: `TRP-${Date.now().toString().slice(-4)}`,
            vehicleNumber: vehicleObj?.vehicleNumber,
            driverName: selectedDriverName,
            points,
            distance: totalDistance,
            status: "Planned"
        };

        try {
            await axios.post("http://localhost:8080/api/trips/planned", payload);
            setSubmittedData(payload);
            alert("Route Saved Successfully!");
        } catch (err) { alert("Error saving route"); }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.mainLayout}>
                <div style={styles.formCard}>
                    <div style={styles.header}>
                        <div style={styles.iconCircle}><FaRoute /></div>
                        <h2 style={styles.title}>Add Route</h2>
                    </div>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.row}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Vehicle</label>
                                <select required style={styles.select} value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)}>
                                    <option value="">Select Vehicle</option>
                                    {vehicles.map(v => <option key={v.id} value={v.id}>{v.vehicleNumber}</option>)}
                                </select>
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Driver</label>
                                <select required style={styles.select} value={selectedDriverId} onChange={e => {
                                    const d = drivers.find(drv => drv.id === parseInt(e.target.value));
                                    setSelectedDriverId(e.target.value);
                                    setSelectedDriverName(d?.fullName || d?.name || "");
                                }}>
                                    <option value="">Select Driver</option>
                                    {drivers.map(d => <option key={d.id} value={d.id}>{d.fullName || d.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={styles.section}>
                            <div style={styles.sectionHeader}>
                                <label style={styles.label}>Route Points</label>
                                <span style={styles.distBadge}>{totalDistance} KM</span>
                            </div>

                            {points.map((p, idx) => (
                                <div key={idx} style={{...styles.pointRow, border: activePointIndex === idx ? '1px solid #7c3aed' : '1px solid #e2e8f0'}}>
                                    <div style={styles.pointBadge}>{idx === 0 ? "START" : idx === points.length-1 ? "END" : `STOP ${idx}`}</div>
                                    <input
                                        type="text"
                                        value={p}
                                        onChange={(e) => handleManualInput(idx, e.target.value)}
                                        onFocus={() => setActivePointIndex(idx)}
                                        placeholder="Type city or click map..."
                                        style={styles.inputHidden}
                                    />
                                    {points.length > 2 && <FaTrash style={{color: '#ef4444', cursor: 'pointer'}} onClick={() => {
                                        setPoints(points.filter((_, i) => i !== idx));
                                        setPointCoords(pointCoords.filter((_, i) => i !== idx));
                                    }} />}
                                </div>
                            ))}
                            <button type="button" onClick={() => {setPoints([...points, ""]); setPointCoords([...pointCoords, null])}} style={styles.addPointBtn}><FaPlus /> Add Another Stop</button>
                        </div>

                        <div style={styles.actionGrid}>
                            <button type="submit" style={styles.submitBtn}><FaSave /> Save Route</button>
                            <button type="button" onClick={() => submittedData ? setShowModal(true) : alert("Save route first")} style={styles.receiptBtn}><FaPrint /> View Receipt</button>
                        </div>
                    </form>
                </div>

                <div style={styles.mapCard}>
                    <div style={styles.mapOverlay}>Click the map to auto-fill the active input</div>
                    <MapContainer center={[19.076, 72.877]} zoom={6} style={{ height: "100%", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapController onMapClick={handleMapClick} />
                        {pointCoords.map((coord, i) => coord && <Marker key={i} position={coord} />)}
                        {pointCoords.filter(c => c !== null).length > 1 && (
                            <Polyline positions={pointCoords.filter(c => c !== null)} color="#7c3aed" weight={4} />
                        )}
                    </MapContainer>
                </div>
            </div>

            {/* Receipt Modal (Optional) */}
            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent} className="printable">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Trip Receipt</h3>
                            <FaTimes onClick={() => setShowModal(false)} style={{cursor:'pointer'}} />
                        </div>
                        <hr />
                        <p><strong>Vehicle:</strong> {submittedData?.vehicleNumber}</p>
                        <p><strong>Driver:</strong> {submittedData?.driverName}</p>
                        <p><strong>Distance:</strong> {submittedData?.distance} KM</p>
                        <p><strong>Route:</strong> {submittedData?.points.join(' → ')}</p>
                        <button onClick={() => window.print()} style={styles.printBtnAction}>Print PDF</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    pageWrapper: { background: "#f8fafc", minHeight: "100vh", padding: "20px", fontFamily: "sans-serif" },
    mainLayout: { display: "grid", gridTemplateColumns: "450px 1fr", gap: "20px", maxWidth: "1600px", margin: "0 auto", height: "88vh" },
    formCard: { background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", overflowY: "auto" },
    header: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" },
    iconCircle: { background: "#7c3aed", color: "#fff", padding: "10px", borderRadius: "8px" },
    title: { margin: 0, fontSize: "20px" },
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" },
    inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
    label: { fontSize: "12px", fontWeight: "bold", color: "#64748b" },
    select: { padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" },
    section: { background: "#f1f5f9", padding: "15px", borderRadius: "10px" },
    sectionHeader: { display: "flex", justifyContent: "space-between", marginBottom: "10px" },
    distBadge: { background: "#7c3aed", color: "#fff", padding: "2px 8px", borderRadius: "5px", fontSize: "12px" },
    pointRow: { background: "#fff", padding: "10px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" },
    pointBadge: { fontSize: "10px", fontWeight: "bold", color: "#7c3aed", width: "50px" },
    inputHidden: { border: "none", outline: "none", flex: 1, fontSize: "13px" },
    addPointBtn: { width: "100%", padding: "8px", border: "1px dashed #7c3aed", background: "none", color: "#7c3aed", cursor: "pointer", borderRadius: "6px" },
    actionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "20px" },
    submitBtn: { padding: "12px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
    receiptBtn: { padding: "12px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: "pointer" },
    mapCard: { borderRadius: "12px", overflow: "hidden", position: "relative" },
    mapOverlay: { position: "absolute", top: 10, left: 10, zIndex: 1000, background: "rgba(255,255,255,0.8)", padding: "5px 10px", fontSize: "11px", borderRadius: "5px" },
    modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 },
    modalContent: { background: "#fff", padding: "30px", borderRadius: "10px", width: "400px" },
    printBtnAction: { width: "100%", marginTop: "15px", padding: "10px", background: "#1e293b", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }
};

export default AddRoute;