import React, { useState } from "react";
import {
    FaShoppingCart, FaFileUpload, FaHistory, FaBars, FaArrowLeft,
    FaCloudUploadAlt, FaFileAlt as FaFileIcon, FaTimes,
    FaSpinner, FaClipboardList, FaSignOutAlt, FaFileInvoice
} from "react-icons/fa";

import ViewUploadedPlans from "../Module/Production/Pages/ViewUploadPlans";
import AddVehicleRequisition from "../Module/Requisition/Pages/AddVehicleRequisition";
import VehicleRequisitionList from "../Module/Requisition/Pages/VehicleRequisitionList";

function PurchaseDashboard() {

    const [activePage, setActivePage] = useState("dashboard");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState("");

    /* ================= FILE UPLOAD (UNCHANGED) ================= */

    const handleFileUpload = async () => {

        if (!uploadedFile) return;

        const user = JSON.parse(localStorage.getItem("user"));
        const eCode = user?.eCode;

        if (!eCode) {
            setMessage("❌ User not logged in.");
            return;
        }

        const formData = new FormData();
        formData.append("file", uploadedFile);
        formData.append("eCode", eCode);
        formData.append("department", "purchase");

        setIsUploading(true);
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:8080/api/files/upload",
                { method: "POST", body: formData }
            );

            const text = await response.text();

            if (response.ok) {
                setMessage("✅ File uploaded successfully!");
                setUploadedFile(null);
            } else {
                setMessage("❌ " + text);
            }

        } catch (error) {
            console.error(error);
            setMessage("❌ Connection to server failed.");
        } finally {
            setIsUploading(false);
        }
    };

    /* ================= UPLOAD VIEW (UNCHANGED) ================= */

    const renderUploadView = () => (
        <div style={uploadStyles.container}>

            <button
                onClick={() => { setActivePage("dashboard"); setMessage(""); }}
                style={styles.backButton}
            >
                <FaArrowLeft /> Back to Dashboard
            </button>

            <div style={uploadStyles.headerSection}>
                <h2 style={uploadStyles.title}>
                    Upload Purchase Document (DC/PO)
                </h2>
                <p style={uploadStyles.subtitle}>
                    Upload files to the central procurement database
                </p>
            </div>

            {message && (
                <div style={{
                    padding: '15px',
                    borderRadius: '8px',
                    backgroundColor: message.includes('✅') ? '#dcfce7' : '#fee2e2',
                    color: message.includes('✅') ? '#166534' : '#991b1b',
                    marginBottom: '20px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    {message}
                </div>
            )}

            <div
                style={{
                    ...uploadStyles.dropZone,
                    borderColor: isDragging ? "#7c3aed" : "#cbd5e1",
                    backgroundColor: isDragging ? "#f5f3ff" : "#ffffff",
                }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files[0])
                        setUploadedFile(e.dataTransfer.files[0]);
                }}
            >
                <div style={uploadStyles.innerZone}>
                    <FaCloudUploadAlt style={{...uploadStyles.icon, color: "#7c3aed"}} />
                    <p style={uploadStyles.dropText}>
                        <strong>Drop file here</strong> or click to select
                    </p>

                    <input
                        type="file"
                        onChange={(e)=>setUploadedFile(e.target.files[0])}
                        style={uploadStyles.hiddenInput}
                        id="poUpload"
                    />

                    <label htmlFor="poUpload" style={uploadStyles.selectButton}>
                        Browse Files
                    </label>
                </div>
            </div>

            {uploadedFile && (
                <div style={uploadStyles.fileCard}>
                    <div style={uploadStyles.fileInfo}>
                        <div style={{...uploadStyles.fileIconBg, background:'#f5f3ff'}}>
                            <FaFileIcon style={{ color: "#7c3aed" }} />
                        </div>
                        <div>
                            <p style={uploadStyles.fileName}>{uploadedFile.name}</p>
                            <p style={uploadStyles.fileSize}>
                                {(uploadedFile.size / 1024).toFixed(2)} KB
                            </p>
                        </div>
                    </div>
                    <FaTimes
                        style={uploadStyles.removeIcon}
                        onClick={()=>setUploadedFile(null)}
                    />
                </div>
            )}

            {uploadedFile && (
                <button
                    style={{
                        ...uploadStyles.processBtn,
                        background: "#7c3aed",
                        opacity: isUploading ? 0.7 : 1,
                        cursor: isUploading ? "not-allowed" : "pointer"
                    }}
                    onClick={handleFileUpload}
                    disabled={isUploading}
                >
                    {isUploading
                        ? <FaSpinner className="spin" />
                        : "Start Upload"}
                </button>
            )}
        </div>
    );

    /* ================= MAIN UI ================= */

    return (
        <div style={styles.container}>

            {/* SIDEBAR */}
            <aside style={{...styles.sidebar, background:"#1e1b4b"}}>

                <h2 style={{...styles.logo, color:"#a78bfa"}}>
                    🛒 Purchase ERP
                </h2>

                <button
                    style={styles.navItem}
                    onClick={()=>setActivePage("dashboard")}
                >
                    <FaClipboardList style={{marginRight:10}}/>
                    Dashboard
                </button>

                <button
                    style={styles.navItem}
                    onClick={()=>setActivePage("viewDC")}
                >
                    <FaFileInvoice style={{marginRight:10}}/>
                    Uploaded DC
                </button>

                {/* ✅ ADDED */}
                <button
                    style={styles.navItem}
                    onClick={()=>setActivePage("requisitionList")}
                >
                    🚚 Vehicle Requisition
                </button>

                {/* ✅ ADDED */}
                <button
                    style={styles.navItem}
                    onClick={()=>setActivePage("createRequisition")}
                >
                    ➕ Create Requisition
                </button>

                <button style={styles.logout}>
                    <FaSignOutAlt style={{marginRight:8}}/>
                    Logout
                </button>

            </aside>

            {/* MAIN CONTENT */}
            <div style={styles.mainWrapper}>

                <header style={styles.header}>
                    <FaBars color="#64748b"/>
                    <span style={{marginLeft:12}}>
                        Purchase & Procurement Module
                    </span>
                </header>

                <main style={styles.main}>

                    {activePage==="dashboard" && (
                        <div style={styles.grid}>

                            <div
                                className="dashboard-card"
                                style={{...styles.card, borderTop:"4px solid #7c3aed"}}
                                onClick={()=>setActivePage("upload")}
                            >
                                <FaFileUpload style={{color:"#7c3aed",fontSize:24}}/>
                                <h3 style={styles.cardTitle}>Upload DC</h3>
                                <p style={styles.cardValue}>New File</p>
                            </div>

                            <div
                                className="dashboard-card"
                                style={{...styles.card, borderTop:"4px solid #0891b2"}}
                                onClick={()=>setActivePage("viewDC")}
                            >
                                <FaHistory style={{color:"#0891b2",fontSize:24}}/>
                                <h3 style={styles.cardTitle}>Uploaded DC</h3>
                                <p style={styles.cardValue}>View All</p>
                            </div>

                            <div
                                className="dashboard-card"
                                style={{...styles.card, borderTop:"4px solid #ea580c"}}
                                onClick={()=>setActivePage("requisitionList")}
                            >
                                <FaShoppingCart style={{color:"#ea580c",fontSize:24}}/>
                                <h3 style={styles.cardTitle}>Vehicle Requisition</h3>
                                <p style={styles.cardValue}>Manage</p>
                            </div>

                        </div>
                    )}

                    {activePage==="upload" && renderUploadView()}

                    {activePage==="viewDC" &&
                        <ViewUploadedPlans onBack={()=>setActivePage("dashboard")} />
                    }

                    {/* ✅ ADDED */}
                    {activePage==="requisitionList" &&
                        <VehicleRequisitionList />
                    }

                    {/* ✅ ADDED */}
                    {activePage==="createRequisition" &&
                        <AddVehicleRequisition />
                    }

                </main>
            </div>

            <style>{`
                *{box-sizing:border-box}
                .spin{animation:spin 1s linear infinite}
                @keyframes spin{
                    from{transform:rotate(0deg)}
                    to{transform:rotate(360deg)}
                }
                .dashboard-card:hover{
                    transform:translateY(-5px);
                    box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);
                }
            `}</style>

        </div>
    );
}

