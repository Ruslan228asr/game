
let board;//двовимірний масив, що представляє ігрове поле. Він складається з трьох рядків та трьох стовпців.

let currentPlayer;//індекс поточного гравця у масиві
let players = ['❤️', '👾']; //массив символов игроков. В данном случае 'X' и 'O'.

function setup() {
  createCanvas(400, 400);//робіть холст 400 на 400 пікселів 
   board = [['', '', ''], ['', '', ''], ['', '', '']];//робить клытинки 
  currentPlayer = int(random(players.length));//на рандом вибірає гравця 

}

function draw() {
  background(255);//робе білий фон
  drawBoard();//малює ігрове поле 
  let result = checkWinner();//дивиться чи є переможець
  if (result || isBoardFull()) {
    noLoop();
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text(result ? result + '🎉 ' : ' 😞', width / 2, height / 2);//Якщо є переможець або ігрове поле заповнено, гра припиняється та виводиться результат на екран.
  }
  
}
function mousePressed() //Обчислює координати клітини, яку натиснули.
//Якщо клітина порожня (''), ставить символ поточного гравця і перемикає хід на наступного гравця.
{ 
  let x = int(mouseX / (width / 3));
  let y = int(mouseY / (height / 3));
  if (board[y][x] === '') {
    board[y][x] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
  }
}
function drawBoard() {//Определяет ширину (w) и высоту (h) каждой клетки.Рисует вертикальные и горизонтальные линии для разделения клеток.Отображает символы игроков ('X' и 'O') в соответствующих клетках.
  let w = width / 3;
  let h = height / 3;
  strokeWeight(4);
  for (let i = 1; i < 3; i++) {
    line(w * i, 0, w * i, height);
    line(0, h * i, width, h * i);
  }
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      let spot = board[y][x];
      textSize(64);
      textAlign(CENTER, CENTER);
      let xr = w * x + w / 2;
      let yr = h * y + h / 2;
      text(spot, xr, yr);
    }
  }
}
function checkWinner() {//Перевіряє всі можливі лінії горизонтальні, вертикальні та діагональні на наявність трьох однакових символів.Якщо таку лінію знайдено, повертає символ переможця. Інакше повертає null.
  let lines = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[2][0], board[1][1], board[0][2]]
  ];
  for (let line of lines) {
    if (line[0] && line.every(cell => cell === line[0])) {
      return line[0];
    }
  }
  return null;
}
function isBoardFull() {//Проверяет, заполнены ли все клетки на игровом поле.Возвращает true, если все клетки заполнены, иначе false.
  return board.every(row => row.every(cell => cell));
}
