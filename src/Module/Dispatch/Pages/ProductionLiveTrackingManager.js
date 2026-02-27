import { useEffect, useRef } from "react";


/*
    PRODUCTION LIVE TRACKING MANAGER

    ✅ Starts GPS automatically when status = IN_TRANSIT
    ✅ Stops automatically when RETURN_JOURNEY_COMPLETED
    ✅ Saves full GPS history (multiple rows per trip)
    ✅ Prevents duplicate intervals
    ✅ Handles permission errors
    ✅ Cleans up properly on unmount
*/

function ProductionLiveTrackingManager({
                                           currentTrip,      // { tripId, vehicleNumber }
                                           currentStatus,    // string status
                                           driverName        // string
                                       }) {

    const intervalRef = useRef(null);
    const isTrackingRef = useRef(false);

    // ================= GPS START FUNCTION =================
    const startTracking = () => {

        if (!currentTrip?.tripId) return;
        if (isTrackingRef.current) return; // prevent duplicate start

        console.log("🚀 Starting GPS Tracking...");
        isTrackingRef.current = true;

        const sendLocation = (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            LiveTrackingService.updateLocation({
                tripId: currentTrip.tripId,
                vehicleNumber: currentTrip.vehicleNumber,
                driverName: driverName || "Unknown",
                lat,
                lng,
                status: currentStatus
            }).catch(err =>
                console.error("LiveTracking failed:", err)
            );
        };

        const handleError = (error) => {
            console.error("GPS Error:", error.message);
        };

        const updateLocation = () => {
            if (!navigator.geolocation) {
                console.error("Geolocation not supported");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                sendLocation,
                handleError,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        };

        // Send immediately
        updateLocation();

        // Send every 10 seconds
        intervalRef.current = setInterval(updateLocation, 10000);
    };

    // ================= GPS STOP FUNCTION =================
    const stopTracking = () => {

        if (!isTrackingRef.current) return;

        console.log("🛑 Stopping GPS Tracking...");

        clearInterval(intervalRef.current);
        intervalRef.current = null;
        isTrackingRef.current = false;
    };

    // ================= STATUS WATCHER =================
    useEffect(() => {

        if (!currentTrip?.tripId) {
            stopTracking();
            return;
        }

        // START only when vehicle is moving
        if (currentStatus === "IN_TRANSIT" ||
            currentStatus === "RETURN_JOURNEY_STARTED") {

            startTracking();
        }

        // STOP when journey fully completed
        if (currentStatus === "RETURN_JOURNEY_COMPLETED") {

            stopTracking();
        }

    }, [currentStatus, currentTrip]);

    // ================= CLEANUP ON UNMOUNT =================
    useEffect(() => {
        return () => {
            stopTracking();
        };
    }, []);

    return null; // This component renders nothing
}

export default ProductionLiveTrackingManager;