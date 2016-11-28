// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

// ** YOU SHOULD USE document.body, element.childNodes, and element.classList **

var getElementsByClassName = function(className) {
  var result = [];

  var classCheck = function(className, element) {
    if (element.classList !== undefined) {
      // Convert token list to array for .includes() functionality
      var classArray = Array.prototype.slice.apply(element.classList);
      // Determine if element has passed in class, push element to result if so
      if (classArray.includes(className)) {
        result.push(element);
      }
    }

    // Determine if element has children; if so, run classCheck on each
    var children = element.childNodes;

    var checkChild = function(list, i) {
      if (i === list.length) {
        return;
      } else {
        classCheck(className, list[i]);
        checkChild(list, i + 1);
      }
    }

    if (children.length > 0) {
      checkChild(children, 0);
    }
  }

  // Invoke classCheck on document.body as starting point
  classCheck(className, document.body);

  return result;
}


/*

=============================
HYPOTHESES / EXPERIMENT CODE
=============================

GENERAL PROCESS:

Starting with document.body...

Step 1: Run .classList on element, check if contains passed-in className
Step 2: If it does, add that element to result array
Step 3: Run .childNodes on element
Step 4: If childNodes array's length is 0, stop; otherwise, restart this process on each element in that array

Step 5: Return result array

*/