// OngoingTripManager.js


//
// import React, { useState } from "react";
// import tripStatusService from "../Services/tripStatusService";
//
//
// // Define the status flow according to your backend enum
// const STATUS_FLOW = [
//     "ACKNOWLEDGED",
//     "LOADING_STARTED",
//     "LOADING_COMPLETED",
//     "IN_TRANSIT",
//     "REACHED_DESTINATION",
//     "UNLOADING_STARTED",
//     "UNLOADING_COMPLETED",
//     "RETURN_JOURNEY_STARTED",
//     "RETURN_JOURNEY_COMPLETED"
// ];
//
// function OngoingTripManager({ ongoingTrips, setOngoingTrips }) {
//     const [loadingIds, setLoadingIds] = useState([]);
//
//     const handleStatusUpdate = async (trip) => {
//         const currentIndex = STATUS_FLOW.indexOf(trip.status);
//         if (currentIndex === -1 || currentIndex === STATUS_FLOW.length - 1) return;
//
//         const nextStatus = STATUS_FLOW[currentIndex + 1];
//
//         try {
//             setLoadingIds((prev) => [...prev, trip.id]);
//
//             // Call backend to update status
//             await tripStatusService.updateTripStatus(trip.id, nextStatus);
//
//             // Update the frontend state
//             setOngoingTrips((prev) =>
//                 prev.map((t) =>
//                     t.id === trip.id ? { ...t, status: nextStatus } : t
//                 )
//             );
//         } catch (err) {
//             console.error("Failed to update status:", err);
//             alert("Status update failed");
//         } finally {
//             setLoadingIds((prev) => prev.filter((id) => id !== trip.id));
//         }
//     };
//
//     return (
//         <div>
//             {ongoingTrips.length === 0 ? (
//                 <p>No ongoing trips.</p>
//             ) : (
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                     <thead>
//                     <tr>
//                         <th>Sr No</th>
//                         <th>Vehicle Number</th>
//                         <th>Driver Name</th>
//                         <th>Status</th>
//                         <th>Description</th>
//                         <th>Points</th>
//                         <th>Action</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {ongoingTrips.map((trip, index) => {
//                         const currentIndex = STATUS_FLOW.indexOf(trip.status);
//                         const isLastStep = currentIndex === STATUS_FLOW.length - 1;
//                         const nextStatus = !isLastStep ? STATUS_FLOW[currentIndex + 1] : null;
//
//                         return (
//                             <tr key={trip.id}>
//                                 <td>{index + 1}</td>
//                                 <td>{trip.vehicleNumber}</td>
//                                 <td>{trip.driverName}</td>
//                                 <td>{trip.status}</td>
//                                 <td>{trip.description}</td>
//                                 <td>{trip.points?.join(" → ")}</td>
//                                 <td>
//                                     {nextStatus && (
//                                         <button
//                                             onClick={() => handleStatusUpdate(trip)}
//                                             disabled={loadingIds.includes(trip.id)}
//                                             style={{
//                                                 padding: "6px 10px",
//                                                 backgroundColor: "#2563eb",
//                                                 color: "#fff",
//                                                 border: "none",
//                                                 borderRadius: 6,
//                                                 cursor: "pointer",
//                                             }}
//                                         >
//                                             {loadingIds.includes(trip.id) ? "Updating..." : nextStatus.replace("_", " ")}
//                                         </button>
//                                     )}
//                                     {!nextStatus && <span>Completed</span>}
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }
//
// export default OngoingTripManager;






