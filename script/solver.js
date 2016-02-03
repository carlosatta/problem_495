// Let W(n,k) be the number of ways in which n can be written as the product of k distinct positive integers.

var _ = require('lodash');
var math = require('mathjs');
var getPrimeFactors = require('./primeFactors');
var elapsed_time = require('./elapsed_time');

// math.config({
//   number: 'bignumber',
//   // precision: 64 
// });

var number_solutions = 0;
var solutions = [];
var position_used = [];

var options = {
  debug: false,
  same: false,
  notice: false,
};




var solver = function(n, k, options) {

  var EventEmitter = require("events").EventEmitter;
  var ee = new EventEmitter();
  ee.on("solverStart", solver_start);
  ee.on("solverStart", check);
  // ee.setMaxListeners(20);

  console.log('Execution for the function W(%s, %s).', n, k);

  options = options ? options : [];
  this.options = _.merge(this.options, options);

  k = math.eval(k);

  console.log('Procede to calculate the value of %s (%s).', n, elapsed_time());
  var target = math.eval(n);

  console.log('Procede to calculate the prime factors for %s (%s)', n, elapsed_time());
  // var primeFactors = getPrimeFactors.calculate(target);
  var primeFactors = getPrimeFactors.byFiles(target);

  primeFactors = [1].concat(primeFactors);

  var primeFactorsTextArray = [];
  var primeFactorsTextText = [];
  for(var i in primeFactors) {
    primeFactorsTextArray[math.number(primeFactors[i])] = primeFactorsTextArray[math.number(primeFactors[i])] ? primeFactorsTextArray[math.number(primeFactors[i])] + 1 : 1;  
  }
  for(var i in primeFactorsTextArray) {
    primeFactorsTextText.push(i + '^' + primeFactorsTextArray[i]);
  }
  primeFactorsTextText = primeFactorsTextText.filter(function(n){ return n != undefined });

  console.log('Prime factors for the number %s are [%s] (%s)', n, primeFactorsTextText.join(' * '), elapsed_time());

  if(primeFactors.length < k) {
    console.error('Error. Impossible to solve.');
    return;
  }

  this.ee = ee;
  // this.position_used = []; 

  console.log('Procede to calculate the possible solution of W(%s, %s) with %s possible permutations.', n, k, math.permutations(primeFactors.length, k));
  
  ee.emit('solverStart', target, k, primeFactors, this);

  console.log('The function W(%s, %s) have %s solutions (%s).', n, k, number_solutions, elapsed_time());
}

var solver_start = function(n, k, pf, cnt) {
  
  // var position_used = [];

  for(var i in pf) {
    for(var j in pf) {
      
      if(i == j) {
        continue;
      }

      // current_position_used = [i, j];
      // current_position_used = math.sort(current_position_used).join();

      if(pf.length <= k) {
        continue;
      }

      // if(position_used[current_position_used]) {
      //   continue;
      // }

      
      var _pf = math.clone(pf);
      var multiply = math.multiply(_pf[i], _pf[j]);  

      if(cnt.options.same == false && math.equal(multiply, n)) {
        continue;
      }

      _pf[i] = multiply;
      _pf.splice(j,1);

      // _pf = _pf.sort(function(a, b) { return (a-b) });
      _pf = math.sort(_pf);

      current_position_used = math.number(math.sort(_pf)).join();

      if(position_used[current_position_used]) {
        continue;
      }

      position_used[current_position_used] = true;
      // console.log(position_used);
      // console.log();

      // console.log("\t\t\tcontrollo", math.number(n), math.number(k), math.number(_pf));

      // solver_start(n, k, _pf, cnt);
      cnt.ee.emit('solverStart', n, k, _pf, cnt, ee);
      
      // check(n, k, _pf);
      // ee.emit('checkSolution', n, k, _pf, cnt, ee);
      

    }
  }

}


var check = function(n, k, pf, cnt) {

  if(pf.length < k) {
    return;
  }

  // var pf = math.clone(pf);
  pf = uniq(pf);
  // pf = _.uniq(pf);


  if(pf.length == k) {

    product = _.reduce(pf, function(prod, n) {
      return math.multiply(prod, n);
    }, 1);

    if(math.equal(product,n)) {;


      pf = math.sort(pf);

      if(!solutions[pf.toString()]) {
        number_solutions++;
        solutions[pf.toString()] = pf; 

        if(cnt.options.debug) {
          console.log("%d)\t%d = %s\t(%s)", number_solutions, math.number(n), math.number(pf).join(' * '), elapsed_time());  
        }    

        if(cnt.options.notice) {
          console.log("\tFound solution number %s (%s).", number_solutions, elapsed_time());  
        } 

      }
      return;
    } else {
      return;
    }

  }

}

var uniq = function(input) {
  var a = [];
  for ( i = 0; i < input.length; i++ ) {
    var current = input[i];
    var found = false;

    for(var j in a) {
      if(math.equal(current, a[j])) {
        found = true;
        break;
      }
    }

    if (!found) a.push(current);
  }

  return a;
}



var module = module || {};
module.exports = solver;