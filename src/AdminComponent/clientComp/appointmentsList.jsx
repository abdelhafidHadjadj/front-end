import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../../config";
import { UsersContext } from "../../UsersContext";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import Loading from "../../functions/loading";

export default function AppointComp() {
  const [appointments, setAppointments] = useState([]);
  const { users } = useContext(UsersContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`${API_URL}/getAppointments`)
      .then((res) => res.data)
      .then((data) => {
        setAppointments(data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(users);

  const [aptId, setAptId] = useState("");
  function handleDelete(aptId) {
    axios
      .delete(`${API_URL}/deleteAppointments/${aptId}`)
      .then((res) => {
        const newList = appointments.filter((ap) => ap.id != res.data.id);
        setAppointments(newList);
      })
      .catch((err) => console.log(err));
  }

  function handleConfirm() {
    console.log(aptId);
    console.log("id");
    setLoading(true);
    axios
      .put(`${API_URL}/updateAppointments/${aptId}`, { confirmApt: true })
      .then((res) => res.data)
      .then((data) => {
        const newApt = [...appointments];
        let findIndex = newApt.findIndex((apt) => apt.id == data.id);
        console.log(findIndex);
        newApt[findIndex] = { ...data };
        setAppointments(newApt);
        console.log(appointments);

        setLoading(false);
        setOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function comp(a, b) {
    return b.postedAt - a.postedAt;
  }
  let listOfApt = [...appointments.sort(comp)].reverse();
  console.log(listOfApt);

  return (
    <>
      <section id="client-list">
        <span id="nbreClient-box">{appointments.length}</span>
        <article id="contract-table">
          {listOfApt && (
            <div id="contract-table-nav">
              <span className="column-id-nav">Appointment Id</span>
              <span className="column">Client</span>
              <span className="column-id-nav">Property Id</span>
              <span className="column">Date</span>
              <span className="column-hour">Hour</span>
              <span className="column columnApt">Appointment Posted</span>
            </div>
          )}
          {listOfApt.map((a) => (
            <div id="contract-table-inner">
              <span className="column-id">{a.id}</span>
              <span className="column">{a.clientId.username}</span>
              <span className="column-id">{a.propertyId}</span>
              <span className="column">
                {new Date(a.dateApt).toDateString()}
              </span>
              <span className="column-hour">{a.hourApt}</span>
              <span className="column columnApt">
                {new Date(a.postedAt).toLocaleString()}
                <span id="box-conf-delete">
                  {!a.confirmApt && (
                    <p
                      id="btn-confirm"
                      onClick={() => {
                        setOpen(!open);
                        setAptId(a.id);
                      }}
                    >
                      Confirm
                    </p>
                  )}
                  {a.confirmApt && <p>Confirmed</p>}
                  <MdDeleteOutline
                    size={26}
                    id="btn-del"
                    onClick={() => handleDelete(a.id)}
                  />
                </span>
              </span>
            </div>
          ))}
        </article>
        {open && (
          <>
            {loading && <Loading />}
            {!loading && (
              <div id="confirmComp">
                Are you sure
                <div id="box-confirm-cancel">
                  <span id="btn-confirm" onClick={() => handleConfirm()}>
                    Confirm
                  </span>
                  <span id="btn-cancel" onClick={() => setOpen(false)}>
                    Cancel
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
