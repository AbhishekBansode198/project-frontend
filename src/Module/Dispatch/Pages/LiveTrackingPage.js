// import { useEffect, useState } from "react";
// import axios from "axios";
// import Modal from "react-modal"; // npm install react-modal
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
//
// const API_TRIPS = "http://localhost:8080/api/trips";
// const API_GPS = "http://localhost:8080/api/live-tracking/latest";
// const API_HISTORY = "http://localhost:8080/api/live-tracking/history"; // endpoint to fetch GPS history
//
// function LiveTrackingPage() {
//     const [vehicles, setVehicles] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [historyData, setHistoryData] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [mapData, setMapData] = useState(null);
//
//     const fetchLiveTracking = async () => {
//         setLoading(true);
//         try {
//             const tripsRes = await axios.get(API_TRIPS);
//             const trips = tripsRes.data || [];
//
//             const vehiclesWithGPS = await Promise.all(
//                 trips.map(async (trip) => {
//                     try {
//                         const gpsRes = await axios.get(`${API_GPS}/${trip.id}`);
//                         return {
//                             ...trip,
//                             lat: gpsRes.data?.lat ?? "-",
//                             lng: gpsRes.data?.lng ?? "-",
//                             status: gpsRes.data?.status ?? trip.status
//                         };
//                     } catch {
//                         return { ...trip, lat: "-", lng: "-", status: trip.status };
//                     }
//                 })
//             );
//             setVehicles(vehiclesWithGPS);
//         } catch (err) {
//             console.error("Failed to fetch live tracking:", err);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchLiveTracking();
//         const interval = setInterval(fetchLiveTracking, 10000);
//         return () => clearInterval(interval);
//     }, []);
//
//     const openHistory = async (tripId) => {
//         try {
//             const res = await axios.get(`${API_HISTORY}/${tripId}`);
//             setHistoryData(res.data || []);
//             setModalOpen(true);
//         } catch (err) {
//             console.error("Failed to fetch history:", err);
//         }
//     };
//
//     const openMap = (vehicle) => {
//         setMapData(vehicle);
//     };
//
//     if (loading) return <p>Loading live tracking...</p>;
//     if (vehicles.length === 0) return <p>No vehicles currently.</p>;
//
//     return (
//         <div>
//             <h2 style={{ borderLeft: "4px solid #16a34a", paddingLeft: 10, marginBottom: 15 }}>
//                 Live Tracking - Vehicles
//             </h2>
//
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                 <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
//                     <th>Trip ID</th>
//                     <th>Vehicle No</th>
//                     <th>Driver Name</th>
//                     <th>Status</th>
//                     <th>Latitude</th>
//                     <th>Longitude</th>
//                     <th>Map</th>
//                     <th>History</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {vehicles.map((v) => (
//                     <tr key={v.id} style={{ borderBottom: "1px solid #eee" }}>
//                         <td>{v.id}</td>
//                         <td>{v.vehicleNumber}</td>
//                         <td>{v.driverName}</td>
//                         <td>{v.status}</td>
//                         <td>{v.lat}</td>
//                         <td>{v.lng}</td>
//                         <td>
//                             <button onClick={() => openMap(v)}>View Map</button>
//                         </td>
//                         <td>
//                             <button onClick={() => openHistory(v.id)}>View History</button>
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//
//             {/* Modal for GPS History */}
//             <Modal
//                 isOpen={modalOpen}
//                 onRequestClose={() => setModalOpen(false)}
//                 contentLabel="Vehicle History"
//                 style={{ content: { maxWidth: "800px", margin: "auto" } }}
//             >
//                 <h3>Vehicle GPS History</h3>
//                 <button onClick={() => setModalOpen(false)}>Close</button>
//                 <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
//                     <thead>
//                     <tr>
//                         <th>Timestamp</th>
//                         <th>Latitude</th>
//                         <th>Longitude</th>
//                         <th>Status</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {historyData.map((h, idx) => (
//                         <tr key={idx}>
//                             <td>{h.timestamp}</td>
//                             <td>{h.lat}</td>
//                             <td>{h.lng}</td>
//                             <td>{h.status}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </Modal>
//
//             {/* Map view */}
//             {mapData && (
//                 <div style={{ height: "400px", marginTop: 20 }}>
//                     <MapContainer
//                         center={[mapData.lat, mapData.lng]}
//                         zoom={13}
//                         style={{ height: "100%", width: "100%" }}
//                     >
//                         <TileLayer
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         />
//                         <Marker position={[mapData.lat, mapData.lng]}>
//                             <Popup>{mapData.vehicleNumber} - {mapData.driverName}</Popup>
//                         </Marker>
//                     </MapContainer>
//                     <button onClick={() => setMapData(null)} style={{ marginTop: 10 }}>
//                         Close Map
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }
//
// export default LiveTrackingPage;

