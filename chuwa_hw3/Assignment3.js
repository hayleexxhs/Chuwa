/*
Question 1
Given the following array and implement the table dynamically
*/

const tableInfo = {
  tableHeader: ["Student Name", "Age", "Phone", "Address"],
  tableContent: [
    {
      "Student Name": "John",
      Age: 19,
      Phone: "455 - 983 - 0903",
      Address: "123 Ave, San Francisco, CA, 94011",
    },
    {
      "Student Name": "Alex",
      Age: 21,
      Phone: "455 - 983 - 0912",
      Address: "456 Rd, San Francisco, CA, 94012",
    },
    {
      "Student Name": "Josh",
      Age: 22,
      Phone: "455 - 345 - 0912",
      Address: "789 Dr, Newark, CA, 94016",
    },
    {
      "Student Name": "Matt",
      Age: 23,
      Phone: "321 - 345 - 0912",
      Address: "223 Dr, Sunnyvale, CA, 94016",
    },
  ],
};

const createTableHead = (head_name) => {
  let th = document.createElement("th");
  th.textContent = head_name;
  return th;
};

const createTableContent = (s_name, age, phone, address) => {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.textContent = s_name;
  let td2 = document.createElement("td");
  td2.textContent = age;
  let td3 = document.createElement("td");
  td3.textContent = phone;
  let td4 = document.createElement("td");
  td4.textContent = address;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  return tr;
};

const firstDiv = document.getElementById("firstDiv");
let table = document.createElement("table");
firstDiv.appendChild(table);
let tr = document.createElement("tr");
tableInfo.tableHeader.forEach((e) => {
  tr.appendChild(createTableHead(e));
});
tableInfo.tableContent.forEach((e) => {
  table.appendChild(
    createTableContent(e["Student Name"], e.Age, e.Phone, e.Address)
  );
});

/*
  Question 2
  Given the array and generate order list and unordered list dynamically as following:
  */

const list = ["HTML", "JavaScript", "CSS", "React", "Redux", "Java"];

const secondDiv = document.getElementById("secondDiv");
const createlist = (isOrdered) => {
  let listType = isOrdered ? "ol" : "ul";
  let newList = document.createElement(listType);
  list.forEach((e) => {
    let li = document.createElement("li");
    li.textContent = e;
    newList.appendChild(li);
  });
  return newList;
};
secondDiv.appendChild(createlist(true));
secondDiv.appendChild(createlist(false));

/*
  Question 3
  Given a array and implement a dropdown list with the following options dynamically 
  FYI: use 'value' in the object as the value attribute in the option tag when you create the dropdown list
  */

const dropDownList = [
  { value: "newark", content: "Newark" },
  { value: "santaClara", content: "Santa Clara" },
  { value: "unionCity", content: "Union City" },
  { value: "albany", content: "Albany" },
  { value: "dalyCity", content: "Daly City" },
  { value: "sanJose", content: "San Jose" },
];

const thirdDiv = document.getElementById("thirdDiv");
let select = document.createElement("select");
thirdDiv.appendChild(select);
dropDownList.forEach(({ value, content }) => {
  let opt = document.createElement("option");
  opt.value = value;
  opt.textContent = content;
  select.appendChild(opt);
});