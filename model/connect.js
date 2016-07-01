/**
 * define require modules
 */
var mongoose = require('mongoose');

var state = {
        db: null,
    },
    url = 'mongodb://demo:demo007@ds023694.mlab.com:23694/heroku_0k7kk5fx';
/**
 * @exports {connect,lib,get,close}
 */
module.exports = {
    connect: function(cb) {
        if (state.db) {
            cb();
        } else {
            state.db = mongoose.connect(url);
            cb();
        }
    },
      close: function(done) {
        if (state.db) {
            state.db.close(function(err, result) {
                state.db = null
                state.mode = null
                done(err)
            })
        }
    }
}