//
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Modal from "react-modal"; // npm install react-modal
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
//
// // Fix Leaflet default marker icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//     iconUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//     shadowUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });
//
// const API_TRIPS = "http://localhost:8080/api/trips";
// const API_GPS = "http://localhost:8080/api/live-tracking/latest";
// const API_HISTORY = "http://localhost:8080/api/live-tracking/history";
//
// function LiveTrackingPage() {
//     const [vehicles, setVehicles] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [historyData, setHistoryData] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [mapData, setMapData] = useState(null);
//     const [selectedTrip, setSelectedTrip] = useState(null);
//
//     // Fetch trips + latest GPS
//     const fetchLiveTracking = async () => {
//         setLoading(true);
//         try {
//             const tripsRes = await axios.get(API_TRIPS);
//             const trips = tripsRes.data || [];
//
//             // Fetch latest GPS for each trip
//             const tripsWithGPS = await Promise.all(
//                 trips.map(async (trip) => {
//                     try {
//                         const gpsRes = await axios.get(`${API_GPS}/${trip.id}`);
//                         return {
//                             ...trip,
//                             lat: gpsRes.data?.lat ?? null,
//                             lng: gpsRes.data?.lng ?? null,
//                             status: gpsRes.data?.status ?? trip.status,
//                         };
//                     } catch {
//                         return { ...trip, lat: null, lng: null, status: trip.status };
//                     }
//                 })
//             );
//
//             // Sort descending by Trip ID
//             tripsWithGPS.sort((a, b) => b.id - a.id);
//
//             setVehicles(tripsWithGPS);
//         } catch (err) {
//             console.error("Failed to fetch live tracking:", err);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchLiveTracking();
//         const interval = setInterval(fetchLiveTracking, 10000); // refresh every 10s
//         return () => clearInterval(interval);
//     }, []);
//
//     // Open history modal
//     const openHistory = async (trip) => {
//         setSelectedTrip(trip);
//         try {
//             const res = await axios.get(`${API_HISTORY}/${trip.id}`);
//             const history = res.data || [];
//             // sort by timestamp ascending
//             history.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
//             setHistoryData(history);
//             setModalOpen(true);
//         } catch (err) {
//             console.error("Failed to fetch history:", err);
//         }
//     };
//
//     // Open map for a specific vehicle
//     const openMap = (vehicle) => {
//         setMapData(vehicle);
//     };
//
//     if (loading) return <p>Loading live tracking...</p>;
//     if (vehicles.length === 0) return <p>No vehicles currently.</p>;
//
//     return (
//         <div style={{ padding: 20 }}>
//             <h2 style={{ borderLeft: "4px solid #16a34a", paddingLeft: 10, marginBottom: 15 }}>
//                 Live Tracking - Vehicles
//             </h2>
//
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                 <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
//                     <th>Trip ID</th>
//                     <th>Vehicle No</th>
//                     <th>Driver Name</th>
//                     <th>Status</th>
//                     <th>Latitude</th>
//                     <th>Longitude</th>
//                     <th>Map</th>
//                     <th>History</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {vehicles.map((v) => (
//                     <tr key={v.id} style={{ borderBottom: "1px solid #eee" }}>
//                         <td>{v.id}</td>
//                         <td>{v.vehicleNumber}</td>
//                         <td>{v.driverName}</td>
//                         <td>{v.status}</td>
//                         <td>{v.lat ?? "-"}</td>
//                         <td>{v.lng ?? "-"}</td>
//                         <td>
//                             {v.lat && v.lng ? (
//                                 <button onClick={() => openMap(v)}>View Map</button>
//                             ) : (
//                                 "-"
//                             )}
//                         </td>
//                         <td>
//                             <button onClick={() => openHistory(v)}>View History</button>
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//
//             {/* Modal for GPS history */}
//             <Modal
//                 isOpen={modalOpen}
//                 onRequestClose={() => setModalOpen(false)}
//                 contentLabel="Vehicle History"
//                 style={{
//                     content: { maxWidth: "800px", margin: "auto", maxHeight: "90vh", overflow: "auto" },
//                 }}
//             >
//                 <h3>
//                     Trip History - {selectedTrip?.vehicleNumber} ({selectedTrip?.id})
//                 </h3>
//                 <button onClick={() => setModalOpen(false)}>Close</button>
//
//                 {historyData.length > 0 && (
//                     <div style={{ height: 300, marginTop: 10 }}>
//                         <MapContainer
//                             center={[historyData[historyData.length - 1].lat, historyData[historyData.length - 1].lng]}
//                             zoom={13}
//                             style={{ height: "100%", width: "100%" }}
//                         >
//                             <TileLayer
//                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             />
//                             {/* Draw path line */}
//                             <Polyline
//                                 positions={historyData.map((h) => [h.lat, h.lng])}
//                                 color="blue"
//                             />
//                             {/* Markers */}
//                             {historyData.map((h, idx) => (
//                                 <Marker key={idx} position={[h.lat, h.lng]}>
//                                     <Popup>
//                                         {selectedTrip.vehicleNumber} <br />
//                                         {new Date(h.timestamp).toLocaleString()} <br />
//                                         {h.status}
//                                     </Popup>
//                                 </Marker>
//                             ))}
//                         </MapContainer>
//                     </div>
//                 )}
//
//                 <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
//                     <thead>
//                     <tr style={{ borderBottom: "1px solid #ccc" }}>
//                         <th>Timestamp</th>
//                         <th>Status</th>
//                         <th>Latitude</th>
//                         <th>Longitude</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {historyData.map((h, idx) => (
//                         <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
//                             <td>{new Date(h.timestamp).toLocaleString()}</td>
//                             <td>{h.status}</td>
//                             <td>{h.lat ?? "-"}</td>
//                             <td>{h.lng ?? "-"}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </Modal>
//
//             {/* Map view for selected vehicle */}
//             {mapData && (
//                 <div style={{ height: 400, marginTop: 20 }}>
//                     <MapContainer
//                         center={[mapData.lat, mapData.lng]}
//                         zoom={13}
//                         style={{ height: "100%", width: "100%" }}
//                     >
//                         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                         <Marker position={[mapData.lat, mapData.lng]}>
//                             <Popup>{mapData.vehicleNumber} - {mapData.driverName}</Popup>
//                         </Marker>
//                     </MapContainer>
//                     <button onClick={() => setMapData(null)} style={{ marginTop: 10 }}>
//                         Close Map
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }
//
// export default LiveTrackingPage;


