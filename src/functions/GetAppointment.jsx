import { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Style/apointComp.css";
import { MdOutlineHighlightOff } from "react-icons/md";
import axios from "axios";
import { API_URL } from "../config";
import { useAuth } from "../authContext";
import Loading from "../functions/loading";
export default function GetAppointment({ propId, agId }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hourValue, setHourValue] = useState("");
  const [appointmentsList, setAppointmentsList] = useState([]);
  const minDate = new Date();
  const [isOpen, setIsOpen] = useState(true);
  const { user, loadUser } = useAuth();
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);
  let maxDate = minDate.setDate(minDate.getDate() + 5);
  maxDate = minDate.toString();
  useEffect(() => {
    axios
      .get(`${API_URL}/getAppointments`)
      .then((res) => {
        setAppointmentsList(res.data);
        setLoad(true);
      })
      .catch((err) => console.log(err));
  }, []);
  if (!loadUser) return <Loading />;
  console.log(appointmentsList);
  if (!load) return <Loading />;
  console.log(appointmentsList);

  const appointment = appointmentsList.find((ap) => ap.clientId.id === user.id);

  console.log(appointment);
  function handleSubmit(e) {
    e.preventDefault();
    const input = {
      employeeId: agId,
      clientId: user.id,
      propertyId: propId,
      dateApt: selectedDate,
      hourApt: hourValue,
    };
    console.log(input);
    if (appointment === undefined || appointment.confirmApt === true) {
      axios
        .post(`${API_URL}/addAppointments`, input)
        .then((res) => {
          console.log(res.data);
          setIsOpen(false);
          alert("You made an appointment");
        })
        .catch((err) => console.log(err));
    } else {
      setMessage(
        `You have an appointment for ${new Date(
          appointment.dateApt
        ).toDateString()} at ${appointment.hourApt}`
      );
      console.log(message);
    }
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div id="apoint-comp">
          <MdOutlineHighlightOff
            id="closeBox"
            size={22}
            onClick={handleClose}
          />
          {message && <p id="messageApt">{message}</p>}
          {!message && (
            <>
              <h1>Get Apointment</h1>
              <form onSubmit={handleSubmit} id="apoint-comp-inner">
                <div id="first-box-apoint">
                  <span>
                    <p>Date</p>
                    <DatePicker
                      id="inputDate"
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      minDate={minDate}
                      dateFormat="dd/MM/yyyy"
                      filterDate={(date) =>
                        date.getDay() != 5 && date.getDay() != 6
                      }
                    />
                  </span>
                  <span>
                    <p>Hour: {hourValue}</p>
                  </span>
                </div>
                <div id="second-box-apoint">
                  <span className="boxHour">
                    {hourListMorning.map((el) => (
                      <span onClick={() => setHourValue(el)}>{el}</span>
                    ))}
                  </span>
                  <span className="boxHour">
                    {hourListAfternoon.map((el) => (
                      <span onClick={() => setHourValue(el)}>{el}</span>
                    ))}
                  </span>
                </div>
                <button type="submit" id="btn-apoint">
                  Get Appointment
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

const hourListMorning = ["9:30", "10:00", "10:30", "11:00", "11:30", "12:00"];
const hourListAfternoon = [
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];
