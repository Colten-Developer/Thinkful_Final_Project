import React from "react";
import {useHistory} from "react-router-dom";

function EditCreateReservation({ reservation, setReservation, formHandler}) {
    
    const history = useHistory()

    function handleChange(event) {
        setReservation({
            ...reservation,
            [event.target.name]: event.target.value,
        })
    }

    function goHome() {
        history.push('/dashboard')
    }

    return (
        <div>
            <form>
                <label htmlFor='first_name'>
                    First Name
                </label>
                <br/>
                <input
                      id="first_name"
                      type="text"
                      name="first_name"
                      value={reservation.first_name}
                      placeholder='First Name'
                      onChange={handleChange}
                      />
                <br/>
                <label htmlFor="last_name">
                    Last Name
                </label>
                <br/>
                    <input
                      id="last_name"
                      type="text"
                      name="last_name"
                      value={reservation.last_name}
                      placeholder='Last Name'
                      onChange={handleChange}
                      />
                <br/>
                <label htmlFor="mobile_number">
                    Mobile Number
                </label>
                <br/>
                    <input
                      id="mobile_number"
                      type="text"
                      name="mobile_number"
                      value={reservation.mobile_number}
                      placeholder='Mobile Number'
                      onChange={handleChange}
                      />
                <br/>
                <label htmlFor="reservation_date">
                    Reservation Date
                </label>
                <br/>
                    <input
                      id="reservation_date"
                      type="date"
                      name="reservation_date"
                      value={reservation.reservation_date}
                      placeholder='YYYY-MM-DD'
                      onChange={handleChange}
                      />
                <br/>
                <label htmlFor="reservation_time">
                    Reservation Time
                </label>
                <br/>
                    <input
                      id="reservation_time"
                      type="time"
                      name="reservation_time"
                      value={reservation.reservation_time}
                      placeholder='Reservation Time'
                      onChange={handleChange}
                      />
                <br/>
                <label htmlFor="reservation_time">
                    People
                </label>
                <br/>
                    <input
                      id="people"
                      type="text"
                      name="people"
                      value={reservation.people}
                      placeholder='Number of people'
                      onChange={handleChange}
                      />
            </form>
            <button onClick={goHome}>
                Cancel
            </button>
            <button onClick={formHandler}>
                Submit
            </button>
        </div>
    )
}

export default EditCreateReservation