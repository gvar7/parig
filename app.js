// Parig - Պարիգ: Western Armenian Wordle

const WORDS = {
  // 5-letter Western Armenian words (classical orthography).
  // "ու" is written as two letters, Ո + Ւ, as in the 38-letter alphabet.
  common: [
    // Nature & time
    "ԵՐԿԻՐ", "ԱՇՈՒՆ", "ԳԻՇԵՐ", "ԱՌՏՈՒ", "ԿԷՍՕՐ", "ԱՅՍՕՐ", "ՇԱԲԱԹ", "ՏԱՐԻՔ",
    "ԱՆՏԱՌ", "ԾԱՂԻԿ", "ՏԵՐԵՒ", "ԱՐՄԱՏ", "ՊՏՈՒՂ", "ՑՈՐԵՆ", "ԲԼՈՒՐ", "ԳԵՏԱԿ",
    "ՋՐՎԷԺ", "ՃԱՀԻՃ", "ԾՈՎԱՓ", "ՄՐՐԻԿ", "ՄՇՈՒՇ", "ԽԱՒԱՐ", "ՀԱՐԱՒ", "ՑՈՒՐՏ",
    // Food
    "ԽՆՁՈՐ", "ԾԻՐԱՆ", "ԽԱՂՈՂ", "ԱՐՄԱՒ", "ԿԱՂԻՆ", "ԼՈԼԻԿ", "ՍԽՏՈՐ", "ԳԱԶԱՐ",
    "ԲՐԻՆՁ", "ԱԼԻՒՐ", "ԿԱՐԱԳ", "ՊԱՆԻՐ", "ՇԱՔԱՐ", "ՊՂՊԵՂ", "ՔԱՑԱԽ", "ԱՂՑԱՆ",
    "ԱՊՈՒՐ", "ԼԱՒԱՇ", "ԳԱԹԱՅ", "ՍՈՒՐՃ", "ԽՄԻՉՔ", "ԱՆՈՒՇ",
    // Home & objects
    "ՍԵՂԱՆ", "ԴԱՐԱԿ", "ԲԱԺԱԿ", "ԴԱՆԱԿ", "ՏԱՆԻՔ", "ԹՈՒՂԹ", "ՄԱՏԻՏ", "ՄԵԼԱՆ",
    "ՆԱՄԱԿ", "ԱԿՆՈՑ", "ՇԱՊԻԿ", "ԿՕՇԻԿ", "ԳՆԴԱԿ", "ՄՈՒՐՃ", "ՊԱՐԱՆ", "ՄԿՐԱՏ",
    "ԲՈՒՐԴ", "ԵՐԿԱԹ", "ԱՐԾԱԹ", "ՊՂԻՆՁ", "ԱՂԻՒՍ", "ԱՊԱԿԻ", "ՆՈՒԷՐ", "ԳՆԱՑՔ",
    "ՆԱՒԱԿ", "ՎԱՀԱՆ",
    // Body & people
    "ԳԼՈՒԽ", "ԱԿԱՆՋ", "ԲԵՐԱՆ", "ՄԱԶԵՐ", "ԱՐԻՒՆ", "ԼԵԶՈՒ", "ԿԵԱՆՔ", "ԱՆՈՒՆ",
    "ՀԱՅԵՐ", "ԸՆԿԵՐ", "ԴՐԱՑԻ", "ԶԱՒԱԿ", "ԱՂՋԻԿ", "ՊԱՊԻԿ", "ՄԱՄԻԿ", "ՓԵՍԱՅ",
    "ՏԻԿԻՆ", "ՊԱՐՈՆ", "ԲԺԻՇԿ", "ԵՐԳԻՉ", "ՀՈՎԻՒ", "ԻՇԽԱՆ", "ԱՐՔԱՅ", "ԱՍՊԵՏ",
    "ՎԻՇԱՊ", "ՀՍԿԱՅ", "ԹԶՈՒԿ", "ԽՈՒՄԲ",
    // Places & animals
    "ԴՊՐՈՑ", "ՔԱՂԱՔ", "ՓՈՂՈՑ", "ԱՄՐՈՑ", "ՏԱՃԱՐ", "ԴՐԱԽՏ", "ԱՌԻՒԾ", "ԿԱՏՈՒ",
    "ՈՉԽԱՐ",
    // Adjectives
    "ՊԶՏԻԿ", "ԵՐԿԱՐ", "ԲԱՐԱԿ", "ԲԱՐՁՐ", "ՊԱՐԱՊ", "ԿԱՆԱՉ", "ԴԵՂԻՆ", "ԽԵԼՕՔ",
    "ՈՒՐԱԽ", "ՏԽՈՒՐ", "ԱՌՈՂՋ", "ՈՒԺԵՂ", "ԱՂՔԱՏ", "ՍՈՒՐԲ",
    // Abstract & misc
    "ԱՂՕԹՔ", "ԾԻԾԱՂ", "ԱՐԿԱԾ", "ՀՄԱՅՔ", "ՓԱՓԱՔ", "ԱՐԺԷՔ", "ՊԱՐՏՔ", "ՕԳՈՒՏ",
    "ՏԱՌԵՐ", "ԲԱՌԵՐ", "ՀԱԶԱՐ", "ԵՐԿՈՒ", "ԶԱՏԻԿ", "ԲԱՐԵՒ", "ԳՈՒՑԷ", "ՅԵՏՈՅ",
    "ԵՐԲԵՔ", "ՈՐՔԱՆ", "ԻՆՉՈՒ", "ԱՌՋԵՒ", "ՀԵՌՈՒ", "ԴԻՄԱՑ",
    // Verbs
    "ԽԱՂԱԼ", "ՍԻՐԵԼ", "ՈՒՏԵԼ", "ԵՐԳԵԼ", "ՊԱՐԵԼ", "ՎԱԶԵԼ", "ԽՕՍԻԼ", "ՆՍՏԻԼ",
    "ԿԵՆԱԼ", "ՔԱԼԵԼ", "ԵՐԹԱԼ", "ԱՌՆԵԼ", "ԲԱՆԱԼ", "ԳՈՑԵԼ", "ԽՆԴԱԼ", "ՅԻՇԵԼ",
    "ՈՒԶԵԼ", "ԳՏՆԵԼ", "ՇԻՆԵԼ", "ԼՈՒԱԼ", "ԿՏՐԵԼ", "ՕԳՆԵԼ", "ՓՐԿԵԼ", "ՊԱՀԵԼ",
    "ՍԿՍԻԼ", "ՇԱՀԻԼ"
  ],

  // Western Armenian UI text
  ui: {
    win: "Հաղթանակ!",
    lose: "Վերջ: Բառն էր՝",
    notEnough: "5 տառ պէտք է",
    notAWord: "Բառը ցանկին մէջ չէ",
    restart: "Նոր խաղ",
    playAgain: "Խաղալ նորից",
    share: "Կիսուիլ",
    finishFirst: "Նախ խաղը աւարտէ",
    copied: "Պատճէնուեցաւ",
    copyFailed: "Պատճէնումը չյաջողեցաւ",
    tomorrow: "Վաղը նոր բառ"
  }
};

