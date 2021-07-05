import React, { useEffect, useState } from "react";
import { listReservations, listReservationsByDate } from "../utils/api";
import { today, previous, next } from "../utils/date-time";
import { Link, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reloadWithTodaysDate, reloadWithPreviousDate, reloadWithNextDate}) {
  const [reservations, setReservations] = useState([]);
  const [allReservations, setAllReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory()
  console.log(date)
  
  //useEffect(loadDashboard, [date]);
  useEffect(() => {
    listReservationsByDate(date)
      .then((response) => setReservations(response));
  }, [date]);

  useEffect(() => {
    listReservations()
      .then((response) => setAllReservations(response));
  }, [date]);

  function reloadPage() {
    window.location.reload(false)
  }

  //listrescolten(urldata).then( (data) => setReservations(data))
  /*

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  */
  /*
  console.log('dashboard')
  console.log(reservations)
  console.log(allReservations)
  console.log(reservationsError)
  */
  

  const reservationItem = reservations.map((reservation) => (
    <div>
      <div>
        <h2>{`${reservation.last_name}, ${reservation.first_name}`}</h2>
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
  //console.log(reservationItem)
  return (
    <main>
      <h1>Dashboard</h1>
      <h4>{`Reservations for ${date}`}</h4>
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
    </main>
  )
    /*
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
        {reservationItem}
        <br />
      </div>
      <ErrorAlert error={reservationsError} />
    </main>
  );
  */
}

export default Dashboard;
