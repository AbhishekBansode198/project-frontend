import React, { useState } from "react";
import {
    FaBars,
    FaClipboardList,
    FaFileAlt,
    FaTruck,
    FaPlus,
    FaSignOutAlt
} from "react-icons/fa";

/* EXISTING PAGE */
import ViewUploadedPlans from "../Module/Production/Pages/ViewUploadPlans";

/* ✅ REQUISITION MODULE */
import AddVehicleRequisition from "../Module/Requisition/Pages/AddVehicleRequisition";
import VehicleRequisitionList from "../Module/Requisition/Pages/VehicleRequisitionList";

export default function PowderCoatingDashboard() {

    const [activePage, setActivePage] = useState("dashboard");

    return (
        <div style={styles.container}>

            {/* ================= SIDEBAR ================= */}
            <aside style={styles.sidebar}>

                <h2 style={styles.logo}>🎨 Powder ERP</h2>

                <button
                    style={styles.navItem}
                    onClick={() => setActivePage("dashboard")}
                >
                    <FaClipboardList /> Dashboard
                </button>

                <button
                    style={styles.navItem}
                    onClick={() => setActivePage("qcLogs")}
                >
                    <FaFileAlt /> QC Reports
                </button>

                <button
                    style={styles.navItem}
                    onClick={() => setActivePage("requisitionList")}
                >
                    <FaTruck /> Vehicle Requisition
                </button>

                <button
                    style={styles.navItem}
                    onClick={() => setActivePage("createRequisition")}
                >
                    <FaPlus /> Create Requisition
                </button>

                <button style={styles.logout}>
                    <FaSignOutAlt /> Logout
                </button>

            </aside>

            {/* ================= MAIN ================= */}
            <div style={styles.mainWrapper}>

                <header style={styles.header}>
                    <FaBars />
                    <span style={{ marginLeft: 10 }}>
                        Powder Coating Management
                    </span>
                </header>

                <main style={styles.main}>

                    {/* DASHBOARD */}
                    {activePage === "dashboard" && (
                        <div style={styles.grid}>

                            <div
                                style={styles.card}
                                onClick={() => setActivePage("qcLogs")}
                            >
                                <h3>QC Reports</h3>
                                <p>View Coating Logs</p>
                            </div>

                            <div
                                style={styles.card}
                                onClick={() => setActivePage("requisitionList")}
                            >
                                <h3>Vehicle Requisition</h3>
                                <p>All Requests</p>
                            </div>

                            <div
                                style={styles.card}
                                onClick={() => setActivePage("createRequisition")}
                            >
                                <h3>Create Requisition</h3>
                                <p>New Request</p>
                            </div>

                        </div>
                    )}

                    {/* QC LOG VIEW */}
                    {activePage === "qcLogs" && (
                        <ViewUploadedPlans
                            onBack={() => setActivePage("dashboard")}
                        />
                    )}

                    {/* CREATE REQUISITION */}
                    {activePage === "createRequisition" && (
                        <AddVehicleRequisition />
                    )}

                    {/* REQUISITION LIST */}
                    {activePage === "requisitionList" && (
                        <VehicleRequisitionList />
                    )}

                </main>
            </div>
        </div>
    );
}


/* ================= STYLE ================= */

const styles = {
    container: { display: "flex", height: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif" },
    sidebar: { width: 240, background: "#0f172a", color: "#fff", padding: 25, display: "flex", flexDirection: "column" },
    logo: { fontSize: 22, fontWeight: "bold", marginBottom: 40, color: "#38bdf8" },
    navItem: { padding: "12px", textAlign: "left", background: "none", border: "none", color: "#fff", cursor: "pointer", borderRadius: 8, marginBottom: 10, fontSize: 16 },
    logout: { marginTop: "auto", padding: 12, background: "#ef4444", border: "none", color: "#fff", borderRadius: 8, cursor: "pointer" },
    mainWrapper: { flex: 1, display: "flex", flexDirection: "column" },
    header: { height: 60, background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", padding: "0 20px", fontWeight: "bold" },
    main: { padding: 30, overflowY: "auto" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 25 },
    card: { background: "#fff", padding: 25, borderRadius: 15, boxShadow: "0 4px 6px rgba(0,0,0,0.05)", cursor: "pointer", transition: "0.2s" },
    cardTitle: { fontSize: 14, color: "#64748b", margin: "15px 0 5px" },
    cardValue: { fontSize: 22, fontWeight: "bold", margin: 0 },
    backButton: { display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#334155", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", marginBottom: 25 },
};

const uploadStyles = {
    container: { maxWidth: "700px", margin: "0 auto" },
    headerSection: { textAlign: "center", marginBottom: 30 },
    title: { fontSize: 26, color: "#1e293b", marginBottom: 10 },
    subtitle: { color: "#64748b" },
    dropZone: { border: "2px dashed #cbd5e1", borderRadius: 20, padding: "50px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.3s" },
    innerZone: { display: "flex", flexDirection: "column", alignItems: "center" },
    icon: { fontSize: 50, color: "#3b82f6", marginBottom: 15 },
    dropText: { fontSize: 18, color: "#334155" },
    hiddenInput: { display: "none" },
    selectButton: { padding: "10px 20px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontWeight: "bold" },
    fileCard: { marginTop: 20, padding: 15, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #e2e8f0" },
    fileInfo: { display: "flex", alignItems: "center", gap: 15 },
    fileIconBg: { width: 40, height: 40, background: "#eff6ff", borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center" },
    fileName: { margin: 0, fontWeight: "bold", fontSize: 14 },
    fileSize: { margin: 0, fontSize: 12, color: "#64748b" },
    removeIcon: { color: "#94a3b8", cursor: "pointer" },
    processBtn: { width: "100%", marginTop: 20, padding: 15, background: "#2563eb", color: "#fff", border: "none", borderRadius: 12, fontWeight: "bold", cursor: "pointer" }
};