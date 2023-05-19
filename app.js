const difficultes = document.querySelectorAll(".difficulte");
const mouvements = document.getElementById("mouvements");
const routine = document.getElementById("routine");
const diffultesRange = document.querySelectorAll("input[type='range']")
const errorCustomDifficulty = document.getElementById("sumNot100Error")

const version = 1.1

function checkVersion(){
  if(!localStorage.getItem("version")){
    localStorage.setItem("exclusions", JSON.stringify([]))
  }
  else if(localStorage.getItem("version") < version){
    localStorage.setItem("exclusions", JSON.stringify([]))
  }
  localStorage.setItem("version", version)
}
checkVersion()

const difficultyPercentage = {
  easy: {easy: 100, medium: 0, hard: 0, extreme: 0},
  medium: {easy: 60, medium: 40, hard: 0, extreme: 0},
  hard: {easy: 30, medium: 40, hard: 30, extreme: 0},
  extreme:{easy: 20, medium: 30, hard:30, extreme:20},
  custom: {easy: 30, medium: 50, hard: 20, extreme:0},
}

const exclusions =
  JSON.parse(localStorage.getItem("exclusions")) ||
  localStorage.setItem("exclusions", JSON.stringify([])) ||
  [];

const tricks = {
  Feet: {
    easy: [
      { name: "Back-Drop", to: "Back" },
      { name: "Front-Drop", to: "Front" },
      { name: "Tuck (Groupé)", to: "Feet" },
      { name: "Pike (Carpé)", to: "Feet" },
      { name: "Straddle (Écart)", to: "Feet" },
      { name: "Seat", to: "Seat" },
      { name: "360", to: "Feet" },
      { name: "180", to: "Feet" },
    ],
    medium: [
      { name: "Dive", to: "Back" },
      { name: "1 and 1/4 Backflip", to: "Back" },
      { name: "Frontflip", to: "Feet" },
      { name: "Backflip", to: "Feet" },
      { name: "Sideflip", to: "Feet" },
      { name: "Backfull", to: "Feet" },
      { name: "Barani", to: "Feet" },
      { name: "Arabian", to: "Feet" },
      { name: "Frontfull", to: "Feet" },
      { name: "540", to: "Feet" },
      { name: "720", to: "Feet" },
    ],
    hard: [
      { name: "1 and 3/4", to: "Back" },
      { name: "1 and 1/4", to: "Front" },
      { name: "3/4 back", to: "Front" },
      { name: "Double Backflip", to: "Feet" },
      { name: "Double Frontflip", to: "Feet" },
      { name: "Rudy", to: "Feet" },
      { name: "Full In", to: "Feet" },
      { name: "Full Out", to: "Feet" },
      { name: "Half In", to: "Feet" },
      { name: "Front Barani", to: "Feet" },
      { name: "Double Full", to: "Feet" },
      { name: "900", to: "Feet" },
      { name: "1080", to: "Feet" },
    ],
    extreme: [
      { name: "2 and 3/4", to: "Back" },
      { name: "2 and 1/4 Backflip", to: "Back" },
      { name: "2 and 1/4", to: "Front" },
      { name: "1 and 3/4 back", to: "Front" },
      { name: "Full In Full Out", to: "Feet" },
      { name: "Full In Half Out", to: "Feet" },
      { name: "Full In Rudy Out", to: "Feet" },
      { name: "Triple Frontflip", to: "Feet" },
      { name: "Triple Backflip", to: "Feet" },
      { name: "Rudy In", to: "Feet" },
      { name: "Rudy Out", to: "Feet" },
      { name: "Triple Full", to: "Feet" },
      { name: "Quad Full", to: "Feet" },
      { name: "Adolph", to: "Feet" },
      { name: "1260", to: "Feet" },
      { name: "1440", to: "Feet" },
    ],
  },
  Back: {
    easy: [
      { name: "Back-Drop", to: "Back" },
      { name: "Craddle", to: "Back" },
      { name: "Front-Drop", to: "Front" },
      { name: "Half-Twist to Feet", to: "Feet" },
      { name: "Pullover", to: "Feet" },
    ],
    medium: [
      { name: "Porpoise", to: "Back" },
      { name: "Cat-twist", to: "Back" },
      { name: "Corkskrew", to: "Back" },
      { name: "Half Turn-Table", to: "Back" },
      { name: "Full-Twist to Feet", to: "Feet" },
      { name: "Ballout", to: "Feet" },
      { name: "Kaboom", to: "Feet" },
      { name: "Barani Ballout", to: "Feet" },
    ],
    hard: [
      { name: "360 Turn-Table", to: "Back" },
      { name: "Double Cat-twist", to: "Back" },
      { name: "Double Corkskrew", to: "Back" },
    ],
    extreme: [
      { name: "Triple Cat-twist", to: "Back" },
      { name: "Rudy Ballout", to: "Feet" },
      { name: "Randy Ballout", to: "Feet" },
      { name: "Adolph Ballout", to: "Feet" },
    ],
  },
  Front: {
    easy: [
      { name: "Back-Drop", to: "Back" },
      { name: "Front-Drop", to: "Front" },
      { name: "Feet", to: "Feet" },
    ],
    medium: [
      { name: "Cody", to: "Feet"},
      { name: "Half Turn-Table", to: "Front" },
    ],
    hard: [
      { name: "Zack", to: "Feet" },
      { name: "360 Turn-Table", to: "Front" },
    ],
  },
  Seat: {
    easy: [
      {name: "Back-Drop", to: "Back"},
      {name: "Front-Drop", to: "Front"},
      {name: "Feet", to: "Feet"},
    ],
    medium: [
      {name: "Craddle", to: "Seat"},
      {name: "360 Back To Seat", to: "Seat"},
    ],
    hard: [
      { name: "Frontflip", to: "Feet" },
      { name: "Dive", to: "Back" }
    ],
    extreme: [
      {name: "Double frontflip", to:"Feet"}
    ]
  }
};

