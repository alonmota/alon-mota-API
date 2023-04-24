const express = require('express');
const { validate } = require('../../middlewares');
const { getClinics } = require('./clinics.services.js');
const { filter } = require('./clinics.validation.js');

// const validate = require('../../middlewares/validate');

const router = express.Router();

/**
 * @openapi
 * /api/clinics:
 *   get:
 *     summary: Fetch clinics from different providers and allows filtering
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: filter
 *         description: filters that should be considered for the search
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             state:
 *               type: string
 *             availability:
 *               type: string
 *         examples:
 *           filterByName:
 *             value:
 *               name: Clin
 *             summary: Provide a substring of the clinic name, and the filter all elements
 *               that include that substring
 *           filterByStateUF:
 *             value:
 *               state: CA
 *             summary: Filter state by providing UF
 *           filterByStateName:
 *             value:
 *               state: California
 *             summary: Filter state by providing state name (Must be capitalized)
 *           filterHourRange:
 *             value:
 *               availability: from:08:50, to:22:21
 *             summary: "Provide a string format 'from:HH:mm, to:HH:mm' to filter for clinics that
 *               are open during an entire interval
 *               (from must be lower that to in order to be valid)"
 *           filterExactHour:
 *             value:
 *               availability: 08:50
 *             summary: "Provide a string format 'HH:mm' to filter clinics that are open at the
 *               specific time"
 *           combineAnyFilters:
 *             value:
 *               name: Scr
 *               state: CA
 *               availability: 08:40
 *             summary: Make any combinations of filters you seem fit
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Validation error
 *       503:
 *         description: Endpoints for clinic apis are unreachable
 */
router.route('/')
	.get(validate(filter), getClinics);

module.exports = router;
