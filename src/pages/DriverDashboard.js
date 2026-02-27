// // import { useEffect, useState } from "react";
// // import {
// //     FaTruck,
// //     FaMapMarkedAlt,
// //     FaRoad,
// //     FaBars,
// //     FaSignOutAlt,
// // } from "react-icons/fa";
// // import axios from "axios";
// //
// // function DriverDashboard() {
// //     const user = JSON.parse(localStorage.getItem("user"));
// //     const eCode = user?.eCode;
// //
// //     const [vehicles, setVehicles] = useState([]);
// //     const [tripsToday, setTripsToday] = useState([]);
// //     const [ongoingTrips, setOngoingTrips] = useState([]);
// //     const [activePage, setActivePage] = useState("dashboard");
// //
// //     /* ================= LOAD DATA ================= */
// //
// //     const loadVehicles = async () => {
// //         const res = await axios.get(
// //             `http://localhost:8080/api/vehicles/driver-assigned?eCode=${eCode}`
// //         );
// //         setVehicles(res.data || []);
// //     };
// //
// //     const loadTripsToday = async () => {
// //         const res = await axios.get(
// //             `http://localhost:8080/api/trips/trip/${eCode}/today`
// //         );
// //         setTripsToday(res.data || []);
// //     };
// //
// //     const loadOngoingTrips = async () => {
// //         const res = await axios.get(
// //             `http://localhost:8080/api/trip-status-update/driver/${eCode}`
// //         );
// //
// //         const normalized = (res.data || []).map((t) => ({
// //             ...t,
// //             tripId: t.trip?.id,
// //         }));
// //
// //         setOngoingTrips(normalized);
// //     };
// //
// //     useEffect(() => {
// //         if (!eCode) return;
// //         loadVehicles();
// //         loadTripsToday();
// //         loadOngoingTrips();
// //     }, [eCode]);
// //
// //     /* ================= ACTIONS ================= */
// //
// //     const handleAcknowledge = async (trip) => {
// //         try {
// //             await axios.patch(
// //                 `http://localhost:8080/api/trip-status-update/trip/${trip.tripId}/acknowledge`
// //             );
// //             loadTripsToday();
// //             loadOngoingTrips();
// //         } catch (e) {
// //             alert("Acknowledge Failed");
// //         }
// //     };
// //
// //     const STATUS_FLOW = [
// //         "ACKNOWLEDGED",
// //         "LOADING_STARTED",
// //         "LOADING_COMPLETED",
// //         "IN_TRANSIT",
// //         "REACHED_DESTINATION",
// //         "UNLOADING_STARTED",
// //         "UNLOADING_COMPLETED",
// //         "RETURN_JOURNEY_STARTED",
// //         "RETURN_JOURNEY_COMPLETED",
// //     ];
// //
// //     const handleUpdateStatus = async (trip) => {
// //         const index = STATUS_FLOW.indexOf(trip.status);
// //         const next = STATUS_FLOW[index + 1];
// //         if (!next) return;
// //
// //         await axios.patch(
// //             `http://localhost:8080/api/trip-status-update/trip/${trip.tripId}/status`,
// //             null,
// //             { params: { status: next } }
// //         );
// //
// //         loadOngoingTrips();
// //     };
// //
// //     /* ================= TIME HELPERS ================= */
// //
// //     const diffMinutes = (s, e) => {
// //         if (!s || !e) return 0;
// //         return (new Date(e) - new Date(s)) / 60000;
// //     };
// //
// //     const formatHM = (minutes) => {
// //         if (!minutes) return "0h 0m";
// //         const h = Math.floor(minutes / 60);
// //         const m = Math.round(minutes % 60);
// //         return `${h}h ${m}m`;
// //     };
// //
// //     const formatTime = (t) =>
// //         t ? new Date(t).toLocaleTimeString() : "-";
// //
// //     /* ================= LIVE TIMER ================= */
// //
// //     const useLiveTimer = (start) => {
// //         const [time, setTime] = useState("");
// //
// //         useEffect(() => {
// //             if (!start) return;
// //
// //             const interval = setInterval(() => {
// //                 const diff = Date.now() - new Date(start);
// //                 const h = Math.floor(diff / 3600000);
// //                 const m = Math.floor((diff % 3600000) / 60000);
// //                 const s = Math.floor((diff % 60000) / 1000);
// //                 setTime(`${h}h ${m}m ${s}s`);
// //             }, 1000);
// //
// //             return () => clearInterval(interval);
// //         }, [start]);
// //
// //         return time;
// //     };
// //
// //     /* ================= PROGRESS LINE ================= */
// //
// //     const ProgressLine = ({ status }) => {
// //         const steps = [
// //             "ACKNOWLEDGED",
// //             "LOADING_STARTED",
// //             "IN_TRANSIT",
// //             "UNLOADING_STARTED",
// //             "RETURN_JOURNEY_COMPLETED",
// //         ];
// //
// //         return (
// //             <div className="progress">
// //                 {steps.map((s) => (
// //                     <div key={s} className={status === s ? "active" : "step"}>
// //                         {s.replaceAll("_", " ")}
// //                     </div>
// //                 ))}
// //             </div>
// //         );
// //     };
// //
// //     /* ================= TIMELINE ================= */
// //
// //     const Timeline = ({ trip }) => {
// //         const liveTimer = useLiveTimer(trip.loadingStartedAt);
// //
// //         const phases = [
// //             {
// //                 name: "Loading",
// //                 start: trip.loadingStartedAt,
// //                 end: trip.loadingCompletedAt,
// //             },
// //             {
// //                 name: "Transit",
// //                 start: trip.inTransitAt,
// //                 end: trip.reachedDestinationAt,
// //             },
// //             {
// //                 name: "Unloading",
// //                 start: trip.unloadingStartedAt,
// //                 end: trip.unloadingCompletedAt,
// //             },
// //             {
// //                 name: "Return",
// //                 start: trip.returnJourneyStartedAt,
// //                 end: trip.returnJourneyCompletedAt,
// //             },
// //         ];
// //
// //         const totalWorking = phases.reduce(
// //             (sum, p) => sum + diffMinutes(p.start, p.end),
// //             0
// //         );
// //
// //         const tripStart = phases.find((p) => p.start)?.start;
// //         const tripEnd =
// //             phases.reverse().find((p) => p.end)?.end;
// //
// //         const totalTrip = diffMinutes(tripStart, tripEnd);
// //         const idle = totalTrip - totalWorking;
// //
// //         const performance = totalTrip
// //             ? Math.round((totalWorking / totalTrip) * 100)
// //             : 0;
// //
// //         return (
// //             <div className="timeline">
// //                 <h4>Trip Execution Timeline</h4>
// //
// //                 <p>⏱ Live Trip Time : {liveTimer}</p>
// //
// //                 <ProgressLine status={trip.status} />
// //
// //                 {phases.map((p) => (
// //                     <div key={p.name} className="phase">
// //                         <span>{p.name}</span>
// //
// //                         <div className="bar" />
// //
// //                         <span>
// //               {formatTime(p.start)} → {formatTime(p.end)}
// //             </span>
// //
// //                         <span>{formatHM(diffMinutes(p.start, p.end))}</span>
// //                     </div>
// //                 ))}
// //
// //                 <div className="summary">
// //                     <b>Total Working:</b> {formatHM(totalWorking)} |
// //                     <b> Total Trip:</b> {formatHM(totalTrip)} |
// //                     <b> Idle Time:</b> {formatHM(idle)} |
// //                     <b> Performance:</b> {performance}%
// //                 </div>
// //             </div>
// //         );
// //     };
// //     /* ================= LIVE GPS TRACKING ================= */
// //
// //     const sendLiveLocation = (trip) => {
// //
// //         if (!navigator.geolocation) {
// //             console.log("GPS not supported");
// //             return;
// //         }
// //
// //         navigator.geolocation.getCurrentPosition(
// //             async (pos) => {
// //
// //                 const payload = {
// //                     vehicleNumber: trip.vehicleNumber,
// //                     driverName: user?.fullName || "Driver",
// //                     lat: pos.coords.latitude,
// //                     lng: pos.coords.longitude,
// //                     status: trip.status
// //                 };
// //
// //                 try {
// //                     await axios.post(
// //                         "http://localhost:8080/api/live-tracking",
// //                         payload
// //                     );
// //
// //                     console.log("Live location sent ✅");
// //                 } catch (err) {
// //                     console.error("GPS send failed", err);
// //                 }
// //             },
// //             (err) => console.log(err),
// //             { enableHighAccuracy: true }
// //         );
// //     };
// //
// //     /* ================= LOGOUT ================= */
// //
// //     const logout = () => {
// //         localStorage.removeItem("user");
// //         window.location.href = "/";
// //     };
// //
// //     /* ================= UI ================= */
// //
// //     return (
// //         <div className="erp">
// //             <aside className="sidebar">
// //                 <h2>🚛 Driver ERP</h2>
// //
// //                 <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
// //                 <button onClick={() => setActivePage("vehicles")}>Vehicles</button>
// //                 <button onClick={() => setActivePage("tripsToday")}>Trips Today</button>
// //                 <button onClick={() => setActivePage("ongoing")}>Ongoing Trips</button>
// //
// //
// //                 <button className="logout" onClick={logout}>
// //                     <FaSignOutAlt /> Logout
// //                 </button>
// //             </aside>
// //
// //             <div className="main">
// //                 <header className="header">
// //                     <FaBars /> Driver Dashboard
// //                 </header>
// //
// //                 {activePage === "dashboard" && (
// //                     <div className="cards">
// //                         <Card title="Vehicles" value={vehicles.length} icon={<FaTruck />} />
// //                         <Card title="Trips Today" value={tripsToday.length} icon={<FaMapMarkedAlt />} />
// //                         <Card title="Ongoing Trips" value={ongoingTrips.length} icon={<FaRoad />} />
// //                     </div>
// //                 )}
// //
// //                 {activePage === "vehicles" &&
// //                     vehicles.map((v) => (
// //                         <div className="box" key={v.id}>{v.vehicleNumber}</div>
// //                     ))}
// //
// //                 {activePage === "tripsToday" &&
// //                     tripsToday.map((t) => (
// //                         <div className="box" key={t.tripId}>
// //                             {t.vehicleNumber}
// //                             <button className="green" onClick={() => handleAcknowledge(t)}>
// //                                 Acknowledge
// //                             </button>
// //                         </div>
// //                     ))}
// //
// //                 {activePage === "ongoing" &&
// //                     ongoingTrips.map((t) => (
// //                         <div className="box" key={t.tripId}>
// //                             <p><b>Vehicle:</b> {t.vehicleNumber}</p>
// //                             <p><b>Status:</b> {t.status}</p>
// //
// //                             {t.status !== "RETURN_JOURNEY_COMPLETED" && (
// //                                 <button className="blue" onClick={() => handleUpdateStatus(t)}>
// //                                     Next Status
// //                                 </button>
// //                             )}
// //
// //                             <Timeline trip={t} />
// //                         </div>
// //                     ))}
// //             </div>
// //
// //             <style>{`
// // .erp{display:flex;height:100vh;background:#f1f5f9;font-family:Arial}
// // .sidebar{width:230px;background:#0f172a;color:white;padding:20px;display:flex;flex-direction:column;gap:10px}
// // .sidebar button{background:none;border:none;color:white;padding:10px;text-align:left;cursor:pointer}
// // .sidebar button:hover{background:#1e293b;border-radius:6px}
// // .logout{margin-top:auto;background:#ef4444 !important;border-radius:6px}
// // .main{flex:1;padding:20px}
// // .header{background:white;padding:15px;border-radius:8px;margin-bottom:20px;box-shadow:0 2px 6px rgba(0,0,0,.1)}
// // .cards{display:flex;gap:20px}
// // .card{background:white;padding:20px;border-radius:10px;flex:1;box-shadow:0 2px 6px rgba(0,0,0,.1)}
// // .box{background:white;padding:20px;border-radius:10px;margin-bottom:15px;box-shadow:0 2px 6px rgba(0,0,0,.1)}
// // .green{background:#16a34a;color:white;border:none;padding:8px 14px;margin-left:10px;border-radius:6px}
// // .blue{background:#2563eb;color:white;border:none;padding:8px 14px;border-radius:6px}
// // .timeline{margin-top:20px}
// // .phase{display:flex;justify-content:space-between;margin:8px 0}
// // .bar{flex:1;height:10px;background:#2563eb;margin:0 15px;border-radius:5px}
// // .summary{margin-top:15px;font-weight:bold}
// // .progress{display:flex;justify-content:space-between;margin:15px 0}
// // .step{background:#e5e7eb;padding:6px 10px;border-radius:20px}
// // .active{background:#22c55e;color:white;padding:6px 10px;border-radius:20px}
// // `}</style>
// //         </div>
// //     );
// // }
// //
// // const Card = ({ title, value, icon }) => (
// //     <div className="card">
// //         <div style={{ fontSize: 24 }}>{icon}</div>
// //         <h3>{title}</h3>
// //         <h2>{value}</h2>
// //     </div>
// // );
// //
// // export default DriverDashboard;
// //
// // import React, { useEffect, useState } from "react";
// // import {
// //     FaTruck,
// //     FaMapMarkedAlt,
// //     FaRoad,
// //     FaBars,
// //     FaSignOutAlt,
// //     FaClock,
// //     FaCheckCircle,
// //     FaArrowRight,
// //     FaMoon,
// //     FaSun,
// //     FaBell,
// //     FaIdCard,
// //     FaTools,
// //     FaMapPin,
// //     FaUserCircle
// // } from "react-icons/fa";
// // import axios from "axios";
// //
// // function DriverDashboard() {
// //     const user = JSON.parse(localStorage.getItem("user"));
// //     const eCode = user?.eCode;
// //
// //     const [vehicles, setVehicles] = useState([]);
// //     const [tripsToday, setTripsToday] = useState([]);
// //     const [ongoingTrips, setOngoingTrips] = useState([]);
// //     const [activePage, setActivePage] = useState("dashboard");
// //
// //     const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
// //     const [notifications, setNotifications] = useState([]);
// //
// //     const toggleTheme = () => {
// //         const newTheme = !darkMode;
// //         setDarkMode(newTheme);
// //         localStorage.setItem("theme", newTheme ? "dark" : "light");
// //     };
// //
// //     /* ================= DATA LOADING ================= */
// //     const loadVehicles = async () => {
// //         try {
// //             const res = await axios.get(`http://localhost:8080/api/vehicles/driver-assigned?eCode=${eCode}`);
// //             setVehicles(res.data || []);
// //         } catch (e) { console.error("Vehicles load failed"); }
// //     };
// //
// //     const loadTripsToday = async () => {
// //         try {
// //             const res = await axios.get(`http://localhost:8080/api/trips/trip/${eCode}/today`);
// //             const newData = res.data || [];
// //             if (newData.length > tripsToday.length && tripsToday.length !== 0) {
// //                 addNotification("New Trip Request Received!");
// //             }
// //             setTripsToday(newData);
// //         } catch (e) { console.error("Trips failed"); }
// //     };
// //
// //     const loadOngoingTrips = async () => {
// //         try {
// //             const res = await axios.get(`http://localhost:8080/api/trip-status-update/driver/${eCode}`);
// //             const normalized = (res.data || []).map((t) => ({ ...t, tripId: t.trip?.id }));
// //             setOngoingTrips(normalized);
// //         } catch (e) { console.error("Ongoing failed"); }
// //     };
// //
// //     const addNotification = (msg) => {
// //         const id = Date.now();
// //         setNotifications(prev => [{ id, msg }, ...prev]);
// //         setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000);
// //     };
// //
// //     useEffect(() => {
// //         if (!eCode) return;
// //         loadVehicles();
// //         loadTripsToday();
// //         loadOngoingTrips();
// //         const poll = setInterval(loadTripsToday, 30000);
// //         return () => clearInterval(poll);
// //     }, [eCode]);
// //
// //     /* ================= ACTIONS ================= */
// //     const handleAcknowledge = async (trip) => {
// //         try {
// //             await axios.patch(`http://localhost:8080/api/trip-status-update/trip/${trip.tripId}/acknowledge`);
// //             addNotification("Trip Acknowledged!");
// //             loadTripsToday();
// //             loadOngoingTrips();
// //         } catch (e) { alert("Acknowledge Failed"); }
// //     };
// //
// //     const handleUpdateStatus = async (trip) => {
// //         const STATUS_FLOW = [
// //             "ACKNOWLEDGED", "LOADING_STARTED", "LOADING_COMPLETED", "IN_TRANSIT",
// //             "REACHED_DESTINATION", "UNLOADING_STARTED", "UNLOADING_COMPLETED",
// //             "RETURN_JOURNEY_STARTED", "RETURN_JOURNEY_COMPLETED",
// //         ];
// //         const index = STATUS_FLOW.indexOf(trip.status);
// //         const next = STATUS_FLOW[index + 1];
// //         if (!next) return;
// //         await axios.patch(`http://localhost:8080/api/trip-status-update/trip/${trip.tripId}/status`, null, { params: { status: next } });
// //         addNotification(`Updated to ${next.replaceAll("_", " ")}`);
// //         loadOngoingTrips();
// //     };
// //
// //     const formatTime = (t) => t ? new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--";
// //
// //     return (
// //         <div className={`erp-container ${darkMode ? 'dark-mode' : ''}`}>
// //             {/* Notifications */}
// //             <div className="toast-container">
// //                 {notifications.map(n => (
// //                     <div key={n.id} className="toast"><FaBell /> {n.msg}</div>
// //                 ))}
// //             </div>
// //
// //             <aside className="sidebar">
// //                 <div className="sidebar-brand">
// //                     <div className="logo-box"><FaTruck /></div>
// //                     <span>DRIVER ERP</span>
// //                 </div>
// //                 <nav className="nav-menu">
// //                     <button className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>
// //                         <FaBars className="m-icon"/> Dashboard
// //                     </button>
// //                     <button className={activePage === "vehicles" ? "active" : ""} onClick={() => setActivePage("vehicles")}>
// //                         <FaIdCard className="m-icon"/> Assigned Vehicle
// //                     </button>
// //                     <button className={activePage === "tripsToday" ? "active" : ""} onClick={() => setActivePage("tripsToday")}>
// //                         <FaMapMarkedAlt className="m-icon"/> Trip Requests {tripsToday.length > 0 && <span className="badge-count">{tripsToday.length}</span>}
// //                     </button>
// //                     <button className={activePage === "ongoing" ? "active" : ""} onClick={() => setActivePage("ongoing")}>
// //                         <FaRoad className="m-icon"/> Ongoing Trips
// //                     </button>
// //                 </nav>
// //                 <div className="sidebar-footer">
// //                     <button className="theme-btn" onClick={toggleTheme}>{darkMode ? <FaSun /> : <FaMoon />}</button>
// //                     <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href="/"; }}><FaSignOutAlt /> Logout</button>
// //                 </div>
// //             </aside>
// //
// //             <div className="main-wrapper">
// //                 <header className="header">
// //                     <div className="header-left">
// //                         <FaBars color="#64748b" />
// //                         <span className="header-title">Logistics Management</span>
// //                     </div>
// //                     <div className="user-profile">
// //                         <FaUserCircle /> <span>{user?.fullName || "Driver"}</span>
// //                     </div>
// //                 </header>
// //
// //                 <main className="main-content">
// //                     {/* DASHBOARD GRID */}
// //                     {activePage === "dashboard" && (
// //                         <div className="grid">
// //                             <div className="card-item blue" onClick={() => setActivePage("vehicles")}>
// //                                 <FaTruck className="card-icon" />
// //                                 <h3 className="card-title">Assigned Vehicle</h3>
// //                                 <p className="card-value">{vehicles.length}</p>
// //                             </div>
// //                             <div className="card-item yellow" onClick={() => setActivePage("tripsToday")}>
// //                                 <FaMapMarkedAlt className="card-icon" />
// //                                 <h3 className="card-title">New Requests</h3>
// //                                 <p className="card-value">{tripsToday.length}</p>
// //                             </div>
// //                             <div className="card-item green" onClick={() => setActivePage("ongoing")}>
// //                                 <FaRoad className="card-icon" />
// //                                 <h3 className="card-title">Active Trips</h3>
// //                                 <p className="card-value">{ongoingTrips.length}</p>
// //                             </div>
// //                         </div>
// //                     )}
// //
// //                     {/* ASSIGNED VEHICLE SECTION */}
// //                     {activePage === "vehicles" && (
// //                         <div className="section-container">
// //                             <h2 className="section-heading">Assigned Vehicle Details</h2>
// //                             <div className="vehicle-list">
// //                                 {vehicles.map((v) => (
// //                                     <div className="v-horizontal-card" key={v.id}>
// //                                         <div className="v-icon-section"><FaTruck size={24}/></div>
// //                                         <div className="v-info-section">
// //                                             <h4>{v.vehicleNumber}</h4>
// //                                             <p>Capacity: Standard | Status: <span className="text-success">Operational</span></p>
// //                                         </div>
// //                                         <div className="v-specs-section">
// //                                             <span><FaTools /> Fitness Check: OK</span>
// //                                             <span><FaClock /> Shift: Day/Night</span>
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     )}
// //
// //                     {/* PENDING TRIP REQUESTS - HORIZONTAL TOP-DOWN LOOK */}
// //                     {activePage === "tripsToday" && (
// //                         <div className="section-container">
// //                             <h2 className="section-heading">Pending Trip Requests</h2>
// //                             <div className="horizontal-list">
// //                                 {tripsToday.length === 0 ? (
// //                                     <div className="empty-box">No pending requests available.</div>
// //                                 ) : (
// //                                     tripsToday.map((t) => (
// //                                         <div className="horizontal-request-row" key={t.tripId}>
// //                                             <div className="row-icon"><FaMapPin color="#f59e0b" /></div>
// //                                             <div className="row-details">
// //                                                 <span className="row-label">Vehicle Number</span>
// //                                                 <span className="row-data">{t.vehicleNumber}</span>
// //                                             </div>
// //                                             <div className="row-details">
// //                                                 <span className="row-label">Trip Reference</span>
// //                                                 <span className="row-data">#{t.tripId}</span>
// //                                             </div>
// //                                             <div className="row-details">
// //                                                 <span className="row-label">Request Time</span>
// //                                                 <span className="row-data">Today, {new Date().toLocaleDateString()}</span>
// //                                             </div>
// //                                             <div className="row-action">
// //                                                 <button className="row-ack-btn" onClick={() => handleAcknowledge(t)}>
// //                                                     Accept Trip <FaArrowRight />
// //                                                 </button>
// //                                             </div>
// //                                         </div>
// //                                     ))
// //                                 )}
// //                             </div>
// //                         </div>
// //                     )}
// //
// //                     {/* ONGOING TRIPS */}
// //                     {activePage === "ongoing" && (
// //                         <div className="section-container">
// //                             <h2 className="section-heading">Ongoing Journeys</h2>
// //                             {ongoingTrips.map((t) => (
// //                                 <div className="journey-card" key={t.tripId}>
// //                                     <div className="j-card-header">
// //                                         <div className="j-v-num">{t.vehicleNumber}</div>
// //                                         <div className="j-status">{t.status.replaceAll("_", " ")}</div>
// //                                     </div>
// //                                     <div className="j-body">
// //                                         <div className="j-flow">
// //                                             <div className="flow-step"><span>Loading</span><div className={`dot ${t.loadingStartedAt?'active':''}`}></div></div>
// //                                             <div className="flow-step"><span>Transit</span><div className={`dot ${t.inTransitAt?'active':''}`}></div></div>
// //                                             <div className="flow-step"><span>Unloading</span><div className={`dot ${t.unloadingStartedAt?'active':''}`}></div></div>
// //                                         </div>
// //                                         <button className="status-update-btn" onClick={() => handleUpdateStatus(t)}>Update Status</button>
// //                                     </div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     )}
// //                 </main>
// //             </div>
// //
// //             <style>{`
// //                 :root { --sidebar-bg: #1e1b4b; --main-bg: #f8fafc; --card-bg: #ffffff; --text-dark: #1e293b; --accent: #6366f1; --border: #e2e8f0; }
// //                 .dark-mode { --sidebar-bg: #020617; --main-bg: #0b0e14; --card-bg: #1e222d; --text-dark: #f1f5f9; --border: #334155; }
// //
// //                 .erp-container { display: flex; height: 100vh; background: var(--main-bg); color: var(--text-dark); overflow: hidden; font-family: 'Inter', sans-serif; }
// //
// //                 /* Sidebar - Fixed Left */
// //                 .sidebar { width: 260px; min-width: 260px; background: var(--sidebar-bg); color: white; padding: 25px; display: flex; flex-direction: column; }
// //                 .sidebar-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; font-weight: 800; font-size: 1.2rem; color: #a78bfa; }
// //                 .logo-box { background: #4f46e5; padding: 8px; border-radius: 10px; }
// //                 .nav-menu { flex: 1; display: flex; flex-direction: column; gap: 8px; }
// //                 .nav-menu button { background: none; border: none; color: #cbd5e1; padding: 12px 15px; text-align: left; cursor: pointer; border-radius: 10px; display: flex; align-items: center; transition: 0.2s; }
// //                 .nav-menu button:hover, .nav-menu button.active { background: rgba(255,255,255,0.1); color: white; }
// //                 .m-icon { margin-right: 12px; font-size: 18px; }
// //                 .badge-count { background: #ef4444; color: white; margin-left: auto; padding: 2px 8px; border-radius: 10px; font-size: 11px; }
// //
// //                 /* Header */
// //                 .main-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; }
// //                 .header { height: 65px; background: var(--card-bg); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 30px; }
// //                 .header-left { display: flex; align-items: center; gap: 15px; }
// //                 .header-title { font-weight: 700; color: var(--text-dark); }
// //                 .user-profile { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #64748b; }
// //
// //                 /* Main Body - Aligned to Left */
// //                 .main-content { padding: 30px; overflow-y: auto; display: flex; flex-direction: column; align-items: flex-start; }
// //                 .grid { display: grid; grid-template-columns: repeat(3, 300px); gap: 20px; width: 100%; margin-bottom: 40px; }
// //                 .card-item { padding: 25px; border-radius: 16px; color: white; cursor: pointer; transition: 0.3s; }
// //                 .card-item.blue { background: linear-gradient(135deg, #6366f1, #4338ca); }
// //                 .card-item.yellow { background: linear-gradient(135deg, #f59e0b, #d97706); }
// //                 .card-item.green { background: linear-gradient(135deg, #10b981, #059669); }
// //                 .card-icon { font-size: 24px; margin-bottom: 10px; }
// //                 .card-title { font-size: 13px; opacity: 0.9; margin: 0; text-transform: uppercase; }
// //                 .card-value { font-size: 28px; font-weight: 800; margin: 5px 0 0; }
// //
// //                 /* Horizontal List (Trip Requests) */
// //                 .section-container { width: 100%; max-width: 1100px; }
// //                 .section-heading { font-size: 20px; font-weight: 700; margin-bottom: 20px; }
// //                 .horizontal-list { display: flex; flex-direction: column; gap: 12px; width: 100%; }
// //                 .horizontal-request-row {
// //                     background: var(--card-bg);
// //                     border: 1px solid var(--border);
// //                     padding: 15px 25px;
// //                     border-radius: 12px;
// //                     display: grid;
// //                     grid-template-columns: 50px 1.5fr 1fr 1fr 180px;
// //                     align-items: center;
// //                     transition: 0.2s;
// //                 }
// //                 .horizontal-request-row:hover { border-color: var(--accent); transform: scale(1.01); }
// //                 .row-icon { background: #fffbeb; padding: 10px; border-radius: 10px; display: flex; justify-content: center; }
// //                 .row-details { display: flex; flex-direction: column; }
// //                 .row-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
// //                 .row-data { font-size: 15px; font-weight: 700; color: var(--text-dark); }
// //                 .row-action { text-align: right; }
// //                 .row-ack-btn { background: var(--accent); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 8px; margin-left: auto; }
// //
// //                 /* Vehicle Horizontal List */
// //                 .vehicle-list { display: flex; flex-direction: column; gap: 10px; width: 100%; }
// //                 .v-horizontal-card { background: var(--card-bg); border: 1px solid var(--border); padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 20px; }
// //                 .v-icon-section { background: #eef2ff; color: #6366f1; padding: 15px; border-radius: 12px; }
// //                 .v-info-section { flex: 1; }
// //                 .v-info-section h4 { margin: 0; font-size: 18px; }
// //                 .v-info-section p { margin: 4px 0 0; font-size: 13px; color: #64748b; }
// //                 .v-specs-section { display: flex; flex-direction: column; gap: 5px; font-size: 12px; color: #64748b; text-align: right; }
// //
// //                 /* Ongoing Journeys */
// //                 .journey-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 25px; width: 100%; max-width: 600px; margin-bottom: 20px; }
// //                 .j-card-header { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
// //                 .j-v-num { font-weight: 800; font-size: 18px; }
// //                 .j-status { color: var(--accent); font-weight: 700; font-size: 12px; text-transform: uppercase; }
// //                 .j-flow { display: flex; justify-content: space-between; margin: 20px 0; position: relative; }
// //                 .flow-step { display: flex; flex-direction: column; align-items: center; font-size: 11px; z-index: 2; }
// //                 .dot { width: 12px; height: 12px; background: #e2e8f0; border-radius: 50%; margin-top: 5px; }
// //                 .dot.active { background: var(--accent); box-shadow: 0 0 10px var(--accent); }
// //                 .status-update-btn { width: 100%; padding: 12px; background: #1e293b; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
// //
// //                 /* Toasts */
// //                 .toast-container { position: fixed; top: 20px; right: 20px; z-index: 1000; }
// //                 .toast { background: #1e1b4b; color: white; padding: 15px 25px; border-radius: 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 15px rgba(0,0,0,0.2); animation: slide 0.3s ease; }
// //                 @keyframes slide { from { transform: translateX(100%); } to { transform: translateX(0); } }
// //                 .text-success { color: #10b981; font-weight: bold; }
// //             `}</style>
// //         </div>
// //     );
// // }
// //
// // export default DriverDashboard;
//
// import React, { useEffect, useState } from "react";
// import {
//     FaTruck,
//     FaMapMarkedAlt,
//     FaRoad,
//     FaBars,
//     FaSignOutAlt,
//     FaClock,
//     FaCheckCircle,
//     FaArrowRight,
//     FaMoon,
//     FaSun,
//     FaBell,
//     FaIdCard,
//     FaTools,
//     FaMapPin,
//     FaUserCircle,
//     FaWallet,
//     FaPlus,
//     FaReceipt
// } from "react-icons/fa";
// import axios from "axios";
//
// function DriverDashboard() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const eCode = user?.eCode;
//
//     const [vehicles, setVehicles] = useState([]);
//     const [tripsToday, setTripsToday] = useState([]);
//     const [ongoingTrips, setOngoingTrips] = useState([]);
//     const [expenses, setExpenses] = useState([]);
//     const [activePage, setActivePage] = useState("dashboard");
//
//     const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//     const [notifications, setNotifications] = useState([]);
//
//     const toggleTheme = () => {
//         const newTheme = !darkMode;
//         setDarkMode(newTheme);
//         localStorage.setItem("theme", newTheme ? "dark" : "light");
//     };
//
//     /* ================= DATA LOADING ================= */
//
//     // ✅ Updated to call your specific unique-vehicles endpoint
//     const loadVehicles = async () => {
//         try {
//             console.log("=== VEHICLE DEBUG START ===");
//             console.log("eCode:", eCode);
//
//             const res = await axios.get(
//                 `http://localhost:8080/api/trips/driver/${eCode}/unique-vehicles`
//             );
//
//             console.log("API response:", res.data);
//
//             const formatted = (res.data || []).map((v, index) => ({
//                 id: index,
//                 vehicleNumber: v?.trim(),
//                 status: "Operational"
//             }));
//
//             console.log("Formatted:", formatted);
//
//             setVehicles(formatted);
//
//         } catch (e) {
//             console.error("Vehicle load error:", e.response?.data || e.message);
//         }
//     };
//
//     const loadTripsToday = async () => {
//         try {
//             const res = await axios.get(`http://localhost:8080/api/trips/trip/${eCode}/today`);
//             const newData = res.data || [];
//             if (newData.length > tripsToday.length && tripsToday.length !== 0) {
//                 addNotification("New Trip Request Received!");
//             }
//             setTripsToday(newData);
//         } catch (e) { console.error("Trips failed"); }
//     };
//
//     const loadOngoingTrips = async () => {
//         try {
//             const res = await axios.get(`http://localhost:8080/api/trip-status-update/driver/${eCode}`);
//             const normalized = (res.data || []).map((t) => ({ ...t, tripId: t.trip?.id }));
//             setOngoingTrips(normalized);
//         } catch (e) { console.error("Ongoing failed"); }
//     };
//
//     const loadExpenses = async () => {
//         try {
//             const res = await axios.get(`http://localhost:8080/api/expenses/driver/${eCode}`);
//             setExpenses(res.data || []);
//         } catch (e) { console.error("Expense load failed"); }
//     };
//
//     const addNotification = (msg) => {
//         const id = Date.now();
//         setNotifications(prev => [{ id, msg }, ...prev]);
//         setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000);
//     };
//
//     useEffect(() => {
//         if (!eCode) return;
//         loadVehicles();
//         loadTripsToday();
//         loadOngoingTrips();
//         loadExpenses();
//         const poll = setInterval(loadTripsToday, 30000);
//         return () => clearInterval(poll);
//     }, [eCode]);
//
//     /* ================= ACTIONS ================= */
//     const handleAcknowledge = async (trip) => {
//         try {
//             await axios.patch(`http://localhost:8080/api/trip-status-update/trip/${trip.tripId}/acknowledge`);
//             addNotification("Trip Acknowledged!");
//             loadTripsToday();
//             loadOngoingTrips();
//         } catch (e) { alert("Acknowledge Failed"); }
//     };
//
//     const handleUpdateStatus = async (trip) => {
//         const STATUS_FLOW = [
//             "ACKNOWLEDGED", "LOADING_STARTED", "LOADING_COMPLETED", "IN_TRANSIT",
//             "REACHED_DESTINATION", "UNLOADING_STARTED", "UNLOADING_COMPLETED",
//             "RETURN_JOURNEY_STARTED", "RETURN_JOURNEY_COMPLETED",
//         ];
//         const index = STATUS_FLOW.indexOf(trip.status);
//         const next = STATUS_FLOW[index + 1];
//         if (!next) return;
//         await axios.patch(`http://localhost:8080/api/trip-status-update/trip/${trip.tripId}/status`, null, { params: { status: next } });
//         addNotification(`Updated to ${next.replaceAll("_", " ")}`);
//         loadOngoingTrips();
//     };
//
//     const totalExpenseAmount = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
//
//     return (
//         <div className={`erp-container ${darkMode ? 'dark-mode' : ''}`}>
//             <div className="toast-container">
//                 {notifications.map(n => (
//                     <div key={n.id} className="toast"><FaBell /> {n.msg}</div>
//                 ))}
//             </div>
//
//             <aside className="sidebar">
//                 <div className="sidebar-brand">
//                     <div className="logo-box"><FaTruck /></div>
//                     <span>DRIVER ERP</span>
//                 </div>
//                 <nav className="nav-menu">
//                     <button className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>
//                         <FaBars className="m-icon"/> Dashboard
//                     </button>
//                     <button className={activePage === "vehicles" ? "active" : ""} onClick={() => setActivePage("vehicles")}>
//                         <FaIdCard className="m-icon"/> Assigned Vehicle
//                     </button>
//                     <button className={activePage === "tripsToday" ? "active" : ""} onClick={() => setActivePage("tripsToday")}>
//                         <FaMapMarkedAlt className="m-icon"/> Trip Requests {tripsToday.length > 0 && <span className="badge-count">{tripsToday.length}</span>}
//                     </button>
//                     <button className={activePage === "ongoing" ? "active" : ""} onClick={() => setActivePage("ongoing")}>
//                         <FaRoad className="m-icon"/> Ongoing Trips
//                     </button>
//                     <button className={activePage === "expenses" ? "active" : ""} onClick={() => setActivePage("expenses")}>
//                         <FaWallet className="m-icon"/> Expense Log
//                     </button>
//                 </nav>
//                 <div className="sidebar-footer">
//                     <button className="theme-btn" onClick={toggleTheme}>{darkMode ? <FaSun /> : <FaMoon />}</button>
//                     <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href="/"; }}><FaSignOutAlt /> Logout</button>
//                 </div>
//             </aside>
//
//             <div className="main-wrapper">
//                 <header className="header">
//                     <div className="header-left">
//                         <FaBars color="#64748b" />
//                         <span className="header-title">Logistics Management</span>
//                     </div>
//                     <div className="user-profile">
//                         <FaUserCircle /> <span>{user?.fullName || "Driver"}</span>
//                     </div>
//                 </header>
//
//                 <main className="main-content">
//                     {activePage === "dashboard" && (
//                         <div className="grid">
//                             <div className="card-item blue" onClick={() => setActivePage("vehicles")}>
//                                 <FaTruck className="card-icon" />
//                                 <h3 className="card-title">Assigned Vehicle</h3>
//                                 <p className="card-value">{vehicles.length}</p>
//                             </div>
//                             <div className="card-item yellow" onClick={() => setActivePage("tripsToday")}>
//                                 <FaMapMarkedAlt className="card-icon" />
//                                 <h3 className="card-title">New Requests</h3>
//                                 <p className="card-value">{tripsToday.length}</p>
//                             </div>
//                             <div className="card-item green" onClick={() => setActivePage("ongoing")}>
//                                 <FaRoad className="card-icon" />
//                                 <h3 className="card-title">Active Trips</h3>
//                                 <p className="card-value">{ongoingTrips.length}</p>
//                             </div>
//                             <div className="card-item purple" onClick={() => setActivePage("expenses")}>
//                                 <FaWallet className="card-icon" />
//                                 <h3 className="card-title">Monthly Expenses</h3>
//                                 <p className="card-value">₹{totalExpenseAmount}</p>
//                             </div>
//                         </div>
//                     )}
//
//                     {activePage === "expenses" && (
//                         <div className="section-container">
//
//                             <div className="section-header-row">
//                                 <h2 className="section-heading">Daily Expense Log</h2>
//                                 <button className="add-expense-btn"><FaPlus /> Log New Expense</button>
//                             </div>
//
//                             {/* VEHICLE LIST */}
//                             <h3>Assigned Vehicles</h3>
//
//                             {vehicles.length === 0 ? (
//                                 <div className="empty-box">No vehicles assigned.</div>
//                             ) : (
//                                 <div>
//                                     {vehicles.map((v) => (
//                                         <div key={v.id}>
//                                             {v.vehicleNumber}
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//
//                             {/* EXPENSE LIST */}
//                             <div className="horizontal-list">
//                                 {expenses.length === 0 ? (
//                                     <div className="empty-box">No expenses recorded for this month.</div>
//                                 ) : (
//                                     expenses.map((exp, index) => (
//                                         <div key={index}>{exp.amount}</div>
//                                     ))
//                                 )}
//                             </div>
//
//                         </div>
//                     )}
//
//                     {activePage === "tripsToday" && (
//                         <div className="section-container">
//                             <h2 className="section-heading">Pending Trip Requests</h2>
//                             <div className="horizontal-list">
//                                 {tripsToday.length === 0 ? (
//                                     <div className="empty-box">No pending requests available.</div>
//                                 ) : (
//                                     tripsToday.map((t) => (
//                                         <div className="horizontal-request-row" key={t.tripId}>
//                                             <div className="row-icon"><FaMapPin color="#f59e0b" /></div>
//                                             <div className="row-details">
//                                                 <span className="row-label">Vehicle Number</span>
//                                                 <span className="row-data">{t.vehicleNumber}</span>
//                                             </div>
//                                             <div className="row-details">
//                                                 <span className="row-label">Trip Reference</span>
//                                                 <span className="row-data">#{t.tripId}</span>
//                                             </div>
//                                             <div className="row-details">
//                                                 <span className="row-label">Request Time</span>
//                                                 <span className="row-data">Today</span>
//                                             </div>
//                                             <div className="row-action">
//                                                 <button className="row-ack-btn" onClick={() => handleAcknowledge(t)}>
//                                                     Accept Trip <FaArrowRight />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         </div>
//                     )}
//
//                     {activePage === "ongoing" && (
//                         <div className="section-container">
//                             <h2 className="section-heading">Ongoing Journeys</h2>
//                             {ongoingTrips.map((t) => (
//                                 <div className="journey-card" key={t.tripId}>
//                                     <div className="j-card-header">
//                                         <div className="j-v-num">{t.vehicleNumber}</div>
//                                         <div className="j-status">{t.status.replaceAll("_", " ")}</div>
//                                     </div>
//                                     <div className="j-body">
//                                         <div className="j-flow">
//                                             <div className="flow-step"><span>Loading</span><div className={`dot ${t.loadingStartedAt?'active':''}`}></div></div>
//                                             <div className="flow-step"><span>Transit</span><div className={`dot ${t.inTransitAt?'active':''}`}></div></div>
//                                             <div className="flow-step"><span>Unloading</span><div className={`dot ${t.unloadingStartedAt?'active':''}`}></div></div>
//                                         </div>
//                                         <button className="status-update-btn" onClick={() => handleUpdateStatus(t)}>Update Status</button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//
//                     {activePage === "expenses" && (
//                         <div className="section-container">
//                             <div className="section-header-row">
//                                 <h2 className="section-heading">Daily Expense Log</h2>
//                                 <button className="add-expense-btn"><FaPlus /> Log New Expense</button>
//                             </div>
//                             <div className="horizontal-list">
//                                 {expenses.length === 0 ? (
//                                     <div className="empty-box">No expenses recorded for this month.</div>
//                                 ) : (
//                                     expenses.map((exp, index) => (
//                                         <div className="horizontal-request-row" key={index}>
//                                             <div className="row-icon expense-icon-box"><FaReceipt color="#8b5cf6" /></div>
//                                             <div className="row-details">
//                                                 <span className="row-label">Category</span>
//                                                 <span className="row-data">{exp.category || "Fuel/Toll"}</span>
//                                             </div>
//                                             <div className="row-details">
//                                                 <span className="row-label">Amount</span>
//                                                 <span className="row-data text-purple">₹{exp.amount}</span>
//                                             </div>
//                                             <div className="row-details">
//                                                 <span className="row-label">Status</span>
//                                                 <span className={`status-pill ${exp.status === 'Approved' ? 'approved' : 'pending'}`}>{exp.status || 'Pending'}</span>
//                                             </div>
//                                             <div className="row-action">
//                                                 <span className="row-label">Date</span>
//                                                 <span className="row-data">{exp.date || 'Today'}</span>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </main>
//             </div>
//
//             <style>{`
//                 :root { --sidebar-bg: #1e1b4b; --main-bg: #f8fafc; --card-bg: #ffffff; --text-dark: #1e293b; --accent: #6366f1; --border: #e2e8f0; }
//                 .dark-mode { --sidebar-bg: #020617; --main-bg: #0b0e14; --card-bg: #1e222d; --text-dark: #f1f5f9; --border: #334155; }
//                 .erp-container { display: flex; height: 100vh; background: var(--main-bg); color: var(--text-dark); overflow: hidden; font-family: 'Inter', sans-serif; }
//                 .sidebar { width: 260px; min-width: 260px; background: var(--sidebar-bg); color: white; padding: 25px; display: flex; flex-direction: column; }
//                 .sidebar-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; font-weight: 800; font-size: 1.2rem; color: #a78bfa; }
//                 .logo-box { background: #4f46e5; padding: 8px; border-radius: 10px; }
//                 .nav-menu { flex: 1; display: flex; flex-direction: column; gap: 8px; }
//                 .nav-menu button { background: none; border: none; color: #cbd5e1; padding: 12px 15px; text-align: left; cursor: pointer; border-radius: 10px; display: flex; align-items: center; transition: 0.2s; }
//                 .nav-menu button:hover, .nav-menu button.active { background: rgba(255,255,255,0.1); color: white; }
//                 .m-icon { margin-right: 12px; font-size: 18px; }
//                 .badge-count { background: #ef4444; color: white; margin-left: auto; padding: 2px 8px; border-radius: 10px; font-size: 11px; }
//                 .main-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; }
//                 .header { height: 65px; background: var(--card-bg); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 30px; }
//                 .header-left { display: flex; align-items: center; gap: 15px; }
//                 .header-title { font-weight: 700; color: var(--text-dark); }
//                 .user-profile { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #64748b; }
//                 .main-content { padding: 30px; overflow-y: auto; display: flex; flex-direction: column; align-items: flex-start; }
//                 .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; width: 100%; margin-bottom: 40px; }
//                 .card-item { padding: 25px; border-radius: 16px; color: white; cursor: pointer; transition: 0.3s; }
//                 .card-item.blue { background: linear-gradient(135deg, #6366f1, #4338ca); }
//                 .card-item.yellow { background: linear-gradient(135deg, #f59e0b, #d97706); }
//                 .card-item.green { background: linear-gradient(135deg, #10b981, #059669); }
//                 .card-item.purple { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
//                 .card-icon { font-size: 24px; margin-bottom: 10px; }
//                 .card-title { font-size: 13px; opacity: 0.9; margin: 0; text-transform: uppercase; }
//                 .card-value { font-size: 28px; font-weight: 800; margin: 5px 0 0; }
//                 .section-container { width: 100%; max-width: 1100px; }
//                 .section-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
//                 .section-heading { font-size: 20px; font-weight: 700; margin: 0; }
//                 .horizontal-list { display: flex; flex-direction: column; gap: 12px; width: 100%; }
//                 .horizontal-request-row { background: var(--card-bg); border: 1px solid var(--border); padding: 15px 25px; border-radius: 12px; display: grid; grid-template-columns: 50px 1.5fr 1fr 1fr 180px; align-items: center; transition: 0.2s; }
//                 .horizontal-request-row:hover { border-color: var(--accent); transform: scale(1.01); }
//                 .row-icon { background: #fffbeb; padding: 10px; border-radius: 10px; display: flex; justify-content: center; }
//                 .expense-icon-box { background: #f5f3ff; }
//                 .text-purple { color: #8b5cf6; font-weight: 800; }
//                 .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }
//                 .status-pill.approved { background: #dcfce7; color: #166534; }
//                 .status-pill.pending { background: #fef3c7; color: #92400e; }
//                 .add-expense-btn { background: #8b5cf6; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px; }
//                 .row-details { display: flex; flex-direction: column; }
//                 .row-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
//                 .row-data { font-size: 15px; font-weight: 700; color: var(--text-dark); }
//                 .row-action { text-align: right; }
//                 .row-ack-btn { background: var(--accent); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 8px; margin-left: auto; }
//                 .vehicle-list { display: flex; flex-direction: column; gap: 10px; width: 100%; }
//                 .v-horizontal-card { background: var(--card-bg); border: 1px solid var(--border); padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 20px; }
//                 .v-icon-section { background: #eef2ff; color: #6366f1; padding: 15px; border-radius: 12px; }
//                 .v-info-section { flex: 1; }
//                 .v-info-section h4 { margin: 0; font-size: 18px; }
//                 .v-info-section p { margin: 4px 0 0; font-size: 13px; color: #64748b; }
//                 .v-specs-section { display: flex; flex-direction: column; gap: 5px; font-size: 12px; color: #64748b; text-align: right; }
//                 .journey-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 25px; width: 100%; max-width: 600px; margin-bottom: 20px; }
//                 .j-card-header { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
//                 .j-v-num { font-weight: 800; font-size: 18px; }
//                 .j-status { color: var(--accent); font-weight: 700; font-size: 12px; text-transform: uppercase; }
//                 .j-flow { display: flex; justify-content: space-between; margin: 20px 0; position: relative; }
//                 .flow-step { display: flex; flex-direction: column; align-items: center; font-size: 11px; z-index: 2; }
//                 .dot { width: 12px; height: 12px; background: #e2e8f0; border-radius: 50%; margin-top: 5px; }
//                 .dot.active { background: var(--accent); box-shadow: 0 0 10px var(--accent); }
//                 .status-update-btn { width: 100%; padding: 12px; background: #1e293b; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
//                 .toast-container { position: fixed; top: 20px; right: 20px; z-index: 1000; }
//                 .toast { background: #1e1b4b; color: white; padding: 15px 25px; border-radius: 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 15px rgba(0,0,0,0.2); animation: slide 0.3s ease; }
//                 @keyframes slide { from { transform: translateX(100%); } to { transform: translateX(0); } }
//                 .text-success { color: #10b981; font-weight: bold; }
//                 .empty-box { background: var(--card-bg); border: 2px dashed var(--border); padding: 40px; text-align: center; border-radius: 12px; color: #64748b; width: 100%; }
//             `}</style>
//         </div>
//     );
// }
//
// export default DriverDashboard;
//
//
// import LiveTrackingService from "../Module/Dispatch/Services/LiveTrackingService";
//
// import React, { useEffect, useState } from "react";
// import {
//     FaTruck,
//     FaMapMarkedAlt,
//     FaRoad,
//     FaBars,
//     FaSignOutAlt,
//     FaClock,
//     FaCheckCircle,
//     FaArrowRight,
//     FaMoon,
//     FaSun,
//     FaBell,
//     FaIdCard,
//     FaTools,
//     FaMapPin,
//     FaUserCircle, FaWallet
// } from "react-icons/fa";
// import axios from "axios";
// import DriverExpensePage from "../Module/Driver/pages/DriverExpensePage";
// import {acknowledgeTrip, createTripStatus, updateTripStatus} from "../services/tripStatusHandler";
//
// function DriverDashboard() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const eCode = user?.eCode;
//
//     const [vehicles, setVehicles] = useState([]);
//     const [tripsToday, setTripsToday] = useState([]);
//     const [ongoingTrips, setOngoingTrips] = useState([]);
//     const [activePage, setActivePage] = useState("dashboard");
//     const [currentVehicle, setCurrentVehicle] = useState(null);
//     const [currentTrip, setCurrentTrip] = useState(null);
//     const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//     const [notifications, setNotifications] = useState([]);
//     const [location, setLocation] = useState({ lat: null, lng: null });
//     const toggleTheme = () => {
//         const newTheme = !darkMode;
//         setDarkMode(newTheme);
//         localStorage.setItem("theme", newTheme ? "dark" : "light");
//     };
//
//     /* ================= DATA LOADING ================= */
//     const loadVehicles = async () => {
//         try {
//             const res = await axios.get(`http://localhost:8080/api/vehicles/driver-assigned?eCode=${eCode}`);
//             setVehicles(res.data || []);
//         } catch (e) { console.error("Vehicles load failed"); }
//     };
//
//     const loadTripsToday = async () => {
//         try {
//             const res = await axios.get(`http://localhost:8080/api/trips/trip/${eCode}/today`);
//             const newData = res.data || [];
//             if (newData.length > tripsToday.length && tripsToday.length !== 0) {
//                 addNotification("New Trip Request Received!");
//             }
//             setTripsToday(newData);
//         } catch (e) { console.error("Trips failed"); }
//     };
//
//     const loadOngoingTrips = async () => {
//         try {
//             const res = await axios.get(`http://localhost:8080/api/trip-status-update/driver/${eCode}`);
//             const normalized = (res.data || []).map((t) => ({ ...t, tripId: t.trip?.id }));
//             setOngoingTrips(normalized);
//         } catch (e) { console.error("Ongoing failed"); }
//     };
//
//     const addNotification = (msg) => {
//         const id = Date.now();
//         setNotifications(prev => [{ id, msg }, ...prev]);
//         setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000);
//     };
//
//     useEffect(() => {
//         if (!eCode) return;
//         loadVehicles();
//         loadTripsToday();
//         loadOngoingTrips();
//         const poll = setInterval(loadTripsToday, 30000);
//         return () => clearInterval(poll);
//     }, [eCode]);
//
//     useEffect(() => {
//         if (!eCode || !currentVehicle) return;
//
//         let interval;
//
//         const sendLocation = (position) => {
//             const lat = position.coords.latitude;
//             const lng = position.coords.longitude;
//
//             setLocation({ lat, lng });
//
//             // POST to your backend /update endpoint
//             LiveTrackingService.updateLocation({
//                 vehicleNumber: currentVehicle,
//                 driverName: user?.fullName || "Unknown",
//                 lat,
//                 lng,
//                 status: "IN_TRANSIT"
//             }).catch(err => console.error("LiveTracking failed:", err));
//         };
//
//         const handleError = (err) => console.error("Error getting location:", err);
//
//         const updateLocation = () => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(sendLocation, handleError);
//             } else {
//                 console.error("Geolocation not supported");
//             }
//         };
//
//         // Immediately send location
//         updateLocation();
//
//         // Update every 10 seconds
//         interval = setInterval(updateLocation, 10000);
//
//         return () => clearInterval(interval);
//
//     }, [eCode, currentVehicle, user]);
//     // // ================= LIVE GPS TRACKING =================
//     //
//     // useEffect(() => {
//     //     if (!eCode || !currentVehicle) return; // only start if a trip is accepted
//     //
//     //     let interval;
//     //
//     //     const sendLocation = (position) => {
//     //         const lat = position.coords.latitude;
//     //         const lng = position.coords.longitude;
//     //
//     //         setLocation({ lat, lng });
//     //
//     //         LiveTrackingService.updateLocation({
//     //             vehicleNumber: currentVehicle,
//     //             driverName: user?.fullName || "Unknown",
//     //             lat,
//     //             lng,
//     //             status: "IN_TRANSIT"
//     //         }).catch(err => console.error("LiveTracking failed:", err));
//     //     };
//     //
//     //     const handleError = (err) => console.error("Error getting location:", err);
//     //
//     //     const updateLocation = () => {
//     //         if (navigator.geolocation) {
//     //             navigator.geolocation.getCurrentPosition(sendLocation, handleError);
//     //         } else {
//     //             console.error("Geolocation not supported");
//     //         }
//     //     };
//     //
//     //     updateLocation(); // send immediately
//     //     interval = setInterval(updateLocation, 10000); // every 10 sec
//     //
//     //     return () => clearInterval(interval);
//     //
//     // }, [eCode, currentVehicle, user]);
//     // useEffect(() => {
//     //     if (!eCode) return;
//     //
//     //     let interval;
//     //
//     //     const sendLocation = (position) => {
//     //         const lat = position.coords.latitude;
//     //         const lng = position.coords.longitude;
//     //
//     //         setLocation({ lat, lng });
//     //
//     //         // Send location to backend
//     //         LiveTrackingService.updateLocation({
//     //             vehicleNumber: "MH12AB1234", // <-- assign the actual vehicleNumber here
//     //             driverName: user?.fullName || "Unknown", // driver name
//     //             lat,
//     //             lng,
//     //             status: "IN_TRANSIT" // default status for live tracking
//     //         });
//     //     };
//     //
//     //     const handleError = (err) => {
//     //         console.error("Error getting location:", err);
//     //     };
//     //
//     //     const updateLocation = () => {
//     //         if (navigator.geolocation) {
//     //             navigator.geolocation.getCurrentPosition(sendLocation, handleError);
//     //         } else {
//     //             console.error("Geolocation not supported");
//     //         }
//     //     };
//     //
//     //     // Immediately send once
//     //     updateLocation();
//     //
//     //     // Update every 10 seconds
//     //     interval = setInterval(updateLocation, 10000);
//     //
//     //     return () => clearInterval(interval);
//     // }, [eCode]);
//     /* ================= ACTIONS ================= */
//     // const handleAcknowledge = async (trip) => {
//     //     try {
//     //         const tripId = trip.tripId || trip.id || trip.trip?.id;
//     //
//     //         if (!tripId) {
//     //             alert("Trip ID missing");
//     //             return;
//     //         }
//     //
//     //         await createTripStatus(tripId);
//     //         await acknowledgeTrip(tripId);
//     //
//     //         // ✅ Remove from trip requests immediately
//     //         setTripsToday(prev => prev.filter(t =>
//     //             (t.tripId || t.id || t.trip?.id) !== tripId
//     //         ));
//     //
//     //         addNotification("Trip Accepted Successfully!");
//     //
//     //         // ✅ Refresh ongoing list only
//     //         loadOngoingTrips();
//     //
//     //     } catch (e) {
//     //         console.error(e);
//     //         alert("Acknowledge Failed");
//     //     }
//     // };
//     const handleAcknowledge = async (trip) => {
//         try {
//             const tripId = trip.tripId || trip.id || trip.trip?.id;
//
//             if (!tripId) {
//                 alert("Trip ID missing");
//                 return;
//             }
//
//             await createTripStatus(tripId);
//             await acknowledgeTrip(tripId);
//
//             setTripsToday(prev => prev.filter(t =>
//                 (t.tripId || t.id || t.trip?.id) !== tripId
//             ));
//
//             addNotification("Trip Accepted Successfully!");
//             loadOngoingTrips();
//
//             // ✅ Set vehicle for live tracking
//             setCurrentVehicle(trip.vehicleNumber);
//
//         } catch (e) {
//             console.error(e);
//             alert("Acknowledge Failed");
//         }
//     };
//
//     // const handleAcknowledge = async (trip) => {
//     //     try {
//     //         const tripId = trip.tripId || trip.id || trip.trip?.id;
//     //
//     //         if (!tripId) {
//     //             alert("Trip ID missing");
//     //             return;
//     //         }
//     //
//     //         await createTripStatus(tripId);
//     //         await acknowledgeTrip(tripId);
//     //
//     //         setTripsToday(prev => prev.filter(t =>
//     //             (t.tripId || t.id || t.trip?.id) !== tripId
//     //         ));
//     //
//     //         addNotification("Trip Accepted Successfully!");
//     //         loadOngoingTrips();
//     //
//     //         // ✅ Set vehicle for live tracking AFTER acknowledging
//     //         setCurrentVehicle(trip.vehicleNumber); // triggers live GPS useEffect
//     //
//     //     } catch (e) {
//     //         console.error(e);
//     //         alert("Acknowledge Failed");
//     //     }
//     // };
//
//     const handleUpdateStatus = async (trip) => {
//         const STATUS_FLOW = [
//             "ACKNOWLEDGED", "LOADING_STARTED", "LOADING_COMPLETED", "IN_TRANSIT",
//             "REACHED_DESTINATION", "UNLOADING_STARTED", "UNLOADING_COMPLETED",
//             "RETURN_JOURNEY_STARTED", "RETURN_JOURNEY_COMPLETED",
//         ];
//         const index = STATUS_FLOW.indexOf(trip.status);
//         const next = STATUS_FLOW[index + 1];
//         if (!next) return;
//       //  await axios.patch(`http://localhost:8080/api/trip-status-update/trip/${trip.tripId}/status`, null, { params: { status: next } });
//         await updateTripStatus(trip.tripId, next);
//         addNotification(`Updated to ${next.replaceAll("_", " ")}`);
//         loadOngoingTrips();
//     };
//
//     const formatTime = (t) => t ? new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--";
//
//     return (
//         <div className={`erp-container ${darkMode ? 'dark-mode' : ''}`}>
//             {/* Notifications */}
//             <div className="toast-container">
//                 {notifications.map(n => (
//                     <div key={n.id} className="toast"><FaBell /> {n.msg}</div>
//                 ))}
//             </div>
//
//             <aside className="sidebar">
//                 <div className="sidebar-brand">
//                     <div className="logo-box"><FaTruck /></div>
//                     <span>DRIVER ERP</span>
//                 </div>
//                 <nav className="nav-menu">
//                     <button className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>
//                         <FaBars className="m-icon"/> Dashboard
//                     </button>
//                     <button className={activePage === "vehicles" ? "active" : ""} onClick={() => setActivePage("vehicles")}>
//                         <FaIdCard className="m-icon"/> Assigned Vehicle
//                     </button>
//                     <button className={activePage === "tripsToday" ? "active" : ""} onClick={() => setActivePage("tripsToday")}>
//                         <FaMapMarkedAlt className="m-icon"/> Trip Requests {tripsToday.length > 0 && <span className="badge-count">{tripsToday.length}</span>}
//                     </button>
//                     <button className={activePage === "ongoing" ? "active" : ""} onClick={() => setActivePage("ongoing")}>
//                         <FaRoad className="m-icon"/> Ongoing Trips
//                     </button>
//                     <button className={activePage === "expenses" ? "active" : ""} onClick={() => setActivePage("expenses")}>
//                                                <FaWallet className="m-icon"/> Expense Log
//                                            </button>
//                 </nav>
//                 <div className="sidebar-footer">
//                     <button className="theme-btn" onClick={toggleTheme}>{darkMode ? <FaSun /> : <FaMoon />}</button>
//                     <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href="/"; }}><FaSignOutAlt /> Logout</button>
//                 </div>
//             </aside>
//
//             <div className="main-wrapper">
//                 <header className="header">
//                     <div className="header-left">
//                         <FaBars color="#64748b" />
//                         <span className="header-title">Logistics Management</span>
//                     </div>
//                     <div className="user-profile">
//                         <FaUserCircle /> <span>{user?.fullName || "Driver"}</span>
//                     </div>
//                 </header>
//
//                 <main className="main-content">
//                     {/* DASHBOARD GRID */}
//                     {activePage === "dashboard" && (
//                         <div className="grid">
//                             <div className="card-item blue" onClick={() => setActivePage("vehicles")}>
//                                 <FaTruck className="card-icon" />
//                                 <h3 className="card-title">Assigned Vehicle</h3>
//                                 <p className="card-value">{vehicles.length}</p>
//                             </div>
//                             <div className="card-item yellow" onClick={() => setActivePage("tripsToday")}>
//                                 <FaMapMarkedAlt className="card-icon" />
//                                 <h3 className="card-title">New Requests</h3>
//                                 <p className="card-value">{tripsToday.length}</p>
//                             </div>
//                             <div className="card-item green" onClick={() => setActivePage("ongoing")}>
//                                 <FaRoad className="card-icon" />
//                                 <h3 className="card-title">Active Trips</h3>
//                                 <p className="card-value">{ongoingTrips.length}</p>
//                             </div>
//                             <div className="card-item purple" onClick={() => setActivePage("expenses")}>
//                                 <FaWallet className="card-icon" />
//                                 <h3 className="card-title">Expense Log</h3>
//                                 <p className="card-value">Track</p>
//                             </div>
//                         </div>
//                     )}
//
//                     {/* ASSIGNED VEHICLE SECTION */}
//                     {activePage === "vehicles" && (
//                         <div className="section-container">
//                             <h2 className="section-heading">Assigned Vehicle Details</h2>
//                             <div className="vehicle-list">
//                                 {vehicles.map((v) => (
//                                     <div className="v-horizontal-card" key={v.id}>
//                                         <div className="v-icon-section"><FaTruck size={24}/></div>
//                                         <div className="v-info-section">
//                                             <h4>{v.vehicleNumber}</h4>
//                                             <p>Capacity: Standard | Status: <span className="text-success">Operational</span></p>
//                                         </div>
//                                         <div className="v-specs-section">
//                                             <span><FaTools /> Fitness Check: OK</span>
//                                             <span><FaClock /> Shift: Day/Night</span>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//
//                     {/* PENDING TRIP REQUESTS - HORIZONTAL TOP-DOWN LOOK */}
//                     {activePage === "tripsToday" && (
//                         <div className="section-container">
//                             <h2 className="section-heading">Pending Trip Requests</h2>
//                             <div className="horizontal-list">
//                                 {tripsToday.length === 0 ? (
//                                     <div className="empty-box">No pending requests available.</div>
//                                 ) : (
//                                     tripsToday.map((t) => (
//                                         <div className="horizontal-request-row" key={t.tripId}>
//                                             <div className="row-icon"><FaMapPin color="#f59e0b" /></div>
//                                             <div className="row-details">
//                                                 <span className="row-label">Vehicle Number</span>
//                                                 <span className="row-data">{t.vehicleNumber}</span>
//                                             </div>
//                                             <div className="row-details">
//                                                 <span className="row-label">Trip Reference</span>
//                                                 <span className="row-data">#{t.tripId}</span>
//                                             </div>
//                                             <div className="row-details">
//                                                 <span className="row-label">Request Time</span>
//                                                 <span className="row-data">Today, {new Date().toLocaleDateString()}</span>
//                                             </div>
//                                             <div className="row-action">
//                                                 <button className="row-ack-btn" onClick={() => handleAcknowledge(t)}>
//                                                     Accept Trip <FaArrowRight />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         </div>
//                     )}
//
//                     {/* ONGOING TRIPS */}
//                     {activePage === "ongoing" && (
//                         <div className="section-container">
//                             <h2 className="section-heading">Ongoing Journeys</h2>
//                             {ongoingTrips.map((t) => (
//                                 <div className="journey-card" key={t.tripId}>
//                                     <div className="j-card-header">
//                                         <div className="j-v-num">{t.vehicleNumber}</div>
//                                         <div className="j-status">{t.status.replaceAll("_", " ")}</div>
//                                     </div>
//                                     <div className="j-body">
//                                         <div className="j-flow">
//                                             <div className="flow-step"><span>Loading</span><div className={`dot ${t.loadingStartedAt?'active':''}`}></div></div>
//                                             <div className="flow-step"><span>Transit</span><div className={`dot ${t.inTransitAt?'active':''}`}></div></div>
//                                             <div className="flow-step"><span>Unloading</span><div className={`dot ${t.unloadingStartedAt?'active':''}`}></div></div>
//                                         </div>
//                                         <button className="status-update-btn" onClick={() => handleUpdateStatus(t)}>Update Status</button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//
//                     {activePage === "expenses" && <DriverExpensePage />}
//                 </main>
//             </div>
//
//             <style>{`
//                 :root { --sidebar-bg: #1e1b4b; --main-bg: #f8fafc; --card-bg: #ffffff; --text-dark: #1e293b; --accent: #6366f1; --border: #e2e8f0; }
//                 .dark-mode { --sidebar-bg: #020617; --main-bg: #0b0e14; --card-bg: #1e222d; --text-dark: #f1f5f9; --border: #334155; }
//
//                 .erp-container { display: flex; height: 100vh; background: var(--main-bg); color: var(--text-dark); overflow: hidden; font-family: 'Inter', sans-serif; }
//
//                 /* Sidebar - Fixed Left */
//                 .sidebar { width: 260px; min-width: 260px; background: var(--sidebar-bg); color: white; padding: 25px; display: flex; flex-direction: column; }
//                 .sidebar-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; font-weight: 800; font-size: 1.2rem; color: #a78bfa; }
//                 .logo-box { background: #4f46e5; padding: 8px; border-radius: 10px; }
//                 .nav-menu { flex: 1; display: flex; flex-direction: column; gap: 8px; }
//                 .nav-menu button { background: none; border: none; color: #cbd5e1; padding: 12px 15px; text-align: left; cursor: pointer; border-radius: 10px; display: flex; align-items: center; transition: 0.2s; }
//                 .nav-menu button:hover, .nav-menu button.active { background: rgba(255,255,255,0.1); color: white; }
//                 .m-icon { margin-right: 12px; font-size: 18px; }
//                 .badge-count { background: #ef4444; color: white; margin-left: auto; padding: 2px 8px; border-radius: 10px; font-size: 11px; }
//
//                 /* Header */
//                 .main-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; }
//                 .header { height: 65px; background: var(--card-bg); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 30px; }
//                 .header-left { display: flex; align-items: center; gap: 15px; }
//                 .header-title { font-weight: 700; color: var(--text-dark); }
//                 .user-profile { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #64748b; }
//
//                 /* Main Body - Aligned to Left */
//                 .main-content { padding: 30px; overflow-y: auto; display: flex; flex-direction: column; align-items: flex-start; }
//                 .grid { display: grid; grid-template-columns: repeat(3, 300px); gap: 20px; width: 100%; margin-bottom: 40px; }
//                 .card-item { padding: 25px; border-radius: 16px; color: white; cursor: pointer; transition: 0.3s; }
//                 .card-item.blue { background: linear-gradient(135deg, #6366f1, #4338ca); }
//                 .card-item.yellow { background: linear-gradient(135deg, #f59e0b, #d97706); }
//                 .card-item.green { background: linear-gradient(135deg, #10b981, #059669); }
//                 .card-icon { font-size: 24px; margin-bottom: 10px; }
//                 .card-title { font-size: 13px; opacity: 0.9; margin: 0; text-transform: uppercase; }
//                 .card-value { font-size: 28px; font-weight: 800; margin: 5px 0 0; }
//
//                 /* Horizontal List (Trip Requests) */
//                 .section-container { width: 100%; max-width: 1100px; }
//                 .section-heading { font-size: 20px; font-weight: 700; margin-bottom: 20px; }
//                 .horizontal-list { display: flex; flex-direction: column; gap: 12px; width: 100%; }
//                 .horizontal-request-row {
//                     background: var(--card-bg);
//                     border: 1px solid var(--border);
//                     padding: 15px 25px;
//                     border-radius: 12px;
//                     display: grid;
//                     grid-template-columns: 50px 1.5fr 1fr 1fr 180px;
//                     align-items: center;
//                     transition: 0.2s;
//                 }
//                 .horizontal-request-row:hover { border-color: var(--accent); transform: scale(1.01); }
//                 .row-icon { background: #fffbeb; padding: 10px; border-radius: 10px; display: flex; justify-content: center; }
//                 .row-details { display: flex; flex-direction: column; }
//                 .row-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
//                 .row-data { font-size: 15px; font-weight: 700; color: var(--text-dark); }
//                 .row-action { text-align: right; }
//                 .row-ack-btn { background: var(--accent); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 8px; margin-left: auto; }
//
//                 /* Vehicle Horizontal List */
//                 .vehicle-list { display: flex; flex-direction: column; gap: 10px; width: 100%; }
//                 .v-horizontal-card { background: var(--card-bg); border: 1px solid var(--border); padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 20px; }
//                 .v-icon-section { background: #eef2ff; color: #6366f1; padding: 15px; border-radius: 12px; }
//                 .v-info-section { flex: 1; }
//                 .v-info-section h4 { margin: 0; font-size: 18px; }
//                 .v-info-section p { margin: 4px 0 0; font-size: 13px; color: #64748b; }
//                 .v-specs-section { display: flex; flex-direction: column; gap: 5px; font-size: 12px; color: #64748b; text-align: right; }
//
//                 /* Ongoing Journeys */
//                 .journey-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 25px; width: 100%; max-width: 600px; margin-bottom: 20px; }
//                 .j-card-header { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
//                 .j-v-num { font-weight: 800; font-size: 18px; }
//                 .j-status { color: var(--accent); font-weight: 700; font-size: 12px; text-transform: uppercase; }
//                 .j-flow { display: flex; justify-content: space-between; margin: 20px 0; position: relative; }
//                 .flow-step { display: flex; flex-direction: column; align-items: center; font-size: 11px; z-index: 2; }
//                 .dot { width: 12px; height: 12px; background: #e2e8f0; border-radius: 50%; margin-top: 5px; }
//                 .dot.active { background: var(--accent); box-shadow: 0 0 10px var(--accent); }
//                 .status-update-btn { width: 100%; padding: 12px; background: #1e293b; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
//
//                 /* Toasts */
//                 .toast-container { position: fixed; top: 20px; right: 20px; z-index: 1000; }
//                 .toast { background: #1e1b4b; color: white; padding: 15px 25px; border-radius: 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 15px rgba(0,0,0,0.2); animation: slide 0.3s ease; }
//                 @keyframes slide { from { transform: translateX(100%); } to { transform: translateX(0); } }
//                 .text-success { color: #10b981; font-weight: bold; }
//             `}</style>
//         </div>
//     );
// }
//
// export default DriverDashboard;



































