// import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import vehicleService from "../Services/vehicleService";
// import {
//     FaTruck,
//     FaBus,
//     FaMapMarkedAlt,
//     FaRoad,
//     FaUser,
//     FaHeartbeat,
//     FaBars,
//     FaSignOutAlt
// } from "react-icons/fa";
//
// function DispatchHome() {
//
//     const navigate = useNavigate();
//     const location = useLocation();
//
//     const [vehicles, setVehicles] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     const user = JSON.parse(localStorage.getItem("user"));
//
//     /* ================= LOAD VEHICLES ================= */
//
//     useEffect(() => {
//         const load = async () => {
//             try {
//                 const res = await vehicleService.getAll(user?.eCode);
//                 setVehicles(Array.isArray(res) ? res : []);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         if (user?.eCode) load();
//     }, [user?.eCode]);
//
//     /* ================= STATS ================= */
//
//     const totalVehicles = vehicles.length;
//     const activeVehicles = vehicles.filter(v => v?.status === "active").length;
//     const inactiveVehicles = totalVehicles - activeVehicles;
//
//     const logout = () => {
//         localStorage.removeItem("user");
//         navigate("/");
//     };
//
//     const isHome = location.pathname === "/dispatch-dashboard";
//
//     const activeMenu = (path) =>
//         location.pathname === path ? "menu active" : "menu";
//
//     /* ================= CARD DATA ================= */
//
//     const vehicleCards = [
//         {
//             title: "Total Vehicles",
//             value: totalVehicles,
//             icon: <FaTruck />,
//             color: "#2563eb",
//             onClick: () => navigate("/dispatch-dashboard/vehicles"),
//         },
//         {
//             title: "Active Vehicles",
//             value: activeVehicles,
//             icon: <FaBus />,
//             color: "#16a34a",
//             onClick: () => navigate("/dispatch-dashboard/vehicles?status=active"),
//         },
//         {
//             title: "Inactive Vehicles",
//             value: inactiveVehicles,
//             icon: <FaTruck />,
//             color: "#f59e0b",
//             onClick: () => navigate("/dispatch-dashboard/vehicles?status=inactive"),
//         },
//     ];
//
//     const tripCards = [
//         {
//             title: "Add Trip",
//             icon: <FaMapMarkedAlt />,
//             color: "#7c3aed",
//             onClick: () => navigate("/dispatch-dashboard/routes/add"),
//         },
//         {
//             title: "View Trips",
//             icon: <FaRoad />,
//             color: "#0891b2",
//             onClick: () => navigate("/dispatch-dashboard/routes"),
//         },
//         {
//             title: "Live Tracking",
//             icon: <FaMapMarkedAlt />,
//             color: "#16a34a",
//             onClick: () => navigate("/dispatch-dashboard/live-tracking"),
//         },
//     ];
//
//     const managementCards = [
//         {
//             title: "Driver Management",
//             icon: <FaUser />,
//             color: "#16a34a",
//             onClick: () => navigate("/dispatch-dashboard/drivers"),
//         },
//         {
//             title: "Vehicle Expenses",
//             icon: <FaTruck />,
//             color: "#f59e0b",
//             onClick: () => navigate("/dispatch-dashboard/expenses"),
//         },
//     ];
//
//     const healthCards = [
//         {
//             title: "Vehicle Health",
//             icon: <FaHeartbeat />,
//             color: "#ef4444",
//             onClick: () => navigate("/dispatch-dashboard/vehicle-health"),
//         },
//     ];
//
//     /* ================= UI ================= */
//
//     return (
//         <div className="erp">
//
//             {/* SIDEBAR */}
//             <aside className="sidebar">
//
//                 <h2 className="logo">🚛 Dispatch ERP</h2>
//
//                 <Link to="/dispatch-dashboard" className={activeMenu("/dispatch-dashboard")}>
//                     Dashboard
//                 </Link>
//
//                 <Link to="/dispatch-dashboard/vehicles" className={activeMenu("/dispatch-dashboard/vehicles")}>
//                     Vehicles
//                 </Link>
//
//                 <Link to="/dispatch-dashboard/expenses" className={activeMenu("/dispatch-dashboard/expenses")}>
//                     Expenses
//                 </Link>
//
//                 <button className="logout" onClick={logout}>
//                     <FaSignOutAlt /> Logout
//                 </button>
//
//             </aside>
//
//             {/* RIGHT SIDE */}
//             <div className="mainWrapper">
//
//                 {/* HEADER */}
//                 <header className="header">
//                     <FaBars />
//                     <span>Dispatch Dashboard</span>
//                 </header>
//
//                 {/* CONTENT */}
//                 <main className="main">
//
//                     {!loading && isHome && (
//                         <>
//                             <Section title="Vehicle Overview" cards={vehicleCards}/>
//                             <Section title="Trip Management" cards={tripCards}/>
//                             <Section title="Management" cards={managementCards}/>
//                             <Section title="Health Monitoring" cards={healthCards}/>
//                         </>
//                     )}
//
//                     <Outlet/>
//
//                 </main>
//             </div>
//
//             {/* ================= STYLE ================= */}
//
//             <style>{`
//
//             .erp{
//                 display:flex;
//                 height:100vh;
//                 background:#f1f5f9;
//                 font-family:Inter, sans-serif;
//             }
//
//             /* SIDEBAR */
//
//             .sidebar{
//                 width:240px;
//                 background:#0f172a;
//                 padding:20px;
//                 color:white;
//                 display:flex;
//                 flex-direction:column;
//                 gap:12px;
//             }
//
//             .logo{
//                 margin-bottom:20px;
//             }
//
//             .menu{
//                 padding:12px;
//                 border-radius:8px;
//                 color:#cbd5e1;
//                 text-decoration:none;
//                 transition:.2s;
//             }
//
//             .menu:hover{
//                 background:#1e293b;
//                 color:white;
//             }
//
//             .active{
//                 background:#2563eb;
//                 color:white;
//             }
//
//             .logout{
//                 margin-top:auto;
//                 padding:12px;
//                 border:none;
//                 background:#ef4444;
//                 color:white;
//                 border-radius:8px;
//                 cursor:pointer;
//                 display:flex;
//                 gap:8px;
//                 align-items:center;
//             }
//
//             /* HEADER */
//
//             .header{
//                 height:60px;
//                 background:white;
//                 border-bottom:1px solid #e2e8f0;
//                 display:flex;
//                 align-items:center;
//                 gap:12px;
//                 padding:0 20px;
//                 font-weight:600;
//             }
//
//             .mainWrapper{
//                 flex:1;
//                 display:flex;
//                 flex-direction:column;
//             }
//
//             .main{
//                 flex:1;
//                 padding:24px;
//                 overflow:auto;
//             }
//
//             /* SECTION */
//
//             .section{
//                 margin-bottom:35px;
//             }
//
//             .section h2{
//                 margin-bottom:16px;
//                 font-size:20px;
//             }
//
//             /* GRID */
//
//             .grid{
//                 display:grid;
//                 grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
//                 gap:20px;
//             }
//
//             /* CARD */
//
//             .card{
//                 background:white;
//                 padding:22px;
//                 border-radius:14px;
//                 border:1px solid #e2e8f0;
//                 cursor:pointer;
//                 transition:.25s;
//                 box-shadow:0 2px 6px rgba(0,0,0,.05);
//             }
//
//             .card:hover{
//                 transform:translateY(-5px);
//                 box-shadow:0 8px 18px rgba(0,0,0,.12);
//             }
//
//             .card h3{
//                 margin:10px 0 5px;
//             }
//
//             .card p{
//                 font-size:22px;
//                 font-weight:700;
//                 margin:0;
//             }
//
//             `}</style>
//
//         </div>
//     );
// }
//
// /* ================= SECTION COMPONENT ================= */
//
// function Section({ title, cards }) {
//     return (
//         <div className="section">
//             <h2>{title}</h2>
//
//             <div className="grid">
//                 {cards.map((c, i) => (
//                     <div
//                         key={i}
//                         className="card"
//                         style={{borderTop:`4px solid ${c.color}`}}
//                         onClick={c.onClick}
//                     >
//                         <div style={{fontSize:26,color:c.color}}>
//                             {c.icon}
//                         </div>
//
//                         <h3>{c.title}</h3>
//
//                         {c.value !== undefined && <p>{c.value}</p>}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// export default DispatchHome;


