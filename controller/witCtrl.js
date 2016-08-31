'use strict';
/**
 * define require module 
 * @module  node-wit,moment
 */
let Wit = require('node-wit').Wit,
    moment = require('moment'),
    client = new Wit({ accessToken: 'S2VQWSMBFF6BE4NSJICC26BL75BALYVD' }),
    minConfidence = 0.70;

/**
Extract value of fist index form matched entity field
@param {array} entities - entities list recived form Wit.ai
@param {string} entity - name of the entity to match in the entities list
@return {integer|string} - Return value of given entitiy or '2' if confidence is below {@link minimumConfidence}
*/
let self = module.exports = {
    firstEntityValue: (entities, entity) => {
        const val = entities && entities[entity] &&
            Array.isArray(entities[entity]) &&
            entities[entity].length > 0 &&
            entities[entity][0].value;
        console.log(entities[entity][0].value);
        if (!val) {
            return null;
        }

        return entities[entity][0].confidence >= minConfidence ? (typeof val === 'object' ? val.value : val) : 2;
    },
    message: (msg, expValue, cb) => {
        client.message(msg, {})
            .then((data) => {
                let firstEntity = self.firstEntityValue(data.entities, 'intent');
                let on_off = self.firstEntityValue(data.entities, 'on_off');
                let datetime = self.firstEntityValue(data.entities, 'datetime');
                (firstEntity == expValue || firstEntity == 'office') ?
                (on_off == 'on' || on_off == 'off') ?
                datetime ?
                    cb(null, { 'time': moment(datetime).utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss Z'), 'on_off': on_off }) : cb(null, { 'time': moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss Z'), 'on_off': on_off }): cb({ 'msg': data._text, 'error': JSON.stringify(data.entities) }, null): cb({ 'msg': data._text, 'error': JSON.stringify(data.entities) }, null)
            })
            .catch((err) => {
                cb({ 'msg': msg, 'error': err }, null);
            });
    }
}
