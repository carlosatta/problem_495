#!/usr/bin/env node


// Let W(n,k) be the number of ways in which n can be written as the product of k distinct positive integers.
// Note that permutations of the integers themselves are not considered distinct.
// Furthermore, W(100!,10) modulo 1 000 000 007 = 287549200.
// Find W(10000!,30) modulo 1 000 000 007.

// /bin/bash -c "ulimit -s 65500; exec /usr/local/bin/node --stack-size=65500 /Users/Satta/Desktop/problem_495/app.js -n 10000! -k 30 -f"



var solver = require('./script/solver');

var argv = require('optimist')
    .usage('Let W(n,k) be the number of ways in which n can be written as the product of k distinct positive integers.')
    // .default('n', 144)
    // .default('k', 4)
    .demand(['n','k'])
    .boolean(['d', 's', 'f'])
    .describe('n', 'target number')
    .describe('k', 'number of factors')
    .describe('s', 'accept as factor same number of n')
    .describe('d', 'print founded formula')
    .describe('f', 'notice when found a combination')
    .argv;


var target = argv.n;
var number_element = argv.k;
var options = {
  debug:  argv.d,
  same:   argv.s,
  notice: argv.f,
}   

solver(target, number_element, options);