// import React, { useState } from "react";
// import tripStatusService from "../Services/tripStatusService";
// import axios from "axios";
//
// // Define the status flow according to your backend enum
// const STATUS_FLOW = [
//     "ACKNOWLEDGED",
//     "LOADING_STARTED",
//     "LOADING_COMPLETED",
//     "IN_TRANSIT",
//     "REACHED_DESTINATION",
//     "UNLOADING_STARTED",
//     "UNLOADING_COMPLETED",
//     "RETURN_JOURNEY_STARTED",
//     "RETURN_JOURNEY_COMPLETED"
// ];
//
// const LIVE_TRACKING_API = "http://localhost:8080/api/live-tracking/update";
//
// function OngoingTripManager({ ongoingTrips, setOngoingTrips }) {
//     const [loadingIds, setLoadingIds] = useState([]);
//
//     // Update trip status and track GPS automatically
//     const handleStatusUpdate = async (trip) => {
//         const currentIndex = STATUS_FLOW.indexOf(trip.status);
//         if (currentIndex === -1 || currentIndex === STATUS_FLOW.length - 1) return;
//
//         const nextStatus = STATUS_FLOW[currentIndex + 1];
//
//         try {
//             setLoadingIds((prev) => [...prev, trip.id]);
//
//             // 1️⃣ Update trip status in backend
//             await tripStatusService.updateTripStatus(trip.id, nextStatus);
//
//             // 2️⃣ Get current GPS location
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     async (position) => {
//                         const payload = {
//                             tripId: trip.id,
//                             lat: position.coords.latitude,
//                             lng: position.coords.longitude
//                         };
//
//                         try {
//                             await axios.post(LIVE_TRACKING_API, payload, {
//                                 headers: { "Content-Type": "application/json" }
//                             });
//                             console.log(`📍 LiveTracking updated for trip ${trip.id}`);
//                         } catch (err) {
//                             console.error("Failed to update live tracking:", err);
//                         }
//                     },
//                     (err) => console.error("GPS fetch error:", err.message),
//                     { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
//                 );
//             }
//
//             // 3️⃣ Update frontend state
//             setOngoingTrips((prev) =>
//                 prev.map((t) =>
//                     t.id === trip.id ? { ...t, status: nextStatus } : t
//                 )
//             );
//
//         } catch (err) {
//             console.error("Failed to update status:", err);
//             alert("Status update failed");
//         } finally {
//             setLoadingIds((prev) => prev.filter((id) => id !== trip.id));
//         }
//     };
//
//     return (
//         <div>
//             {ongoingTrips.length === 0 ? (
//                 <p>No ongoing trips.</p>
//             ) : (
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                     <thead>
//                     <tr>
//                         <th>Sr No</th>
//                         <th>Vehicle Number</th>
//                         <th>Driver Name</th>
//                         <th>Status</th>
//                         <th>Description</th>
//                         <th>Points</th>
//                         <th>Action</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {ongoingTrips.map((trip, index) => {
//                         const currentIndex = STATUS_FLOW.indexOf(trip.status);
//                         const isLastStep = currentIndex === STATUS_FLOW.length - 1;
//                         const nextStatus = !isLastStep ? STATUS_FLOW[currentIndex + 1] : null;
//
//                         return (
//                             <tr key={trip.id}>
//                                 <td>{index + 1}</td>
//                                 <td>{trip.vehicleNumber}</td>
//                                 <td>{trip.driverName}</td>
//                                 <td>{trip.status}</td>
//                                 <td>{trip.description}</td>
//                                 <td>{trip.points?.join(" → ")}</td>
//                                 <td>
//                                     {nextStatus && (
//                                         <button
//                                             onClick={() => handleStatusUpdate(trip)}
//                                             disabled={loadingIds.includes(trip.id)}
//                                             style={{
//                                                 padding: "6px 10px",
//                                                 backgroundColor: "#2563eb",
//                                                 color: "#fff",
//                                                 border: "none",
//                                                 borderRadius: 6,
//                                                 cursor: "pointer",
//                                             }}
//                                         >
//                                             {loadingIds.includes(trip.id)
//                                                 ? "Updating..."
//                                                 : nextStatus.replace("_", " ")}
//                                         </button>
//                                     )}
//                                     {!nextStatus && <span>Completed</span>}
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }
//
// export default OngoingTripManager;




