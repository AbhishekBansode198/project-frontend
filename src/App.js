// import { BrowserRouter, Routes, Route } from "react-router-dom";
//
// import LoginPage from "./pages/LoginPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import VPDashboard from "./pages/VPDashboard";
// import DriverDashboard from "./pages/DriverDashboard";
//
// // Dispatch
// import DispatchHome from "./Module/Dispatch/Pages/DispatchHome";
// import DispatchDashboard from "./Module/Dispatch/Pages/DispatchDashboard";
// import AddRoute from "./Module/Dispatch/Pages/AddRoute";
// import ViewRoutes from "./Module/Dispatch/Pages/ViewRoutes";
// import Drivers from "./Module/Dispatch/Pages/Drivers";
// import ProductionDashboard from "./pages/ProductionDashbaord";
// import SiteSupervisorDashboard from "./pages/SiteSupervisorDashboard";
// import PurchaseDashboard from "./pages/PurchaseDashboard";
// import CoordinatorDashboard from "./pages/CoordinatorDashboad";
// import PowderCoatingDashboard from "./pages/PowderCoatingDashboard";
// import LiveTrackingPage from "./Module/Dispatch/Pages/LiveTrackingPage";
// import AddVehicleRequisition from "./Module/Requisition/Pages/AddVehicleRequisition";
// import VehicleRequisitionList from "./Module/Requisition/Pages/VehicleRequisitionList";
//
//
//
// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//
//                 {/* Public */}
//                 <Route path="/" element={<LoginPage />} />
//
//                 {/* Admin */}
//                 <Route path="/admin-dashboard" element={<AdminDashboard />} />
//
//                 {/* VP */}
//                 <Route path="/vp-dashboard" element={<VPDashboard />} />
//
//                 {/* Driver */}
//                 <Route path="/driver-dashboard" element={<DriverDashboard />} />
//
//                 {/* Dispatch Layout */}
//                 <Route path="/dispatch-dashboard" element={<DispatchHome />}>
//
//                     {/* Vehicles */}
//                     <Route path="vehicles" element={<DispatchDashboard />} />
//
//                     {/* Routes */}
//                     <Route path="routes/add" element={<AddRoute />} />
//                     <Route path="routes" element={<ViewRoutes />} />
//
//                     {/* Drivers */}
//                     <Route path="drivers" element={<Drivers />} />
//
//                 </Route>
//                 <Route path="production-dashboard" element={<ProductionDashboard />} />
//                 <Route path="purchase-dashboard" element={<PurchaseDashboard/>} />
//                 <Route path="site_supervisor-dashboard" element={<SiteSupervisorDashboard/>} />
//                 <Route path="coordinator-dashboard" element={<CoordinatorDashboard/>} />
//                 <Route path="powder_coating-dashboard" element={<PowderCoatingDashboard/>} />
//                 <Route path="/dispatch-dashboard/live-tracking" element={<LiveTrackingPage />} />
//                 <Route path="/vehicle-requisition" element={<AddVehicleRequisition />} />
//                 <Route path="/vehicle-requisition-list" element={<VehicleRequisitionList />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }
//
// export default App;



import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public
import LoginPage from "./pages/LoginPage";

// Admin & VP & Driver
import AdminDashboard from "./pages/AdminDashboard";
import VPDashboard from "./pages/VPDashboard";
import DriverDashboard from "./pages/DriverDashboard";

// Dispatch
import DispatchHome from "./Module/Dispatch/Pages/DispatchHome";
import DispatchDashboard from "./Module/Dispatch/Pages/DispatchDashboard";
import AddRoute from "./Module/Dispatch/Pages/AddRoute";
import ViewRoutes from "./Module/Dispatch/Pages/ViewRoutes";
import Drivers from "./Module/Dispatch/Pages/Drivers";


// Other Dashboards
import ProductionDashboard from "./pages/ProductionDashbaord";
import SiteSupervisorDashboard from "./pages/SiteSupervisorDashboard";
import PurchaseDashboard from "./pages/PurchaseDashboard";
import CoordinatorDashboard from "./pages/CoordinatorDashboad";
import PowderCoatingDashboard from "./pages/PowderCoatingDashboard";

// Vehicle Requisition
import AddVehicleRequisition from "./Module/Requisition/Pages/AddVehicleRequisition";
import VehicleRequisitionList from "./Module/Requisition/Pages/VehicleRequisitionList";
import LiveTrackingPage from "./Module/Dispatch/Pages/LiveTrackingPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/" element={<LoginPage />} />

                {/* Admin */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />

                {/* VP */}
                <Route path="/vp-dashboard" element={<VPDashboard />} />

                {/* Driver */}
                <Route path="/driver-dashboard" element={<DriverDashboard />} />

                {/* Dispatch Layout */}
                <Route path="/dispatch-dashboard" element={<DispatchHome />}>
                    {/* Vehicles */}
                    <Route path="vehicles" element={<DispatchDashboard />} />

                    {/* Routes */}
                    <Route path="routes/add" element={<AddRoute />} />
                    <Route path="routes" element={<ViewRoutes />} />

                    {/* Drivers */}
                    <Route path="drivers" element={<Drivers />} />

                    {/* Live Tracking */}
                    <Route path="live-tracking" element={<LiveTrackingPage />} />
                </Route>

                {/* Other Dashboards */}
                <Route path="production-dashboard" element={<ProductionDashboard />} />
                <Route path="purchase-dashboard" element={<PurchaseDashboard />} />
                <Route path="site_supervisor-dashboard" element={<SiteSupervisorDashboard />} />
                <Route path="coordinator-dashboard" element={<CoordinatorDashboard />} />
                <Route path="powder_coating-dashboard" element={<PowderCoatingDashboard />} />

                {/* Vehicle Requisition */}
                <Route path="/vehicle-requisition" element={<AddVehicleRequisition />} />
                <Route path="/vehicle-requisition-list" element={<VehicleRequisitionList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;