import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import vehicleService from "../Services/vehicleService";
import {
    FaTruck,
    FaBus,
    FaMapMarkedAlt,
    FaRoad,
    FaUser,
    FaHeartbeat,
    FaBars,
    FaSignOutAlt
} from "react-icons/fa";


function DispatchHome() {
    const navigate = useNavigate();
    const location = useLocation();

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    /* ================= LOAD VEHICLES ================= */
    useEffect(() => {
        const load = async () => {
            try {
                const res = await vehicleService.getAll(user?.eCode);
                setVehicles(Array.isArray(res) ? res : []);
            } finally {
                setLoading(false);
            }
        };

        if (user?.eCode) load();
    }, [user?.eCode]);

    /* ================= STATS ================= */
    const totalVehicles = vehicles.length;
    const activeVehicles = vehicles.filter(v => v?.status === "active").length;
    const inactiveVehicles = totalVehicles - activeVehicles;

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const isHome = location.pathname === "/dispatch-dashboard";

    const activeMenu = (path) =>
        location.pathname === path ? "menu active" : "menu";

    /* ================= CARD DATA ================= */
    const vehicleCards = [
        {
            title: "Total Vehicles",
            value: totalVehicles,
            icon: <FaTruck />,
            color: "#2563eb",
            onClick: () => navigate("/dispatch-dashboard/vehicles"),
        },
        {
            title: "Active Vehicles",
            value: activeVehicles,
            icon: <FaBus />,
            color: "#16a34a",
            onClick: () => navigate("/dispatch-dashboard/vehicles?status=active"),
        },
        {
            title: "Inactive Vehicles",
            value: inactiveVehicles,
            icon: <FaTruck />,
            color: "#f59e0b",
            onClick: () => navigate("/dispatch-dashboard/vehicles?status=inactive"),
        },
    ];

    const tripCards = [
        {
            title: "Add Trip",
            icon: <FaMapMarkedAlt />,
            color: "#7c3aed",
            onClick: () => navigate("/dispatch-dashboard/routes/add"),
        },
        {
            title: "View Trips",
            icon: <FaRoad />,
            color: "#0891b2",
            onClick: () => navigate("/dispatch-dashboard/routes"),
        },
        {
            title: "Live Tracking",
            icon: <FaMapMarkedAlt />,
            color: "#16a34a",
            onClick: () => navigate("/dispatch-dashboard/live-tracking"),
        },
    ];

    const managementCards = [
        {
            title: "Driver Management",
            icon: <FaUser />,
            color: "#16a34a",
            onClick: () => navigate("/dispatch-dashboard/drivers"),
        },
        {
            title: "Vehicle Expenses",
            icon: <FaTruck />,
            color: "#f59e0b",
            onClick: () => navigate("/dispatch-dashboard/expenses"),
        },
    ];

    const healthCards = [
        {
            title: "Vehicle Health",
            icon: <FaHeartbeat />,
            color: "#ef4444",
            onClick: () => navigate("/dispatch-dashboard/vehicle-health"),
        },
    ];

    return (
        <div className="erp">
            {/* SIDEBAR */}
            <aside className="sidebar">
                <h2 className="logo" style={{color: "#a78bfa"}}>🚛 Dispatch ERP</h2>

                <Link to="/dispatch-dashboard" className={activeMenu("/dispatch-dashboard")}>
                    Dashboard
                </Link>

                <Link to="/dispatch-dashboard/vehicles" className={activeMenu("/dispatch-dashboard/vehicles")}>
                    Vehicles
                </Link>

                <Link to="/dispatch-dashboard/expenses" className={activeMenu("/dispatch-dashboard/expenses")}>
                    Expenses
                </Link>
                <Link
                    to="/dispatch-dashboard/live-tracking"
                    className={activeMenu("/dispatch-dashboard/live-tracking")}
                >
                    Live Tracking
                </Link>

                <button className="logout" onClick={logout}>
                    <FaSignOutAlt /> Logout
                </button>
            </aside>

            {/* RIGHT SIDE */}
            <div className="mainWrapper">
                {/* HEADER */}
                <header className="header">
                    <FaBars color="#64748b" />
                    <span style={{ marginLeft: 12 }}>Dispatch & Fleet Management</span>
                </header>

                {/* CONTENT */}
                <main className="main">
                    {!loading && isHome && (
                        <div className="content-container">
                            <Section title="Vehicle Overview" cards={vehicleCards}/>
                            <Section title="Trip Management" cards={tripCards}/>
                            <Section title="Management" cards={managementCards}/>
                            <Section title="Health Monitoring" cards={healthCards}/>
                        </div>
                    )}

                    <main className="main">
                        {!loading && isHome ? (
                            <div className="content-container">
                                <Section title="Vehicle Overview" cards={vehicleCards}/>
                                <Section title="Trip Management" cards={tripCards}/>
                                <Section title="Management" cards={managementCards}/>
                                <Section title="Health Monitoring" cards={healthCards}/>
                            </div>
                        ) : (
                            <div className="content-container">
                                <Outlet /> {/* ✅ All other nested pages, including LiveTrackingPage, will render here */}
                            </div>
                        )}
                    </main>
                </main>
            </div>

            {/* ================= STYLE ================= */}
            <style>{`
            * { box-sizing: border-box; }
            
            .erp {
                display: flex;
                height: 100vh;
                width: 100vw;
                background: #f8fafc;
                font-family: 'Inter', sans-serif;
                overflow: hidden;
            }

            /* SIDEBAR */
            .sidebar {
                width: 240px;
                min-width: 240px;
                background: #1e1b4b;
                padding: 25px;
                color: white;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .logo {
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 30px;
            }

            .menu {
                padding: 12px 15px;
                border-radius: 8px;
                color: #cbd5e1;
                text-decoration: none;
                transition: 0.2s;
                font-size: 15px;
                display: block;
            }

            .menu:hover {
                background: rgba(255,255,255,0.1);
                color: white;
            }

            .active {
                background: #2563eb;
                color: white;
                font-weight: 600;
            }

            .logout {
                margin-top: auto;
                padding: 12px;
                border: none;
                background: #ef4444;
                color: white;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                gap: 8px;
                align-items: center;
                justify-content: center;
                font-weight: 600;
            }

            /* HEADER */
            .header {
                height: 60px;
                min-height: 60px;
                background: white;
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                align-items: center;
                padding: 0 25px;
                font-weight: bold;
                color: #334155;
            }

            .mainWrapper {
                flex: 1;
                display: flex;
                flex-direction: column;
                min-width: 0;
            }

            .main {
                flex: 1;
                padding: 30px;
                overflow-y: auto;
            }

            .content-container {
                max-width: 1400px;
                margin: 0 auto;
            }

            /* SECTION */
            .section {
                margin-bottom: 40px;
            }

            .section h2 {
                margin-bottom: 20px;
                font-size: 20px;
                color: #1e293b;
                border-left: 4px solid #2563eb;
                padding-left: 12px;
            }

            /* GRID */
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 25px;
            }

            /* CARD */
            .card {
                background: white;
                padding: 25px;
                border-radius: 15px;
                border: 1px solid #e2e8f0;
                cursor: pointer;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }

            .card h3 {
                margin: 15px 0 5px;
                font-size: 15px;
                color: #64748b;
                font-weight: 500;
            }

            .card p {
                font-size: 26px;
                font-weight: bold;
                margin: 0;
                color: #1e293b;
            }
            `}</style>
        </div>
    );
}

/* ================= SECTION COMPONENT ================= */
function Section({ title, cards }) {
    return (
        <div className="section">
            <h2>{title}</h2>
            <div className="grid">
                {cards.map((c, i) => (
                    <div
                        key={i}
                        className="card"
                        style={{ borderTop: `4px solid ${c.color}` }}
                        onClick={c.onClick}
                    >
                        <div style={{ fontSize: 26, color: c.color }}>
                            {c.icon}
                        </div>
                        <h3>{c.title}</h3>
                        {c.value !== undefined && <p>{c.value}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DispatchHome;