// import React, { useState, useEffect, useRef } from "react";
// import tripStatusService from "../Services/tripStatusService";
// import axios from "axios";
//
// const STATUS_FLOW = [
//     "ACKNOWLEDGED",
//     "LOADING_STARTED",
//     "LOADING_COMPLETED",
//     "IN_TRANSIT",
//     "REACHED_DESTINATION",
//     "UNLOADING_STARTED",
//     "UNLOADING_COMPLETED",
//     "RETURN_JOURNEY_STARTED",
//     "RETURN_JOURNEY_COMPLETED"
// ];
//
// const LIVE_TRACKING_API = "http://localhost:8080/api/live-tracking/update";
//
// function OngoingTripManager({ ongoingTrips, setOngoingTrips }) {
//     const [loadingIds, setLoadingIds] = useState([]);
//     const intervalRefs = useRef({}); // store GPS intervals per trip
//
//     // ✅ Send GPS coordinates to backend
//     const sendGPSUpdate = async (tripId) => {
//         if (!navigator.geolocation) return;
//
//         navigator.geolocation.getCurrentPosition(
//             async (position) => {
//                 const payload = {
//                     tripId: tripId,
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude
//                 };
//
//                 try {
//                     await axios.post(LIVE_TRACKING_API, payload, {
//                         headers: { "Content-Type": "application/json" }
//                     });
//                     console.log(`📍 LiveTracking updated for trip ${tripId}`);
//                 } catch (err) {
//                     console.error("Failed to update live tracking:", err);
//                 }
//             },
//             (err) => console.error("GPS fetch error:", err.message),
//             { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
//         );
//     };
//
//     // ✅ Handle status update
//     const handleStatusUpdate = async (trip) => {
//         const currentIndex = STATUS_FLOW.indexOf(trip.status);
//         if (currentIndex === -1 || currentIndex === STATUS_FLOW.length - 1) return;
//
//         const nextStatus = STATUS_FLOW[currentIndex + 1];
//
//         try {
//             setLoadingIds((prev) => [...prev, trip.id]);
//
//             // 1️⃣ Update status in backend (VehicleActivityTrack)
//             await tripStatusService.updateTripStatus(trip.id, nextStatus);
//
//             // 2️⃣ Update frontend state
//             setOngoingTrips((prev) =>
//                 prev.map((t) =>
//                     t.id === trip.id ? { ...t, status: nextStatus } : t
//                 )
//             );
//
//             // 3️⃣ Send immediate GPS update for new status
//             sendGPSUpdate(trip.id);
//
//             // 4️⃣ Clear any existing interval for this trip
//             if (intervalRefs.current[trip.id]) {
//                 clearInterval(intervalRefs.current[trip.id]);
//             }
//
//             // 5️⃣ Start interval to send GPS every 10s
//             intervalRefs.current[trip.id] = setInterval(() => {
//                 sendGPSUpdate(trip.id);
//             }, 10000);
//
//         } catch (err) {
//             console.error("Failed to update status:", err);
//             alert("Status update failed");
//         } finally {
//             setLoadingIds((prev) => prev.filter((id) => id !== trip.id));
//         }
//     };
//
//     // ✅ Cleanup all intervals on component unmount
//     useEffect(() => {
//         return () => {
//             Object.values(intervalRefs.current).forEach(clearInterval);
//         };
//     }, []);
//
//     return (
//         <div>
//             {ongoingTrips.length === 0 ? (
//                 <p>No ongoing trips.</p>
//             ) : (
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                     <thead>
//                     <tr>
//                         <th>Sr No</th>
//                         <th>Vehicle Number</th>
//                         <th>Driver Name</th>
//                         <th>Status</th>
//                         <th>Description</th>
//                         <th>Points</th>
//                         <th>Action</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {ongoingTrips.map((trip, index) => {
//                         const currentIndex = STATUS_FLOW.indexOf(trip.status);
//                         const isLastStep = currentIndex === STATUS_FLOW.length - 1;
//                         const nextStatus = !isLastStep ? STATUS_FLOW[currentIndex + 1] : null;
//
//                         return (
//                             <tr key={trip.id}>
//                                 <td>{index + 1}</td>
//                                 <td>{trip.vehicleNumber}</td>
//                                 <td>{trip.driverName}</td>
//                                 <td>{trip.status}</td>
//                                 <td>{trip.description}</td>
//                                 <td>{trip.points?.join(" → ")}</td>
//                                 <td>
//                                     {nextStatus && (
//                                         <button
//                                             onClick={() => handleStatusUpdate(trip)}
//                                             disabled={loadingIds.includes(trip.id)}
//                                             style={{
//                                                 padding: "6px 10px",
//                                                 backgroundColor: "#2563eb",
//                                                 color: "#fff",
//                                                 border: "none",
//                                                 borderRadius: 6,
//                                                 cursor: "pointer",
//                                             }}
//                                         >
//                                             {loadingIds.includes(trip.id)
//                                                 ? "Updating..."
//                                                 : nextStatus.replace("_", " ")}
//                                         </button>
//                                     )}
//                                     {!nextStatus && <span>Completed</span>}
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }
//
// export default OngoingTripManager;





