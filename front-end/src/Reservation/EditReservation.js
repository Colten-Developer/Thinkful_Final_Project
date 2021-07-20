import React, { useEffect, useState } from "react";
import {useParams, useHistory} from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import EditCreateReservation from "./editCreateReservation";

function EditReservation() {
    const initialReservation = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time:'',
        people: ''
    }

    const [reservation, setReservation] = useState({ ...initialReservation })
    //const [reservationId, setReservationId] = useState()
    const {reservation_id} = useParams()
    const [reservationId, setReservationId] = useState(reservation_id)
    //setReservationId(reservation_id)
    const history = useHistory()
    
      useEffect(() => {
        const abortController = new AbortController()
        readReservation(reservationId)
          .then((response) => setReservation(response));
          return () => abortController.abort()
      }, [reservationId]);

      const formHandler = (event) => {
        event.preventDefault()
        updateReservation(reservation)
            .then((response) => {
                setReservation({ ...initialReservation })
                goHome()
            })
            .catch((error) => {
                setReservationId(reservation_id)
            })
    }

    function goHome() {
        history.push('/')
    }
      
    return (
        <div>
            <h1>
                Edit Reservation
            </h1>
            <h2>
                Reservation ID: {`${reservation.reservation_id}`}
            </h2>
            <EditCreateReservation reservation={reservation} setReservation={setReservation} initialReservation={initialReservation} formHandler={formHandler}/>
        </div>
    )
}

export default EditReservation