// import { useRef, useState, useEffect } from "react";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function GetAppointPage() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [hourValue, setHourValue] = useState("");
//   const minDate = new Date();
//   let maxDate = minDate.setDate(minDate.getDate() + 5);
//   maxDate = minDate.toString();
//   return (
//     <>
//       <h1>Get Appointment</h1>
//       <form>
//         <div id="first-box-apoint">
//           <span>
//             <p>Date</p>
//             <DatePicker
//               id="inputDate"
//               selected={selectedDate}
//               onChange={(date) => setSelectedDate(date)}
//               minDate={minDate}
//               dateFormat="dd/MM/yyyy"
//               filterDate={(date) => date.getDay() != 5 && date.getDay() != 6}
//             />
//           </span>
//           <span>
//             <p>Hour: {hourValue}</p>
//           </span>
//         </div>
//         <div id="second-box-apoint">
//           <span className="boxHour">
//             {hourListMorning.map((el) => (
//               <span onClick={() => setHourValue(el)}>{el}</span>
//             ))}
//           </span>
//           <span className="boxHour">
//             {hourListAfternoon.map((el) => (
//               <span onClick={() => setHourValue(el)}>{el}</span>
//             ))}
//           </span>
//         </div>
//         <button type="submit" id="btn-apoint">
//           Get Appointment
//         </button>
//       </form>
//     </>
//   );
// }

// const hourListMorning = ["9:30", "10:00", "10:30", "11:00", "11:30", "12:00"];
// const hourListAfternoon = [
//   "14:00",
//   "14:30",
//   "15:00",
//   "15:30",
//   "16:00",
//   "16:30",
//   "17:00",
// ];
