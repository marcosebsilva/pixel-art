// criar a quantidade de linhas da grid

function createGrid(size) {
  function createRow() {
    const gridRow = document.createElement('ul');
    gridRow.className = 'gridRow';

    for (let index = 0; index < size; index += 1) {
      gridRow.appendChild(createPixel());
    }
    document.querySelector('#pixel-board').appendChild(gridRow);
  }
  function createPixel() {
    const pixel = document.createElement('li');
    pixel.className = 'pixel';
    return pixel;
  }
  for (let index = 0; index < size; index += 1) {
    createRow();
  }
}

// events

document.addEventListener('click', (e) => {
    const clicked = e.target;
    if (clicked.className.includes('color') && !clicked.className.includes('selected')) {
        let colorList = document.getElementsByClassName('color');
        for(let index = 0; index < colorList.length; index += 1) {
            if(colorList[index].className.includes('selected')) {
                colorList[index].className = 'color';
            }
        }  
        clicked.className += ' selected';
    }
});
// events
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
createGrid(5);

// repetir a quantidade de colunas para criar as linhas
