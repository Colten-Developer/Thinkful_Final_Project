import React, { useEffect, useState } from "react";
import { listReservationsByDate } from "../utils/api";
//import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reloadWithTodaysDate, reloadWithPreviousDate, reloadWithNextDate}) {
  const [reservations, setReservations] = useState([]);
  
  //useEffect(loadDashboard, [date]);
  useEffect(() => {
    listReservationsByDate(date)
      .then((response) => setReservations(response));
  }, [date]);

  const reservationItem = reservations.map((reservation) => (
    <div>
      <div>
        <h4>{`${reservation.last_name}, ${reservation.first_name}`}</h4>
        <p>Mobile Number, People, Date, Time</p>
        <p>{`${reservation.mobile_number}, ${reservation.people}, ${reservation.reservation_date}, ${reservation.reservation_time}`}</p>
        <button
          onClick={() => console.log(reservation.reservation_id)}
          >View</button>
        <button
          onClick={() => console.log(reservation.reservation_id)}
          >Delete</button>
      </div>
    </div>
    
  ))
    
  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <div class="row">
          <div class="col-md-6">
            <h3>{`Reservations for ${date}`}</h3>
            <button
                onClick={() => reloadWithPreviousDate()}
                >Previous</button>
            <button
                onClick={() => reloadWithTodaysDate() }
                >Today</button>
            <button
                onClick={() => reloadWithNextDate()}
                >Next</button>
            <br />
            <h3>Last Name, First Name</h3>
            {reservationItem}
            <br />
          </div>
          <br />
          <div class="col-md-6">
            <h3>{`Tables stuff`}</h3>
          </div>
        </div>
      </div>
    </main>
  )
  
 /*
 return (
   <main>
     <div className="row mb-5">div 1
        <div className= 'col mb-5'>div 2</div>
        <div className= 'col mb-5'>div 4</div>
        <div className= 'col mb-5'>div 6</div>
     </div>
   </main>
 )
 */
}

export default Dashboard;
