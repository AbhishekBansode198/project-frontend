import React, { useState } from "react";
import {
    FaBars,
    FaClipboardList,
    FaTruck,
    FaFileUpload,
    FaHistory,
    FaSignOutAlt,
    FaCloudUploadAlt,
    FaSpinner
} from "react-icons/fa";

import AddVehicleRequisition from "../Module/Requisition/Pages/AddVehicleRequisition";
import VehicleRequisitionList from "../Module/Requisition/Pages/VehicleRequisitionList";
import ViewUploadedPlans from "../Module/Production/Pages/ViewUploadPlans";

export default function CoordinatorDashboard() {

    const [activePage, setActivePage] = useState("dashboard");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    /* ================= FILE UPLOAD ================= */

    const handleFileUpload = async () => {

        if (!uploadedFile) return;

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const eCode = user.eCode || user.id;

        if (!eCode) {
            setMessage("❌ User not logged in");
            return;
        }

        const formData = new FormData();
        formData.append("file", uploadedFile);
        formData.append("eCode", eCode);
        formData.append("department", "Coordinator");

        setIsUploading(true);

        try {

            const res = await fetch(
                "http://localhost:8080/api/files/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            const text = await res.text();

            if (res.ok) {
                setMessage("✅ File Uploaded Successfully");
                setUploadedFile(null);
            } else {
                setMessage("❌ " + text);
            }

        } catch {
            setMessage("❌ Server Error");
        }

        setIsUploading(false);
    };

    /* ================= UPLOAD VIEW ================= */

    const UploadView = () => (
        <div style={styles.uploadContainer}>

            <h2>Upload Coordinator File</h2>

            <div style={styles.uploadBox}>
                <FaCloudUploadAlt size={40}/>
                <input
                    type="file"
                    onChange={(e)=>setUploadedFile(e.target.files[0])}
                />
            </div>

            {uploadedFile && (
                <button style={styles.primaryBtn}
                        onClick={handleFileUpload}>
                    {isUploading
                        ? <FaSpinner className="spin"/>
                        : "Upload File"}
                </button>
            )}

            {message && <p>{message}</p>}

        </div>
    );

    /* ================= UI ================= */

    return (
        <div style={styles.container}>

            {/* SIDEBAR */}
            <aside style={styles.sidebar}>

                <h2 style={styles.logo}>🧑‍💼 Coordinator ERP</h2>

                <button
                    style={styles.navItem}
                    onClick={()=>setActivePage("dashboard")}
                >
                    <FaClipboardList/> Dashboard
                </button>

                <button
                    style={styles.navItem}
                    onClick={()=>setActivePage("createReq")}
                >
                    ➕ Create Requisition
                </button>

                <button
                    style={styles.navItem}
                    onClick={()=>setActivePage("viewReq")}
                >
                    <FaTruck/> Vehicle Requisitions
                </button>

                <button
                    style={styles.navItem}
                    onClick={()=>setActivePage("upload")}
                >
                    <FaFileUpload/> Upload File
                </button>

                <button
                    style={styles.navItem}
                    onClick={()=>setActivePage("files")}
                >
                    <FaHistory/> Uploaded Files
                </button>

                <button style={styles.logout}>
                    <FaSignOutAlt/> Logout
                </button>

            </aside>

            {/* MAIN */}
            <div style={styles.mainWrapper}>

                <header style={styles.header}>
                    <FaBars/> Coordinator Control Panel
                </header>

                <main style={styles.main}>

                    {activePage==="dashboard" && (
                        <div style={styles.grid}>

                            <div style={styles.card}
                                 onClick={()=>setActivePage("createReq")}>
                                <h3>Create Requisition</h3>
                            </div>

                            <div style={styles.card}
                                 onClick={()=>setActivePage("viewReq")}>
                                <h3>View Requisitions</h3>
                            </div>

                            <div style={styles.card}
                                 onClick={()=>setActivePage("upload")}>
                                <h3>Upload File</h3>
                            </div>

                        </div>
                    )}

                    {activePage==="createReq" &&
                        <AddVehicleRequisition/>
                    }

                    {activePage==="viewReq" &&
                        <VehicleRequisitionList/>
                    }

                    {activePage==="upload" && <UploadView/>}

                    {activePage==="files" &&
                        <ViewUploadedPlans
                            onBack={()=>setActivePage("dashboard")}
                        />
                    }

                </main>
            </div>

            <style>{`
                .spin{
                    animation:spin 1s linear infinite;
                }
                @keyframes spin{
                    from{transform:rotate(0)}
                    to{transform:rotate(360deg)}
                }
            `}</style>

        </div>
    );
}

/* ================= STYLES ================= */

const styles = {

    container:{
        display:"flex",
        height:"100vh",
        background:"#f8fafc",
        fontFamily:"sans-serif"
    },

    sidebar:{
        width:240,
        background:"#0f172a",
        color:"#fff",
        padding:20,
        display:"flex",
        flexDirection:"column"
    },

    logo:{
        marginBottom:30,
        fontSize:22,
        fontWeight:"bold"
    },

    navItem:{
        padding:12,
        marginBottom:10,
        border:"none",
        background:"none",
        color:"#fff",
        textAlign:"left",
        cursor:"pointer",
        borderRadius:8
    },

    logout:{
        marginTop:"auto",
        background:"#ef4444",
        border:"none",
        padding:12,
        color:"#fff",
        borderRadius:8
    },

    mainWrapper:{
        flex:1,
        display:"flex",
        flexDirection:"column"
    },

    header:{
        height:60,
        background:"#fff",
        borderBottom:"1px solid #e2e8f0",
        display:"flex",
        alignItems:"center",
        padding:20,
        fontWeight:"bold"
    },

    main:{
        padding:25,
        overflow:"auto"
    },

    grid:{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
        gap:20
    },

    card:{
        background:"#fff",
        padding:30,
        borderRadius:12,
        cursor:"pointer",
        boxShadow:"0 4px 6px rgba(0,0,0,0.05)"
    },

    uploadContainer:{
        maxWidth:600
    },

    uploadBox:{
        border:"2px dashed #cbd5e1",
        padding:40,
        textAlign:"center",
        borderRadius:12,
        marginTop:20
    },

    primaryBtn:{
        marginTop:20,
        padding:12,
        background:"#2563eb",
        color:"#fff",
        border:"none",
        borderRadius:8,
        cursor:"pointer"
    }
};