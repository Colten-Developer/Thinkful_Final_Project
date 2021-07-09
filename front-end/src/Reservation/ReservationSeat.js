import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import { listTables, readReservation, updateTableOccupation } from "../utils/api";
import { useState, useEffect } from 'react';

function SeatReservation() {
    const [tables, setTables] = useState([])
    const [reservation, setReservation] = useState([])
    const { reservation_id } = useParams()
    const [selectedTable, setSelectedTable] = useState([])
    const [seatingError, setSeatingError] = useState([])
    const history = useHistory()

    useEffect(() => {
        listTables()
          .then((response) => setTables(response))
      }, [])

      useEffect(() => {
        readReservation(Number(reservation_id))
          .then((response) => setReservation(response))
      }, [])

      const tableList = tables.map((table) => {
        return (
          <div>
            <div>
                <h4>
                    <input 
                    type='radio' 
                    value={table.table_id} 
                    name='tableSelection'
                    //checked={setSelectedTable(table.table_id)}
                    onChange={valueChange}
                    />
                    {table.table_name} - {table.capacity}
                </h4>
            </div>
          </div>
        )
      })

      function valueChange(event) {
          setSelectedTable(event.target.value)
      }

      function goHome() {
          history.push('/')
      }

      function goBack() {
        history.goBack()
    }

      function formHandler(event) {
          event.preventDefault()
          let tempTable = tables.find((table) => {
              if(selectedTable == table.table_id) {
                  return table
              }
          })
          updateTableOccupation(tempTable, reservation_id)
          .then((response) => {
              goHome()
        })
        .catch((error) => {
            setSeatingError(error)
            console.log(error)
        })
          //updateTableOccupation(table_id, reservation_id)
      }

    return (
        <div>
            <h1>
                Seat Reservation
            </h1>
            <h2>
                Reservation
            </h2>
            <div class = 'row'>
                <div>
                    <h3>
                        Name, Phone Number,  Capacity
                        <br />
                        {reservation.last_name}, {reservation.first_name}, {reservation.mobile_number}, {reservation.people}
                    </h3>
                    <h3>
                        Select table for reservation
                    </h3>
                    <form onSubmit={formHandler}>
                        {tableList}
                        <button type='submit'>
                            Submit
                        </button>
                        <button onClick={() => goBack()}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
            <div 
            style={seatingError.message ? {opacity: 100} : {opacity: 0}}
            className='alert alert-danger'
            >
            <h4>{`There is an error: ${seatingError.message}`}</h4>
            </div>
        </div>
    )
}

export default SeatReservation