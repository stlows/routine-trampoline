const difficultes = document.querySelectorAll(".difficulte");
const mouvements = document.getElementById("mouvements");
const routine = document.getElementById("routine");

const exclusions =
  JSON.parse(localStorage.getItem("exclusions")) ||
  localStorage.setItem("exclusions", JSON.stringify([])) ||
  [];

const tricks = {
  Feet: {
    easy: [
      { name: "Back", to: "Back" },
      { name: "Belly", to: "Front" },
      { name: "Groupé", to: "Feet" },
      { name: "Carpé", to: "Feet" },
      { name: "360", to: "Feet" },
      { name: "180", to: "Feet" },
    ],
    medium: [
      { name: "Dive", to: "Back" },
      { name: "1 and 1/4 Backflip", to: "Back" },
      { name: "Frontflip", to: "Feet" },
      { name: "Backflip", to: "Feet" },
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
    ],
  },
  Back: {
    easy: [
      { name: "Back drop", to: "Back" },
      { name: "Craddle", to: "Back" },
      { name: "Front drop", to: "Front" },
      { name: "Half-Twist to Feet", to: "Feet" },
      { name: "Pullover", to: "Feet" },
    ],
    medium: [
      { name: "Porpoise", to: "Back" },
      { name: "Cat-twist", to: "Back" },
      { name: "Corkskrew", to: "Back" },
      { name: "Full-Twist to Feet", to: "Feet" },
      { name: "Ballout", to: "Feet" },
      { name: "Kaboom", to: "Feet" },
      { name: "Barani Ballout", to: "Feet" },
    ],
    hard: [
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
      { name: "Back", to: "Back" },
      { name: "Front", to: "Front" },
      { name: "Feet", to: "Feet" },
    ],
    medium: [{ name: "Cody", to: "Feet" }],
    hard: [{ name: "Zack", to: "Feet" }],
  },
};

fillTricks();

function toggleOverlay(id) {
  document.getElementById(id).classList.toggle("active");
}

difficultes.forEach((d) => {
  d.addEventListener("click", (e) => {
    d.classList.toggle("selected");
  });
});

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
        if (exclusions.includes(`${from}|${move.name}`)) {
          li.classList.add("excluded");
        }
        li.addEventListener("click", (e) => toggleExlcusion(e.target));
        ulDiff.appendChild(liMove);
        li.appendChild(ulDiff);
      });
      ul.appendChild(li);
    });
    mouvements.appendChild(ul);
  });
}

function toggleExlcusion(li) {
  if (li.classList.contains("excluded")) {
    unexclude(li.innerText);
    li.classList.remove("excluded");
  } else {
    exclude(li.innerText);
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
  const difficultesSelectionnes = Array.from(
    document.querySelectorAll(".difficulte.selected")
  )
    .map((e) => e.dataset.difficulte)
    .filter((d) => tricksByDifficulty(d).length > 0);
  if (difficultesSelectionnes.length === 0) {
    return;
  }
  let moves = difficultesSelectionnes.map((d) => tricksByDifficulty(d)).flat();
  routine.innerHTML = "";
  const description = document.createElement("h2");
  description.innerText = `${nombreMouvements} mouvements ${difficultesSelectionnes.join(
    " ou "
  )} parmis ${moves.length} mouvements possibles.`;
  routine.appendChild(description);
  const ul = document.createElement("ul");
  for (let i = 0; i < nombreMouvements; i++) {
    let move = moves.random();
    const li = document.createElement("li");
    li.innerText = move;
    ul.appendChild(li);
  }
  routine.appendChild(ul);
  toggleOverlay("routine-overlay");
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
