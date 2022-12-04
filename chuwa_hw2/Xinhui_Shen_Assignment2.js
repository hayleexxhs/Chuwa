/*
Question 1
Given the array, implement a function for generating a new array which doubles the quantity and price in each object.
Given the array, implement a function for generating a new array which contains item quantity > 2 and price > 300 only.
Given the array, implement a function to calculate the total value of the items.
*/

const itemsObject = [
  { quantity: 1, price: 200 },
  { quantity: 3, price: 350 },
  { quantity: 5, price: 400 },
];

const test = [1, 2, 3, 4, 5];

//Given the array, implement a function for generating a new array which doubles the quantity and price in each object.
console.log("---------- Q1 - 1 ----------");
const itemsObject2 = itemsObject.map((ele) => {
  return { quantity: ele.quantity * 2, price: ele.price * 2 };
});
console.log(itemsObject2);

//Given the array, implement a function for generating a new array which contains item quantity > 2 and price > 300 only.
console.log("---------- Q1 - 2 ----------");
const itemsObject3 = itemsObject.filter((ele) => {
  return ele.quantity > 2 && ele.price > 300;
});
console.log(itemsObject3);
// const itemsObject3 = itemsObject.filter(filterFunction);
// function filterFunction(ele) {
//   return ele.quantity > 2 && ele.price > 300;
// }

//Given the array, implement a function to calculate the total value of the items.
console.log("---------- Q1 - 3 ----------");
let tot = 0;
itemsObject.forEach((ele) => {
  tot += ele.quantity * ele.price;
});
console.log(tot);

/*
  Question 2
  Given the string, implement a function to remove all the non-alphabet characters and extra space in the string and convert the string to all lowercase.
*/

const tgtString =
  " Perhaps The Easiest-to-understand   Case   For Reduce Is   To Return The Sum Of  All The Elements In  An Array  ";

const expectedReturnString =
  "perhaps the easiest to understand case for reduce is to return the sum of all the elements in an array";

console.log("------------ Q2 ------------");
const regexPattern = /[^A-Za-z0-9]/g; //regular expression for non-alphabet
function removeNonalphaAndExtraSpace(str) {
  let arr = str.trim().replace(regexPattern, " ").toLowerCase().split(" ");

  // str.split(' ') split extra space into '' - using filter to remove ''
  // if want to use continue in forEach(), filter out unwanted values first
  // or use for loop instead
  return arr.filter((e) => e != "").join(" ");

  //   let resString = "";
  //   arr
  //     .filter((e) => e != "")
  //     .forEach((e) => {
  //       // console.log(e);
  //       resString += e + " ";
  //     });
  //   return resString.trimEnd();
}

const resStr = removeNonalphaAndExtraSpace(tgtString);
console.log(resStr);
console.log(resStr == expectedReturnString);

/*
  Question 3
  Implement a function to merge two arrays of objects on uuid, but first has uuid and name, second has uuid and role. With the not existing property, fill with null. Sort according to uuid after merge.
  */

const first = [
  { uuid: 2, name: "test" },
  { uuid: 5, name: "test5" },
  { uuid: 3, name: "test3" },
];

const second = [
  { uuid: 6, role: "pm" },
  { uuid: 4, role: "engineer" },
  { uuid: 1, role: "manager" },
  { uuid: 2, role: "associate" },
];

const expectedReturnArray = [
  { uuid: 1, role: "manager", name: null },
  { uuid: 2, role: "associate", name: "test" },
  { uuid: 3, role: null, name: "test3" },
  { uuid: 4, role: "engineer", name: null },
  { uuid: 5, role: null, name: "test5" },
  { uuid: 6, role: "pm", name: null },
];

console.log("------------ Q3 ------------");
function compareUUID(a, b) {
  return a.uuid - b.uuid;
}

function mergeTwoArrays(arr1, arr2) {
  arr1 = arr1.sort(compareUUID);
  arr2 = arr2.sort(compareUUID);
  console.log(arr1);
  console.log(arr2);
  let n = arr1.length,
    m = arr2.length,
    i = 0,
    j = 0;
  let arr3 = [];
  for (; i < n && j < m; ) {
    if (arr1[i].uuid == arr2[j].uuid) {
      arr3.push({ uuid: arr1[i].uuid, role: arr2[j].role, name: arr1[i].name });
      i++, j++;
    } else if (arr1[i].uuid < arr2[j].uuid) {
      arr3.push({ uuid: arr1[i].uuid, role: null, name: arr1[i].name });
      i++;
    } else {
      arr3.push({ uuid: arr2[j].uuid, role: arr2[j].role, name: null });
      j++;
    }
  }

  while (i < n) {
    arr3.push({ uuid: arr1[i].uuid, role: null, name: arr1[i].name });
    i++;
  }

  while (j < m) {
    arr3.push({ uuid: arr2[j].uuid, role: arr2[j].role, name: null });
    j++;
  }

  return arr3;
}

const resArr = mergeTwoArrays(first, second);
console.log(resArr);
console.log(expectedReturnArray);
console.log(resArr == expectedReturnArray);
