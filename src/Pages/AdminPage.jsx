import SideBar from "../components/sideBar";

import { useAuth } from "../authContext";
import Forbidden from "./403";
export default function AdminPage() {
  const { user } = useAuth();
  if (user.role === "USER") return <Forbidden />;

  return (
    <>
      <SideBar />
    </>
  );
}
