// // src/Module/Dispatch/Services/LiveTrackingService.js
// import axios from "axios";
//
// const API_URL = "http://localhost:8080/api/live-tracking";
//
// const LiveTrackingService = {
//     /**
//      * Fetch all live tracking data (optional, for dashboard/analytics)
//      */
//     getAll: async () => {
//         try {
//             const res = await axios.get(API_URL);
//             return res.data || [];
//         } catch (error) {
//             console.error("Failed to fetch live tracking data:", error.response?.data || error.message);
//             return [];
//         }
//     },
//
//     /**
//      * Send driver's GPS location to backend
//      * @param {Object} data - { eCode, lat, lng, timestamp }
//      */
//     updateLocation: async (data) => {
//         try {
//             // Ensure JSON content type
//             const res = await axios.post(`${API_URL}/update`, data, {
//                 headers: { "Content-Type": "application/json" },
//             });
//             return res.data;
//         } catch (error) {
//             console.error("Failed to update location:", error.response?.data || error.message);
//             throw error;
//         }
//     }
// };
//
// export default LiveTrackingService;

// src/Module/Dispatch/Services/LiveTrackingService.js
















// import axios from "axios";
//
// const API_URL = "http://localhost:8080/api/live-tracking";
//
// let watchId = null; // controls GPS watcher
//
// const LiveTrackingService = {
//
//     /* ---------------------------------------------------- */
//     /*  Fetch Full GPS History Per Trip                    */
//     /* ---------------------------------------------------- */
//     getTripHistory: async (tripId) => {
//         try {
//             if (!tripId) throw new Error("Trip ID is required");
//
//             const res = await axios.get(`${API_URL}/trip/${tripId}`);
//             return res.data || [];
//
//         } catch (error) {
//             console.error("Failed to fetch trip GPS history:",
//                 error.response?.data || error.message
//             );
//             return [];
//         }
//     },
//
//     /* ---------------------------------------------------- */
//     /*  Start Production GPS Tracking                      */
//     /* ---------------------------------------------------- */
//     startTracking: (tripId, eCode) => {
//
//         if (!tripId || !eCode) {
//             console.error("Trip ID and Driver eCode required");
//             return;
//         }
//
//         if (!navigator.geolocation) {
//             console.error("Geolocation not supported");
//             return;
//         }
//
//         // Prevent duplicate tracking
//         if (watchId !== null) {
//             console.warn("Tracking already running");
//             return;
//         }
//
//         watchId = navigator.geolocation.watchPosition(
//             async (position) => {
//
//                 const payload = {
//                     tripId: tripId,
//                     // vehicleNumber: null,
//                     // driverName: eCode,
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                     accuracy: position.coords.accuracy,
//                     timestamp: new Date().toISOString()
//                 };
//
//                 try {
//                     await axios.post(`${API_URL}/update`, payload, {
//                         headers: { "Content-Type": "application/json" }
//                     });
//                 } catch (error) {
//                     console.error("Location push failed:",
//                         error.response?.data || error.message
//                     );
//                 }
//
//             },
//             (error) => {
//                 console.error("GPS Error:", error.message);
//             },
//             {
//                 enableHighAccuracy: true,
//                 maximumAge: 5000,
//                 timeout: 10000
//             }
//         );
//
//         console.log("🚀 GPS tracking started");
//     },
//
//     /* ---------------------------------------------------- */
//     /*  Stop GPS Tracking                                  */
//     /* ---------------------------------------------------- */
//     stopTracking: async (tripId) => {
//
//         if (watchId !== null) {
//             navigator.geolocation.clearWatch(watchId);
//             watchId = null;
//             console.log("🛑 GPS tracking stopped");
//         }
//
//         // Optional backend flag (if you maintain active flag)
//         if (tripId) {
//             try {
//                 await axios.post(`${API_URL}/stop/${tripId}`);
//             } catch (error) {
//                 console.warn("Stop tracking backend flag failed");
//             }
//         }
//     },
//
//     /* ---------------------------------------------------- */
//     /*  Check if Tracking is Active                        */
//     /* ---------------------------------------------------- */
//     isTrackingActive: () => {
//         return watchId !== null;
//     }
// };
//
// export default LiveTrackingService;


