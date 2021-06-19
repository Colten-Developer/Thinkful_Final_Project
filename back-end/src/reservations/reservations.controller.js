/**
 * List handler for reservation resources
 */
const service = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const hasProperties = require('../errors/hasProperties')

const VALID_PROPERTIES = [
  'reservation_id',
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people',
]

const hasRequiredProperties = hasProperties('first_name', 'last_name', 'mobile_number', 'reservation_date', 'reservation_time', 'people')

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

//validates that properties are appropriate types
function validateProperties(req, res, next) {

  let date = req.body.data.reservation_date
  //function to see if the value is a date
  const isDate = (value) => {
    return (new Date(value) !== "invalid Date" && !isNaN(new Date(value)))
  } 

  let time = req.body.data.reservation_time
  let timeArray = time.split(':')
  let people = req.body.data.people

  //the reservation date is a date
  if(!isDate(date)){
    return next({
      status: 400,
      message: `reservation_date`
    })
  }
  //the inputted date object
  let dateObject = new Date(date)
  //todays date
  let today = new Date()
  //todays date object formatted
  let todayDateObject = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDay()
  //finds what today is in a numeric form, mon = 0, tues = 1, wed =2 
  let numberDate = dateObject.getDay()
  
  //if today is tuesday were closed
  if(numberDate == 1){
    return next({
      status: 400,
      message: `closed`
    })
  }
  //if the date inputted is in the past
  if(date < todayDateObject){
    return next({
      status: 400,
      message: `future`
    })
  }

  //checks if reservations time is a time
  if(timeArray.length != 2){
    return next({
      status: 400,
      message: `reservation_time`
    })
  }

  //checks if people is a number
  if(typeof people != 'number'){
    return next({
      status: 400,
      message: `people`
    })
  }
  //if every type is valid continue down the list
  next()
}

async function list(req, res, next) {
  const data = await service.list();
  console.log(data)
  res.json({ data });
}

function create(req, res, next) {
  service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data: data[0] }))
    .catch(next);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasOnlyValidProperties, hasRequiredProperties, validateProperties, asyncErrorBoundary(create)],
};
