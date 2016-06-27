var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    empId: { type: Number },
    empName: { type: String },
    Designation: { type: String },
    BL_start_date: { type: Date },
    End_Date: { type: Date },
    Mobile: { type: String },
    PAN_card: { type: String },
    Emp_contract_signed: { type: String },
    offer_letter: { type: String },
    Emp_form_CSR: { type: String },
    original_submitted: { type: String }
});

var userModel = mongoose.model('userSchema', userSchema, 'userSchema');

exports.userModel = userModel;