// Extra 5-letter Western Armenian words accepted as guesses (never used as answers).
// Add to this list to widen what counts as a "proper word".
const VALID_WORDS = [
  // Nouns
  "ԱՐՁԱՆ", "ԱՐՁԱԿ", "ԱՐԾԻՒ", "ԱՐՋԱՌ", "ԲԱԳԻՆ", "ԲԱԺԻՆ", "ԲԱՆԱԿ", "ԲԱՐԴԻ",
  "ԲԱՐԻՔ", "ԲԱՑԱՏ", "ԲՈՒՐԳ", "ԳԱԼԻՔ", "ԳԱՒԱԹ", "ԳԱՒԱՌ", "ԳԵՏԻՆ", "ԳԵՐԱՆ",
  "ԳՈՄԷՇ", "ԴԱՓՆԻ", "ԴԻՄԱԿ", "ԵՐՇԻԿ", "ԶԳԵՍՏ", "ԹԱՂԱՐ", "ԹԱՆԱՔ", "ԹԻԹԵՌ",
  "ԺՈՂՈՎ", "ԻՄԱՍՏ", "ԼԱՅՆՔ", "ԽՈՐԱՆ", "ԾԱՌԱՅ", "ԾՈՎԱԿ", "ԾՈՒՆԿ", "ԿԱԹԻԼ",
  "ԿԱԾԱՆ", "ԿԱՄԱՐ", "ԿԱՅԱՆ", "ԿԱՅՍՐ", "ԿԱՊԻԿ", "ԿԱՐԱՍ", "ԿԱՐԻՔ", "ԿՈՂՈՎ",
  "ԿՈՃԱԿ", "ԿՌՆԱԿ", "ՀԱՄԱՐ", "ՀԱՒԱՔ", "ՀԵՐՈՍ", "ՀՐԱՇՔ", "ՁԱՒԱՐ", "ՃԱԿԱՏ",
  "ՄԱՍԻՍ", "ՄԱՏԱՂ", "ՄԵՂՈՒ", "ՄԵՏԱՂ", "ՄԻՋԱՏ", "ՄՈԽԻՐ", "ՄՈՒՏՔ", "ՆԱԽԻՐ",
  "ՇԻՐԻՄ", "ՈՍԿՈՐ", "ՈՒՂԵՂ", "ՊԱԼԱՏ", "ՊԱՀԱԿ", "ՊԱՇԱՐ", "ՊԱՊԱԿ", "ՊԱՐԻԿ",
  "ՊԱՏԻԺ", "ՊԱՏԻՒ", "ՊՏՈՅՏ", "ՋՐՀՈՐ", "ՌՈՒՄԲ", "ՍԱՓՈՐ", "ՍԿԻԶԲ", "ՍԿԻՒՌ",
  "ՍՊԱՍՔ", "ՍՐԲԻՉ", "ՎԱՐՁՔ", "ՎԻՃԱԿ", "ՏԱՊԱԿ", "ՏԱՐԱԶ", "ՏԵՍԱԿ", "ՏՈՄԱՐ",
  "ՓԱԿԱՆ", "ՓՈՒՆՋ", "ՓՐԿԻՉ", "ՔԱՆԱԿ", "ՕՐԷՆՔ", "ԼԵԱՐԴ", "ԱԿՌԱՅ", "ԱՊՐԻԼ",
  "ՄԱՅԻՍ", "ՊԱՀԵՐ", "ՇԱՏԵՐ",
  // Food & animals
  "ՓԻԼԱՒ", "ՔԷՊԱՊ", "ՍԻՍԵՌ", "ԲԱՄԻԱ", "ԴԴՈՒՄ", "ԿԵՌԱՍ", "ՍԱԼՈՐ", "ԲԱՆԱՆ",
  "ԱՔԼՈՐ", "ԱԳՌԱՒ", "ԿԱՔԱՒ", "ՍՈԽԱԿ", "ԵՂՆԻԿ", "ԱՌՆԷՏ", "ՄՈՂԷՍ", "ԾՂՐԻԴ",
  "ՄԱՏԱԿ",
  // Adjectives
  "ԱՄՈՒՐ", "ԱՆՕԹԻ", "ԱՐԴԱՐ", "ԹԵԹԵՒ", "ԽԱՂԱՂ", "ԽՈՆԱՒ", "ԿՈՊԻՏ", "ՀԱՄԵՂ",
  "ՀՊԱՐՏ", "ՆԻՀԱՐ", "ՏԱՓԱԿ", "ՎԱՅՐԻ", "ՔԱՂՑՐ", "ՊՂՏՈՐ", "ՈՒՂԻՂ", "ՈՒՐԻՇ",
  "ՄԻՆԱԿ", "ՄՕՏԻԿ", "ԲՈԼՈՐ", "ՆՈՒԱԶ",
  // Verbs
  "ԱՅՐԻԼ", "ԲԵՐԵԼ", "ԳՈՌԱԼ", "ԹՈՒԻԼ", "ԹՌՉԻԼ", "ԺՊՏԻԼ", "ԾԱԽԵԼ", "ԾԵԾԵԼ",
  "ԿԱՊԵԼ", "ԿԱՐԵԼ", "ՂՐԿԵԼ", "ՆԱՅԻԼ", "ՆԵՐԵԼ", "ՇԱՐԵԼ", "ՇՆՉԵԼ", "ՊՏՏԻԼ",
  "ՋՆՋԵԼ", "ՎԱՐԵԼ", "ՏԱՆԻԼ", "ՑԱՆԵԼ", "ՓԱԿԵԼ", "ՓՈԽԵԼ", "ՔԱՇԵԼ", "ՔՆՆԵԼ",
  // Pronouns, adverbs & function words
  "ԱՆԳԱՄ", "ԱՆԴԻՆ", "ԱՌԱՆՑ", "ԱՐԴԷՆ", "ՀԱԶԻՒ", "ՄԻԱՅՆ", "ՅԱՃԱԽ", "ՆՈՐԷՆ",
  "ԱՍԻԿԱ", "ԱՏԻԿԱ", "ԱՆԻԿԱ", "ԱՍՈՆՔ", "ԱՏՈՆՔ", "ԱՆՈՆՔ", "ԻՐԵՆՔ", "ՈՐՈՒՆ",
  "ՈՐՊԷՍ", "ՈՒՐԿԷ", "ՀՈՍԿԷ", "ՀՈՆԿԷ", "ԿԱՄԱՑ", "ՎԵՐԵՒ", "ԴՈՒՐՍ", "ԳՐԵԹԷ",
  // Plurals
  "ԱՉՔԵՐ", "ՈՏՔԵՐ", "ԾԱՌԵՐ", "ՔԱՐԵՐ", "ԵՐԳԵՐ", "ԱՄՊԵՐ", "ԿԻՆԵՐ", "ԳԻՐԵՐ",
  "ՍԱՐԵՐ", "ԽԱՂԵՐ", "ԱՐՏԵՐ", "ԳԵՏԵՐ", "ԾՈՎԵՐ", "ՁՈՐԵՐ", "ԲԱԿԵՐ", "ՊԱՏԵՐ",
  "ՀԱՑԵՐ", "ՃԱՇԵՐ", "ԴԱՍԵՐ", "ՏԷՐԵՐ", "ԽԱՉԵՐ", "ԹԵՒԵՐ", "ՊՈՉԵՐ", "ՀՈՂԵՐ",
  "ԴՌՆԵՐ", "ԺԱՄԵՐ", "ՆԱՒԵՐ", "ՍՈԽԵՐ", "ՀԱՒԵՐ", "ԿՈՎԵՐ", "ԱՐՋԵՐ", "ՓԻՂԵՐ",
  "ԾԻՏԵՐ"
];

