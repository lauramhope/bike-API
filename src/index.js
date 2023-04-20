import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeIndex from './bike.js';

// Business Logic

// async function searchByColor(color) {
//   const response = await BikeIndex.searchByColor(color);
//   if (response.main) {
//     printElements(response, color);
//   } else {
//     printError(response, color);
//   }
// }

// async function searchByStolenness(stolen) {
//   const response = await BikeIndex.searchByStolenness(stolen);
//   if (response.main) {
//     printElements(response, stolen);
//   } else {
//     printError(response, stolen);
//   }
// }

// async function searchByLocation(city) {
//   const response = await BikeIndex.searchByLocation(city);
//   if (response.main) {
//     printElements(response, city);
//   } else {
//     printError(response, city);
//   }
// }

async function searchByUserSelection(color, stolen, city) {
  const response = await BikeIndex.searchByUserSelection(color, stolen, city); 
  if (response.bikes) {
    printElements(response.bikes);
  } else {
    printError(response); 
  }
}

async function filterByStolen(city) {
  const response = await BikeIndex.getManufacturerInfo(city); 

  if (response.bikes) {
    let stolenBikes = [];
    response.bikes.forEach(element => {
      if (element["stolen"] === true) {
        stolenBikes.push(element);
      }
    });
    return stolenBikes;
  } else {
    printError(response); 
  }
}

async function manufacturerStatistics(bikeList) {
  const list = await bikeList;
  //console.log(list);
  let manufacturerStats = new Map();
  list.forEach(element => {
    if (manufacturerStats.has(element["manufacturer_name"])) {
      let newValue = manufacturerStats.get(element["manufacturer_name"]);
      newValue += 1;
      manufacturerStats.set(element["manufacturer_name"], newValue);
    } else {
      manufacturerStats.set(element["manufacturer_name"], 1);
    }
  });
  return manufacturerStats;
}

// function stolenSorter(inputMap) {
//   const newMap = inputMap;
//   let outputMap = new Map();
// }

// UI Logic
// function printElements1(data) {
//   data.forEach(element => {
    
//     let newDiv = document.createElement("div");
//     newDiv.setAttribute("class", "box1");
//     let modelParagraph = document.createElement("p");
//     let manufacturerParagraph = document.createElement("p");
//     let urlParagraph = document.createElement("p");
//     modelParagraph.innerText = `Frame Model: ${element["frame_model"]}`;
//     manufacturerParagraph.innerText = `Manufacturer Name: ${element["manufacturer_name"]}`;
//     urlParagraph.innerText = `URL: ${element.url}`;
//     newDiv.append(modelParagraph);
//     newDiv.append(manufacturerParagraph);
//     newDiv.append(urlParagraph);
//     document.getElementById("response").append(newDiv);
    
//   });
// }

// async function makeApiCall() {
//   const response = await fetch("http://some-api-call.com");
//   const jsonifiedResponse = await response.json();
//   return jsonifiedResponse;
// }

async function printStatistics(city) {
  const stolenList = filterByStolen(city);
  const manufacturerStats = await manufacturerStatistics(stolenList);
  let newUl = document.createElement("ul");
  manufacturerStats.forEach(function(value, key) {
    let liTag = document.createElement("li");
    liTag.append(`${key}: ${value}`);
    newUl.append(liTag);
  });
  document.getElementById("response").append(newUl);
  let statistic = [...manufacturerStats.entries()].reduce((b, e ) => e[1] > b[1] ? e : b);
  document.getElementById('statistic').append(statistic);
}


function printElements(data) {
  data.forEach(element => {
    const currentTime = Date.now();
    const stolenDate = (element["date_stolen"])*1000;
    if (currentTime - stolenDate <= 604800000) {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("class", "box1");
      let modelParagraph = document.createElement("p");
      let manufacturerParagraph = document.createElement("p");
      let urlParagraph = document.createElement("p");
      let aTag = document.createElement("a"); 
      modelParagraph.innerText = `Frame Model: ${element["frame_model"]}`;
      manufacturerParagraph.innerText = `Manufacturer Name: ${element["manufacturer_name"]}`;
      aTag.innerText = `${element.url}`;
      newDiv.append(modelParagraph);
      newDiv.append(manufacturerParagraph);
      newDiv.append(urlParagraph);
      aTag.setAttribute("href", `${element.url}`); 
      urlParagraph.append(aTag);
      document.getElementById("response").append(newDiv);
    }
  });
}

function printError() {
  document.querySelector('#showResponse').innerText = `There was an error accessing the bike index data`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  const color = document.querySelector('#color').value;
  const stolen = document.querySelector("input[name='stolenness']:checked").value;
  //document.querySelector('#location').value = null;
  document.querySelector('#color').value = null;
  document.getElementById('response').innerText = null; 
  searchByUserSelection(color, stolen, city);  
}

function handleStatistics(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  printStatistics(city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
  document.querySelector('form').addEventListener("submit", handleStatistics);
});



// function printElements(data) {
//   data.forEach(element => {
//     const currentTime = Date.now();
//     const stolenDate = (element["date_stolen"])*1000;
//     if (currentTime - stolenDate <= 604800000) {
//       let newDiv = document.createElement("div");
//       newDiv.setAttribute("class", "box1");
//       let modelParagraph = document.createElement("p");
//       let manufacturerParagraph = document.createElement("p");
//       let urlParagraph = document.createElement("p");
//       modelParagraph.innerText = `Frame Model: ${element["frame_model"]}`;
//       manufacturerParagraph.innerText = `Manufacturer Name: ${element["manufacturer_name"]}`;
//       urlParagraph.innerText = `URL: ${element.url}`;
//       newDiv.append(modelParagraph);
//       newDiv.append(manufacturerParagraph);
//       newDiv.append(urlParagraph);
//       document.getElementById("response").append(newDiv);
//     }
//   });
// }