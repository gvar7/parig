# Parig - Պարիգ (Western Armenian Wordle Clone)

A Wordle-style word puzzle game built in Western Armenian, inspired by [Wordle — The New York Times](https://www.nytimes.com/games/wordle/index.html).

## Features

- **Wordle-style gameplay**: 6 chances to guess a 5-letter English word
- **Western Armenian UI**: All interface text is in Western Armenian (հայերեն)
- **PWA-ready**: Install as an app on mobile devices
- **Keyboard animations**: Satisfying flip animations for correct/present/absent letters
- **Confetti celebration**: Fun confetti effect when you win!

## How to Play

1. Open the game in a browser (desktop or mobile)
2. Type 5-letter English words using your keyboard
3. Guess the secret word within 6 attempts:
   - 🟩 Green = Letter is correct and in the right position
   - 🟨 Yellow = Letter exists but in wrong position  
   - ⬛ Gray = Letter doesn't exist in the word

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
├── app.js              # Game logic and animations
├── manifest.json       # PWA manifest configuration
├── service-worker.js   # Offline caching for PWA
├── favicon.svg         # Browser tab icon
├── icon-192.svg        # 192x192 app icon (PWA)
└── icon-512.svg        # 512x512 app icon (PWA)
```

## Western Armenian Translations

| English | Western Armenian |
|---------|------------------|
| Correct | Ճիշտ է (Jisht e) |
| Present | Կա (Ka) |
| Absent | Անկապ է (Ankap e) |
| Win! | Հաղթանակ! (Haghtanak!) |
| New game | Նոր խաղ (Nor khagh) |

## Game Words

The game uses a curated list of 5-letter English words including:
- APPLE, BEACH, BRAIN, BREAD, BRUSH
- CHAIR, CHEST, CHORD, CLICK, CLOCK
- CLOUD, DANCE, DIARY, DRINK, EARTH
- FEAST, FIELD, FRUIT, GLASS, GRAPE
- GREEN, HEART, HOUSE, JUICE, LIGHT
- LEMON, MELON, MONEY, MUSIC, NIGHT
- OCEAN, PARTY, PIZZA, PHONE, PLANE
- PLANT, PLATE, POWER, RADIO, RIVER
- ROBOT, SHIRT, SHOES, SLEEP, SMILE
- SNACK, SPACE, STONE, STORM, TABLE
- TIGER, TOAST, TRAIN, TRUCK, VOICE
- WATER, WATCH, WHOLE, WOMAN, WORLD
- WRITE, YOUTH

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
