const difficultes = document.querySelectorAll(".difficulte")
const mouvements = document.getElementById("mouvements")
const routine = document.getElementById("routine")

const exclusions = JSON.parse(localStorage.getItem("exclusions")) || localStorage.setItem("exclusions", JSON.stringify([])) || []

const tricks = {
  "Facile": [ "Assis", "Dos", "Ventre", "Quatre-pattes", "Groupé", "Carpé", "360", "180", "Swivel", "Dos-vrille-dos" ],
  "Medium": [ "Frontflip", "Backflip", "Barani", "Backfull", "Dos demi-tour dos", "Dos Ventre", "540", "Pullover", "Plongeon", "Plongeon Front", "Kaboom", "Cody", "Sideflip" ],
  "Difficile": ["Barani out", "Double backflip", "1 3/4", "Full in"],
  "Trampo-Mur": ["Vrille", "Craddle", "Plongeon", "Marcher-Back", "Handspring"]
}

fillTricks()

function toggleOverlay(id) {
  document.getElementById(id).classList.toggle("active")
}

difficultes.forEach(d => {
  d.addEventListener("click", (e) => {
    d.classList.toggle("selected")
  })
})

function fillTricks(){
  Object.keys(tricks).forEach(difficulty => {
    const titleEl = document.createElement("h2")
    titleEl.innerText = difficulty
    mouvements.appendChild(titleEl)
    const ul = document.createElement("ul")
    tricks[difficulty].forEach(move => {
      const li = document.createElement("li")
      li.innerText = move
      if(exclusions.includes(move)){
        li.classList.add("excluded")
      }
      li.addEventListener("click", (e) => toggleExlcusion(e.target))
      ul.appendChild(li)
    })
    mouvements.appendChild(ul)
  })
}

function toggleExlcusion(li){
  if(li.classList.contains("excluded")){
    unexclude(li.innerText)
    li.classList.remove("excluded")
  }else{
    exclude(li.innerText)
    li.classList.add("excluded")
  }
}

function exclude(move){
  exclusions.push(move)
  localStorage.setItem("exclusions", JSON.stringify(exclusions))
}

function unexclude(move){
  exclusions.splice(exclusions.indexOf(move), 1)
  localStorage.setItem("exclusions", JSON.stringify(exclusions))
}

function create(){
  const nombreMouvements = document.getElementById("nombreMouvements").value
  const difficultesSelectionnes = Array.from(document.querySelectorAll(".difficulte.selected")).map(e => e.dataset.difficulte).filter(d => tricksByDifficulty(d).length > 0)
  if(difficultesSelectionnes.length === 0){
    return;
  }
  let moves = difficultesSelectionnes.map(d => tricksByDifficulty(d)).flat()
  routine.innerHTML = ""
  const description = document.createElement("h2")
  description.innerText = `${nombreMouvements} mouvements ${difficultesSelectionnes.join(' ou ')} parmis ${moves.length} mouvements possibles.` 
  routine.appendChild(description)
  const ul = document.createElement("ul")
  for(let i = 0; i < nombreMouvements; i++){
    let move = moves.random()
    const li = document.createElement("li")
    li.innerText = move
    ul.appendChild(li)
  }
  routine.appendChild(ul)
  toggleOverlay('routine-overlay')
}

function tricksByDifficulty(difficulty){
  return tricks[difficulty].filter(x => !exclusions.includes(x))
}

Array.prototype.random = function (){
  return this[Math.floor(Math.random()*this.length)];
}

function listerMouvements(e){
  e.preventDefault()
  toggleOverlay('mouvements-overlay')
}