// Every word a player may enter: the answers plus the extra valid words
const DICTIONARY = new Set([...WORDS.common, ...VALID_WORDS]);

const SHARE_SQUARES = ["⬛", "🟨", "🟩"];

// The 38 letters of the Armenian alphabet, laid out in four rows
const KEYBOARD_ROWS = [
  ["Ա", "Բ", "Գ", "Դ", "Ե", "Զ", "Է", "Ը", "Թ", "Ժ"],
  ["Ի", "Լ", "Խ", "Ծ", "Կ", "Հ", "Ձ", "Ղ", "Ճ", "Մ"],
  ["Յ", "Ն", "Շ", "Ո", "Չ", "Պ", "Ջ", "Ռ", "Ս", "Վ"],
  ["ENTER", "Տ", "Ր", "Ց", "Ւ", "Փ", "Ք", "Օ", "Ֆ", "BACKSPACE"]
];

// Uppercase Armenian letters Ա (U+0531) through Ֆ (U+0556)
const ARMENIAN_LETTER = /^[Ա-Ֆ]$/;

// One word per calendar day; progress survives closing the app.
const STATE_KEY = "parig-state";
const DAY_EPOCH = new Date(2025, 0, 1); // Jan 1 2025 — day 0

// Local YYYY-MM-DD, so the word changes at the player's own midnight
function todayKey() {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function dailyWord(words) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Math.round, not floor: a day that contains a DST change is 23 or 25 hours
  // long, and floor would land on the previous day for every day after spring-forward.
  const dayIndex = Math.round((today - DAY_EPOCH) / 86400000) % words.length;
  return words[dayIndex];
}

