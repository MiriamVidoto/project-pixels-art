const colors = document.getElementsByClassName('color');
const board = document.getElementById('pixel-board');
const pixels = document.getElementsByClassName('pixel');
const sizeValue = document.getElementById('board-size');

// colocar cores na paleta
colors[0].style.backgroundColor = 'rgb(0,0,0)';
colors[1].style.backgroundColor = 'rgb(255,255,255)';
function newColors(){
  for (let p = 2; p < colors.length; p += 1) {
      let cor = `rgb(${(Math.random() * 255)},${(Math.random() * 255)},${(Math.random() * 255)})`;
    colors[p].style.backgroundColor = cor;  
  }
}
newColors()
document.getElementById('new-colors').addEventListener('click', newColors);

// remove board anterior
function delBoard() {  
  while (board.childElementCount) {
    board.removeChild(board.lastElementChild)
  }
}
// criar o board
function createBoard(size) {
  delBoard()
  for (let index = 0; index < (size * size); index += 1) {
    const box = document.createElement('div');
    box.setAttribute('class', 'pixel');
    board.appendChild(box);
    box.addEventListener('click', insertColor);
    box.addEventListener('touchmove', insertColor);
    board.style.width = `${(size * 30)}px`;
    board.style.height = `${(size * 30)}px`;
  }
}
createBoard(10);

// inventando pencil
function pencil() {
  for (let pixel of pixels)
  pixel.addEventListener('mousemove', insertColor);
}
document.getElementById('pencil').addEventListener('click', pencil);

// inventando stop
function stop() {
  for (let pix of pixels)
  pix.removeEventListener('mousemove', insertColor);
}
document.getElementById('stop').addEventListener('click', stop);

// definindo tamanho do board
function sizeBoard() {
  const boardSize = sizeValue.value
  if (boardSize === '') {
    alert('[ERRO] Digite um valor!');
  } else{
    if (boardSize < 5) {
      alert('Tamanho mínimo de 5');
      boardSize = 5;
    } else if (boardSize > 50) {
      alert('Tamanho máximo de 50');
      boardSize = 30;
    }  
  }
  return createBoard(boardSize)
}
document.getElementById('generate-board').addEventListener('click', sizeBoard)


// mudar a class selected
function newSelected(event) {
  const selected = document.querySelector('.selected');
  selected.classList.remove('selected');
  event.target.classList.add('selected');
}

// escutador colors
for (const i of colors) {
  i.addEventListener('click', newSelected);
}

// colorir pixels
function insertColor(event){
  const newSelected = document.querySelector('.selected');
  event.target.style.backgroundColor = newSelected.style.backgroundColor
}

// limpar
function clear() {
  for (p of pixels) {
  p.style.backgroundColor = 'rgb(255,255,255)';
  }
}
document.getElementById('clear-board').addEventListener('click', clear);
