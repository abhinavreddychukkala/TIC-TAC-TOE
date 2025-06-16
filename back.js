let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-button");
let newGameBtn = document.getElementById("new-Btn");
let msgContainer = document.querySelector(".mesgcontainer");
let msg = document.getElementById("mesg");
let gameBoard = document.querySelector(".game");

let turnO = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const disableBoxes = () => {
  boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.textContent = "";
  });
};

const showMsg = (winner) => {
  msg.textContent = `Winner is ${winner} 🎉`;
  msgContainer.classList.remove("hide");
};

const showDraw = () => {
  msg.textContent = "It's a Draw 🤝";
  msgContainer.classList.remove("hide");
  gameBoard.classList.add("draw");
  msg.classList.add("draw-msg");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].textContent !== "" &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[b].textContent === boxes[c].textContent
    ) {
      disableBoxes();
      showMsg(boxes[a].textContent);
      return;
    }
  }

  // Check draw
  let isDraw = true;
  boxes.forEach((box) => {
    if (box.textContent === "") isDraw = false;
  });

  if (isDraw) {
    disableBoxes();
    showDraw();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent === "") {
      box.textContent = turnO ? "O" : "X";
      box.disabled = true;
      turnO = !turnO;
      checkWinner();
    }
  });
});

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  gameBoard.classList.remove("draw");
  msg.classList.remove("draw-msg");
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
