import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FaTruck, FaPlusCircle, FaHistory, FaWallet,
    FaTimes, FaChevronRight, FaRegCalendarAlt,
    FaFileDownload, FaFilter
} from "react-icons/fa";

export default function DriverExpensePage() {
    const user = JSON.parse(localStorage.getItem("user"));
    const eCode = user?.eCode;

    // --- State Management ---
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [expenseHistory, setExpenseHistory] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    // --- Filters & Form ---
    const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
    const [filterYear, setFilterYear] = useState(new Date().getFullYear());
    const [formData, setFormData] = useState({
        type: "FUEL",
        amount: "",
        description: "",
        date: new Date().toISOString().split('T')[0]
    });

    // --- Data Fetching ---
    useEffect(() => {
        if (!eCode) return;
        const loadVehicles = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/trips/driver/${eCode}/unique-vehicles`);
                setVehicles(res.data || []);
            } catch (err) { console.error("Fleet Load Error", err); }
            finally { setLoading(false); }
        };
        loadVehicles();
    }, [eCode]);

    const handleOpenHistory = async (v) => {
        const vNum = typeof v === "string" ? v : v.vehicleNumber;
        setSelectedVehicle(vNum);
        setShowHistoryModal(true);
        try {
            const res = await axios.get(`http://localhost:8080/api/expenses/view/${vNum}`, {
                params: { eCode: eCode }
            });
            setExpenseHistory(res.data || []);
        } catch (err) { setExpenseHistory([]); }
    };

    const handleSubmitExpense = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const vNum = typeof selectedVehicle === "string" ? selectedVehicle : selectedVehicle.vehicleNumber;
        try {
            await axios.post(`http://localhost:8080/api/expenses/add`, {
                ...formData,
                vehicleNumber: vNum,
                driverECode: eCode,
                amount: parseFloat(formData.amount)
            });
            alert("Expense Saved!");
            setShowAddModal(false);
            setFormData({ ...formData, amount: "", description: "" });
        } catch (err) { alert("Save failed"); }
        finally { setSubmitting(false); }
    };

    // --- CSV & Calculation Logic ---
    const filteredHistory = expenseHistory.filter(h => {
        const d = new Date(h.date);
        return (d.getMonth() + 1) === parseInt(filterMonth) && d.getFullYear() === parseInt(filterYear);
    });

    const totalAmount = filteredHistory.reduce((sum, item) => sum + item.amount, 0);

    const downloadCSV = () => {
        const headers = "Date,Category,Description,Amount\n";
        const rows = filteredHistory.map(h => `${h.date},${h.type},"${h.description || ''}",${h.amount}`).join("\n");
        const blob = new Blob([headers + rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Expense_Report_${selectedVehicle}.csv`;
        link.click();
    };

    return (
        <div className="dash-fit-wrapper">
            {/* STICKY HEADER */}
            <header className="dash-fit-header">
                <div className="header-left">
                    <div className="icon-badge"><FaWallet /></div>
                    <div>
                        <h1>Vehicle Expenses</h1>
                        <p>Managing records for Driver: <b>{eCode}</b></p>
                    </div>
                </div>
                <div className="header-right">
                    <div className="count-pill">Units: {vehicles.length}</div>
                </div>
            </header>

            {/* FLUID SCROLL AREA */}
            <main className="dash-fit-scroll">
                {loading ? <div className="loading-state">Initialising Fleet View...</div> : (
                    <div className="list-container">
                        {vehicles.map((v, i) => {
                            const vNum = typeof v === "string" ? v : v.vehicleNumber;
                            return (
                                <div key={i} className="horizontal-row">
                                    <div className="v-info">
                                        <div className="v-icon"><FaTruck /></div>
                                        <div className="v-details">
                                            <span className="v-tag">Commercial Fleet</span>
                                            <h3 className="v-num">{vNum}</h3>
                                        </div>
                                    </div>
                                    <div className="v-meta">
                                        <div className="status-dot"></div>
                                        <span>Active Status</span>
                                    </div>
                                    <div className="v-btns">
                                        <button className="btn-hist" onClick={() => handleOpenHistory(vNum)}>
                                            <FaHistory /> History
                                        </button>
                                        <button className="btn-add" onClick={() => { setSelectedVehicle(vNum); setShowAddModal(true); }}>
                                            <FaPlusCircle /> Add Expense <FaChevronRight size={10} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* VIEW HISTORY MODAL */}
            {showHistoryModal && (
                <div className="modal-overlay">
                    <div className="modal-card wide">
                        <div className="modal-header">
                            <h3>Vehicle Logs: {selectedVehicle}</h3>
                            <FaTimes className="close-x" onClick={() => setShowHistoryModal(false)} />
                        </div>
                        <div className="filter-summary-row">
                            <div className="filter-group">
                                <FaFilter size={12} color="#94a3b8" />
                                <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)}>
                                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m,i) => (
                                        <option key={i} value={i+1}>{m}</option>
                                    ))}
                                </select>
                                <select value={filterYear} onChange={e => setFilterYear(e.target.value)}>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                                <button className="btn-csv-export" onClick={downloadCSV}><FaFileDownload /> CSV</button>
                            </div>
                            <div className="total-group">
                                <label>MONTHLY TOTAL</label>
                                <h2>₹{totalAmount.toLocaleString('en-IN')}</h2>
                            </div>
                        </div>
                        <div className="table-wrapper">
                            <table className="record-table">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th style={{textAlign:'right'}}>Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredHistory.length > 0 ? filteredHistory.map((h, i) => (
                                    <tr key={i}>
                                        <td>{h.date}</td>
                                        <td><span className={`cat-tag ${h.type}`}>{h.type}</span></td>
                                        <td className="desc-text">{h.description || "-"}</td>
                                        <td className="amt-text">₹{h.amount}</td>
                                    </tr>
                                )) : <tr><td colSpan="4" className="empty-row">No records found for this period.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ADD EXPENSE MODAL */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-card small">
                        <div className="modal-header">
                            <h3>Log Cost: {selectedVehicle}</h3>
                            <FaTimes className="close-x" onClick={() => setShowAddModal(false)} />
                        </div>
                        <form className="expense-form" onSubmit={handleSubmitExpense}>
                            <div className="form-item">
                                <label>Category</label>
                                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                    <option value="FUEL">Fuel</option>
                                    <option value="TOLL">Toll</option>
                                    <option value="MAINTENANCE">Maintenance</option>
                                    <option value="FOOD">Food</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                            <div className="form-item">
                                <label>Amount (₹)</label>
                                <input type="number" step="0.01" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                            </div>
                            <div className="form-item">
                                <label>Date</label>
                                <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                            </div>
                            <div className="form-item">
                                <label>Remarks</label>
                                <textarea placeholder="Add any details..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                            </div>
                            <button type="submit" className="confirm-btn" disabled={submitting}>
                                {submitting ? "Saving..." : "Confirm & Save"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                /* DASHBOARD FIT CSS */
                .dash-fit-wrapper {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    background: #f8fafc;
                    box-sizing: border-box;
                    padding: 10px;
                    overflow: hidden; /* Prevents outer scroll */
                }

                .dash-fit-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #e2e8f0;
                    flex-shrink: 0;
                }
                .header-left { display: flex; align-items: center; gap: 15px; }
                .icon-badge { background: #6366f1; color: white; padding: 12px; border-radius: 12px; font-size: 1.2rem; display: flex; }
                .header-left h1 { margin: 0; font-size: 1.4rem; color: #1e293b; letter-spacing: -0.5px; }
                .header-left p { margin: 0; font-size: 0.85rem; color: #64748b; }
                .count-pill { background: #eef2ff; color: #6366f1; padding: 6px 15px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; }

                /* SCROLL AREA */
                .dash-fit-scroll {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px 5px 20px 0;
                }
                .list-container { display: flex; flex-direction: column; gap: 12px; }

                /* HORIZONTAL ROWS */
                .horizontal-row {
                    background: white;
                    border: 1px solid #e2e8f0;
                    padding: 15px 25px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: 0.2s;
                }
                .horizontal-row:hover { border-color: #6366f1; transform: translateX(5px); box-shadow: 0 4px 12px rgba(99,102,241,0.05); }

                .v-info { display: flex; align-items: center; gap: 20px; flex: 1; }
                .v-icon { background: #f1f5f9; color: #475569; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
                .v-tag { font-size: 9px; text-transform: uppercase; font-weight: 800; color: #94a3b8; letter-spacing: 0.5px; }
                .v-num { margin: 0; font-size: 1.15rem; color: #1e293b; }

                .v-meta { display: flex; align-items: center; gap: 10px; flex: 1; color: #10b981; font-weight: 700; font-size: 0.85rem; }
                .status-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; }

                .v-btns { display: flex; gap: 12px; }
                .btn-add { background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 0.85rem; }
                .btn-hist { background: white; color: #475569; border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 0.85rem; }

                /* MODALS */
                .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.7); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 9999; }
                .modal-card { background: white; border-radius: 20px; padding: 30px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
                .modal-card.small { width: 400px; }
                .modal-card.wide { width: 850px; }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .close-x { cursor: pointer; color: #94a3b8; transition: 0.2s; }
                .close-x:hover { color: #ef4444; }

                /* FILTER BAR */
                .filter-summary-row { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .filter-group { display: flex; align-items: center; gap: 10px; }
                .filter-group select { padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 600; font-size: 0.8rem; }
                .btn-csv-export { background: #10b981; color: white; border: none; padding: 8px 15px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
                .total-group { text-align: right; }
                .total-group label { font-size: 9px; font-weight: 800; color: #94a3b8; }
                .total-group h2 { margin: 0; color: #6366f1; font-size: 1.6rem; letter-spacing: -1px; }

                /* TABLE Styles */
                .table-wrapper { max-height: 380px; overflow-y: auto; }
                .record-table { width: 100%; border-collapse: collapse; }
                .record-table th { text-align: left; padding: 12px; background: #f1f5f9; font-size: 0.75rem; color: #64748b; position: sticky; top: 0; }
                .record-table td { padding: 15px 12px; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }
                .cat-tag { padding: 4px 8px; border-radius: 5px; font-size: 0.7rem; font-weight: 800; }
                .FUEL { background: #fef3c7; color: #92400e; }
                .TOLL { background: #dcfce7; color: #166534; }
                .amt-text { text-align: right; font-weight: 800; color: #1e293b; }
                .desc-text { color: #64748b; font-size: 0.8rem; }

                /* FORM Styles */
                .form-item { margin-bottom: 15px; }
                .form-item label { display: block; margin-bottom: 6px; font-size: 0.8rem; font-weight: 700; color: #475569; }
                .form-item input, .form-item select, .form-item textarea { width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px; box-sizing: border-box; font-family: inherit; }
                .confirm-btn { width: 100%; background: #6366f1; color: white; padding: 15px; border: none; border-radius: 10px; font-weight: 800; cursor: pointer; margin-top: 10px; }
            `}</style>
        </div>
    );
}