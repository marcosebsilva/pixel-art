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

// events
document.addEventListener('click', (e) => {
  const clicked = e.target;
  const colorList = document.getElementsByClassName('color');

  if (clicked.className.includes('color') && !clicked.className.includes('selected')) {
    for (let index = 0; index < colorList.length; index += 1) {
      colorList[index].classList.remove('selected');
    }
    clicked.classList.add('selected');
  }
});
document.addEventListener('click', (e) => {
  const clicked = e.target;
  const selected = document.querySelector('.selected');
  const color = window.getComputedStyle(selected, null).getPropertyValue('background-color');

  if (clicked.className.includes('pixel')) {
    switch (true) {
    case clicked.style.backgroundColor !== color:
      clicked.style.backgroundColor = color;
      break;
    case clicked.style.backgroundColor === color:
      clicked.style.backgroundColor = 'white';
      break;
    default:
    }
  }
});
document.addEventListener('click', (e) => {
  const clicked = e.target;
  const pixels = document.getElementsByClassName('pixel');
  if (clicked.id === 'clear-board') {
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = 'white';
    }
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
