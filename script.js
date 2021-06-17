function init(){
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
      
   form.addEventListener("submit", function(event) {
      if (pilotName.value === ''|| copilotName.value === ''|| fuelLevel.value === '' || cargoMass.value === ''){
         event.preventDefault();
         alert("All fields need a value!");
      }else if(isNaN(fuelLevel.value) === true || isNaN(cargoMass.value) === true ||isNaN(copilotName.value) === false || isNaN(pilotName.value) === false){
         event.preventDefault();
         alert("Please enter valid information for all fields!");
      }else{
         event.preventDefault();
         pilotUpdate();
         fuelLevelCheck();
         cargoMassCheck();
         retrievePlanetaryData();
      }//end of submit if statement
   });//end of anon submit function


}//end of init function

window.addEventListener("load", init);

function pilotUpdate(){
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let faultyItems = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   faultyItems.style.visibility = "visible";
   pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for takeoff.`;
   copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for takeoff.`;
}

function fuelLevelCheck(){
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let fuelStatus = document.getElementById("fuelStatus");
   let launchStatus = document.getElementById("launchStatus");
   if (fuelLevel.value < 10000){
      fuelStatus.innerHTML = `Fuel level too low for launch.`;
      launchStatus.style.color = "red";
      fuelStatus.style.color = "red";
      launchStatus.innerHTML = `Shuttle not ready for launch.`;
   } else {
      launchStatus.style.color = "green";
      launchStatus.innerHTML = "Shuttle ready for launch";
      fuelStatus.innerHTML = `Fuel level high enough for launch`;
      fuelStatus.style.color = "black";
   } //end of if statement
}//end of fuelLevelCheck function

function cargoMassCheck(){
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   if (cargoMass.value > 10000){
      cargoStatus.innerHTML = `Cargo mass too high for launch.`;
      launchStatus.style.color = "red";
      cargoStatus.style.color = "red";
      launchStatus.innerHTML = `Shuttle not ready for launch.`;
   } else if (cargoMass.value < 10000 && fuelLevel.value > 10000) {
      launchStatus.style.color = "green";
      launchStatus.innerHTML = "Shuttle ready for launch";
      cargoStatus.innerHTML = `Cargo mass low enough for launch`;
      cargoStatus.style.color = "black";
   } //end of if statement
}//end of cargoMass function

function retrievePlanetaryData(){
   let json = [];
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         let num = Math.floor(Math.random()*6);
         const missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[num].name}</li>
            <li>Diameter: ${json[num].diameter}</li>
            <li>Star: ${json[num].star}</li>
            <li>Distance from Earth: ${json[num].distance}</li>
            <li>Number of Moons: ${json[num].moons}</li>
         </ol>
         <img src="${json[num].image}">`;
      });//end of anon json function
   });//end of anon fetch function
}//end of retrievePlanetaryData function