class ParigGame {
  constructor() {
    this.rows = 6;
    this.cols = 5;
    this.secretWord = "";
    this.currentRow = 0;
    this.currentTile = 0;
    this.active = false;
    this.revealing = false;
    this.won = false;

    this.boardLetters = []; // letter shown in each tile
    this.tileStates = [];   // 'active' | 'correct' | 'present' | 'absent'
    this.keyboardStates = {}; // letter -> best state so far
    this.results = [];      // per submitted row: array of 0 absent / 1 present / 2 correct
    this.toastTimer = null;
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

    KEYBOARD_ROWS.forEach(rowKeys => {
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
    // Physical keyboards need an Armenian layout; the on-screen keyboard works everywhere.
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Enter") {
        this.checkRow();
        return;
      }
      if (e.key === "Backspace") {
        this.deleteLetter();
        return;
      }
      if (e.key.length > 2) return; // other control keys

      // "և" uppercases to the two letters "ԵՒ", so iterate
      for (const letter of e.key.toUpperCase()) {
        if (ARMENIAN_LETTER.test(letter)) {
          this.addLetter(letter);
        }
      }
    });

    // One word a day: the button only starts a game once the date has rolled over.
    document.getElementById("restart-btn").addEventListener("click", () => {
      if (this.gameDate !== todayKey()) {
        this.startNewGame();
      } else {
        this.showToast(WORDS.ui.tomorrow);
      }
    });

