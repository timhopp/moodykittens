/**
 * To do
 * 
 * - Ensure new kitten Name does not match current kitten, 
 * create alert that explains this
 * 
 * =If kitten is gone, make sure it runs away and card refelcts that
 */










/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
let currentKitten = {};

/**Alert Banner */
let modal = document.getElementById('myModal');
let emptymodal = document.getElementById('emptyModal');
let modalclose = document.getElementById("close");
let emptymodalclose = document.getElementById("emptyclose");

modalclose.onclick = function() {
  modal.style.display = "none";
}

emptymodalclose.onclick = function() {
  emptymodal.style.display = "none";
  console.log("what the fuck")
}
/**
 * Called when submitting the new Kitten Form--check
 * This method will pull data from the form--pulled name
 * use the provided function to give the data an id--generated ID
 * you can use robohash for images--check? <INSERTCATNAMEHERE>??
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.--check
 * Then reset the form--check
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target;
  let kitten = {};
  let kittenName = form.name.value;
  let currentCat = kittens.find(kitten => kitten.name == kittenName);
if(kittenName == "") {
  emptymodal.style.display = "block";
}

 else if(currentCat) {
  modal.style.display = "block";

} else {
  kitten = {
    id:generateId(),
    name: form.name.value,
    affection: 5,
    mood: 'tolerant',
}

 kittens.push(kitten);
 saveKittens();

}
form.reset();
drawKittens();
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
 let loadedKitten = JSON.parse(window.localStorage.getItem("kittens"));
 if(loadedKitten) {
   kittens = loadedKitten;
 }
}

/**
 * Draw all of the kittens to the kittens element
 * <button class = "delete-button"onclick="removeKitten('${kitten.id}')">Delete</button>
 */
function drawKittens() {
  let kittenElement = document.getElementById("kittens")
  let kittenTemplate = ''
  kittens.forEach(kitten => {
    if(kitten.mood == "Gone"){
      kittenTemplate +=`
    <div class = "card text-center mt-1 mb-1 Gone">
    <img src="https://robohash.org/${kitten.name}?set=set4" alt="Moody Kitty" class = "kitten ${kitten.mood} img">
    <p>
    <span class= "kitten gone">Name: ${kitten.name}</span>
    </p>
    <p>
    <span class = "kitten gone">Ran Away</span>
    </p>
    </div>
      `
    } else {
    kittenTemplate += `
    <div class= "card text-center mt-1 mb-1">
    <img src="https://robohash.org/${kitten.name}?set=set4" alt="Moody Kitty" class = "kitten ${kitten.mood} img">
    <p>
    <i class= "label"></i>
    <span>Name: ${kitten.name}</span>
    <i class= "label"></i>
    </p>
    <p>
    <span>Mood: ${kitten.mood} </span>
    </p>
    <p>
    <span>Affection: ${kitten.affection} </span>
    <br>
    <span><button class = "container" onclick="pet('${kitten.id}')">Pet</button></span>
    <span><button class = "buttonalt container" onclick="catnip('${kitten.id}')">catNip</button></span>
    <br>
    <i class="far fa-trash-alt m-2"  onclick="removeKitten('${kitten.id}')"></i>
    </div>
    `
    }
})

  kittenElement.innerHTML = kittenTemplate
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */

 //*How to assign affection to the individual kitten??

 function pet(id) {
  currentKitten = findKittenById(id);
  let petquality = Math.random();
  if(petquality > .7){
    currentKitten['affection'] += 1;
  } else {
    currentKitten['affection'] -= 1;
  }
  setKittenMood(currentKitten);
  saveKittens();
  }


/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  currentKitten = findKittenById(id);
  currentKitten['affection'] = 5;
  currentKitten['mood'] = 'Tolerant';
  saveKittens();
  drawKittens();
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} 
 */
/** Figure out why new class isn't being added */
function setKittenMood(currentKitten) {
  let catMood = document.getElementById("innerkitten");
  console.log(catMood);
  if(currentKitten['affection'] >= 6){
    currentKitten['mood'] = 'Happy';
  } else if (
    currentKitten['affection'] <= 5 && currentKitten['affection'] > 3){
    currentKitten['mood'] = 'Tolerant'; 
  } else if (
    currentKitten['affection'] <= 3 && currentKitten['affection'] > 0){
    currentKitten['mood'] = 'Angry';
    } else {
      currentKitten['mood'] = 'Gone';
    }
  }

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("kittens").classList.remove("hidden");
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

function removeKitten(kittenId) {
  let index = kittens.findIndex(kitten => kitten.id == kittenId)
  if(index == -1){
    throw new Error("Invalid Kitten Id")
  }
  kittens.splice(index, 1)
  saveKittens();
}

function clearKittens(){
  window.localStorage.clear();
  location.reload();
}

loadKittens()
drawKittens()

