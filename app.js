// Parig - Պարիգ: Western Armenian Wordle Clone

const WORDS = {
  // Common 5-letter words (simplified for demo)
  common: [
    "APPLE", "BEACH", "BRAIN", "BREAD", "BRUSH", "CHAIR", "CHEST",
    "CHORD", "CLICK", "CLOCK", "CLOUD", "DANCE", "DIARY", "DRINK",
    "EARTH", "FEAST", "FIELD", "FRUIT", "GLASS", "GRAPE", "GREEN",
    "HEART", "HOUSE", "JUICE", "LIGHT", "LEMON", "MELON", "MONEY",
    "MUSIC", "NIGHT", "OCEAN", "PARTY", "PIZZA", "PHONE", "PLANE",
    "PLANT", "PLATE", "POWER", "RADIO", "RIVER", "ROBOT", "SHIRT",
    "SHOES", "SLEEP", "SMILE", "SNACK", "SPACE", "STONE", "STORM",
    "TABLE", "TIGER", "TOAST", "TRAIN", "TRUCK", "VOICE", "WATER",
    "WATCH", "WHOLE", "WOMAN", "WORLD", "WRITE", "YOUTH"
  ],

  // Western Armenian translations for UI elements
  ui: {
    win: "Հաղթանակ!",
    lose: "Վերջ: Բառն էր՝",
    notEnough: "5 տառ պէտք է",
    restart: "Նոր խաղ",
    playAgain: "Խաղալ նորից"
  }
};

class ParigGame {
  constructor() {
    this.rows = 6;
    this.cols = 5;
    this.secretWord = "";
    this.currentRow = 0;
    this.currentTile = 0;
    this.active = false;
    this.revealing = false;

    this.boardLetters = []; // letter shown in each tile
    this.tileStates = [];   // 'active' | 'correct' | 'present' | 'absent'
    this.keyboardStates = {}; // letter -> best state so far
  }

  init() {
    this.createBoard();
    this.createKeyboard();
    this.setupEventListeners();
    this.startNewGame();
  }

  createBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    for (let r = 0; r < this.rows; r++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");

      for (let c = 0; c < this.cols; c++) {
        const tile = document.createElement("div");
        tile.id = `tile-${r * this.cols + c}`;
        tile.classList.add("tile");
        rowDiv.appendChild(tile);
      }

      board.appendChild(rowDiv);
    }
  }

  createKeyboard() {
    const keyboardContainer = document.getElementById("keyboard");
    keyboardContainer.innerHTML = "";

    const rows = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
    ];

    rows.forEach(rowKeys => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("keyboard-row");

      rowKeys.forEach(key => {
        const keyDiv = document.createElement("div");
        keyDiv.id = `key-${key}`;
        keyDiv.textContent = key === "BACKSPACE" ? "⌫" : key;
        keyDiv.classList.add("key");

        if (key === "ENTER" || key === "BACKSPACE") {
          keyDiv.classList.add("wide");
        }

        keyDiv.addEventListener("click", () => this.handleKeyClick(key));
        rowDiv.appendChild(keyDiv);
      });

      keyboardContainer.appendChild(rowDiv);
    });
  }

  setupEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toUpperCase();

      if (key === "ENTER") {
        this.checkRow();
      } else if (key === "BACKSPACE") {
        this.deleteLetter();
      } else if (/^[A-Z]$/.test(key)) {
        this.addLetter(key);
      }
    });

    document.getElementById("restart-btn").addEventListener("click", () => {
      this.startNewGame();
    });
  }

  startNewGame() {
    const words = WORDS.common;
    this.secretWord = words[Math.floor(Math.random() * words.length)];

    this.currentRow = 0;
    this.currentTile = 0;
    this.active = true;
    this.revealing = false;

    this.boardLetters = new Array(this.rows * this.cols).fill("");
    this.tileStates = new Array(this.rows * this.cols).fill("active");
    this.keyboardStates = {};

    document.getElementById("message-container").innerHTML = "";
    this.renderBoard();
    this.renderKeyboard();
  }

  renderBoard() {
    for (let i = 0; i < this.rows * this.cols; i++) {
      this.renderTile(i);
    }
  }

  renderTile(index) {
    const tile = document.getElementById(`tile-${index}`);
    if (!tile) return;

    tile.textContent = this.boardLetters[index];
    tile.setAttribute("data-state", this.tileStates[index]);
    tile.classList.remove("flip");
  }

  renderKeyboard() {
    document.querySelectorAll(".key").forEach(keyDiv => {
      const key = keyDiv.id.replace("key-", "");
      const state = this.keyboardStates[key];

      if (state) {
        keyDiv.setAttribute("data-state", state);
      } else {
        keyDiv.removeAttribute("data-state");
      }
    });
  }

  addLetter(letter) {
    if (!this.active || this.revealing) return;
    if (this.currentTile >= this.cols) return;

    const index = this.currentRow * this.cols + this.currentTile;
    this.boardLetters[index] = letter;
    this.renderTile(index);
    this.currentTile++;
  }

  deleteLetter() {
    if (!this.active || this.revealing) return;
    if (this.currentTile <= 0) return;

    this.currentTile--;
    const index = this.currentRow * this.cols + this.currentTile;
    this.boardLetters[index] = "";
    this.renderTile(index);
  }

  checkRow() {
    if (!this.active || this.revealing) return;

    if (this.currentTile < this.cols) {
      this.showMessage(WORDS.ui.notEnough, "present", true);
      return;
    }

    const rowStart = this.currentRow * this.cols;
    const guess = this.boardLetters.slice(rowStart, rowStart + this.cols);
    const result = this.checkGuess(guess, this.secretWord);
    const stateNames = ["absent", "present", "correct"];

    this.revealing = true;

    // Reveal tiles one by one with a flip animation
    for (let i = 0; i < this.cols; i++) {
      const tileIndex = rowStart + i;
      const state = stateNames[result[i]];
      this.tileStates[tileIndex] = state;

      setTimeout(() => {
        const tile = document.getElementById(`tile-${tileIndex}`);
        tile.setAttribute("data-state", state);
        tile.classList.add("flip");
      }, i * 250);
    }

    // Track best keyboard state per letter (correct > present > absent)
    const priority = { absent: 1, present: 2, correct: 3 };
    for (let i = 0; i < this.cols; i++) {
      const letter = guess[i];
      const state = stateNames[result[i]];
      const existing = this.keyboardStates[letter];

      if (!existing || priority[state] > priority[existing]) {
        this.keyboardStates[letter] = state;
      }
    }

    setTimeout(() => {
      this.renderKeyboard();
      this.revealing = false;
      this.finishRow(guess.join(""));
    }, this.cols * 250 + 400);
  }

  finishRow(guess) {
    if (guess === this.secretWord) {
      this.active = false;
      this.showMessage(WORDS.ui.win, "correct");
      this.addConfetti();
      return;
    }

    this.currentRow++;
    this.currentTile = 0;

    if (this.currentRow >= this.rows) {
      this.active = false;
      this.showMessage(`${WORDS.ui.lose} ${this.secretWord}`, "absent");
    }
  }

  checkGuess(guess, correctWord) {
    const result = new Array(guess.length).fill(0);
    const remainingCounts = {};

    // First pass: exact matches; count the unmatched letters of the word
    for (let i = 0; i < correctWord.length; i++) {
      if (guess[i] === correctWord[i]) {
        result[i] = 2;
      } else {
        const letter = correctWord[i];
        remainingCounts[letter] = (remainingCounts[letter] || 0) + 1;
      }
    }

    // Second pass: present letters, limited by how many remain unmatched
    for (let i = 0; i < guess.length; i++) {
      if (result[i] === 2) continue;

      const letter = guess[i];
      if (remainingCounts[letter] > 0) {
        result[i] = 1;
        remainingCounts[letter]--;
      }
    }

    return result;
  }

  showMessage(text, type, transient = false) {
    const messageDiv = document.getElementById("message-container");
    messageDiv.innerHTML = "";

    const msg = document.createElement("div");
    msg.id = `message-${type}`;
    msg.className = "message";
    msg.textContent = text;
    messageDiv.appendChild(msg);

    if (transient) {
      setTimeout(() => {
        if (msg.parentNode) {
          msg.parentNode.removeChild(msg);
        }
      }, 1500);
    }
  }

  handleKeyClick(key) {
    if (key === "ENTER") {
      this.checkRow();
    } else if (key === "BACKSPACE") {
      this.deleteLetter();
    } else {
      this.addLetter(key);
    }
  }

  addConfetti() {
    const colors = ["#538d43", "#b59f33", "#3a7ea2", "#ff6b6b", "#ffd93d"];

    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.top = "-20px";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transition = `transform ${Math.random() * 3 + 2}s ease-out, opacity 2s ease-out`;
        confetti.style.zIndex = "9999";

        document.body.appendChild(confetti);

        setTimeout(() => {
          const rotate = Math.random() * 360;
          confetti.style.transform = `translateY(120vh) rotate(${rotate}deg)`;
          confetti.style.opacity = "0";

          setTimeout(() => {
            if (confetti.parentNode) {
              confetti.parentNode.removeChild(confetti);
            }
          }, 2000);
        }, 50);
      }, i * 30);
    }
  }
}

// Initialize game when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const game = new ParigGame();
  game.init();
});