fillTricks();

function toggleOverlay(id) {
  document.getElementById(id).classList.toggle("active");
}

function fillTricks() {
  Object.keys(tricks).forEach((from) => {
    const titleEl = document.createElement("h2");
    titleEl.innerText = "From " + from;
    mouvements.appendChild(titleEl);
    const ul = document.createElement("ul");
    Object.keys(tricks[from]).forEach((difficulty) => {
      const li = document.createElement("li");
      const difficultyEl = document.createElement("h3");
      difficultyEl.innerText = difficulty;
      li.appendChild(difficultyEl);
      const ulDiff = document.createElement("ul");
      ulDiff.classList.add("difficulty");
      tricks[from][difficulty].forEach((move) => {
        const liMove = document.createElement("li");
        liMove.innerText = move.name;
        const key = `${from}|${move.name}`
        if (exclusions.includes(key)) {
          liMove.classList.add("excluded");
        }
        liMove.addEventListener("click", (e) => toggleExclusion(e.target, key));
        ulDiff.appendChild(liMove);
        li.appendChild(ulDiff);
      });
      ul.appendChild(li);
    });
    mouvements.appendChild(ul);
  });
}

function toggleExclusion(li, key) {
  if (li.classList.contains("excluded")) {
    unexclude(key);
    li.classList.remove("excluded");
  } else {
    exclude(key);
    li.classList.add("excluded");
  }
}

function exclude(move) {
  exclusions.push(move);
  localStorage.setItem("exclusions", JSON.stringify(exclusions));
}

function unexclude(move) {
  exclusions.splice(exclusions.indexOf(move), 1);
  localStorage.setItem("exclusions", JSON.stringify(exclusions));
}

