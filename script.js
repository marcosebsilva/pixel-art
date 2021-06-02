function createGrid(size) {
  function createPixel() {
    const pixel = document.createElement('li');
    pixel.classList.add('pixel');
    return pixel;
  }
  function createRow() {
    const gridRow = document.createElement('ul');
    gridRow.classList.add('gridRow');

    for (let index = 0; index < size; index += 1) {
      gridRow.appendChild(createPixel());
    }
    document.querySelector('#pixel-board').appendChild(gridRow);
  }
  for (let index = 0; index < size; index += 1) {
    createRow();
  }
}

function cleanGrid() {
  const pixelBoard = document.querySelector('#pixel-board');
  while (pixelBoard.firstChild) {
    pixelBoard.removeChild(pixelBoard.firstChild);
  }
}
function fillStarterColors() {
  function generateColor() {
    const randomRGB = [];
    for (let index = 0; index !== 3; index += 1) {
      randomRGB.push(Math.floor(Math.random() * 100));
    }
    return `rgb(${randomRGB.toString()})`;
  }
  const starterColors = document.getElementsByClassName('color');
  for (let index = 1; index < starterColors.length; index += 1) {
    starterColors[index].style.backgroundColor = generateColor();
  }
}
// events
document.addEventListener('click', (color) => {
  const colorClicked = color.target;
  const colorList = document.getElementsByClassName('color');

  if (colorClicked.className.includes('color') && !colorClicked.className.includes('selected')) {
    for (let index = 0; index < colorList.length; index += 1) {
      colorList[index].classList.remove('selected');
    }
    colorClicked.classList.add('selected');
  }
});
document.addEventListener('click', (pixel) => {
  const pixelClicked = pixel.target;
  const selected = document.querySelector('.selected');
  const color = window.getComputedStyle(selected, null).getPropertyValue('background-color');

  if (pixelClicked.className.includes('pixel')) {
    switch (true) {
    case pixelClicked.style.backgroundColor !== color:
      pixelClicked.style.backgroundColor = color;
      break;
    case pixelClicked.style.backgroundColor === color:
      pixelClicked.style.backgroundColor = 'white';
      break;
    default:
    }
  }
});
document.querySelector('#clear-board').addEventListener('click', () => {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
});

// generate new grid
const input = document.querySelector('#board-size');
input.onchange = () => {
  if (input.value > 50) {
    input.value = 50;
  }
  if (input.value < 5) {
    input.value = 5;
  }
};
document.querySelector('#generate-board').addEventListener('click', () => {
  if (input.value === '') {
    alert('Board inválido!"');
  } else {
    cleanGrid();
    createGrid(input.value);
    // input.value = '';
  }
});
// scripts
createGrid(5);
fillStarterColors();
