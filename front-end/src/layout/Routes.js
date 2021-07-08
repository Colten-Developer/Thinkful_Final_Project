import React, { useState } from "react";

import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Reservation from "../Reservation/ReservationNew"
import Tables from '../Tables/TablesNew'
import NotFound from "./NotFound";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [activeDate, setActiveDate] = useState(today());

  const todaysDate = today()
  const previousDate = previous(activeDate)
  const nextDate = next(activeDate)

  const history = useHistory()

  async function reloadWithTodaysDate() {
    console.log('reload todays date')
    console.log(todaysDate)
    await setActiveDate(todaysDate)
    history.push({
      pathname: '/dashboard',
      search: `?date=${todaysDate}`
    })
  }

  async function reloadWithPreviousDate() {
    console.log('reload previous date')
    console.log(previousDate)
    await setActiveDate(previousDate)
    history.push({
      pathname: '/dashboard',
      search: `?date=${previousDate}`
    })
  }

  async function reloadWithNextDate() {
    console.log('reload Next date')
    console.log(nextDate)
    await setActiveDate(nextDate)
    history.push({
      pathname: '/dashboard',
      search: `?date=${nextDate}`
    })
  }


  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <Reservation />
      </Route>
      <Route path="/tables/new">
        <Tables />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={activeDate} reloadWithTodaysDate={reloadWithTodaysDate} reloadWithNextDate={reloadWithNextDate} reloadWithPreviousDate={reloadWithPreviousDate} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
