var math = require('mathjs');
math.config({
  number: 'bignumber',
  precision: 512 
});

var getPrimeFactors = {
  
  calculate: function(input) {
    input = math.bignumber(input);
    divisor = math.bignumber(2);
    while (math.smallerEq(divisor, input)) {
      if (math.mod(input, divisor) == 0) {
        return [divisor].concat( this.calculate(math.divide(input, divisor)) );
      }
      divisor = math.add(divisor, 1);
    }
    return [];
  },

  byFiles: function(input) {
    var primeNumbers = require('../tool/primeNumbers.js');

    input = math.bignumber(input);

    for(var i in primeNumbers) {

      divisor = math.bignumber(primeNumbers[i]);

      if(math.smallerEq(divisor, input)){
        if (math.mod(input, divisor) == 0) {
          return [divisor].concat( this.byFiles(math.divide(input, divisor)) );
        }
      } else {
        return [];  
      }
      
    }

    return []; 

  },

}

var module = module || {};
module.exports = getPrimeFactors;