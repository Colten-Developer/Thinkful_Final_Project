const service = require('./tables.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const hasProperties = require('../errors/hasProperties')

const hasRequiredProperties = hasProperties()

const VALID_PROPERTIES = []

function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
  
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
  
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    next();
  }

//get tables/:tableId
//post tables
//get tables
//get reservations/:reservationId
//put /tables/:tableId/seat

function validateProperties(req, res, next) {
    let data = req.body.data
    if(!data) {
        return next({ status: 400, message: 'data'})
    }

    let tableName = data.table_name
    if(!tableName){
        return next({ status: 400, message: 'table_name is missing'})
    }

    if(tableName.length < 2){
        return next({ status: 400, message: 'table_name is too short'})
    }

    let capacity = data.capacity
    if(isNaN(capacity)){
        return next({ status: 400, message: 'capacity must be a number'})
    }

    if(capacity < 1){
        return next({ status: 400, message: 'capacity must be greater than 0'})
    }
}

async function tableExists(req, res, next) {
    const { tableId } = req.params

    const table = await service.read(tableId)

    if (table){
        res.locals.table = table
        return next()
    }
    next({ status: 404, message: `Table cannot be found.`})
}

async function read(req, res, next) {
    const { table: data } = res.locals
    res.json({ data })
}

async function list(req, res, next) {
    const data = await service.list()
    res.json({ data })
}

async function create(req, res, next) {
    let newData = req.body.data
    service
        .create(req.body.data)
        .then((data) => res.status(201).json({ data: newData }))
        .catch(next)
}

async function update(req, res, next) {
    const updatedTable = {
        ...res.locals.table,
        ...req.body.data,
        table_id: res.locals.table.table_id
    }

    const data = await service.update(updatedTable)

    res.json({ data })
}

module.exports = {
    read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
    list: asyncErrorBoundary(list),
    create: [hasOnlyValidProperties, hasRequiredProperties, validateProperties, asyncErrorBoundary(create)],
    update: [hasOnlyValidProperties, validateProperties, hasRequiredProperties, asyncErrorBoundary(tableExists), asyncErrorBoundary(update)],
}