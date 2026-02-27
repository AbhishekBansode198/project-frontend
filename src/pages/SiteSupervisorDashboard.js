    //
    // import React, { useState, useEffect } from "react";
    // import {
    //     FaHardHat, FaCamera, FaClipboardCheck, FaBars, FaArrowLeft,
    //     FaCloudUploadAlt, FaFileAlt as FaFileIcon, FaTimes, FaMapMarkerAlt,
    //     FaSpinner, FaUsers, FaExclamationTriangle, FaSignOutAlt, FaHistory,
    //     FaEye, FaDownload, FaSearch, FaFileInvoice, FaFileAlt
    // } from "react-icons/fa";
    //
    // // --- SUB-PAGE: VIEW UPLOADED DC TABLE ---
    // function ViewUploadedDCTable({ onBack }) {
    //     const [files, setFiles] = useState([]);
    //     const [loading, setLoading] = useState(true);
    //     const [error, setError] = useState("");
    //     const [searchTerm, setSearchTerm] = useState("");
    //
    //     useEffect(() => {
    //         fetch("http://localhost:8080/api/files/all")
    //             .then(res => {
    //                 if (!res.ok) throw new Error("Failed to fetch files");
    //                 return res.json();
    //             })
    //             .then(data => {
    //                 setFiles(Array.isArray(data) ? data : []);
    //                 setLoading(false);
    //             })
    //             .catch(err => {
    //                 console.error(err);
    //                 setError("Unable to retrieve site documents.");
    //                 setLoading(false);
    //             });
    //     }, []);
    //
    //     const formatDate = (dateString) => {
    //         if (!dateString) return "N/A";
    //         const date = new Date(dateString);
    //         return new Intl.DateTimeFormat('en-GB', {
    //             day: '2-digit', month: 'short', year: 'numeric',
    //             hour: '2-digit', minute: '2-digit'
    //         }).format(date);
    //     };
    //
    //     const handleView = (id) => {
    //         window.open(`http://localhost:8080/api/files/download/${id}`, "_blank");
    //     };
    //
    //     const handleDownload = (id, fileName) => {
    //         const link = document.createElement("a");
    //         link.href = `http://localhost:8080/api/files/download/${id}`;
    //         link.download = fileName || "DC_Document";
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     };
    //
    //     const processedFiles = files
    //         .filter(f =>
    //             (f.fileName && f.fileName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    //             (f.uploadedBy && f.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()))
    //         )
    //         .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    //
    //     return (
    //         <div style={listStyles.pageWrapper}>
    //             <div style={listStyles.topBar}>
    //                 <button style={styles.backButton} onClick={onBack}>
    //                     <FaArrowLeft /> Back to Dashboard
    //                 </button>
    //                 <div style={listStyles.searchContainer}>
    //                     <FaSearch style={listStyles.searchIcon} />
    //                     <input
    //                         type="text"
    //                         placeholder="Search by filename or user..."
    //                         style={listStyles.searchInput}
    //                         onChange={(e) => setSearchTerm(e.target.value)}
    //                     />
    //                 </div>
    //             </div>
    //
    //             <div style={uploadStyles.headerSection}>
    //                 <h2 style={uploadStyles.title}>
    //                     <FaFileInvoice style={{ color: "#ea580c", marginRight: 12 }} />
    //                     Site Delivery Challans
    //                 </h2>
    //                 <p style={uploadStyles.subtitle}>Latest uploads from all supervisors</p>
    //             </div>
    //
    //             {loading ? (
    //                 <div style={{ textAlign: 'center', padding: '50px' }}>
    //                     <FaSpinner className="spin" style={{ fontSize: 30, color: '#ea580c' }} />
    //                     <p>Loading files...</p>
    //                 </div>
    //             ) : error ? (
    //                 <div style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px' }}>{error}</div>
    //             ) : (
    //                 <div style={listStyles.tableContainer}>
    //                     <table style={listStyles.table}>
    //                         <thead>
    //                         <tr style={{ background: '#f8fafc' }}>
    //                             <th style={listStyles.th}>File Name</th>
    //                             <th style={listStyles.th}>Uploaded By</th>
    //                             <th style={listStyles.th}>Date & Time</th>
    //                             <th style={listStyles.th}>Actions</th>
    //                         </tr>
    //                         </thead>
    //                         <tbody>
    //                         {processedFiles.map((file) => (
    //                             <tr key={file.id} style={listStyles.tr}>
    //                                 <td style={listStyles.td}><FaFileAlt color="#94a3b8" /> {file.fileName}</td>
    //                                 <td style={listStyles.td}>{file.uploadedBy || file.eCode || 'System'}</td>
    //                                 <td style={listStyles.td}>{formatDate(file.uploadedAt)}</td>
    //                                 <td style={listStyles.td}>
    //                                     <button onClick={() => handleView(file.id)} style={listStyles.actionBtn} title="View"><FaEye color="#64748b" /></button>
    //                                     <button onClick={() => handleDownload(file.id, file.fileName)} style={listStyles.actionBtn} title="Download"><FaDownload color="#ea580c" /></button>
    //                                 </td>
    //                             </tr>
    //                         ))}
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             )}
    //         </div>
    //     );
    // }
    //
    // // --- MAIN COMPONENT ---
    // function SiteSupervisorDashboard() {
    //     const [activePage, setActivePage] = useState("dashboard");
    //     const [uploadedFile, setUploadedFile] = useState(null);
    //     const [isDragging, setIsDragging] = useState(false);
    //     const [isUploading, setIsUploading] = useState(false);
    //     const [message, setMessage] = useState("");
    //
    //     const handleFileUpload = async () => {
    //         if (!uploadedFile) return;
    //         const user = JSON.parse(localStorage.getItem("user"));
    //         const eCode = user?.eCode;
    //
    //         if (!eCode) {
    //             setMessage("❌ Supervisor not identified.");
    //             return;
    //         }
    //
    //         const formData = new FormData();
    //         formData.append("file", uploadedFile);
    //         formData.append("eCode", eCode);
    //         formData.append("department", "site");
    //         formData.append("type", "DC");
    //
    //         setIsUploading(true);
    //         setMessage("");
    //
    //         try {
    //             const response = await fetch("http://localhost:8080/api/files/upload", {
    //                 method: "POST",
    //                 body: formData,
    //             });
    //             const text = await response.text();
    //             if (response.ok) {
    //                 setMessage("✅ DC Uploaded Successfully!");
    //                 setUploadedFile(null);
    //             } else {
    //                 setMessage(`❌ Error ${response.status}: ${text || "Bad Request"}`);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             setMessage("❌ Network error. Check connectivity.");
    //         } finally {
    //             setIsUploading(false);
    //         }
    //     };
    //
    //     const renderUploadView = () => (
    //         <div style={uploadStyles.container}>
    //             <button onClick={() => { setActivePage("dashboard"); setMessage(""); }} style={styles.backButton}>
    //                 <FaArrowLeft /> Back to Dashboard
    //             </button>
    //             <div style={uploadStyles.headerSection}>
    //                 <h2 style={uploadStyles.title}>Upload DC</h2>
    //                 <p style={uploadStyles.subtitle}>Upload Delivery Challans to central records</p>
    //             </div>
    //             {message && (
    //                 <div style={{ padding: '15px', borderRadius: '8px', backgroundColor: message.includes('✅') ? '#dcfce7' : '#fee2e2', color: message.includes('✅') ? '#166534' : '#991b1b', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
    //                     {message}
    //                 </div>
    //             )}
    //             <div
    //                 style={{ ...uploadStyles.dropZone, borderColor: isDragging ? "#ea580c" : "#cbd5e1", backgroundColor: isDragging ? "#fff7ed" : "#ffffff" }}
    //                 onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
    //                 onDragLeave={() => setIsDragging(false)}
    //                 onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) setUploadedFile(e.dataTransfer.files[0]); }}
    //             >
    //                 <div style={uploadStyles.innerZone}>
    //                     <FaCloudUploadAlt style={{ ...uploadStyles.icon, color: "#ea580c" }} />
    //                     <p style={uploadStyles.dropText}><strong>Drop DC file here</strong> or click to select</p>
    //                     <input type="file" onChange={(e) => setUploadedFile(e.target.files[0])} style={uploadStyles.hiddenInput} id="siteUpload" accept="image/*,application/pdf" />
    //                     <label htmlFor="siteUpload" style={uploadStyles.selectButton}>Browse Files</label>
    //                 </div>
    //             </div>
    //             {uploadedFile && (
    //                 <div style={uploadStyles.fileCard}>
    //                     <div style={uploadStyles.fileInfo}>
    //                         <div style={{ ...uploadStyles.fileIconBg, background: '#fff7ed' }}><FaFileIcon style={{ color: "#ea580c" }} /></div>
    //                         <div><p style={uploadStyles.fileName}>{uploadedFile.name}</p><p style={uploadStyles.fileSize}>{(uploadedFile.size / 1024).toFixed(2)} KB</p></div>
    //                     </div>
    //                     <FaTimes style={uploadStyles.removeIcon} onClick={() => setUploadedFile(null)} />
    //                 </div>
    //             )}
    //             {uploadedFile && (
    //                 <button style={{ ...uploadStyles.processBtn, background: "#ea580c", opacity: isUploading ? 0.7 : 1, cursor: isUploading ? "not-allowed" : "pointer" }} onClick={handleFileUpload} disabled={isUploading}>
    //                     {isUploading ? <FaSpinner className="spin" /> : "Start Upload"}
    //                 </button>
    //             )}
    //         </div>
    //     );
    //
    //     return (
    //         <div style={styles.container}>
    //             <aside style={{ ...styles.sidebar, background: "#1c1917" }}>
    //                 <h2 style={{ ...styles.logo, color: "#fb923c" }}><FaHardHat /> SiteSuper</h2>
    //                 <button style={styles.navItem} onClick={() => setActivePage("dashboard")}><FaBars style={{ marginRight: 10 }} /> Unit Overview</button>
    //                 <button style={styles.navItem} onClick={() => setActivePage("viewLogs")}><FaHistory style={{ marginRight: 10 }} /> Uploaded DC</button>
    //                 <div style={styles.siteInfoBox}>
    //                     <p style={{ fontSize: '11px', color: '#a8a29e', margin: '0 0 5px 0', textTransform: 'uppercase' }}>Active Location</p>
    //                     <p style={{ fontSize: '14px', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6 }}><FaMapMarkerAlt size={12} color="#fb923c" /> Sector 7 - Block B</p>
    //                 </div>
    //                 <button style={styles.logout}><FaSignOutAlt style={{ marginRight: 8 }} /> Sign Out</button>
    //             </aside>
    //
    //             <div style={styles.mainWrapper}>
    //                 <header style={styles.header}><FaBars color="#64748b" /><span style={{ marginLeft: 12 }}>Supervisor Execution Portal</span></header>
    //                 <main style={styles.main}>
    //                     {activePage === "dashboard" && (
    //                         <>
    //                             <div style={styles.alertBanner}><FaExclamationTriangle /> <span><strong>Safety Notice:</strong> Ensure all personnel are wearing Level 2 PPE today.</span></div>
    //                             <div style={styles.grid}>
    //                                 <div style={{ ...styles.card, borderTop: "4px solid #ea580c" }} onClick={() => setActivePage("upload")}>
    //                                     <FaCamera style={{ color: "#ea580c", fontSize: 24 }} />
    //                                     <h3 style={styles.cardTitle}>Upload DC</h3>
    //                                     <p style={styles.cardValue}>New File</p>
    //                                 </div>
    //                                 <div style={{ ...styles.card, borderTop: "4px solid #0891b2" }} onClick={() => setActivePage("viewLogs")}>
    //                                     <FaClipboardCheck style={{ color: "#0891b2", fontSize: 24 }} />
    //                                     <h3 style={styles.cardTitle}>Uploaded DC</h3>
    //                                     <p style={styles.cardValue}>View All</p>
    //                                 </div>
    //                                 <div style={{ ...styles.card, borderTop: "4px solid #16a34a" }}>
    //                                     <FaUsers style={{ color: "#16a34a", fontSize: 24 }} />
    //                                     <h3 style={styles.cardTitle}>Workforce</h3>
    //                                     <p style={styles.cardValue}>24 Present</p>
    //                                 </div>
    //                             </div>
    //                         </>
    //                     )}
    //                     {activePage === "upload" && renderUploadView()}
    //                     {activePage === "viewLogs" && <ViewUploadedDCTable onBack={() => setActivePage("dashboard")} />}
    //                 </main>
    //             </div>
    //             <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    //         </div>
    //     );
    // }
    //
    // // --- CONSOLIDATED STYLES ---
    // const styles = {
    //     container: { display: "flex", height: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif" },
    //     sidebar: { width: 260, color: "#fff", padding: 25, display: "flex", flexDirection: "column" },
    //     logo: { fontSize: 22, fontWeight: "bold", marginBottom: 40, display: 'flex', alignItems: 'center', gap: 10 },
    //     navItem: { display: 'flex', alignItems: 'center', padding: "12px", textAlign: "left", background: "none", border: "none", color: "#e7e5e4", cursor: "pointer", borderRadius: 8, marginBottom: 10, fontSize: 15 },
    //     siteInfoBox: { marginTop: 'auto', padding: '15px', background: '#292524', borderRadius: '12px', marginBottom: '15px' },
    //     logout: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, background: "#ef4444", border: "none", color: "#fff", borderRadius: 8, cursor: "pointer", fontWeight: 'bold' },
    //     mainWrapper: { flex: 1, display: "flex", flexDirection: "column" },
    //     header: { height: 60, background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", padding: "0 20px", fontWeight: "bold", color: "#334155" },
    //     main: { padding: 30, overflowY: "auto" },
    //     grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 25 },
    //     card: { background: "#fff", padding: 25, borderRadius: 15, boxShadow: "0 4px 6px rgba(0,0,0,0.05)", cursor: "pointer", transition: "0.2s" },
    //     cardTitle: { fontSize: 14, color: "#64748b", margin: "15px 0 5px" },
    //     cardValue: { fontSize: 22, fontWeight: "bold", margin: 0, color: '#1e293b' },
    //     backButton: { display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#334155", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", marginBottom: 25 },
    //     alertBanner: { background: '#fff7ed', border: '1px solid #ffedd5', color: '#9a3412', padding: '15px', borderRadius: '12px', marginBottom: '25px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: 10 }
    // };
    //
    // const uploadStyles = {
    //     container: { maxWidth: "900px", margin: "0 auto" },
    //     headerSection: { textAlign: "center", marginBottom: 30 },
    //     title: { fontSize: 26, color: "#1e293b", marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    //     subtitle: { color: "#64748b" },
    //     dropZone: { border: "2px dashed #cbd5e1", borderRadius: 20, padding: "50px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.3s" },
    //     innerZone: { display: "flex", flexDirection: "column", alignItems: "center" },
    //     icon: { fontSize: 50, marginBottom: 15 },
    //     dropText: { fontSize: 18, color: "#334155" },
    //     hiddenInput: { display: "none" },
    //     selectButton: { padding: "10px 20px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontWeight: "bold", marginTop: 10, color: '#334155' },
    //     fileCard: { marginTop: 20, padding: 15, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #e2e8f0" },
    //     fileInfo: { display: "flex", alignItems: "center", gap: 15 },
    //     fileIconBg: { width: 40, height: 40, borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center" },
    //     fileName: { margin: 0, fontWeight: "bold", fontSize: 14, color: '#1e293b' },
    //     fileSize: { margin: 0, fontSize: 12, color: "#64748b" },
    //     removeIcon: { color: "#94a3b8", cursor: "pointer" },
    //     processBtn: { width: "100%", marginTop: 20, padding: 15, color: "#fff", border: "none", borderRadius: 12, fontWeight: "bold", cursor: "pointer", fontSize: '16px' }
    // };
    //
    // const listStyles = {
    //     pageWrapper: { width: '100%', maxWidth: '1000px', margin: '0 auto' },
    //     topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    //     searchContainer: { position: 'relative', display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '0 15px' },
    //     searchIcon: { color: '#94a3b8', marginRight: '10px' },
    //     searchInput: { border: 'none', padding: '10px', outline: 'none', width: '250px' },
    //     tableContainer: { background: '#fff', borderRadius: '15px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
    //     table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    //     th: { padding: '15px 20px', color: '#64748b', fontWeight: 'bold', fontSize: '13px', borderBottom: '2px solid #f1f5f9', textTransform: 'uppercase' },
    //     tr: { borderBottom: '1px solid #f1f5f9', transition: '0.2s' },
    //     td: { padding: '15px 20px', color: '#334155', fontSize: '14px' },
    //     actionBtn: { border: 'none', background: '#f1f5f9', padding: '8px', borderRadius: '6px', cursor: 'pointer', marginLeft: '5px' }
    // };
    //
    // export default SiteSupervisorDashboard;
    //
    // //
    // // import React, { useState, useEffect } from "react";
    // // import {
    // //     FaHardHat, FaCamera, FaClipboardCheck, FaBars, FaArrowLeft,
    // //     FaCloudUploadAlt, FaFileAlt as FaFileIcon, FaTimes, FaMapMarkerAlt,
    // //     FaSpinner, FaUsers, FaExclamationTriangle, FaSignOutAlt, FaHistory,
    // //     FaEye, FaDownload, FaSearch, FaFileInvoice, FaFileAlt
    // // } from "react-icons/fa";
    // //
    // // // --- SUB-PAGE: VIEW UPLOADED DC TABLE ---
    // // function ViewUploadedDCTable({ onBack }) {
    // //     const [files, setFiles] = useState([]);
    // //     const [loading, setLoading] = useState(true);
    // //     const [error, setError] = useState("");
    // //     const [searchTerm, setSearchTerm] = useState("");
    // //
    // //     useEffect(() => {
    // //         fetch("http://localhost:8080/api/files/all")
    // //             .then(res => {
    // //                 if (!res.ok) throw new Error("Failed to fetch files");
    // //                 return res.json();
    // //             })
    // //             .then(data => {
    // //                 setFiles(Array.isArray(data) ? data : []);
    // //                 setLoading(false);
    // //             })
    // //             .catch(err => {
    // //                 console.error(err);
    // //                 setError("Unable to retrieve site documents.");
    // //                 setLoading(false);
    // //             });
    // //     }, []);
    // //
    // //     const formatDate = (dateString) => {
    // //         if (!dateString) return "N/A";
    // //         const date = new Date(dateString);
    // //         return new Intl.DateTimeFormat('en-GB', {
    // //             day: '2-digit', month: 'short', year: 'numeric',
    // //             hour: '2-digit', minute: '2-digit'
    // //         }).format(date);
    // //     };
    // //
    // //     const handleView = (id) => {
    // //         window.open(`http://localhost:8080/api/files/download/${id}`, "_blank");
    // //     };
    // //
    // //     const handleDownload = (id, fileName) => {
    // //         const link = document.createElement("a");
    // //         link.href = `http://localhost:8080/api/files/download/${id}`;
    // //         link.download = fileName || "DC_Document";
    // //         document.body.appendChild(link);
    // //         link.click();
    // //         document.body.removeChild(link);
    // //     };
    // //
    // //     const processedFiles = files
    // //         .filter(f =>
    // //             (f.fileName && f.fileName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    // //             (f.uploadedBy && f.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()))
    // //         )
    // //         .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    // //
    // //     return (
    // //         <div style={listStyles.pageWrapper}>
    // //             <div style={listStyles.topBar}>
    // //                 <button style={styles.backButton} onClick={onBack}>
    // //                     <FaArrowLeft /> Back to Dashboard
    // //                 </button>
    // //                 <div style={listStyles.searchContainer}>
    // //                     <FaSearch style={listStyles.searchIcon} />
    // //                     <input
    // //                         type="text"
    // //                         placeholder="Search by filename or user..."
    // //                         style={listStyles.searchInput}
    // //                         onChange={(e) => setSearchTerm(e.target.value)}
    // //                     />
    // //                 </div>
    // //             </div>
    // //
    // //             <div style={uploadStyles.headerSection}>
    // //                 <h2 style={uploadStyles.title}>
    // //                     <FaFileInvoice style={{ color: "#ea580c", marginRight: 12 }} />
    // //                     Site Delivery Challans
    // //                 </h2>
    // //                 <p style={uploadStyles.subtitle}>Latest uploads from all supervisors</p>
    // //             </div>
    // //
    // //             {loading ? (
    // //                 <div style={{ textAlign: 'center', padding: '50px' }}>
    // //                     <FaSpinner className="spin" style={{ fontSize: 30, color: '#ea580c' }} />
    // //                     <p>Loading files...</p>
    // //                 </div>
    // //             ) : error ? (
    // //                 <div style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px' }}>{error}</div>
    // //             ) : (
    // //                 <div style={listStyles.tableContainer}>
    // //                     <table style={listStyles.table}>
    // //                         <thead>
    // //                         <tr style={{ background: '#f8fafc' }}>
    // //                             <th style={listStyles.th}>File Name</th>
    // //                             <th style={listStyles.th}>Uploaded By</th>
    // //                             <th style={listStyles.th}>Date & Time</th>
    // //                             <th style={listStyles.th}>Actions</th>
    // //                         </tr>
    // //                         </thead>
    // //                         <tbody>
    // //                         {processedFiles.map((file) => (
    // //                             <tr key={file.id} style={listStyles.tr}>
    // //                                 <td style={listStyles.td}><FaFileAlt color="#94a3b8" /> {file.fileName}</td>
    // //                                 <td style={listStyles.td}>{file.uploadedBy || file.eCode || 'System'}</td>
    // //                                 <td style={listStyles.td}>{formatDate(file.uploadedAt)}</td>
    // //                                 <td style={listStyles.td}>
    // //                                     <button onClick={() => handleView(file.id)} style={listStyles.actionBtn} title="View"><FaEye color="#64748b" /></button>
    // //                                     <button onClick={() => handleDownload(file.id, file.fileName)} style={listStyles.actionBtn} title="Download"><FaDownload color="#ea580c" /></button>
    // //                                 </td>
    // //                             </tr>
    // //                         ))}
    // //                         </tbody>
    // //                     </table>
    // //                 </div>
    // //             )}
    // //         </div>
    // //     );
    // // }
    // //
    // // // --- MAIN COMPONENT ---
    // // function SiteSupervisorDashboard() {
    // //     const [activePage, setActivePage] = useState("dashboard");
    // //     const [uploadedFile, setUploadedFile] = useState(null);
    // //     const [isDragging, setIsDragging] = useState(false);
    // //     const [isUploading, setIsUploading] = useState(false);
    // //     const [message, setMessage] = useState("");
    // //
    // //     const handleFileUpload = async () => {
    // //         if (!uploadedFile) return;
    // //         const user = JSON.parse(localStorage.getItem("user"));
    // //         const eCode = user?.eCode;
    // //
    // //         if (!eCode) {
    // //             setMessage("❌ Supervisor not identified.");
    // //             return;
    // //         }
    // //
    // //         const formData = new FormData();
    // //         formData.append("file", uploadedFile);
    // //         formData.append("eCode", eCode);
    // //         formData.append("department", "site");
    // //         formData.append("type", "DC");
    // //
    // //         setIsUploading(true);
    // //         setMessage("");
    // //
    // //         try {
    // //             const response = await fetch("http://localhost:8080/api/files/upload", {
    // //                 method: "POST",
    // //                 body: formData,
    // //             });
    // //             const text = await response.text();
    // //             if (response.ok) {
    // //                 setMessage("✅ DC Uploaded Successfully!");
    // //                 setUploadedFile(null);
    // //             } else {
    // //                 setMessage(`❌ Error ${response.status}: ${text || "Bad Request"}`);
    // //             }
    // //         } catch (error) {
    // //             console.error(error);
    // //             setMessage("❌ Network error. Check connectivity.");
    // //         } finally {
    // //             setIsUploading(false);
    // //         }
    // //     };
    // //
    // //     const renderUploadView = () => (
    // //         <div style={uploadStyles.container}>
    // //             <button onClick={() => { setActivePage("dashboard"); setMessage(""); }} style={styles.backButton}>
    // //                 <FaArrowLeft /> Back to Dashboard
    // //             </button>
    // //             <div style={uploadStyles.headerSection}>
    // //                 <h2 style={uploadStyles.title}>Upload DC</h2>
    // //                 <p style={uploadStyles.subtitle}>Upload Delivery Challans to central records</p>
    // //             </div>
    // //             {message && (
    // //                 <div style={{ padding: '15px', borderRadius: '8px', backgroundColor: message.includes('✅') ? '#dcfce7' : '#fee2e2', color: message.includes('✅') ? '#166534' : '#991b1b', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
    // //                     {message}
    // //                 </div>
    // //             )}
    // //             <div
    // //                 style={{ ...uploadStyles.dropZone, borderColor: isDragging ? "#ea580c" : "#cbd5e1", backgroundColor: isDragging ? "#fff7ed" : "#ffffff" }}
    // //                 onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
    // //                 onDragLeave={() => setIsDragging(false)}
    // //                 onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) setUploadedFile(e.dataTransfer.files[0]); }}
    // //             >
    // //                 <div style={uploadStyles.innerZone}>
    // //                     <FaCloudUploadAlt style={{ ...uploadStyles.icon, color: "#ea580c" }} />
    // //                     <p style={uploadStyles.dropText}><strong>Drop DC file here</strong> or click to select</p>
    // //                     <input type="file" onChange={(e) => setUploadedFile(e.target.files[0])} style={uploadStyles.hiddenInput} id="siteUpload" accept="image/*,application/pdf" />
    // //                     <label htmlFor="siteUpload" style={uploadStyles.selectButton}>Browse Files</label>
    // //                 </div>
    // //             </div>
    // //             {uploadedFile && (
    // //                 <div style={uploadStyles.fileCard}>
    // //                     <div style={uploadStyles.fileInfo}>
    // //                         <div style={{ ...uploadStyles.fileIconBg, background: '#fff7ed' }}><FaFileIcon style={{ color: "#ea580c" }} /></div>
    // //                         <div><p style={uploadStyles.fileName}>{uploadedFile.name}</p><p style={uploadStyles.fileSize}>{(uploadedFile.size / 1024).toFixed(2)} KB</p></div>
    // //                     </div>
    // //                     <FaTimes style={uploadStyles.removeIcon} onClick={() => setUploadedFile(null)} />
    // //                 </div>
    // //             )}
    // //             {uploadedFile && (
    // //                 <button style={{ ...uploadStyles.processBtn, background: "#ea580c", opacity: isUploading ? 0.7 : 1, cursor: isUploading ? "not-allowed" : "pointer" }} onClick={handleFileUpload} disabled={isUploading}>
    // //                     {isUploading ? <FaSpinner className="spin" /> : "Start Upload"}
    // //                 </button>
    // //             )}
    // //         </div>
    // //     );
    // //
    // //     return (
    // //         <div style={styles.container}>
    // //             <aside style={{ ...styles.sidebar, background: "#1c1917" }}>
    // //                 <h2 style={{ ...styles.logo, color: "#fb923c" }}><FaHardHat /> SiteSuper</h2>
    // //                 <button style={styles.navItem} onClick={() => setActivePage("dashboard")}><FaBars style={{ marginRight: 10 }} /> Unit Overview</button>
    // //                 <button style={styles.navItem} onClick={() => setActivePage("viewLogs")}><FaHistory style={{ marginRight: 10 }} /> Uploaded DC</button>
    // //                 <div style={styles.siteInfoBox}>
    // //                     <p style={{ fontSize: '11px', color: '#a8a29e', margin: '0 0 5px 0', textTransform: 'uppercase' }}>Active Location</p>
    // //                     <p style={{ fontSize: '14px', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6 }}><FaMapMarkerAlt size={12} color="#fb923c" /> Sector 7 - Block B</p>
    // //                 </div>
    // //                 <button style={styles.logout}><FaSignOutAlt style={{ marginRight: 8 }} /> Sign Out</button>
    // //             </aside>
    // //
    // //             <div style={styles.mainWrapper}>
    // //                 <header style={styles.header}><FaBars color="#64748b" /><span style={{ marginLeft: 12 }}>Supervisor Execution Portal</span></header>
    // //                 <main style={styles.main}>
    // //                     {activePage === "dashboard" && (
    // //                         <>
    // //                             <div style={styles.alertBanner}><FaExclamationTriangle /> <span><strong>Safety Notice:</strong> Ensure all personnel are wearing Level 2 PPE today.</span></div>
    // //                             <div style={styles.grid}>
    // //                                 <div style={{ ...styles.card, borderTop: "4px solid #ea580c" }} onClick={() => setActivePage("upload")}>
    // //                                     <FaCamera style={{ color: "#ea580c", fontSize: 24 }} />
    // //                                     <h3 style={styles.cardTitle}>Upload DC</h3>
    // //                                     <p style={styles.cardValue}>New File</p>
    // //                                 </div>
    // //                                 <div style={{ ...styles.card, borderTop: "4px solid #0891b2" }} onClick={() => setActivePage("viewLogs")}>
    // //                                     <FaClipboardCheck style={{ color: "#0891b2", fontSize: 24 }} />
    // //                                     <h3 style={styles.cardTitle}>Uploaded DC</h3>
    // //                                     <p style={styles.cardValue}>View All</p>
    // //                                 </div>
    // //                                 <div style={{ ...styles.card, borderTop: "4px solid #16a34a" }}>
    // //                                     <FaUsers style={{ color: "#16a34a", fontSize: 24 }} />
    // //                                     <h3 style={styles.cardTitle}>Workforce</h3>
    // //                                     <p style={styles.cardValue}>24 Present</p>
    // //                                 </div>
    // //                             </div>
    // //                         </>
    // //                     )}
    // //                     {activePage === "upload" && renderUploadView()}
    // //                     {activePage === "viewLogs" && <ViewUploadedDCTable onBack={() => setActivePage("dashboard")} />}
    // //                 </main>
    // //             </div>
    // //             <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    // //         </div>
    // //     );
    // // }
    // //
    // // // --- CONSOLIDATED STYLES ---
    // // const styles = {
    // //     container: { display: "flex", height: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif" },
    // //     sidebar: { width: 260, color: "#fff", padding: 25, display: "flex", flexDirection: "column" },
    // //     logo: { fontSize: 22, fontWeight: "bold", marginBottom: 40, display: 'flex', alignItems: 'center', gap: 10 },
    // //     navItem: { display: 'flex', alignItems: 'center', padding: "12px", textAlign: "left", background: "none", border: "none", color: "#e7e5e4", cursor: "pointer", borderRadius: 8, marginBottom: 10, fontSize: 15 },
    // //     siteInfoBox: { marginTop: 'auto', padding: '15px', background: '#292524', borderRadius: '12px', marginBottom: '15px' },
    // //     logout: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, background: "#ef4444", border: "none", color: "#fff", borderRadius: 8, cursor: "pointer", fontWeight: 'bold' },
    // //     mainWrapper: { flex: 1, display: "flex", flexDirection: "column" },
    // //     header: { height: 60, background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", padding: "0 20px", fontWeight: "bold", color: "#334155" },
    // //     main: { padding: 30, overflowY: "auto" },
    // //     grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 25 },
    // //     card: { background: "#fff", padding: 25, borderRadius: 15, boxShadow: "0 4px 6px rgba(0,0,0,0.05)", cursor: "pointer", transition: "0.2s" },
    // //     cardTitle: { fontSize: 14, color: "#64748b", margin: "15px 0 5px" },
    // //     cardValue: { fontSize: 22, fontWeight: "bold", margin: 0, color: '#1e293b' },
    // //     backButton: { display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#334155", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", marginBottom: 25 },
    // //     alertBanner: { background: '#fff7ed', border: '1px solid #ffedd5', color: '#9a3412', padding: '15px', borderRadius: '12px', marginBottom: '25px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: 10 }
    // // };
    // //
    // // const uploadStyles = {
    // //     container: { maxWidth: "900px", margin: "0 auto" },
    // //     headerSection: { textAlign: "center", marginBottom: 30 },
    // //     title: { fontSize: 26, color: "#1e293b", marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    // //     subtitle: { color: "#64748b" },
    // //     dropZone: { border: "2px dashed #cbd5e1", borderRadius: 20, padding: "50px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.3s" },
    // //     innerZone: { display: "flex", flexDirection: "column", alignItems: "center" },
    // //     icon: { fontSize: 50, marginBottom: 15 },
    // //     dropText: { fontSize: 18, color: "#334155" },
    // //     hiddenInput: { display: "none" },
    // //     selectButton: { padding: "10px 20px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontWeight: "bold", marginTop: 10, color: '#334155' },
    // //     fileCard: { marginTop: 20, padding: 15, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #e2e8f0" },
    // //     fileInfo: { display: "flex", alignItems: "center", gap: 15 },
    // //     fileIconBg: { width: 40, height: 40, borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center" },
    // //     fileName: { margin: 0, fontWeight: "bold", fontSize: 14, color: '#1e293b' },
    // //     fileSize: { margin: 0, fontSize: 12, color: "#64748b" },
    // //     removeIcon: { color: "#94a3b8", cursor: "pointer" },
    // //     processBtn: { width: "100%", marginTop: 20, padding: 15, color: "#fff", border: "none", borderRadius: 12, fontWeight: "bold", cursor: "pointer", fontSize: '16px' }
    // // };
    // //
    // // const listStyles = {
    // //     pageWrapper: { width: '100%', maxWidth: '1000px', margin: '0 auto' },
    // //     topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    // //     searchContainer: { position: 'relative', display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '0 15px' },
    // //     searchIcon: { color: '#94a3b8', marginRight: '10px' },
    // //     searchInput: { border: 'none', padding: '10px', outline: 'none', width: '250px' },
    // //     tableContainer: { background: '#fff', borderRadius: '15px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
    // //     table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    // //     th: { padding: '15px 20px', color: '#64748b', fontWeight: 'bold', fontSize: '13px', borderBottom: '2px solid #f1f5f9', textTransform: 'uppercase' },
    // //     tr: { borderBottom: '1px solid #f1f5f9', transition: '0.2s' },
    // //     td: { padding: '15px 20px', color: '#334155', fontSize: '14px' },
    // //     actionBtn: { border: 'none', background: '#f1f5f9', padding: '8px', borderRadius: '6px', cursor: 'pointer', marginLeft: '5px' }
    // // };
    // //
    // // export default SiteSupervisorDashboard;
    
    import React, { useState, useEffect } from "react";
    import {
        FaHardHat, FaCamera, FaClipboardCheck, FaBars, FaArrowLeft,
        FaCloudUploadAlt, FaFileAlt as FaFileIcon, FaTimes, FaMapMarkerAlt,
        FaSpinner, FaUsers, FaExclamationTriangle, FaSignOutAlt, FaHistory,
        FaEye, FaDownload, FaSearch, FaFileInvoice, FaFileAlt
    } from "react-icons/fa";
    
    // --- SUB-PAGE: VIEW UPLOADED DC TABLE ---
    function ViewUploadedDCTable({ onBack }) {
        const [files, setFiles] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");
        const [searchTerm, setSearchTerm] = useState("");
    
        useEffect(() => {
            fetch("http://localhost:8080/api/files/all")
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch files");
                    return res.json();
                })
                .then(data => {
                    setFiles(Array.isArray(data) ? data : []);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError("Unable to retrieve site documents.");
                    setLoading(false);
                });
        }, []);
    
        const formatDate = (dateString) => {
            if (!dateString) return "N/A";
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-GB', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }).format(date);
        };
    
        const handleView = (id) => {
            window.open(`http://localhost:8080/api/files/download/${id}`, "_blank");
        };
    
        const handleDownload = (id, fileName) => {
            const link = document.createElement("a");
            link.href = `http://localhost:8080/api/files/download/${id}`;
            link.download = fileName || "DC_Document";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    
        const processedFiles = files
            .filter(f =>
                (f.fileName && f.fileName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (f.uploadedBy && f.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    
        return (
            <div style={listStyles.pageWrapper}>
                <div style={listStyles.topBar}>
                    <button style={styles.backButton} onClick={onBack}>
                        <FaArrowLeft /> Back to Dashboard
                    </button>
                    <div style={listStyles.searchContainer}>
                        <FaSearch style={listStyles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by filename or user..."
                            style={listStyles.searchInput}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
    
                <div style={uploadStyles.headerSection}>
                    <h2 style={uploadStyles.title}>
                        <FaFileInvoice style={{ color: "#ea580c", marginRight: 12 }} />
                        Site Delivery Challans
                    </h2>
                    <p style={uploadStyles.subtitle}>Latest uploads from all supervisors</p>
                </div>
    
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <FaSpinner className="spin" style={{ fontSize: 30, color: '#ea580c' }} />
                        <p>Loading files...</p>
                    </div>
                ) : error ? (
                    <div style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px' }}>{error}</div>
                ) : (
                    <div style={listStyles.tableContainer}>
                        <table style={listStyles.table}>
                            <thead>
                            <tr style={{ background: '#f8fafc' }}>
                                <th style={listStyles.th}>File Name</th>
                                <th style={listStyles.th}>Uploaded By</th>
                                <th style={listStyles.th}>Date & Time</th>
                                <th style={listStyles.th}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {processedFiles.map((file) => (
                                <tr key={file.id} style={listStyles.tr}>
                                    <td style={listStyles.td}><FaFileAlt color="#94a3b8" /> {file.fileName}</td>
                                    <td style={listStyles.td}>{file.uploadedBy || file.eCode || 'System'}</td>
                                    <td style={listStyles.td}>{formatDate(file.uploadedAt)}</td>
                                    <td style={listStyles.td}>
                                        <button onClick={() => handleView(file.id)} style={listStyles.actionBtn} title="View"><FaEye color="#64748b" /></button>
                                        <button onClick={() => handleDownload(file.id, file.fileName)} style={listStyles.actionBtn} title="Download"><FaDownload color="#ea580c" /></button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
    
    // --- MAIN COMPONENT ---
    function SiteSupervisorDashboard() {
        const [activePage, setActivePage] = useState("dashboard");
        const [uploadedFile, setUploadedFile] = useState(null);
        const [isDragging, setIsDragging] = useState(false);
        const [isUploading, setIsUploading] = useState(false);
        const [message, setMessage] = useState("");
    
        const handleFileUpload = async () => {
            if (!uploadedFile) return;
            const user = JSON.parse(localStorage.getItem("user"));
            const eCode = user?.eCode;
    
            if (!eCode) {
                setMessage("❌ Supervisor not identified.");
                return;
            }
    
            const formData = new FormData();
            formData.append("file", uploadedFile);
            formData.append("eCode", eCode);
            formData.append("department", "site");
            formData.append("type", "DC");
    
            setIsUploading(true);
            setMessage("");
    
            try {
                const response = await fetch("http://localhost:8080/api/files/upload", {
                    method: "POST",
                    body: formData,
                });
                const text = await response.text();
                if (response.ok) {
                    setMessage("✅ DC Uploaded Successfully!");
                    setUploadedFile(null);
                } else {
                    setMessage(`❌ Error ${response.status}: ${text || "Bad Request"}`);
                }
            } catch (error) {
                console.error(error);
                setMessage("❌ Network error. Check connectivity.");
            } finally {
                setIsUploading(false);
            }
        };
    
        const renderUploadView = () => (
            <div style={uploadStyles.container}>
                <button onClick={() => { setActivePage("dashboard"); setMessage(""); }} style={styles.backButton}>
                    <FaArrowLeft /> Back to Dashboard
                </button>
                <div style={uploadStyles.headerSection}>
                    <h2 style={uploadStyles.title}>Upload DC</h2>
                    <p style={uploadStyles.subtitle}>Upload Delivery Challans to central records</p>
                </div>
                {message && (
                    <div style={{ padding: '15px', borderRadius: '8px', backgroundColor: message.includes('✅') ? '#dcfce7' : '#fee2e2', color: message.includes('✅') ? '#166534' : '#991b1b', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                        {message}
                    </div>
                )}
                <div
                    style={{ ...uploadStyles.dropZone, borderColor: isDragging ? "#ea580c" : "#cbd5e1", backgroundColor: isDragging ? "#fff7ed" : "#ffffff" }}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) setUploadedFile(e.dataTransfer.files[0]); }}
                >
                    <div style={uploadStyles.innerZone}>
                        <FaCloudUploadAlt style={{ ...uploadStyles.icon, color: "#ea580c" }} />
                        <p style={uploadStyles.dropText}><strong>Drop DC file here</strong> or click to select</p>
                        <input type="file" onChange={(e) => setUploadedFile(e.target.files[0])} style={uploadStyles.hiddenInput} id="siteUpload" accept="image/*,application/pdf" />
                        <label htmlFor="siteUpload" style={uploadStyles.selectButton}>Browse Files</label>
                    </div>
                </div>
                {uploadedFile && (
                    <div style={uploadStyles.fileCard}>
                        <div style={uploadStyles.fileInfo}>
                            <div style={{ ...uploadStyles.fileIconBg, background: '#fff7ed' }}><FaFileIcon style={{ color: "#ea580c" }} /></div>
                            <div><p style={uploadStyles.fileName}>{uploadedFile.name}</p><p style={uploadStyles.fileSize}>{(uploadedFile.size / 1024).toFixed(2)} KB</p></div>
                        </div>
                        <FaTimes style={uploadStyles.removeIcon} onClick={() => setUploadedFile(null)} />
                    </div>
                )}
                {uploadedFile && (
                    <button style={{ ...uploadStyles.processBtn, background: "#ea580c", opacity: isUploading ? 0.7 : 1, cursor: isUploading ? "not-allowed" : "pointer" }} onClick={handleFileUpload} disabled={isUploading}>
                        {isUploading ? <FaSpinner className="spin" /> : "Start Upload"}
                    </button>
                )}
            </div>
        );
    
        return (
            <div style={styles.container}>
                <aside style={{ ...styles.sidebar, background: "#1c1917" }}>
                    <h2 style={{ ...styles.logo, color: "#fb923c" }}><FaHardHat /> SiteSuper</h2>
                    <button style={styles.navItem} onClick={() => setActivePage("dashboard")}><FaBars style={{ marginRight: 10 }} /> Unit Overview</button>
                    <button style={styles.navItem} onClick={() => setActivePage("viewLogs")}><FaHistory style={{ marginRight: 10 }} /> Uploaded DC</button>
                    <div style={styles.siteInfoBox}>
                        <p style={{ fontSize: '11px', color: '#a8a29e', margin: '0 0 5px 0', textTransform: 'uppercase' }}>Active Location</p>
                        <p style={{ fontSize: '14px', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6 }}><FaMapMarkerAlt size={12} color="#fb923c" /> Sector 7 - Block B</p>
                    </div>
                    <button style={styles.logout}><FaSignOutAlt style={{ marginRight: 8 }} /> Sign Out</button>
                </aside>
    
                <div style={styles.mainWrapper}>
                    <header style={styles.header}><FaBars color="#64748b" /><span style={{ marginLeft: 12 }}>Supervisor Execution Portal</span></header>
                    <main style={styles.main}>
                        {activePage === "dashboard" && (
                            <>
                                <div style={styles.alertBanner}><FaExclamationTriangle /> <span><strong>Safety Notice:</strong> Ensure all personnel are wearing Level 2 PPE today.</span></div>
                                <div style={styles.grid}>
                                    <div style={{ ...styles.card, borderTop: "4px solid #ea580c" }} onClick={() => setActivePage("upload")}>
                                        <FaCamera style={{ color: "#ea580c", fontSize: 24 }} />
                                        <h3 style={styles.cardTitle}>Upload DC</h3>
                                        <p style={styles.cardValue}>New File</p>
                                    </div>
                                    <div style={{ ...styles.card, borderTop: "4px solid #0891b2" }} onClick={() => setActivePage("viewLogs")}>
                                        <FaClipboardCheck style={{ color: "#0891b2", fontSize: 24 }} />
                                        <h3 style={styles.cardTitle}>Uploaded DC</h3>
                                        <p style={styles.cardValue}>View All</p>
                                    </div>
                                    <div style={{ ...styles.card, borderTop: "4px solid #16a34a" }}>
                                        <FaUsers style={{ color: "#16a34a", fontSize: 24 }} />
                                        <h3 style={styles.cardTitle}>Workforce</h3>
                                        <p style={styles.cardValue}>24 Present</p>
                                    </div>
                                </div>
                            </>
                        )}
                        {activePage === "upload" && renderUploadView()}
                        {activePage === "viewLogs" && <ViewUploadedDCTable onBack={() => setActivePage("dashboard")} />}
                    </main>
                </div>
                <style>{`
                    * { box-sizing: border-box; }
                    .spin { animation: spin 1s linear infinite; } 
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    .dashboard-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
                `}</style>
            </div>
        );
    }
    
    // --- CONSOLIDATED STYLES ---
    const styles = {
        container: { display: "flex", height: "100vh", width: "100vw", backgroundColor: "#f8fafc", fontFamily: "sans-serif", overflow: "hidden" },
        sidebar: { width: 260, minWidth: 260, color: "#fff", padding: 25, display: "flex", flexDirection: "column" },
        logo: { fontSize: 22, fontWeight: "bold", marginBottom: 40, display: 'flex', alignItems: 'center', gap: 10 },
        navItem: { display: 'flex', alignItems: 'center', padding: "12px", textAlign: "left", background: "none", border: "none", color: "#e7e5e4", cursor: "pointer", borderRadius: 8, marginBottom: 10, fontSize: 15 },
        siteInfoBox: { marginTop: 'auto', padding: '15px', background: '#292524', borderRadius: '12px', marginBottom: '15px' },
        logout: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, background: "#ef4444", border: "none", color: "#fff", borderRadius: 8, cursor: "pointer", fontWeight: 'bold' },
        mainWrapper: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
        header: { height: 60, minHeight: 60, background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", padding: "0 20px", fontWeight: "bold", color: "#334155" },
        main: { padding: "30px", overflowY: "auto", flex: 1 },
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
        alertBanner: { background: '#fff7ed', border: '1px solid #ffedd5', color: '#9a3412', padding: '15px', borderRadius: '12px', marginBottom: '25px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: 10 }
    };
    
    const uploadStyles = {
        container: { maxWidth: "100%", margin: "0 auto" },
        headerSection: { textAlign: "center", marginBottom: 30 },
        title: { fontSize: 26, color: "#1e293b", marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' },
        subtitle: { color: "#64748b" },
        dropZone: { border: "2px dashed #cbd5e1", borderRadius: 20, padding: "60px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.3s" },
        innerZone: { display: "flex", flexDirection: "column", alignItems: "center" },
        icon: { fontSize: 50, marginBottom: 15 },
        dropText: { fontSize: 18, color: "#334155" },
        hiddenInput: { display: "none" },
        selectButton: { padding: "10px 20px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontWeight: "bold", marginTop: 10, color: '#334155' },
        fileCard: { marginTop: 20, padding: 15, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #e2e8f0" },
        fileInfo: { display: "flex", alignItems: "center", gap: 15 },
        fileIconBg: { width: 40, height: 40, borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center" },
        fileName: { margin: 0, fontWeight: "bold", fontSize: 14, color: '#1e293b' },
        fileSize: { margin: 0, fontSize: 12, color: "#64748b" },
        removeIcon: { color: "#94a3b8", cursor: "pointer" },
        processBtn: { width: "100%", marginTop: 20, padding: 15, color: "#fff", border: "none", borderRadius: 12, fontWeight: "bold", cursor: "pointer", fontSize: '16px' }
    };
    
    const listStyles = {
        pageWrapper: { width: '100%', margin: '0 auto' },
        topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' },
        searchContainer: { position: 'relative', display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '0 15px', flex: 1, maxWidth: '400px' },
        searchIcon: { color: '#94a3b8', marginRight: '10px' },
        searchInput: { border: 'none', padding: '10px', outline: 'none', width: '100%' },
        tableContainer: { background: '#fff', borderRadius: '15px', overflowX: "auto", border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
        table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' },
        th: { padding: '15px 20px', color: '#64748b', fontWeight: 'bold', fontSize: '13px', borderBottom: '2px solid #f1f5f9', textTransform: 'uppercase' },
        tr: { borderBottom: '1px solid #f1f5f9', transition: '0.2s' },
        td: { padding: '15px 20px', color: '#334155', fontSize: '14px' },
        actionBtn: { border: 'none', background: '#f1f5f9', padding: '8px', borderRadius: '6px', cursor: 'pointer', marginLeft: '5px' }
    };
    
    export default SiteSupervisorDashboard;