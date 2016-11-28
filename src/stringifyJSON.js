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
      // code for an array
      var result = [];
      var stringifyArray = function(arr, i) {
        if (i === arr.length) {
          return;
        } else {
          result.push(stringifyJSON(arr[i]));
          stringifyArray(arr, i + 1);
        }
      }
      stringifyArray(obj, 0);
      return "[" + result.join(",") + "]";
    } else {
      // code for an object
      var result = "";
    }
  }
};


/* ========================================
   HYPOTHESIS / EXPERIMENT / PSEUDO CODE
   ========================================



function stringifyObject(obj) {
  var result = ["{"];
  run func that goes through all pairs, puts keys in quotes + ":" + value with no spaces, pushes each to array;
  result.push("}");
  return result.join(",")
}


FOR AN ARRAY:

  ['a', 'b', 'c', [3, 1, 3], 'd']

  JOIN -> ['[', '"a"', '"b"', '"c"', "[3,1,3]", '"d"', ']']
  output: '["a","b","c","[3,1,3]","d"]'


FOR AN OBJECT

  {a: 1, b: 2, c: {z: 1, y: 3}, d: 4}
  ==> "{"a":1,"b":2,"c":{"z":1,"y":3},"d":4}"

  ** NO SPACES

  IF A VALUE IS UNDEFINED, THAT KEY/VALUE PAIR IS OMITTED FROM THE STRINGIFIED OBJECT
  {a: 3, b: undefined} ==> '{"a":3}'


GENERAL HYPOTHESES:

  1) An array as an element or value within an object/greater array will just return clumped together
  2) An object as an element or value within another object/an array will return clumped with keys in quotes

  {a: 1, b: 2} ==> ['{', '"a":1', '"b":2', '}']

*/