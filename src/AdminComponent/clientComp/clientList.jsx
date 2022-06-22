import { useContext } from "react";
import { UsersContext } from "../../UsersContext";
import { ImUser } from "react-icons/im";
import "../styleAdmin/clientList.css";
export default function ClientList() {
  const { users } = useContext(UsersContext);
  console.log(users);
  return (
    <>
      <section id="client-list">
        <span id="nbreClient-box">
          {users.length} <ImUser />
        </span>
        <article id="contract-table">
          {users && (
            <div id="contract-table-nav">
              <span className="column">Client Id</span>
              <span className="column">Client Name</span>
              <span className="column">Email</span>
              <span className="column">Phone</span>
            </div>
          )}
          {users.map((u) => (
            <div id="contract-table-inner">
              <span className="column">{u.id}</span>
              <span className="column">{u.username}</span>
              <span className="column">{u.email}</span>
              <span className="column">{u.phone}</span>
            </div>
          ))}
        </article>
      </section>
    </>
  );
}
