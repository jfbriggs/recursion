// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

// STEP 1: Figure out what type of element you're dealing with to begin with

var stringifyJSON = function(obj) {
  // your code goes here
  if (typeof obj === undefined || typeof obj === 'function') {
    return undefined;
  } else if (typeof obj === 'string') {
    return '"' + obj + '"';
  } else if (typeof obj === 'number' || typeof obj === 'boolean') {
    return "" + obj;
  } else if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      // code to recursively run through array objects
    } else {
      // code to recursively run through key/value pairs
    }
  }
};


// HYPOTHESIS / TEST / PSEUDO CODE

function stringify(thing) {
  var result;
  if Array.isArray(thing) {
    var result = ["["];
    run function that pushes all remaining elements to result;
    result.push("]");
    return result.join(",");
  }
}

// ['a', 'b', 'c', [3, 1, 3], 'd']

// JOIN -> ['[', '"a"', '"b"', '"c"', "[3,1,3]", '"d"', ']']
// output: '["a","b","c","[3,1,3]","d"]'

// {a: 1, b: 2, c: {z: 1, y: 3}, d: 4}

// ==> "{"a":1,"b":2,"c":{"z":1,"y":3},"d":4}"