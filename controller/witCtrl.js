'use strict';

const Wit = require('node-wit').Wit;
const moment = require('moment');
const client = new Wit({ accessToken: 'S2VQWSMBFF6BE4NSJICC26BL75BALYVD' });

/**@constant {number} */
const minConfidence = 0.80;

/**
Extract value of fist index form matched entity field
@param {array} entities - entities list recived form Wit.ai
@param {string} entity - name of the entity to match in the entities list
@return {integer|string} - Return value of given entitiy or '2' if confidence is below {@link minimumConfidence}
*/
const firstEntityValue = (entities, entity) => {
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value;
    // console.log(val);
    if (!val) {
        return null;
    }

    return entities[entity][0].confidence >= minConfidence ? (typeof val === 'object' ? val.value : val) : 2;
};

const message = (msg, expValue, cb) => {
    console.log("message :" + msg)
    client.message(msg, {})
        .then((data) => {
            console.log(JSON.stringify(data));
            let firstEntity = firstEntityValue(data.entities, "intent");
            let on_off = firstEntityValue(data.entities, "on_off");
            let datetime = firstEntityValue(data.entities, "datetime");
            console.log(datetime);
            (firstEntity == expValue || firstEntity == "office") ?
            (on_off == "on" || on_off == "off") ?
            datetime ?
                cb(null, { "time": moment(datetime).format("YYYY-MM-DD HH:mm:ss Z"), "on_off": on_off }) : cb(null, { "time": moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss Z"), "on_off": on_off }): cb({ "msg": data._text, "error": "in entities on_off not found" }, null): cb({ "msg": data._text, "error": "in entities intent not found" }, null)
        })
        .catch((err) => {
            cb({ "msg": msg, "error": err }, null);
        });
}

module.exports = message;
