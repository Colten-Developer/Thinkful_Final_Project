import React from 'react';
import {useHistory} from "react-router-dom";
import { createReservation } from "../utils/api";
import { useState } from 'react';
import EditCreateReservation from './editCreateReservation';

function CreateReservation() {
    const initialReservation = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time:'',
        people: ''
    }

    const [reservation, setReservation] = useState({ ...initialReservation })
    const [reservationsError, setReservationsError] = useState([]);
    let reserveError = ''
    const history = useHistory()

    function goHome() {
        history.push('/')
      }

    async function formHandler(event) {
        event.preventDefault()
        await createReservation(reservation)
            .then((response) => {
                setReservation({ ...initialReservation })
                goHome()
            })
            .catch((error) => {
                setReservationsError(error)
                reserveError = error
                //window.location.reload(false)
                
            })
       setReservationsError(reserveError)
    }
    
    return (
        <div>
            <EditCreateReservation reservation={reservation} setReservation={setReservation} initialReservation={initialReservation} formHandler={formHandler}/>
            <div 
            style={reservationsError.message ? {opacity: 100} : {opacity: 0}}
            className='alert alert-danger'
            >
            <h4>{`There is an error: ${reservationsError.message}`}</h4>
            </div>
        </div>
    )
}

export default CreateReservation