// import axios from "axios";
//
// const API_URL = "http://localhost:8080/api/live-tracking";
//
// let watchId = null; // controls GPS watcher
//
// const LiveTrackingService = {
//
//     /* ---------------------------------------------------- */
//     /*  Fetch Full GPS History Per Trip                    */
//     /* ---------------------------------------------------- */
//     getTripHistory: async (tripId) => {
//         try {
//             if (!tripId) throw new Error("Trip ID is required");
//
//             const res = await axios.get(`${API_URL}/history/${tripId}`);
//             return res.data || [];
//
//         } catch (error) {
//             console.error("Failed to fetch trip GPS history:",
//                 error.response?.data || error.message
//             );
//             return [];
//         }
//     },
//
//     /* ---------------------------------------------------- */
//     /*  Start Production GPS Tracking                      */
//     /* ---------------------------------------------------- */
//     startTracking: (tripId) => {
//
//         if (!tripId) {
//             console.error("Trip ID required");
//             return;
//         }
//
//         if (!navigator.geolocation) {
//             console.error("Geolocation not supported");
//             return;
//         }
//
//         // Prevent duplicate tracking
//         if (watchId !== null) {
//             console.warn("Tracking already running");
//             return;
//         }
//
//         watchId = navigator.geolocation.watchPosition(
//             async (position) => {
//
//                 const payload = {
//                     tripId: tripId,
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude
//                 };
//
//                 try {
//                     await axios.post(`${API_URL}/update`, payload, {
//                         headers: { "Content-Type": "application/json" }
//                     });
//                 } catch (error) {
//                     console.error("Location push failed:",
//                         error.response?.data || error.message
//                     );
//                 }
//
//             },
//             (error) => {
//                 console.error("GPS Error:", error.message);
//             },
//             {
//                 enableHighAccuracy: true,
//                 maximumAge: 10000, // 10 seconds
//                 timeout: 10000
//             }
//         );
//
//         console.log("🚀 GPS tracking started");
//     },
//
//     /* ---------------------------------------------------- */
//     /*  Stop GPS Tracking                                  */
//     /* ---------------------------------------------------- */
//     stopTracking: () => {
//
//         if (watchId !== null) {
//             navigator.geolocation.clearWatch(watchId);
//             watchId = null;
//             console.log("🛑 GPS tracking stopped");
//         }
//     },
//
//     /* ---------------------------------------------------- */
//     /*  Check if Tracking is Active                        */
//     /* ---------------------------------------------------- */
//     isTrackingActive: () => {
//         return watchId !== null;
//     }
// };
//
// export default LiveTrackingService;



import axios from "axios";

const API_URL = "http://localhost:8080/api/live-tracking";

let watchId = null;

const LiveTrackingService = {

    startTracking: (tripId) => {
        if (!tripId) {
            console.error("Trip ID required");
            return;
        }

        if (!navigator.geolocation) {
            console.error("Geolocation not supported");
            return;
        }

        if (watchId !== null) {
            console.warn("Tracking already running");
            return;
        }

        watchId = navigator.geolocation.watchPosition(
            async (position) => {

                const payload = {
                    tripId: tripId,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                try {
                    await axios.post(`${API_URL}/update`, payload, {
                        headers: { "Content-Type": "application/json" }
                    });
                } catch (error) {
                    console.error("Location push failed:",
                        error.response?.data || error.message
                    );
                }

            },
            (error) => console.error("GPS Error:", error.message),
            {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 10000
            }
        );

        console.log("🚀 GPS tracking started");
    },

    stopTracking: () => {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
            console.log("🛑 GPS tracking stopped");
        }
    },

    isTrackingActive: () => watchId !== null
};

export default LiveTrackingService;