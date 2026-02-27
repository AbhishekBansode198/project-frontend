import { useEffect, useState } from "react";
import axios from "axios";

function ViewRoutes() {

    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/trips");
                setRoutes(res.data);
            } catch (e) {
                console.error("Fetch error", e);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, []);

    /* ================= STATUS STEP ================= */

    const getStep = (status) => {
        switch (status) {
            case "LOADING_STARTED":
                return 1;
            case "ON_ROUTE":
                return 2;
            case "RETURN_JOURNEY_STARTED":
                return 3;
            case "RETURN_JOURNEY_COMPLETED":
            case "COMPLETED":
                return 4;
            default:
                return 0;
        }
    };

    /* ================= UI ================= */

    return (
        <div className="routes-page">

            <h2>🚚 Route Tracking</h2>

            {loading && <p>Loading...</p>}

            {!loading && routes.map(route => {

                const step = getStep(route.status);

                return (
                    <div key={route.id} className="track-card">

                        {/* HEADER */}
                        <div className="track-header">
                            <div>
                                <h3>{route.vehicleNumber || route.vehicleId}</h3>
                                <p>{route.driverName}</p>
                            </div>

                            <span className="status">
                                {route.status}
                            </span>
                        </div>

                        {/* ROUTE */}
                        <div className="route-path">
                            {route.points?.length
                                ? route.points.join(" → ")
                                : "No route defined"}
                        </div>

                        {/* TRACKING STEPS */}
                        <div className="timeline">

                            <div className={step >= 1 ? "step active" : "step"}>
                                Loading
                            </div>

                            <div className={step >= 2 ? "step active" : "step"}>
                                In Transit
                            </div>

                            <div className={step >= 3 ? "step active" : "step"}>
                                Return
                            </div>

                            <div className={step >= 4 ? "step active" : "step"}>
                                Completed
                            </div>

                        </div>

                        {/* DESCRIPTION */}
                        <div className="desc">
                            {route.description || "-"}
                        </div>

                    </div>
                );
            })}

            {/* ================= STYLE ================= */}

            <style>{`

body{
    background:#f3f4f6;
    font-family:Arial;
}

.routes-page{
    padding:25px;
}

.track-card{
    background:white;
    padding:20px;
    border-radius:12px;
    margin-bottom:20px;
    box-shadow:0 3px 8px rgba(0,0,0,.08);
}

.track-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.track-header h3{
    margin:0;
}

/* ✅ STATUS BADGE BLUE */
.status{
    background:#dbeafe;
    color:#1d4ed8;
    padding:6px 14px;
    border-radius:20px;
    font-size:13px;
    font-weight:600;
}

.route-path{
    margin:15px 0;
    font-weight:500;
    color:#374151;
}

/* ===== TIMELINE ===== */

.timeline{
    display:flex;
    justify-content:space-between;
    position:relative;
    margin:22px 0;
}

.timeline::before{
    content:"";
    position:absolute;
    top:14px;
    left:0;
    right:0;
    height:3px;
    background:#e5e7eb;
}

/* STEP DEFAULT */
.step{
    background:#e5e7eb;
    color:#6b7280;
    padding:8px 14px;
    border-radius:20px;
    font-size:12px;
    z-index:1;
}

/* ✅ BLUE ACTIVE STEP */
.step.active{
    background:#2563eb;
    color:white;
    font-weight:bold;
}

.desc{
    color:#6b7280;
    font-size:14px;
}

`}</style>
        </div>
    );
}

export default ViewRoutes;