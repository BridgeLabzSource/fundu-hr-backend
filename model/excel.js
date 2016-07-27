/**
 * define require module
 */
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    db = require('../database/db'),
    common = require('../helper/common');
/**
 * @constructor
 */
function excel() {
    EventEmitter.call(this);
}
util.inherits(excel, EventEmitter);

/** 
 * extract user data from google spreadsheet and save in collection
 * @param {data} -data from sms controller
 * @param {cb} -callback to sms controller
 * @return {cb} -return cb either error or result
 **/
excel.prototype.save = function(data, cb) {
    
    data=JSON.parse(data);
   
    var userIDS=[];
    for (var i = 0; i <= data.length-1; i++) {
        userIDS.push(data[i][1]);
    }
    
    // userIDS.forEach(function(value,index){
    //     findAndInsert(data[index],value).then(function(result){
    //         console.log(result);
    //     },function(err){
    //         console.error(err);
    //     });
    // });
    // 
    findAndInsert(data[0],'BL001').then(function(result){
            console.log(result);
        },function(err){
            console.error(err);
        });
    
}



function findAndInsert(data,id)
{
    return new Promise(function(resolve,reject){
        console.log("inside findAndInsert");
        db.userModel.findOneAndUpdate({
          query: { "empId":id.toString()},
          update: {
            $set:  {
                        'srId': data[0],
                        'empId': data[1],
                        'empName': data[2],
                        'designation': data[3],
                        'blStartDate': data[4],
                        'startDateAtCompany': data[5],
                        'endDate': data[6],
                        'mobile': data[7],
                        'panCard': data[8],
                        'email': data[9],
                        'dob': data[10],
                        'empContractSigned': data[11],
                        'offerLetter': data[12],
                        'empFormCsr': data[13],
                        'originalSubmitted': data[14]
                    }
          }
        },function(err,result){
            if(!err){
                console.log(result);
                resolve(result);
            }
            else{
                console.error(err);
                reject(err);
            }
        });

    });
}
function find(ids,data)
{
    var ids_not_in_db=[];
    var i=0;
    console.log("ids : "+ids)
    return new Promise(function(resolve,reject){
       db.userModel.find( { "empId": {$in: ["BL001","BL002","BL003","BL004","BL005"]}},function(err,data){
            console.log("inside find");
            if(!err && !data)
            {
                insertOne(data[i]).then(function(insertRes){
                    ids_not_in_db.push(data[i][1]);
                    console.log(insertRes);
                    i++;
                });
                if(ids.length-1 == i) resolve(ids_not_in_db);
            }
            else if(!err && data)
            {
                if(ids.length-1 == i) resolve(ids_not_in_db);
                i++;

            }
            else if(err)
            {
                console.log("error " + err);
                reject(err);
            }
        });
        
    });

}
function insertOne(data)
{
    return Promise(function(resolve,reject){
        db.userModel.insert({
                        'srId': data[0],
                        'empId': data[1],
                        'empName': data[2],
                        'designation': data[3],
                        'blStartDate': data[4],
                        'startDateAtCompany': data[5],
                        'endDate': data[6],
                        'mobile': data[7],
                        'panCard': data[8],
                        'email': data[9],
                        'dob': data[10],
                        'empContractSigned': data[11],
                        'offerLetter': data[12],
                        'empFormCsr': data[13],
                        'originalSubmitted': data[14]
                    },function(err,result){
                        if(!err) resolve(result);
                        else reject(err);
                    });
    })
}
function insert(data,index_to_insert)
{
    console.log('insert reached');
    var bulk=db.userModel.initializeUnorderedBulkOp() ;
    return new Promise(function(resolve,reject){
        index_to_insert.each(function(value,i){
        bulk.insert( {
                        'srId': data[i][0],
                        'empId': data[i][1],
                        'empName': data[i][2],
                        'designation': data[i][3],
                        'blStartDate': data[i][4],
                        'startDateAtCompany': data[i][5],
                        'endDate': data[i][6],
                        'mobile': data[i][7],
                        'panCard': data[i][8],
                        'email': data[i][9],
                        'dob': data[i][10],
                        'empContractSigned': data[i][11],
                        'offerLetter': data[i][12],
                        'empFormCsr': data[i][13],
                        'originalSubmitted': data[i][14]
                    });
    });
        if(bulk.execute()) resolve(bulk.tojson());

    });
}
function test(data){
   var promise = new Promise(function(resolve, reject) {
            console.log("after i :" + i+" and "+data[i][1]);
            db.userModel.findOne({ 'empId': data[i][1] }, function(err, exist) {
                console.log("exist :"+exist.empId);
                if (!exist) {
                    var dd = new db.userModel({
                        'srId': data[i][0],
                        'empId': data[i][1],
                        'empName': data[i][2],
                        'designation': data[i][3],
                        'blStartDate': data[i][4],
                        'startDateAtCompany': data[i][5],
                        'endDate': data[i][6],
                        'mobile': data[i][7],
                        'panCard': data[i][8],
                        'email': data[i][9],
                        'dob': data[i][10],
                        'empContractSigned': data[i][11],
                        'offerLetter': data[i][12],
                        'empFormCsr': data[i][13],
                        'originalSubmitted': data[i][14]
                    })
                    dd.save(function(err, result) {
                        if (result) {
                            console.log(result)
                        }
                    })
                    console.log("resolve")
                    resolve("resolve");
                } else {
                    console.log("reject")
                    reject(Error("It broke"));
                }
            });
        });
}

// sum.then()
module.exports = new excel();
