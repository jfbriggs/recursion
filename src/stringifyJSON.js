// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

// STEP 1: Figure out what type of element you're dealing with to begin with

var stringifyJSON = function(obj, length) {
  // your code goes here
  if (obj === NaN || obj === null) {
    return "null";

  } else if (typeof obj === undefined || typeof obj === 'function') {
    return undefined;

  } else if (typeof obj === 'string') {
    return '"' + obj + '"';

  } else if (typeof obj === 'number' || typeof obj === 'boolean') {
    return "" + obj;

  } else if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      // CODE FOR AN ARRAY
      var result = [];
      var stringifyArray = function(arr, i) {
        if (i === arr.length) {
          return;
        } else {
          var stringified = stringifyJSON(arr[i]);
          if (stringified === undefined) {
            result.push("null")
          } else {
            result.push(stringified);
          }
          stringifyArray(arr, i + 1);
        }
      }
      stringifyArray(obj, 0);
      return "[" + result.join(",") + "]";

    } else {
      // CODE FOR AN OBJECT
      var result = [];
      for (var key in obj) {
        var prop = key;
        if (typeof prop === 'number') {
          prop = "" + prop;
        }
        var value = stringifyJSON(obj[key]);
        if (value !== undefined) {
          result.push('"' + prop + '"' + ':' + value);
        }
      }
      return "{" + result.join(",") + "}";
    }
  }
};


/* ========================================
   HYPOTHESIS / EXPERIMENT / PSEUDO CODE
   ========================================

FOR AN ARRAY:

  ['a', 'b', 'c', [3, 1, 3], 'd']

  JOIN -> ['[', '"a"', '"b"', '"c"', "[3,1,3]", '"d"', ']']
  output: '["a","b","c","[3,1,3]","d"]'


FOR AN OBJECT

  {a: 1, b: 2, c: {z: 1, y: 3, 4: 2}, 3: 4}
  ==> "{"a":1,"b":2,"c":{"z":1,"y":3},"d":4}"

  ** NO SPACES

  IF A VALUE IS UNDEFINED, THAT KEY/VALUE PAIR IS OMITTED FROM THE STRINGIFIED OBJECT
  {a: 3, b: undefined} ==> '{"a":3}'


GENERAL HYPOTHESES:

  1) An array as an element or value within an object/greater array will just return clumped together
  2) An object as an element or value within another object/an array will return clumped with keys in quotes

  {a: 1, b: 2} ==> ['{', '"a":1', '"b":2', '}']

*/