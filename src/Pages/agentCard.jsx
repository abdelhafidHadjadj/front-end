import { useContext } from "react";
import { AdminContext } from "../AdminContext";
import { useAuth } from "../authContext";
import Loading from "../functions/loading";

export default function AgentCard({ agentId, handleClick }) {
  const { adminList, loadAdmin } = useContext(AdminContext);

  if (!loadAdmin) return <Loading />;
  const agent = adminList.find((ad) => ad.id === agentId);
  const tel = `tel:${agent.phone}`;
  return (
    <div id="agent-card">
      <img src={agent.avatar} alt="" />
      <div id="agent-card-content">
        <h1>Contact an agent</h1>
        <p>{agent.username}</p>
        <p>{agent.email}</p>
        <a href={tel}>{agent.phone}</a>
        <p onClick={handleClick} id="btn-getApoint">
          Get Appointment
        </p>
      </div>
    </div>
  );
}