import React, { useState, useEffect, useRef } from "react";
import tripStatusService from "../Services/tripStatusService";
import axios from "axios";

const STATUS_FLOW = [
    "ACKNOWLEDGED",
    "LOADING_STARTED",
    "LOADING_COMPLETED",
    "IN_TRANSIT",
    "REACHED_DESTINATION",
    "UNLOADING_STARTED",
    "UNLOADING_COMPLETED",
    "RETURN_JOURNEY_STARTED",
    "RETURN_JOURNEY_COMPLETED",

];

const LIVE_TRACKING_API = "http://localhost:8080/api/live-tracking/update";

function OngoingTripManager({ ongoingTrips, setOngoingTrips }) {
    const [loadingIds, setLoadingIds] = useState([]);
    const intervalRefs = useRef({}); // track interval per trip

    // Send GPS update for trip
    const sendGPSUpdate = async (tripId) => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const payload = {
                    tripId: tripId,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                try {
                    await axios.post(LIVE_TRACKING_API, payload, {
                        headers: { "Content-Type": "application/json" }
                    });
                    console.log(`📍 LiveTracking updated for trip ${tripId}`);
                } catch (err) {
                    console.error("Failed to update LiveTracking:", err);
                }
            },
            (err) => console.error("GPS fetch error:", err.message),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
        );
    };

    // Handle status update button click
    const handleStatusUpdate = async (trip) => {
        const currentIndex = STATUS_FLOW.indexOf(trip.status);
        if (currentIndex === -1 || currentIndex === STATUS_FLOW.length - 1) return;

        const nextStatus = STATUS_FLOW[currentIndex + 1];

        try {
            setLoadingIds((prev) => [...prev, trip.id]);

            // 1️⃣ Update status in backend (VehicleActivityTrack)
            await tripStatusService.updateTripStatus(trip.id, nextStatus);

            // 2️⃣ Update frontend state
            setOngoingTrips((prev) =>
                prev.map((t) =>
                    t.id === trip.id ? { ...t, status: nextStatus } : t
                )
            );

            // 3️⃣ Send immediate GPS update
            sendGPSUpdate(trip.id);

            // 4️⃣ Start interval to update GPS every 10 seconds for this trip/status
            if (intervalRefs.current[trip.id]) {
                clearInterval(intervalRefs.current[trip.id]);
            }
            intervalRefs.current[trip.id] = setInterval(() => {
                sendGPSUpdate(trip.id);
            }, 10000);

        } catch (err) {
            console.error("Failed to update status:", err);
            alert("Status update failed");
        } finally {
            setLoadingIds((prev) => prev.filter((id) => id !== trip.id));
        }
    };

    // Clear intervals on component unmount
    useEffect(() => {
        return () => {
            Object.values(intervalRefs.current).forEach(clearInterval);
        };
    }, []);

    return (
        <div>
            {ongoingTrips.length === 0 ? (
                <p>No ongoing trips.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Vehicle Number</th>
                        <th>Driver Name</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Points</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ongoingTrips.map((trip, index) => {
                        const currentIndex = STATUS_FLOW.indexOf(trip.status);
                        const isLastStep = currentIndex === STATUS_FLOW.length - 1;
                        const nextStatus = !isLastStep ? STATUS_FLOW[currentIndex + 1] : null;

                        return (
                            <tr key={trip.id}>
                                <td>{index + 1}</td>
                                <td>{trip.vehicleNumber}</td>
                                <td>{trip.driverName}</td>
                                <td>{trip.status}</td>
                                <td>{trip.description}</td>
                                <td>{trip.points?.join(" → ")}</td>
                                <td>
                                    {nextStatus && (
                                        <button
                                            onClick={() => handleStatusUpdate(trip)}
                                            disabled={loadingIds.includes(trip.id)}
                                            style={{
                                                padding: "6px 10px",
                                                backgroundColor: "#2563eb",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 6,
                                                cursor: "pointer",
                                            }}
                                        >
                                            {loadingIds.includes(trip.id)
                                                ? "Updating..."
                                                : nextStatus.replace("_", " ")}
                                        </button>
                                    )}
                                    {!nextStatus && <span>Completed</span>}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OngoingTripManager;