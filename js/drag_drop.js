const dragImg = document.querySelector(".drag-image");
const startBox = document.getElementById("start-box");
const endBox = document.getElementById("end-box");
const section = document.querySelector("section");
//DRAG EVENT LISTENERS
dragImg.addEventListener("dragstart", dragStart);
dragImg.addEventListener("dragend", dragEnd);
endBox.addEventListener("dragover", dragOver);
endBox.addEventListener("drop", drop);
//DRAG FUNCTIONS

function dragStart() {
    console.log("drag has started");
    
}

function dragEnd() {
  console.log("drag has ended");
  endBox.classList.remove("drag-over");
}

function dragOver(e) {
  e.preventDefault();
  this.classList.add("drag-over");
}

function drop(e) {
  e.preventDefault();
  this.appendChild(dragImg);
}
