// FILE: script.js

// complete the TODO comments

// Get references to page elements
const button = document.getElementById("makeSmoothie");
const outputDiv = document.getElementById("output");

// Helper function to display messages on the page
function showMessage(message) {
  const p = document.createElement("p");
  p.textContent = message;
  outputDiv.appendChild(p);
}

// Helper function that returns a Promise that resolves after a delay
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* =========================
   PART 1 — PROMISE FUNCTIONS
========================= */

// Step 1: Get ingredients
function getIngredients() {
  // TODO:
  // 1. Show message: "Gathering ingredients..."
  // 2. Wait 2 seconds using wait()
  // 3. Resolve with "Ingredients ready"

  return new Promise((resolve, reject) => {

    // Your code here
    showMessage("Gathering ingredients...");
    
    wait(2000).then( _ => {
      resolve("Ingredients ready")
    });
  });
}

// Step 2: Blend smoothie
function blendSmoothie() {
  // TODO:
  // 1. Show message: "Blending smoothie..."

  // 2. Wait 3 seconds
  // 3. Sometimes FAIL (see assignment instructions)
  // 4. Otherwise resolve with "Smoothie blended"

  return new Promise((resolve, reject) => {

    showMessage("Blending smoothie...");
    
    wait(3000).then(() => {
      if(Math.random() > .3) {
        resolve("Smoothie blended");
      }
      else {
        reject("ERROR: Blender broke!");
      }
    });
  });
}

// Step 3: Pour smoothie
function pourSmoothie() {
  // TODO:
  // 1. Show message: "Pouring into cup..."
  // 2. Wait 1 second
  // 3. Resolve with "Smoothie is ready!"

  return new Promise((resolve, reject) => {
    showMessage("Pouring into cup...");
    wait(1000).then(() => { 
      resolve("Smoothie is ready!");        
    })
    // Your code here
  });
}

/* =========================
   PART 2 — PROMISE CHAIN VERSION
========================= */

function makeSmoothieWithPromises() {
  button.disabled = true; 
  outputDiv.innerHTML = ""; // Clear previous messages

  // TODO: Chain the steps in order using .then()
  getIngredients()
  .then(blendSmoothie)
  .then(pourSmoothie)
  .then(() => {
    showMessage("Smoothie blended succesfully");
  })
  .catch(error => {
    showMessage(error);
  });
  button.disabled = false;
}

/* =========================
   PART 3 — ASYNC/AWAIT VERSION
========================= */

async function makeSmoothieAsync() {
  button.disabled = true; // Disable button to prevent multiple clicks, this error 
  //courtesy of my roommate who i asked to test the program and immediately broke it 
  outputDiv.innerHTML = ""; // Clear previous messages

  // TODO:
  // Use try/catch
  try {
    const ingredientsMessage = await getIngredients();
    const blendMessage = await blendSmoothie();
    const pourMessage = await pourSmoothie();
    showMessage("Smoothie blended succesfully");
  }
  catch(err) {
    showMessage(err);
  }
  // Catch and display any errors
  button.disabled = false; // 
}

button.onclick = makeSmoothieAsync;
//button.onclick = makeSmoothieWithPromises; 
