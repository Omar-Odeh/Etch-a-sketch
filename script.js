let grid = document.getElementById("grid");
let brushBtn = document.getElementById("brushBtn");
let eraserBtn = document.getElementById("eraserBtn");
let clearBtn = document.getElementById("clearBtn");
let size = document.getElementById("size");
let slider = document.getElementById("slider");
let colorPicker = document.getElementById("colorPicker");
let value = 16;
let color = "red";
let clicked = false;
let inGrid = false;
let brushSelected;

const fillColor = (event) => {
  if (clicked && inGrid) {
    brushSelected
      ? (event.target.style.backgroundColor = `${color}`)
      : (event.target.style.backgroundColor = "white");
  }
};

const fillGrid = (size) => {
  for (let i = 0; i < size * size; i++) {
    let square = document.createElement("div");
    square.style.backgroundColor = "white";
    square.style.height = `calc(100% / ${size})`;
    square.addEventListener("drag", (e) => {
      e.preventDefault();
    });
    square.addEventListener("mousedown", (event) => {
      clicked = true;
      fillColor(event);
    });
    square.addEventListener("mouseup", () => {
      clicked = false;
    });
    square.addEventListener("mouseover", (event) => {
      fillColor(event);
    });
    grid.appendChild(square).className = "square";
  }
};

if (!!grid) {
  fillGrid(value);
  grid.addEventListener("drag", (e) => {
    e.preventDefault();
  });
  grid.addEventListener("mouseenter", () => {
    inGrid = true;
  });
  grid.addEventListener("mouseleave", () => {
    inGrid = false;
    clicked = false;
  });
}

if (!!brushBtn) {
  brushBtn.classList.toggle("clicked");
  brushSelected = true;
}

if(!!colorPicker){
  colorPicker.addEventListener("input", (event) =>{
    color = event.target.value;
  });
}

if (!!slider && !!size) {
  slider.addEventListener("input", (event) => {
    value = event.target.value;
    size.innerHTML = `Size: ${value}×${value}`;
    grid.innerHTML = "";
    fillGrid(value);
  });
}

brushBtn.addEventListener("click", (event) => {
  brushBtn.classList.add("clicked");
  eraserBtn.classList.remove("clicked");
  brushSelected = true;
});

eraserBtn.addEventListener("click", (event) => {
  eraserBtn.classList.add("clicked");
  brushBtn.classList.remove("clicked");
  brushSelected = false;
});

clearBtn.addEventListener("click", (event) => {
  if (!!grid) {
    grid.innerHTML = "";
    fillGrid(value);
  }
});
