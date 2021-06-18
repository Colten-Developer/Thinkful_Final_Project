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

async function list(req, res, next) {
  const data = await service.list();
  console.log(data)
  res.json({ data });
}

function create(req, res, next) {
  console.log(req.body.data)
  service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data: data[0] }))
    .catch(next);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
};
