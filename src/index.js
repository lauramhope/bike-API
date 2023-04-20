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

async function searchByUserSelection(color, stolen, city) {
  const response = await BikeIndex.searchByUserSelection(color, stolen, city); 
  if (response.bikes) {
    printElements(response.bikes);
  } else {
    printError(response); 
  }
}

async function displayFurtherResults(color, stolen, city, page) {
  const response = await BikeIndex.displayFurtherResults(color, stolen, city, page); 
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

async function printStatistics(city) {
  const stolenList = filterByStolen(city);
  const manufacturerStats = await manufacturerStatistics(stolenList);
  //let newUl = document.createElement("ul");
  // manufacturerStats.forEach(function(value, key) {
  //   let liTag = document.createElement("li");
  //   liTag.append(`${key}: ${value}`);
  //   newUl.append(liTag);
  // });
  //document.getElementById("response").append(newUl);
  let statistic = [...manufacturerStats.entries()].reduce((b, e ) => e[1] > b[1] ? e : b);
  let newDiv = document.getElementById('statistic');
  newDiv.innerText = null;
  newDiv.setAttribute("class", "box1");
  newDiv.append(`${statistic[0]} is the most frequently stolen brand near ${city}.The stolen bike number is ${statistic[1]}.`);
}

function printElements(data) {
  document.getElementById("response").innerText = null;
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
  // document.querySelector('#color').value = null;
  // document.getElementById('response').innerText = null; 
  searchByUserSelection(color, stolen, city);  
}

function handleNextPage(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  const color = document.querySelector('#color').value;
  const stolen = document.querySelector("input[name='stolenness']:checked").value;
  const page = document.querySelector("button.selector").getAttribute("id");
  displayFurtherResults(color, stolen, city, page);
  let button = document.querySelector("button.selector");
  button.setAttribute("id", parseInt(page) + 1);
}

function handleStatistics(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  printStatistics(city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
  document.querySelector('form').addEventListener("submit", handleStatistics);
  document.querySelector("button.selector").addEventListener("click", handleNextPage);
});