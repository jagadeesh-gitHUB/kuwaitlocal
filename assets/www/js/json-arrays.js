/*******************************************************************************
* @Copyright (c) 2011 John DeVight
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
(function () {
    /// <summary>
    /// Get the first occurance of the JSON element in the array.
    /// </summary>
    /// <example>
    /// var result=JSON.find({
    ///     data:[{make:'honda',model:'civic',color:'white'},{make:'honda',model:'civic',color:'silver'},{make:'toyota',model:'sienna',color:'silver'}],
    ///     criteria:[{elementName:'model',elementValue:'civic'},{elementName:'color',elementValue:'silver'}]
    /// });
    /// </example>
    JSON.find = function (param) {
        if (param.data != null && param.data != undefined) {
            var aryElement = null;
            for (var idx = 0; idx < param.data.length; idx++) {
                aryElement = param.data[idx];
                var match = true;
                for (var cdx = 0; cdx < param.criteria.length && match; cdx++) {
                    var elementName = param.criteria[cdx].elementName;
                    var elementValue = aryElement[elementName];
                    match = ((elementValue != undefined) && (elementValue.toString() == param.criteria[cdx].elementValue.toString()));
                }
                if (match) {
                    param.index = idx;
                    return aryElement;
                }
            }
        }

        return null;
    }

    /// <summary>
    /// Get all occurances of the JSON element in the array.
    /// </summary>
    /// <example>
    /// var result=JSON.findAll({
    ///     data:[{make:'honda',model:'civic',color:'white'},{make:'honda',model:'civic',color:'silver'},{make:'toyota',model:'sienna',color:'silver'}],
    ///     criteria:[{elementName:'model',regEx:/^civ/},{elementName:'color',elementValue:'silver'}]
    /// });
    /// </example>
    JSON.findAll = function (param) {
        var results = [];
        if (param.data != null && param.data != undefined) {
            var aryElement = null;
            for (var idx = 0; idx < param.data.length; idx++) {
                aryElement = param.data[idx];
                var match = true;
                for (var cdx = 0; cdx < param.criteria.length && match; cdx++) {
                    try {
                        var elementName = param.criteria[cdx].elementName;
                        var elementValue = aryElement[elementName];
                        if (param.criteria[cdx].elementValue != undefined) {
                            match = ((elementValue != undefined) && (elementValue == param.criteria[cdx].elementValue.toString()));
                        } else if (param.criteria[cdx].regEx != undefined) {
                            match = ((elementValue != undefined) && (param.criteria[cdx].regEx.test(elementValue)));
                        }
                    } catch (err) {
                    }
                }
                if (match) {
                    results.push(aryElement);
                }
            }
        }

        return results;
    }

    /// <summary>
    /// Get the first occurance of the JSON element in the array.
    /// </summary>
    JSON.findArrayElement = function (objJsonArray, elementName, elementValue) {
        var aryElement = null;

        if (objJsonArray != null && objJsonArray != undefined) {
            for (var idx = 0; idx < objJsonArray.length; idx++) {
                if (objJsonArray[idx][elementName] != undefined) {
                    if (objJsonArray[idx][elementName].toString() == elementValue.toString()) {
                        aryElement = objJsonArray[idx];
                        break;
                    }
                }
            }
        }

        return aryElement;
    }

    /// <summary>
    /// Get the first occurance of the JSON element in the array.
    /// </summary>
    JSON.findArrayElementIgnoreCase = function (objJsonArray, elementName, elementValue) {
        var aryElement = null;
        var matchValue = elementValue.toString().toLowerCase();

        if (objJsonArray != null && objJsonArray != undefined) {
            for (var idx = 0; idx < objJsonArray.length; idx++) {
                if (objJsonArray[idx][elementName] != undefined) {
                    if (objJsonArray[idx][elementName].toString().toLowerCase() == matchValue) {
                        aryElement = objJsonArray[idx];
                        break;
                    }
                }
            }
        }

        return aryElement;
    }

    /// <summary>
    /// Get all the occurances of the JSON element in the array.
    /// </summary>
    JSON.findAllArrayElements = function (objJsonArray, elementName, elementValue) {
        var aryElements = [];

        if (elementName != null && elementName.length > 0 && elementValue != null && elementValue.toString().length > 0) {
            if (objJsonArray != undefined && objJsonArray != null) {
                for (var idx = 0; idx < objJsonArray.length; idx++) {
                    if (objJsonArray[idx][elementName] != undefined) {
                        if (objJsonArray[idx][elementName].toString() == elementValue.toString()) {
                            aryElements.push(objJsonArray[idx]);
                        }
                    }
                }
            }
        }

        return aryElements;
    }

    /// <summary>
    /// Locate a JSON element in an array and return the index of the JSON element.
    /// </summary>
    /// <return>Index of the array element if found, otherwise null is returned</return>
    JSON.indexOfArrayElement = function (objJsonArray, elementName, elementValue) {
        var idx;
        var found = false;

        if (objJsonArray != undefined && objJsonArray != null) {
            for (idx = 0; idx < objJsonArray.length; idx++) {
                if (objJsonArray[idx][elementName] != undefined) {
                    if (objJsonArray[idx][elementName].toString() == elementValue.toString()) {
                        found = true;
                        break;
                    }
                }
            }
        }

        return found ? idx : null;
    }

    /// <summary>
    /// Locate a JSON element in an array and replace it with a new JSON element.
    /// </summary>
    JSON.replaceArrayElement = function (objJsonArray, elementName, elementValue, newJsonElement) {
        var idx;

        if (objJsonArray != undefined && objJsonArray != null) {
            for (idx = 0; idx < objJsonArray.length; idx++) {
                if (objJsonArray[idx][elementName] != undefined) {
                    if (objJsonArray[idx][elementName].toString() == elementValue.toString()) {
                        objJsonArray.splice(idx, 1, newJsonElement);
                        break;
                    }
                }
            }
        }

        return idx;
    }

    /// <summary>
    /// Replace a JSON element in an array with a new JSON element by index.
    /// </summary>
    JSON.replaceArrayElementByIndex = function (objJsonArray, idx, newJsonElement) {
        objJsonArray.splice(idx, 1, newJsonElement);
    }

    /// <summary>
    /// Rebuild an array given an array of properties we want to save.
    /// </summary>
    JSON.redimensionArray = function (objJsonArray, redimensionArray) {
        var returnObj = [];

        if (objJsonArray != undefined && objJsonArray != null) {
            for (var idx = 0; idx < objJsonArray.length; idx++) {
                var tempArry = new Object();

                //go through the items that were passed and build a temp array to save.
                for (var redimIndx = 0; redimIndx < redimensionArray.length; redimIndx++)
                    tempArry[redimensionArray[redimIndx]] = objJsonArray[idx][redimensionArray[redimIndx]];

                returnObj.push(tempArry)
            }
        }

        return returnObj;
    }

    /// <summary>
    /// Remove an element from the array.
    /// </summary>
    JSON.removeArrayElement = function (objJsonArray, elementName, elementValue) {
        var idx = JSON.indexOfArrayElement(objJsonArray, elementName, elementValue);
        if (idx != null) {
            objJsonArray.splice(idx, 1);
        }
    }

    /// <summary>
    /// Remove an element from the array by index.
    /// </summary>
    JSON.removeArrayElementByIndex = function (objJsonArray, idx) {
        objJsonArray.splice(idx, 1);
    }

    /// <summary>
    /// Remove all elements from the array where the value of an element is equal to the value passed in.
    /// </summary>
    JSON.removeArrayElements = function (objJsonArray, elementName, elementValue) {
        for (var idx = (objJsonArray.length - 1); idx >= 0; idx--) {
            if (objJsonArray[idx][elementName] == elementValue) {
                JSON.removeArrayElementByIndex(objJsonArray, idx);
            }
        }
    }

    /// <summary>
    /// Sort array elements.
    /// </summary>
    JSON.sortArrayElements = function (objJsonArray, elementName, reverse, primer) {
        var sort_by = function (field, reverse, primer) {
            reverse = (reverse) ? -1 : 1;
            return function (a, b) {
                try {
                    a = a[field];
                    b = b[field];

                    if (typeof (primer) != 'undefined') {
                        a = primer(a);
                        b = primer(b);
                    }

                    if (a < b) return reverse * -1;
                    if (a > b) return reverse * 1;
                } catch (e) {
                }
                return 0;
            }
        }

        if (primer == null) {
            primer = function (a) { return a.toString().toUpperCase() };
        }

        objJsonArray.sort(sort_by(elementName, reverse, primer));

        return objJsonArray;
    }
} ());