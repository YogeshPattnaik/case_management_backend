const j2s = require('joi-to-swagger');
const {countrySchema} = require('./country.validation');
const {stateSchema} = require('./state.validation');


module.exports = {
    swaggerMasterSchema: {
        Country: j2s(countrySchema).swagger,
        State: j2s(stateSchema).swagger
    }
}