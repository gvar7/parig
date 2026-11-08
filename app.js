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
    "SHOES", "SLEEP", "SMILE", "SNACK", "SPACE", "SPONGE", "STORM",
    "TABLE", "TIGER", "TOAST", "TRAIN", "TRUCK", "VOICE", "WATER",
    "WATCH", "WHOLE", "WOMAN", "WORLD", "WRITE", "YOUTH"
  ],
  
  // Western Armenian translations for UI elements
  ui: {
    correct: "Ճիշտ է",
    present: "Կա",
    absent: "Անկապ է",
    win: "Հաղթանակ!",
    lose: "Վերջ:",
    restart: "Վերանորոգել",
    playAgain: "Խաղալ նորից"
  }
};

class ParigGame {
  constructor() {
    this.secretWord = "";
    this.currentRow = 0;
    this.currentTile = 0;
    this.rows = 6;
    this.cols = 5;
    this.active = false;
    
    // Tile states: 'active', 'correct', 'present', 'absent'
    this.tileStates = [];
    
    // Keyboard states
    this.keyboardStates = {};
    
    // Animation tracking
    this.animatingTiles = [];
    this.animatingKeyboard = [];
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
    
    for (let i = 0; i < this.rows * this.cols; i++) {
      const tile = document.createElement("div");
      tile.id = `tile-${i}`;
      tile.classList.add("tile");
      board.appendChild(tile);
      
      // Initialize tile states array
      if (!this.tileStates[i]) {
        this.tileStates[i] = "active";
      }
    }
  }

  createKeyboard() {
    const keyboardContainer = document.getElementById("keyboard");
    keyboardContainer.innerHTML = "";
    
    const rows = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["ENTER", "Z", "X", "C", "V", "B", "N", "M"]
    ];