function create() {
  const nombreMouvements = document.getElementById("nombreMouvements").value;
  const difficulteSelectionnee = document.querySelector(".difficulte.selected").dataset.difficulte
   if(difficulteSelectionnee === "custom" && !checkCustomSum()){
    return
   }

  routine.innerHTML = "";
  const description = document.createElement("h2");
  description.innerText = `${difficulteSelectionnee} (${nombreMouvements} moves)`;
  let observedDifficulty = {easy: 0, medium: 0, hard: 0, extreme: 0}
  routine.appendChild(description);
  const ul = document.createElement("ul");
  let position = "Feet"
  for (let i = 0; i < nombreMouvements; i++) {
    let difficulty = randomDifficulty(difficultyPercentage[difficulteSelectionnee])
    let move = randomMoveFrom(position, difficulty);
    if(!move){
      // if no move from that position for that difficulty, we default to Feet.
      difficulty = "easy"
      move = { name: "Feet", to: "Feet"}
    }
    observedDifficulty[difficulty]++
    const li = document.createElement("li");
    li.innerText = move.name;
    position = move.to
    ul.appendChild(li);
  }
  const definition = document.createElement("p");
  definition.innerText = formatDifficulty(observedDifficulty);
  routine.appendChild(definition);
  routine.appendChild(ul);
 
  toggleOverlay("routine-overlay");
}

function randomDifficulty(percentages){
  let sum = 0
  const rnd = Math.random() * 100
  for(let i = 0; i < Object.keys(percentages).length; i++){
    let difficulty = Object.keys(percentages)[i]
    sum += percentages[difficulty]
    if(rnd < sum){
      return difficulty
    }
  }
}

function randomMoveFrom(position, difficulty){
  return tricks[position][difficulty].filter(move => !exclusions.includes(`${position}|${move.name}`)).random()
}

function tricksByDifficulty(difficulty) {
  return tricks[difficulty].filter((x) => !exclusions.includes(x));
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function listerMouvements(e) {
  e.preventDefault();
  toggleOverlay("mouvements-overlay");
}

difficultes.forEach((d) => {
  d.addEventListener("click", (e) => {
    difficultes.forEach(d => {
      d.classList.remove("selected");
    })
    d.classList.toggle("selected");
    if(d.dataset.difficulte === 'custom'){
      toggleOverlay("custom-difficuly-overlay")
    }
  });
});

function updateDifficultesDom(){
  // Definitions
  Array.from(document.querySelectorAll(".difficulte .definition")).forEach(el => {
    el.innerText = formatDifficulty(difficultyPercentage[el.dataset.difficulte], "%")
  })

  // Slider's value
  Array.from(diffultesRange).forEach(el => {
    el.value = difficultyPercentage.custom[el.dataset.difficulty]
  })
  // Slider's label
  Object.keys(tricks.Feet).forEach(d => {
    const label = document.querySelector(`label[for=${d}]`)
    label.innerText = `${difficultyPercentage.custom[d]} % ${d}`
  })

  // Error message if total is different from 100
  checkCustomSum()
}

function formatDifficulty(difficulty, unit = ""){
  return Object.keys(difficulty).filter(d => difficulty[d] > 0).map(d => `${difficulty[d]}${unit} ${d}`).join(" - ")
}

function checkCustomSum(){
  const total = Object.keys(difficultyPercentage.custom).reduce((acc, current) => acc + parseInt(difficultyPercentage.custom[current]), 0)
  if(total !== 100){
    errorCustomDifficulty.innerText = `Sum must be 100%. Now it is ${total}%`
    document.getElementById("custom-difficuly-overlay").classList.add("active")
    return false
  }else{
    errorCustomDifficulty.innerText = ""
    return true
  }
}

function updateCustomDifficulty(){
  Array.from(diffultesRange).forEach(el => {
    difficultyPercentage.custom[el.dataset.difficulty] = el.value
  })
  updateDifficultesDom()
}
diffultesRange.forEach(d => {
  d.addEventListener("change", updateCustomDifficulty)
})

updateDifficultesDom()

updateCustomDifficulty()

