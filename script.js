var player = 1; // numéro du joueur dont c'est le tour
var column = 5;
var row = 5;
var game = true; // jeu en cours
var text = "";
var board = new Array();
for (var i = 0; i < row; i++) {
  board[i] = new Array();
}

newGame();

function newGame() {
  for(var i = 0; i < this.row; i++){
    for (var j = 0; j < this.column; j++){
      board[i][j] = 0;
    }
  }
  this.player=1;
  showAdText("Démarrage du jeu. Le joueur " + playerName(this.player) + " commence.");
  this.game = true;
  createTable();
}

function showAdText(text) {
  document.getElementById("adText").innerHTML = text;
}

function playerName(numPlayer) {
  if (numPlayer == 1){
    return "red";
  } else {
    return "blue";
  }
}

function createTable() {
  this.text = "<table>";
  for(var i = 0; i < this.row; i++){
    this.text += "<tr>";
    for (var j = 0; j < this.column; j++){
      this.text += "<td onclick='detectClic("+j+")' id="+i+"-"+j+">";
      if(this.board[i][j] == 1){
        this.text += "<div class='player1'></div>";
      }
      else if (this.board[i][j] == 2) {
        this.text += "<div class='player2'></div>";
        this.text += "</td>";
      }
    }
    this.text += "</tr>";
  }
  this.text += "</table>";
  document.getElementById("boardGame").innerHTML = this.text;
}

function detectClic(j) {
  if(checkPosition(j) && this.game){
    var currentRow = dropPiece(j);
    var verifEnd = puissance4(currentRow,j,0,0);
    if (verifEnd){
      this.game = false;
      showAdText("Le jouer " + playerName(this.player) + " a gagné !" );
    } else {
      this.player == 1 ? this.player = 2 : this.player = 1;
      showAdText("C'est au tour du joueur " + playerName(this.player) + "." );
    }
  }
}

function checkPosition(j) {
  if (this.board[0][j] == 0){
    return true;
  } else {
    return false;
  }
}

function dropPiece(j) {
  for (var i = this.row - 1 ; i >= 0 ; i--) {
    if (this.board[i][j] == 0) {
      this.board[i][j] = this.player;
      refreshBoard(i,j,this.player);
      return i;
    }
  }
}

function refreshBoard(x,y,i) {
  document.getElementById(x+"-"+y).innerHTML = "<div class='player"+i+"'></div>";
}

function puissance4(rw,col,r,c) {
  console.log("Valeurs : " + rw + " " + col + " / Incrément " + r + " " + c);
  if (c == 0 && r == 0){
    var va = 1 + puissance4(rw + 1,col,1,0) + puissance4(rw - 1, col, -1,0);
    var vb = 1 + puissance4(rw,col + 1,0,1) + puissance4(rw, col - 1,0,-1);
    var vc = 1 + puissance4(rw + 1,col + 1,1,1) + puissance4(rw - 1,col - 1,-1,-1);
    var vd = 1 + puissance4(rw - 1,col + 1,-1,1) + puissance4(rw + 1,col - 1,1,-1);
    console.log(va,vb,vc,vd);
    if(va == 4 || vb == 4 || vc == 4 || vd == 4){
      return true;
    } else {
      return false;
    }
  }
  if(rw< this.row && rw>=0 && col < this.column && col >=0){
    if(this.board[rw][col] == player){
      return 1 + puissance4(rw + r, col + c, r, c);
    } else {
      return 0;
    }
  } else{
    return 0;
  }
}