import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal"; // npm install react-modal
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const API_TRIPS = "http://localhost:8080/api/trips";
const API_GPS = "http://localhost:8080/api/live-tracking/latest";
const API_HISTORY = "http://localhost:8080/api/live-tracking/history";

function LiveTrackingPage() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [historyData, setHistoryData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mapData, setMapData] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);

    // Fetch trips + latest GPS
    const fetchLiveTracking = async () => {
        setLoading(true);
        try {
            const tripsRes = await axios.get(API_TRIPS);
            const trips = tripsRes.data || [];

            const tripsWithGPS = await Promise.all(
                trips.map(async (trip) => {
                    try {
                        const gpsRes = await axios.get(`${API_GPS}/${trip.id}`);
                        return {
                            ...trip,
                            lat: gpsRes.data?.lat ?? null,
                            lng: gpsRes.data?.lng ?? null,
                            status: gpsRes.data?.status ?? trip.status,
                        };
                    } catch {
                        return { ...trip, lat: null, lng: null, status: trip.status };
                    }
                })
            );

            // Sort descending by Trip ID
            tripsWithGPS.sort((a, b) => b.id - a.id);

            setVehicles(tripsWithGPS);
        } catch (err) {
            console.error("Failed to fetch live tracking:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLiveTracking();
        const interval = setInterval(fetchLiveTracking, 10000);
        return () => clearInterval(interval);
    }, []);

    // Open history modal
    const openHistory = async (trip) => {
        setSelectedTrip(trip);
        try {
            const res = await axios.get(`${API_HISTORY}/${trip.id}`);
            const history = res.data || [];
            history.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // ascending timestamp
            setHistoryData(history);
            setModalOpen(true);
        } catch (err) {
            console.error("Failed to fetch history:", err);
        }
    };

    // Open map for a specific vehicle
    const openMap = (vehicle) => {
        setMapData(vehicle);
    };

    if (loading) return <p>Loading live tracking...</p>;
    if (vehicles.length === 0) return <p>No vehicles currently.</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2 style={{ borderLeft: "4px solid #16a34a", paddingLeft: 10, marginBottom: 15 }}>
                Live Tracking - Vehicles
            </h2>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
                    <th>Trip ID</th>
                    <th>Vehicle No</th>
                    <th>Driver Name</th>
                    <th>Status</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Map</th>
                    <th>History</th>
                </tr>
                </thead>
                <tbody>
                {vehicles.map((v) => (
                    <tr key={v.id} style={{ borderBottom: "1px solid #eee" }}>
                        <td>{v.id}</td>
                        <td>{v.vehicleNumber}</td>
                        <td>{v.driverName}</td>
                        <td>{v.status}</td>
                        <td>{v.lat ?? "-"}</td>
                        <td>{v.lng ?? "-"}</td>
                        <td>
                            {v.lat && v.lng ? (
                                <button onClick={() => openMap(v)}>View Map</button>
                            ) : (
                                "-"
                            )}
                        </td>
                        <td>
                            <button onClick={() => openHistory(v)}>View History</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* History Modal (table only, no map) */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="Vehicle History"
                style={{
                    content: { maxWidth: "800px", margin: "auto", maxHeight: "90vh", overflow: "auto" },
                }}
            >
                <h3>
                    Trip History - {selectedTrip?.vehicleNumber} ({selectedTrip?.id})
                </h3>
                <button onClick={() => setModalOpen(false)}>Close</button>

                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
                    <thead>
                    <tr style={{ borderBottom: "1px solid #ccc" }}>
                        <th>Timestamp</th>
                        <th>Status</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                    </thead>
                    <tbody>
                    {historyData.map((h, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                            <td>{new Date(h.timestamp).toLocaleString()}</td>
                            <td>{h.status}</td>
                            <td>{h.lat ?? "-"}</td>
                            <td>{h.lng ?? "-"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Modal>

            {/* Map view for selected vehicle only */}
            {mapData && (
                <div style={{ height: 400, marginTop: 20 }}>
                    <MapContainer
                        center={[mapData.lat, mapData.lng]}
                        zoom={13}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[mapData.lat, mapData.lng]}>
                            <Popup>{mapData.vehicleNumber} - {mapData.driverName}</Popup>
                        </Marker>
                    </MapContainer>
                    <button onClick={() => setMapData(null)} style={{ marginTop: 10 }}>
                        Close Map
                    </button>
                </div>
            )}
        </div>
    );
}

export default LiveTrackingPage;