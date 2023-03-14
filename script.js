"use strict";

// selecting variables
const name = document.getElementById("name");
const id = document.getElementById("id");
const occupation = document.getElementById("occupation");
const submit = document.getElementById("submit");
const dashboard = document.getElementById("dashboard");
const dashboardHeader = document.getElementById("dashboard-header");
const deleteAll = document.getElementById("delete-all");

class dataConstructor {

    constructor(name, id , occupation){
        this.name = name;
        this.id = id;
        this.occupation = occupation;
    }
}



// get data for user
function getData(){
    // validation of values
   if(name.value === "" || /\d/.test(name.value)) alert("Please provide a real name (name should not contain numbers)");
   else if(id.value === "" || !Number(id.value)) alert("Please provide a number as id");
   else if(occupation.value === "" || /\d/.test(occupation.value)) alert("Please provide a real occupation (Should not contain numbers)");

//    if everything is fine

   else {

    // dash board header
    dashboardHeader.classList.remove("hidden");
    deleteAll.classList.remove("hidden");
    // creating object data
    const userObject = new dataConstructor(name.value, id.value, occupation.value);
    setData(userObject);
    displayData(userObject);

    // empty input field
    name.value ="";
    id.value ="";
    occupation.value ="";
   
   }

}

// set data to local storage

function setData(obj){

    const UserStringData = JSON.stringify(obj);
    localStorage.setItem(`${obj.name}_${obj.id}`, UserStringData);

}

// displaying data on web page
function displayData(obj){
    dashboard.innerHTML += `
    <ul class="flex items-center gap-4 p-3">
    <li class="text-gray-700 w-80 text-center py-2">${obj.name}</li>
    <li class="text-gray-700 w-80 text-center py-2">${obj.id}</li>
    <li class="text-gray-700 w-80 text-center py-2">${obj.occupation}</li>
    <button class="text-red-700 text-center cursor-pointer" onclick="deleteItem('${obj.name}_${obj.id}')">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-red-700">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          
    </button>
</ul>
    `;
}

// load data from storage
function loadDataFromStorage(){
    if(localStorage.length > 0){

        dashboardHeader.classList.remove("hidden");
        deleteAll.classList.remove("hidden");
        
    }
    for(let keys in localStorage){
        let data = localStorage.getItem(keys);
        if(typeof(data) === "string"){
        data = JSON.parse(data);
        // display data for every object stored in local storage
        displayData(data);
    }
    }
    
}

// calling function to load data
loadDataFromStorage();

// function to remove item

function deleteItem(obj){

    localStorage.removeItem(obj);
    dashboard.innerHTML = ``;
    loadDataFromStorage();

    if(!localStorage.length){
        deleteAll.classList.add("hidden"); 
    }
    
}

// delete all functionality
deleteAll.addEventListener("click", ()=>{

  
    localStorage.clear();
    loadDataFromStorage();
    dashboard.innerHTML = "";
    deleteAll.classList.add("hidden");

})