export default PurchaseDashboard;

/* Styles */
const styles = {
    container: { display: "flex", height: "100vh", width: "100vw", backgroundColor: "#f8fafc", fontFamily: "sans-serif", overflow: "hidden" },
    sidebar: { width: 240, minWidth: 240, color: "#fff", padding: 25, display: "flex", flexDirection: "column" },
    logo: { fontSize: 22, fontWeight: "bold", marginBottom: 40 },
    navItem: { display: 'flex', alignItems: 'center', padding: "12px", textAlign: "left", background: "none", border: "none", color: "#fff", cursor: "pointer", borderRadius: 8, marginBottom: 10, fontSize: 16 },
    logout: { marginTop: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, background: "#ef4444", border: "none", color: "#fff", borderRadius: 8, cursor: "pointer" },
    mainWrapper: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
    header: { height: 60, minHeight: 60, background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", padding: "0 20px", fontWeight: "bold", color: "#334155" },
    main: { padding: 30, overflowY: "auto", flex: 1 },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 25,
        width: "100%"
    },
    card: {
        background: "#fff",
        padding: 30,
        borderRadius: 15,
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        cursor: "pointer",
        transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    cardTitle: { fontSize: 14, color: "#64748b", margin: "15px 0 5px" },
    cardValue: { fontSize: 26, fontWeight: "bold", margin: 0, color: '#1e293b' },
    backButton: { display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#334155", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", marginBottom: 25 },
};

const uploadStyles = {
    container: { maxWidth: "100%", margin: "0 auto" },
    headerSection: { textAlign: "center", marginBottom: 30 },
    title: { fontSize: 26, color: "#1e293b", marginBottom: 10 },
    subtitle: { color: "#64748b" },
    dropZone: { border: "2px dashed #cbd5e1", borderRadius: 20, padding: "60px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.3s" },
    innerZone: { display: "flex", flexDirection: "column", alignItems: "center" },
    icon: { fontSize: 50, marginBottom: 15 },
    dropText: { fontSize: 18, color: "#334155" },
    hiddenInput: { display: "none" },
    selectButton: { padding: "10px 20px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontWeight: "bold", marginTop: 10 },
    fileCard: { marginTop: 20, padding: 15, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #e2e8f0" },
    fileInfo: { display: "flex", alignItems: "center", gap: 15 },
    fileIconBg: { width: 40, height: 40, borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center" },
    fileName: { margin: 0, fontWeight: "bold", fontSize: 14 },
    fileSize: { margin: 0, fontSize: 12, color: "#64748b" },
    removeIcon: { color: "#94a3b8", cursor: "pointer" },
    processBtn: { width: "100%", marginTop: 20, padding: 15, color: "#fff", border: "none", borderRadius: 12, fontWeight: "bold", cursor: "pointer" }
};