    // An app left open past midnight picks up the new word when it is reopened.
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && this.gameDate !== todayKey() && !this.revealing) {
        this.startNewGame();
      }
    });

    document.getElementById("share-btn").addEventListener("click", () => {
      this.share();
    });
  }

  startNewGame() {
    const date = todayKey();
    const saved = this.loadState();
    this.gameDate = date;
    this.secretWord = (saved && saved.date === date && saved.secretWord) || dailyWord(WORDS.common);

    this.currentRow = 0;
    this.currentTile = 0;
    this.active = true;
    this.revealing = false;
    this.won = false;

    this.boardLetters = new Array(this.rows * this.cols).fill("");
    this.tileStates = new Array(this.rows * this.cols).fill("active");
    this.keyboardStates = {};
    this.results = [];

    document.getElementById("message-container").innerHTML = "";
    this.setShareEnabled(false);

    if (saved && saved.date === date && Array.isArray(saved.guesses)) {
      this.replayGuesses(saved.guesses);
    }

    this.renderBoard();
    this.renderKeyboard();
    this.updateEnterKey();
    this.updateRestartButton();
    this.saveState();
  }

  loadState() {
    try {
      return JSON.parse(localStorage.getItem(STATE_KEY) || "null");
    } catch (err) {
      return null;
    }
  }

  saveState() {
    const guesses = [];
    for (let r = 0; r < this.results.length; r++) {
      guesses.push(this.boardLetters.slice(r * this.cols, (r + 1) * this.cols).join(""));
    }
    const state = {
      date: this.gameDate,
      secretWord: this.secretWord,
      guesses,
      currentRow: this.currentRow,
      gameOver: !this.active,
      won: this.won
    };
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (err) {
      // Private mode or full storage: the game still works, it just won't resume.
    }
  }

  // Rebuild today's board from the saved guesses, re-scoring each one so the
  // tile and keyboard colours match what the player saw.
  replayGuesses(guesses) {
    const stateNames = ["absent", "present", "correct"];
    const priority = { absent: 1, present: 2, correct: 3 };

    for (const word of guesses.slice(0, this.rows)) {
      const guess = Array.from(word); // every Armenian letter is one code point
      if (guess.length !== this.cols) continue;

      const result = this.checkGuess(guess, this.secretWord);
      const rowStart = this.currentRow * this.cols;
      this.results.push(result);

      for (let i = 0; i < this.cols; i++) {
        const state = stateNames[result[i]];
        this.boardLetters[rowStart + i] = guess[i];
        this.tileStates[rowStart + i] = state;
        const existing = this.keyboardStates[guess[i]];
        if (!existing || priority[state] > priority[existing]) {
          this.keyboardStates[guess[i]] = state;
        }
      }

      if (word === this.secretWord) {
        this.active = false;
        this.won = true;
        this.showMessage(WORDS.ui.win, "correct");
        this.setShareEnabled(true);
        return;
      }

      this.currentRow++;
    }

    if (this.currentRow >= this.rows) {
      this.active = false;
      this.showMessage(`${WORDS.ui.lose} ${this.secretWord}`, "absent");
      this.setShareEnabled(true);
    }
  }

  // Dimmed while today's word is in play or done; tapping it says a new word comes tomorrow.
  updateRestartButton() {
    const btn = document.getElementById("restart-btn");
    if (!btn) return;
    const label = this.active ? WORDS.ui.restart : WORDS.ui.tomorrow;
    btn.classList.toggle("dim", this.gameDate === todayKey());
    btn.setAttribute("aria-label", label);
    btn.title = WORDS.ui.tomorrow;
  }

  currentGuess() {
    const rowStart = this.currentRow * this.cols;
    return this.boardLetters.slice(rowStart, rowStart + this.currentTile).join("");
  }

  isValidWord(word) {
    return DICTIONARY.has(word);
  }

  // ENTER only looks pressable when the row holds a valid 5-letter word
  updateEnterKey() {
    const enterKey = document.getElementById("key-ENTER");
    if (!enterKey) return;

    const ready = this.active && !this.revealing &&
      this.currentTile === this.cols && this.isValidWord(this.currentGuess());
    enterKey.classList.toggle("disabled", !ready);
  }

  // Shake the row, flash its tiles red and explain why the guess was refused
  rejectRow(text) {
    const rowDiv = document.querySelectorAll("#board .row")[this.currentRow];
    const rowStart = this.currentRow * this.cols;
    const tiles = [];
    for (let i = 0; i < this.currentTile; i++) {
      tiles.push(document.getElementById(`tile-${rowStart + i}`));
    }

    if (rowDiv) {
      rowDiv.classList.remove("shake");
      void rowDiv.offsetWidth; // restart the animation if it is already running
      rowDiv.classList.add("shake");
    }
    tiles.forEach(tile => tile.classList.add("invalid"));

    setTimeout(() => {
      if (rowDiv) rowDiv.classList.remove("shake");
      tiles.forEach(tile => tile.classList.remove("invalid"));
    }, 700);

    this.showMessage(text, "error", true);
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
    this.updateEnterKey();
  }

  deleteLetter() {
    if (!this.active || this.revealing) return;
    if (this.currentTile <= 0) return;

    this.currentTile--;
    const index = this.currentRow * this.cols + this.currentTile;
    this.boardLetters[index] = "";
    this.renderTile(index);
    this.updateEnterKey();
  }

  checkRow() {
    if (!this.active || this.revealing) return;

    if (this.currentTile < this.cols) {
      this.rejectRow(WORDS.ui.notEnough);
      return;
    }

    if (!this.isValidWord(this.currentGuess())) {
      this.rejectRow(WORDS.ui.notAWord);
      return;
    }

    const rowStart = this.currentRow * this.cols;
    const guess = this.boardLetters.slice(rowStart, rowStart + this.cols);
    const result = this.checkGuess(guess, this.secretWord);
    const stateNames = ["absent", "present", "correct"];

    this.results.push(result);
    this.revealing = true;
    this.updateEnterKey();

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
      this.won = true;
      this.showMessage(WORDS.ui.win, "correct");
      this.setShareEnabled(true);
      this.addConfetti();
      this.saveState();
      this.updateRestartButton();
      return;
    }

    this.currentRow++;
    this.currentTile = 0;

    if (this.currentRow >= this.rows) {
      this.active = false;
      this.showMessage(`${WORDS.ui.lose} ${this.secretWord}`, "absent");
      this.setShareEnabled(true);
    }

    this.saveState();
    this.updateRestartButton();
    this.updateEnterKey();
  }

  setShareEnabled(enabled) {
    // The button stays clickable so it can explain itself mid-game; it is only dimmed.
    const btn = document.getElementById("share-btn");
    btn.classList.toggle("dim", !enabled);
    btn.classList.toggle("ready", enabled);
  }

  buildShareText() {
    const score = this.won ? `${this.results.length}/${this.rows}` : `X/${this.rows}`;
    const grid = this.results
      .map(row => row.map(value => SHARE_SQUARES[value]).join(""))
      .join("\n");
    const url = `${location.origin}${location.pathname}`;

    return `Պարիգ ${score}\n\n${grid}\n\n${url}`;
  }

  async share() {
    if (this.active || this.results.length === 0) {
      this.showToast(WORDS.ui.finishFirst);
      return;
    }

    const text = this.buildShareText();

    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return; // user closed the share sheet
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      this.showToast(WORDS.ui.copied);
    } catch (err) {
      this.showToast(WORDS.ui.copyFailed);
    }
  }

  showToast(text) {
    const toast = document.getElementById("toast");
    toast.textContent = text;
    toast.classList.add("show");

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
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
  window.parig = game; // handy for debugging from the console
});