import LiveTrackingService from "../Module/Dispatch/Services/LiveTrackingService";

import React, { useEffect, useState } from "react";
import {
    FaTruck,
    FaMapMarkedAlt,
    FaRoad,
    FaBars,
    FaSignOutAlt,
    FaClock,
    FaCheckCircle,
    FaArrowRight,
    FaMoon,
    FaSun,
    FaBell,
    FaIdCard,
    FaTools,
    FaMapPin,
    FaUserCircle, FaWallet
} from "react-icons/fa";
import axios from "axios";
import DriverExpensePage from "../Module/Driver/pages/DriverExpensePage";
import {acknowledgeTrip, createTripStatus, updateTripStatus} from "../services/tripStatusHandler";

function DriverDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const eCode = user?.eCode;

    const [vehicles, setVehicles] = useState([]);
    const [tripsToday, setTripsToday] = useState([]);
    const [ongoingTrips, setOngoingTrips] = useState([]);
    const [activePage, setActivePage] = useState("dashboard");
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [currentTrip, setCurrentTrip] = useState(null);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
    const [notifications, setNotifications] = useState([]);
    const [location, setLocation] = useState({ lat: null, lng: null });
    const toggleTheme = () => {
        const newTheme = !darkMode;
        setDarkMode(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    /* ================= DATA LOADING ================= */
    const loadVehicles = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/vehicles/driver-assigned?eCode=${eCode}`);
            setVehicles(res.data || []);
        } catch (e) { console.error("Vehicles load failed"); }
    };

    const loadTripsToday = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/trips/trip/${eCode}/today`
            );

            const normalized = (res.data || []).map(t => ({
                ...t,
                tripId: t.trip?.id || t.id
            }));

            setTripsToday(normalized);

        } catch (e) {
            console.error("Trips failed");
        }
    };

    const loadOngoingTrips = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/trip-status-update/driver/${eCode}`);
            const normalized = (res.data || []).map((t) => ({ ...t, tripId: t.trip?.id }));
            setOngoingTrips(normalized);
        } catch (e) { console.error("Ongoing failed"); }
    };

    const addNotification = (msg) => {
        const id = Date.now();
        setNotifications(prev => [{ id, msg }, ...prev]);
        setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000);
    };

    useEffect(() => {
        if (!eCode) return;
        loadVehicles();
        loadTripsToday();
        loadOngoingTrips();
        const poll = setInterval(loadTripsToday, 30000);
        return () => clearInterval(poll);
    }, [eCode]);
    useEffect(() => {
        return () => {
            if (currentTrip) {
                LiveTrackingService.stopTracking(currentTrip);
            }
        };
    }, [currentTrip]);


    const handleAcknowledge = async (trip) => {
        try {
            console.log("TRIP OBJECT:", trip);
            const tripId = trip.id;
            if (!tripId) {
                console.error("Trip ID not found in trip object:", trip);
                alert("Trip ID missing from entry");
                return;
            }
            console.log("Extracted Trip ID:", tripId);
            if (!tripId) {
                alert("Trip ID missing");
                return;
            }

            await createTripStatus(tripId);
            await new Promise(resolve => setTimeout(resolve, 500));
            await acknowledgeTrip(tripId);

            setTripsToday(prev => prev.filter(t =>
                (t.tripId || t.id || t.trip?.id) !== tripId
            ));

            addNotification("Trip Accepted Successfully!");
            loadOngoingTrips();

            // ✅ START PRODUCTION GPS TRACKING
            LiveTrackingService.startTracking(Number(tripId), eCode);
            setCurrentTrip(tripId);

        } catch (e) {
            console.error(e);
            alert("Acknowledge Failed");
        }
    };

    const handleUpdateStatus = async (trip) => {

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

        const index = STATUS_FLOW.indexOf(trip.status);
        const next = STATUS_FLOW[index + 1];
        if (!next) return;

        await updateTripStatus(trip.tripId, next);

        addNotification(`Updated to ${next.replaceAll("_", " ")}`);

        // 🔥 AUTO STOP TRACKING
        if (next === "RETURN_JOURNEY_COMPLETED") {
            LiveTrackingService.stopTracking(trip.tripId);
            setCurrentTrip(null);
        }

        loadOngoingTrips();
    };

    const formatTime = (t) => t ? new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--";

    return (
        <div className={`erp-container ${darkMode ? 'dark-mode' : ''}`}>
            {/* Notifications */}
            <div className="toast-container">
                {notifications.map(n => (
                    <div key={n.id} className="toast"><FaBell /> {n.msg}</div>
                ))}
            </div>

            <aside className="sidebar">
                <div className="sidebar-brand">
                    <div className="logo-box"><FaTruck /></div>
                    <span>DRIVER ERP</span>
                </div>
                <nav className="nav-menu">
                    <button className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>
                        <FaBars className="m-icon"/> Dashboard
                    </button>
                    <button className={activePage === "vehicles" ? "active" : ""} onClick={() => setActivePage("vehicles")}>
                        <FaIdCard className="m-icon"/> Assigned Vehicle
                    </button>
                    <button className={activePage === "tripsToday" ? "active" : ""} onClick={() => setActivePage("tripsToday")}>
                        <FaMapMarkedAlt className="m-icon"/> Trip Requests {tripsToday.length > 0 && <span className="badge-count">{tripsToday.length}</span>}
                    </button>
                    <button className={activePage === "ongoing" ? "active" : ""} onClick={() => setActivePage("ongoing")}>
                        <FaRoad className="m-icon"/> Ongoing Trips
                    </button>
                    <button className={activePage === "expenses" ? "active" : ""} onClick={() => setActivePage("expenses")}>
                        <FaWallet className="m-icon"/> Expense Log
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button className="theme-btn" onClick={toggleTheme}>{darkMode ? <FaSun /> : <FaMoon />}</button>
                    <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href="/"; }}><FaSignOutAlt /> Logout</button>
                </div>
            </aside>

            <div className="main-wrapper">
                <header className="header">
                    <div className="header-left">
                        <FaBars color="#64748b" />
                        <span className="header-title">Logistics Management</span>
                    </div>
                    <div className="user-profile">
                        <FaUserCircle /> <span>{user?.fullName || "Driver"}</span>
                    </div>
                </header>

                <main className="main-content">
                    {/* DASHBOARD GRID */}
                    {activePage === "dashboard" && (
                        <div className="grid">
                            <div className="card-item blue" onClick={() => setActivePage("vehicles")}>
                                <FaTruck className="card-icon" />
                                <h3 className="card-title">Assigned Vehicle</h3>
                                <p className="card-value">{vehicles.length}</p>
                            </div>
                            <div className="card-item yellow" onClick={() => setActivePage("tripsToday")}>
                                <FaMapMarkedAlt className="card-icon" />
                                <h3 className="card-title">New Requests</h3>
                                <p className="card-value">{tripsToday.length}</p>
                            </div>
                            <div className="card-item green" onClick={() => setActivePage("ongoing")}>
                                <FaRoad className="card-icon" />
                                <h3 className="card-title">Active Trips</h3>
                                <p className="card-value">{ongoingTrips.length}</p>
                            </div>
                            <div className="card-item purple" onClick={() => setActivePage("expenses")}>
                                <FaWallet className="card-icon" />
                                <h3 className="card-title">Expense Log</h3>
                                <p className="card-value">Track</p>
                            </div>
                        </div>
                    )}

                    {/* ASSIGNED VEHICLE SECTION */}
                    {activePage === "vehicles" && (
                        <div className="section-container">
                            <h2 className="section-heading">Assigned Vehicle Details</h2>
                            <div className="vehicle-list">
                                {vehicles.map((v) => (
                                    <div className="v-horizontal-card" key={v.id}>
                                        <div className="v-icon-section"><FaTruck size={24}/></div>
                                        <div className="v-info-section">
                                            <h4>{v.vehicleNumber}</h4>
                                            <p>Capacity: Standard | Status: <span className="text-success">Operational</span></p>
                                        </div>
                                        <div className="v-specs-section">
                                            <span><FaTools /> Fitness Check: OK</span>
                                            <span><FaClock /> Shift: Day/Night</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PENDING TRIP REQUESTS - HORIZONTAL TOP-DOWN LOOK */}
                    {activePage === "tripsToday" && (
                        <div className="section-container">
                            <h2 className="section-heading">Pending Trip Requests</h2>
                            <div className="horizontal-list">
                                {tripsToday.length === 0 ? (
                                    <div className="empty-box">No pending requests available.</div>
                                ) : (
                                    tripsToday.map((t) => (
                                        <div className="horizontal-request-row" key={t.tripId}>
                                            <div className="row-icon"><FaMapPin color="#f59e0b" /></div>
                                            <div className="row-details">
                                                <span className="row-label">Vehicle Number</span>
                                                <span className="row-data">{t.vehicleNumber}</span>
                                            </div>
                                            <div className="row-details">
                                                <span className="row-label">Trip Reference</span>
                                                <span className="row-data">#{t.tripId}</span>
                                            </div>
                                            <div className="row-details">
                                                <span className="row-label">Request Time</span>
                                                <span className="row-data">Today, {new Date().toLocaleDateString()}</span>
                                            </div>
                                            <div className="row-action">
                                                <button className="row-ack-btn" onClick={() => handleAcknowledge(t)}>
                                                    Accept Trip <FaArrowRight />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* ONGOING TRIPS */}
                    {activePage === "ongoing" && (
                        <div className="section-container">
                            <h2 className="section-heading">Ongoing Journeys</h2>
                            {ongoingTrips.map((t) => (
                                <div className="journey-card" key={t.tripId}>
                                    <div className="j-card-header">
                                        <div className="j-v-num">{t.vehicleNumber}</div>
                                        <div className="j-status">{t.status.replaceAll("_", " ")}</div>
                                    </div>
                                    <div className="j-body">
                                        <div className="j-flow">
                                            <div className="flow-step"><span>Loading</span><div className={`dot ${t.loadingStartedAt?'active':''}`}></div></div>
                                            <div className="flow-step"><span>Transit</span><div className={`dot ${t.inTransitAt?'active':''}`}></div></div>
                                            <div className="flow-step"><span>Unloading</span><div className={`dot ${t.unloadingStartedAt?'active':''}`}></div></div>
                                        </div>
                                        <button className="status-update-btn" onClick={() => handleUpdateStatus(t)}>Update Status</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activePage === "expenses" && <DriverExpensePage />}
                </main>
            </div>

            <style>{`
                :root { --sidebar-bg: #1e1b4b; --main-bg: #f8fafc; --card-bg: #ffffff; --text-dark: #1e293b; --accent: #6366f1; --border: #e2e8f0; }
                .dark-mode { --sidebar-bg: #020617; --main-bg: #0b0e14; --card-bg: #1e222d; --text-dark: #f1f5f9; --border: #334155; }

                .erp-container { display: flex; height: 100vh; background: var(--main-bg); color: var(--text-dark); overflow: hidden; font-family: 'Inter', sans-serif; }

                /* Sidebar - Fixed Left */
                .sidebar { width: 260px; min-width: 260px; background: var(--sidebar-bg); color: white; padding: 25px; display: flex; flex-direction: column; }
                .sidebar-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; font-weight: 800; font-size: 1.2rem; color: #a78bfa; }
                .logo-box { background: #4f46e5; padding: 8px; border-radius: 10px; }
                .nav-menu { flex: 1; display: flex; flex-direction: column; gap: 8px; }
                .nav-menu button { background: none; border: none; color: #cbd5e1; padding: 12px 15px; text-align: left; cursor: pointer; border-radius: 10px; display: flex; align-items: center; transition: 0.2s; }
                .nav-menu button:hover, .nav-menu button.active { background: rgba(255,255,255,0.1); color: white; }
                .m-icon { margin-right: 12px; font-size: 18px; }
                .badge-count { background: #ef4444; color: white; margin-left: auto; padding: 2px 8px; border-radius: 10px; font-size: 11px; }

                /* Header */
                .main-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; }
                .header { height: 65px; background: var(--card-bg); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 30px; }
                .header-left { display: flex; align-items: center; gap: 15px; }
                .header-title { font-weight: 700; color: var(--text-dark); }
                .user-profile { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #64748b; }

                /* Main Body - Aligned to Left */
                .main-content { padding: 30px; overflow-y: auto; display: flex; flex-direction: column; align-items: flex-start; }
                .grid { display: grid; grid-template-columns: repeat(3, 300px); gap: 20px; width: 100%; margin-bottom: 40px; }
                .card-item { padding: 25px; border-radius: 16px; color: white; cursor: pointer; transition: 0.3s; }
                .card-item.blue { background: linear-gradient(135deg, #6366f1, #4338ca); }
                .card-item.yellow { background: linear-gradient(135deg, #f59e0b, #d97706); }
                .card-item.green { background: linear-gradient(135deg, #10b981, #059669); }
                .card-icon { font-size: 24px; margin-bottom: 10px; }
                .card-title { font-size: 13px; opacity: 0.9; margin: 0; text-transform: uppercase; }
                .card-value { font-size: 28px; font-weight: 800; margin: 5px 0 0; }

                /* Horizontal List (Trip Requests) */
                .section-container { width: 100%; max-width: 1100px; }
                .section-heading { font-size: 20px; font-weight: 700; margin-bottom: 20px; }
                .horizontal-list { display: flex; flex-direction: column; gap: 12px; width: 100%; }
                .horizontal-request-row {
                    background: var(--card-bg);
                    border: 1px solid var(--border);
                    padding: 15px 25px;
                    border-radius: 12px;
                    display: grid;
                    grid-template-columns: 50px 1.5fr 1fr 1fr 180px;
                    align-items: center;
                    transition: 0.2s;
                }
                .horizontal-request-row:hover { border-color: var(--accent); transform: scale(1.01); }
                .row-icon { background: #fffbeb; padding: 10px; border-radius: 10px; display: flex; justify-content: center; }
                .row-details { display: flex; flex-direction: column; }
                .row-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
                .row-data { font-size: 15px; font-weight: 700; color: var(--text-dark); }
                .row-action { text-align: right; }
                .row-ack-btn { background: var(--accent); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 8px; margin-left: auto; }

                /* Vehicle Horizontal List */
                .vehicle-list { display: flex; flex-direction: column; gap: 10px; width: 100%; }
                .v-horizontal-card { background: var(--card-bg); border: 1px solid var(--border); padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 20px; }
                .v-icon-section { background: #eef2ff; color: #6366f1; padding: 15px; border-radius: 12px; }
                .v-info-section { flex: 1; }
                .v-info-section h4 { margin: 0; font-size: 18px; }
                .v-info-section p { margin: 4px 0 0; font-size: 13px; color: #64748b; }
                .v-specs-section { display: flex; flex-direction: column; gap: 5px; font-size: 12px; color: #64748b; text-align: right; }

                /* Ongoing Journeys */
                .journey-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 25px; width: 100%; max-width: 600px; margin-bottom: 20px; }
                .j-card-header { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
                .j-v-num { font-weight: 800; font-size: 18px; }
                .j-status { color: var(--accent); font-weight: 700; font-size: 12px; text-transform: uppercase; }
                .j-flow { display: flex; justify-content: space-between; margin: 20px 0; position: relative; }
                .flow-step { display: flex; flex-direction: column; align-items: center; font-size: 11px; z-index: 2; }
                .dot { width: 12px; height: 12px; background: #e2e8f0; border-radius: 50%; margin-top: 5px; }
                .dot.active { background: var(--accent); box-shadow: 0 0 10px var(--accent); }
                .status-update-btn { width: 100%; padding: 12px; background: #1e293b; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }

                /* Toasts */
                .toast-container { position: fixed; top: 20px; right: 20px; z-index: 1000; }
                .toast { background: #1e1b4b; color: white; padding: 15px 25px; border-radius: 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 15px rgba(0,0,0,0.2); animation: slide 0.3s ease; }
                @keyframes slide { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .text-success { color: #10b981; font-weight: bold; }
            `}</style>
        </div>
    );
}

export default DriverDashboard;