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
    console.log(response.bikes);
    printElements(response.bikes);
  } else {
    printError(response); 
  }
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
      modelParagraph.innerText = `Frame Model: ${element["frame_model"]}`;
      manufacturerParagraph.innerText = `Manufacturer Name: ${element["manufacturer_name"]}`;
      urlParagraph.innerText = `URL: ${element.url}`;
      newDiv.append(modelParagraph);
      newDiv.append(manufacturerParagraph);
      newDiv.append(urlParagraph);
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
  document.querySelector('#location').value = null;
  document.querySelector('#color').value = null;
  document.getElementById('response').innerText = null; 
  // searchByColor(color);
  // searchByStolenness(stolen);
  // searchByLocation(city);
  searchByUserSelection(color, stolen, city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});