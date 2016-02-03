var start = process.hrtime();


var elapsed_time = function(){
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    // console.log(); // print message + time
    // start = process.hrtime(); // reset the timer

    return process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms.";
}


var module = module || {};
module.exports = elapsed_time;