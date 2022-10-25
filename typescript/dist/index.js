"use strict";
let sales = 123456789;
let course = "typescript";
let is_published = true;
let numbers = [1, 2, 2];
let user = [1, "number"];
var Size;
(function (Size) {
    Size[Size["Small"] = 121] = "Small";
    Size[Size["Medium"] = 124] = "Medium";
    Size[Size["Large"] = 125] = "Large";
})(Size || (Size = {}));
let mySize = Size.Large;
console.log(mySize);
function calculateTax(income, taxYear = 2022) {
    if (taxYear < 50000) {
        return income * 1.2;
    }
    return income * 1.3;
}
console.log(calculateTax(10000));
let employee = { id: 1, name: "jose" };
console.log(employee.id = 4);
//# sourceMappingURL=index.js.map