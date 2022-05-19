import { Route, Routes } from "react-router";
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
import ClientList from "../AdminComponent/clientList";
import Setting from "../AdminComponent/setting";
import Contract from "../AdminComponent/contract";
import AuthProvider from "../authContext";
export default function Main() {
  return (
    <>
      <AuthProvider>
        <PropertyProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />

            <Route
              path="/property-Detaills/:propertyId"
              element={<PropertDetaills />}
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="admin-page" element={<AdminPage />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="properties" element={<Properties />} />
              <Route path="reports" element={<Reports />} />
              <Route path="contract" element={<Contract />} />
              <Route path="clients" element={<ClientList />} />
              <Route path="settings" element={<Setting />} />
            </Route>
            <Route path="properties" element={<AllProperties />} />
          </Routes>
        </PropertyProvider>
      </AuthProvider>
    </>
  );
}
