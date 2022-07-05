import { Route, Routes } from "react-router-dom";
import Home from "../Pages/home";
import Upload from "../Pages/upload";
import NotFound from "../Pages/404";
import PropertDetaills from "../Pages/propertyDetaills";
import Login from "../Pages/Login";
import Register from "../Pages/SignUp";
import PropertyProvider from "../PropertiesContext";
import AllProperties from "../Pages/allProperties";
import AdminPage from "../Pages/AdminPage";
import Dashboard from "../AdminComponent/dahboard";
import Properties from "../AdminComponent/propertiesList";
import Reports from "../AdminComponent/reports";
import Clients from "../AdminComponent/client";
import ClientList from "../AdminComponent/clientComp/clientList";
import AppointComp from "../AdminComponent/clientComp/appointmentsList";
import Setting from "../AdminComponent/setting";
import Contract from "../AdminComponent/contract";
import AuthProvider from "../authContext";
import UsersProvider from "../UsersContext";
import AdminProvider from "../AdminContext";
import CreateContract from "../AdminComponent/contractComponents/newContract";
import DisplayContract from "../AdminComponent/contractComponents/displayContracts";
import Transaction from "../AdminComponent/contractComponents/transactions";
import ProfitReport from "../AdminComponent/ReportComp/profitsReport";
import PropertiesReport from "../AdminComponent/ReportComp/propertiesReport";
import RequireAuth from "../requireAuth";
import Forbidden from "../Pages/403";
import Profile from "../Pages/Profile";
export default function Main() {
  return (
    <>
      <AuthProvider>
        <PropertyProvider>
          <UsersProvider>
            <AdminProvider>
              <Routes>
                <Route path="" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route
                  path="/property-Detaills/:propertyId"
                  element={<PropertDetaills />}
                />

                <Route path="*" element={<NotFound />} />
                <Route path="/Access-forbidden" element={<Forbidden />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Register />} />
                <Route path="/My-profile" element={<Profile />} />
                <Route path="admin-page" element={<AdminPage />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="properties" element={<Properties />} />
                  <Route path="reports" element={<Reports />} />

                  <Route path="contract" element={<Contract />}>
                    <Route path="new-contracts" element={<CreateContract />} />
                    <Route path="contract-list" element={<DisplayContract />} />
                    <Route path="transaction" element={<Transaction />} />
                  </Route>

                  <Route path="clients" element={<Clients />}>
                    <Route path="client-list" element={<ClientList />} />
                    <Route path="appointments-list" element={<AppointComp />} />
                  </Route>

                  <Route path="reports" element={<Reports />}>
                    <Route path="profits-report" element={<ProfitReport />} />
                    <Route
                      path="properties-report"
                      element={<PropertiesReport />}
                    />
                  </Route>
                  <Route path="settings" element={<Setting />} />
                </Route>
                <Route path="properties" element={<AllProperties />} />
              </Routes>
            </AdminProvider>
          </UsersProvider>
        </PropertyProvider>
      </AuthProvider>
    </>
  );
}