    rows.forEach((rowKeys, rowIndex) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("keyboard-row");
      
      rowKeys.forEach(key => {
        const keyDiv = document.createElement("div");
        keyDiv.id = `key-${key}`;
        keyDiv.textContent = key === "ENTER" ? "ENTER" : key;
        keyDiv.classList.add("key", "wide");
        
        if (key === "ENTER") {
          keyDiv.classList.remove("wide");
        } else if (key === "BACKSPACE") {
          keyDiv.classList.add("wide");
        }
        
        rowDiv.appendChild(keyDiv);
      });
      
      keyboardContainer.appendChild(rowDiv);
    });

    // Setup keyboard click handlers
    const allKeys = Array.from(document.querySelectorAll(".keyboard-row .key"));
    allKeys.forEach(key => {
      key.addEventListener("click", () => this.handleKeyClick(key.id));
    });
  }

  setupEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (!this.active) return;
      
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
    // Pick a random word from common words
    const words = WORDS.common;
    this.secretWord = words[Math.floor(Math.random() * words.length)];
    
    console.log("Secret word:", this.secretWord);
    
    this.currentRow = 0;
    this.currentTile = 0;
    this.active = true;
    
    // Reset tile states
    for (let i = 0; i < this.rows * this.cols; i++) {
      this.tileStates[i] = "active";
    }
    
    // Reset keyboard states
    Object.keys(this.keyboardStates).forEach(key => {
      this.keyboardStates[key] = "";
    });
    
    // Update UI
    document.getElementById("message-container").innerHTML = "";
    this.renderBoard();
  }

  renderBoard() {
    for (let i = 0; i < this.rows * this.cols; i++) {
      const tile = document.getElementById(`tile-${i}`);
      if (!tile) continue;
      
      const state = this.tileStates[i];
      tile.setAttribute("data-state", state);
      
      // Add letter if present
      let row = Math.floor(i / 5);
      let col = i % 5;
      
      if (row < 6 && col < 5) {
        const letterIndex = this.currentRow * 5 + col;
        if (letterIndex < this.secretWord.length) {
          tile.textContent = this.secretWord[letterIndex];
        } else {
          tile.textContent = "";
        }
      }
    }
  }

  addLetter(letter) {
    const letterIndex = this.currentRow * 5 + this.currentTile;
    
    if (this.active && letterIndex < this.secretWord.length) {
      const tile = document.getElementById(`tile-${letterIndex}`);
      tile.textContent = letter;
      
      // Update keyboard state
      this.keyboardStates[letter] = "active";
      
      this.renderBoard();
    }
  }

  deleteLetter() {
    const letterIndex = this.currentRow * 5 + this.currentTile - 1;
    
    if (this.active && letterIndex >= 0) {
      const tile = document.getElementById(`tile-${letterIndex}`);
      tile.textContent = "";
      
      // Update keyboard state
      let letter = tile.id.replace("tile-", "");
      this.keyboardStates[letter] = "active";
      
      this.renderBoard();
    }
  }

  checkRow() {
    const rowStart = this.currentRow * 5;
    const guess = [];
    
    for (let i = 0; i < 5; i++) {
      const tileIndex = rowStart + i;
      const tile = document.getElementById(`tile-${tileIndex}`);
      
      if (!this.active) continue;
      
      let letter = tile.textContent;
      
      // Update keyboard state
      this.keyboardStates[letter] = "active";
      
      guess.push(letter);
    }
    
    if (guess.length === 5 && this.active) {
      const correctWord = this.secretWord;
      const result = this.checkGuess(guess, correctWord);
      
      // Apply animations and states
      for (let i = 0; i < 5; i++) {
        const tileIndex = rowStart + i;
        const tile = document.getElementById(`tile-${tileIndex}`);
        
        if (!this.active) continue;
        
        let letter = tile.textContent;
        
        // Update keyboard state
        this.keyboardStates[letter] = "active";
        
        switch (result[i]) {
          case 0:
            tile.setAttribute("data-state", "absent");
            break;
          case 1:
            tile.setAttribute("data-state", "present");
            break;
          case 2:
            tile.setAttribute("data-state", "correct");
            break;
        }
        
        // Add animation class after a short delay
        setTimeout(() => {
          const state = this.tileStates[tileIndex];
          if (this.active && state === "absent") {
            tile.classList.add("flip");
          } else if (this.active && state === "present") {
            tile.classList.add("flip");
          } else if (this.active && state === "correct") {
            tile.classList.add("flip");
          }
        }, 300);
      }
      
      // Check for win/loss after animations
      setTimeout(() => {
        this.checkGameOver();
      }, 1500);
    }
    
    this.currentTile = 0;
    this.renderBoard();
  }

  checkGuess(guess, correctWord) {
    const result = [];
    const guessCounts = {};
    const correctCounts = {};
    
    // Count letters in correct word
    for (let i = 0; i < correctWord.length; i++) {
      const letter = correctWord[i];
      correctCounts[letter] = (correctCounts[letter] || 0) + 1;
    }
    
    // First pass: find correct letters
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      
      if (letter === correctWord[i]) {
        result.push(2);
        correctCounts[letter]--;
        guessCounts[letter] = (guessCounts[letter] || 0) + 1;
      } else {
        guessCounts[letter] = (guessCounts[letter] || 0) + 1;
      }
    }
    
    // Second pass: find present letters
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      
      if (result[i] === 2) continue;
      
      if (correctCounts[letter] > 0 && guessCounts[letter] > 0) {
        result.push(1);
        correctCounts[letter]--;
        guessCounts[letter]--;
      } else {
        result.push(0);
      }
    }
    
    return result;
  }

  checkGameOver() {
    const rowStart = this.currentRow * 5;
    let isWin = false;
    let isLose = false;
    
    for (let i = 0; i < 5; i++) {
      const tileIndex = rowStart + i;
      const state = this.tileStates[tileIndex];
      
      if (state === "correct") {
        isWin = true;
      } else if (state !== "active") {
        isLose = true;
      }
    }
    
    // Show message
    let messageDiv = document.getElementById("message-container");
    messageDiv.innerHTML = "";
    
    if (isWin) {
      const msg = document.createElement("div");
      msg.id = "message-correct";
      msg.className = "message";
      msg.textContent = WORDS.ui.win;
      messageDiv.appendChild(msg);
      
      // Add confetti effect
      this.addConfetti();
    } else if (isLose) {
      const msg = document.createElement("div");
      msg.id = "message-absent";
      msg.className = "message";
      msg.textContent = WORDS.ui.lose + ` ${this.secretWord}`;
      messageDiv.appendChild(msg);
    }
    
    this.active = false;
  }

  handleKeyClick(keyId) {
    if (!this.active) return;
    
    let key = keyId.replace("key-", "");
    
    if (key === "ENTER") {
      this.checkRow();
    } else if (key === "BACKSPACE") {
      this.deleteLetter();
    } else {
      // Single letter keys are handled by keyboard event listener
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
