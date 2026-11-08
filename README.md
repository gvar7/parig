# Parig - Պարիգ (Western Armenian Wordle)

A Wordle-style word puzzle game in Western Armenian, inspired by [Wordle — The New York Times](https://www.nytimes.com/games/wordle/index.html).

## Features

- **Wordle-style gameplay**: 6 chances to guess a 5-letter Western Armenian word
- **Armenian keyboard**: On-screen keyboard with all 38 letters of the Armenian alphabet
- **Western Armenian UI**: All interface text is in Western Armenian (արեւմտահայերէն), classical orthography
- **PWA-ready**: Install as an app on mobile devices
- **Flip animations** for correct/present/absent letters, and a **confetti celebration** when you win

## How to Play

1. Open the game in a browser (desktop or mobile)
2. Tap letters on the on-screen keyboard (or type with an Armenian keyboard layout) to enter a 5-letter word, then press ENTER
3. Guess the secret word within 6 attempts:
   - 🟩 Green = Letter is correct and in the right position
   - 🟨 Yellow = Letter exists but in the wrong position
   - ⬛ Gray = Letter is not in the word

Note: «ու» counts as two letters, Ո + Ւ, following the classical 38-letter alphabet.

## Installation (PWA)

### Desktop (Chrome/Edge/Firefox)

1. Open the hosted URL in your browser (PWA install and offline caching require the app to be served over HTTP/HTTPS — opening `index.html` directly from disk will run the game, but won't register the service worker)
2. Go to **Settings** → **Apps** → **Install App** (or right-click → "Add to Home screen")
3. The app will be installed and can be launched from your home screen

### Mobile (Android/iOS)

1. Open the URL on your mobile device
2. Tap the browser menu (⋮ or ⋯)
3. Select **"Add to Home Screen"** or **"Install App"**
4. Launch from your home screen for full-screen experience

## File Structure

```
parig-pwa/
├── index.html          # Main HTML file with Western Armenian UI
├── app.js              # Game logic, word list, and animations
├── manifest.json       # PWA manifest configuration
├── service-worker.js   # Offline caching for PWA
├── favicon.svg         # Browser tab icon
├── icon-192.svg        # 192x192 app icon (PWA)
└── icon-512.svg        # 512x512 app icon (PWA)
```

## UI Text

| English | Western Armenian |
|---------|------------------|
| Win! | Հաղթանակ! (Haghtanak!) |
| Game over, the word was… | Վերջ: Բառն էր՝ (Verch. Parn er) |
| 5 letters needed | 5 տառ պէտք է (Hink dar bedk e) |
| New game | Նոր խաղ (Nor khagh) |

## Word List

The secret words are common 5-letter Western Armenian words in classical orthography — nature, food, household objects, people, places, adjectives, and verbs — defined in `WORDS.common` at the top of `app.js`. Add or remove words there; each must be exactly 5 Armenian letters (with ու written as Ո + Ւ).

## Technical Details

- **Framework**: Vanilla JavaScript (no dependencies)
- **Styling**: CSS Grid for responsive layout
- **Animations**: CSS keyframes for flip effects
- **PWA**: Service worker with offline caching
- **Responsive**: Works on desktop and mobile devices

## Browser Support

- Chrome 60+
- Edge 79+
- Firefox 55+
- Safari 12.1+
- Mobile browsers (iOS/Android)

## License

MIT License - Feel free to use, modify, and distribute!

---

**Created with ❤️ for the Western Armenian community**
