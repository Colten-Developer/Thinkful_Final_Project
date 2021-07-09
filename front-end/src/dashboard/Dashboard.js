import React, { useEffect, useState } from "react";
import { listReservationsByDate, listTables } from "../utils/api";
import {useHistory} from "react-router-dom";
//import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reloadWithTodaysDate, reloadWithPreviousDate, reloadWithNextDate}) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([])
  const history = useHistory()
  
  //useEffect(loadDashboard, [date]);
  useEffect(() => {
    listReservationsByDate(date)
      .then((response) => setReservations(response));
  }, [date]);

  useEffect(() => {
    listTables()
      .then((response) => setTables(response))
  }, [])

  async function seatTheTable(reservation_id) {
    history.push(`/reservations/${reservation_id}/seat`)
  }

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
          <button
          onClick={() => seatTheTable(reservation.reservation_id)}
          >Seat</button>
      </div>
    </div>
  ))

  const tableList = tables.map((table) => {
    let tableStatus = ''
    if(table.reservation_id) {
      tableStatus = 'Occupied'
    }else {
      tableStatus = 'Free'
    }
    return (
      <div class = 'row'>
        <div class="col-md-5" data-table-id-status={table.table_id}>
        <h4>
          {`${table.table_name}`}
        </h4>
        </div>
        <div class="col-md-2">
        <h4>
          {`${table.capacity}`}
        </h4>
        </div>
        <div class="col-md-3">
        <h4>
          {`${tableStatus}`}
        </h4>
        </div>
      </div>
    )
  })

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
            <h3>{`Tables`}</h3>
            <h3>
              Table Name, Capacity, Status
            </h3>
            {tableList}
            <br />
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
