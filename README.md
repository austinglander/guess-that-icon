# Guess That Icon

A fun web-based guessing game where players try to identify Material Icons by their visual appearance. Test your knowledge of Google's Material Design icon library!

## 🎮 How to Play

1. **View the Icon**: A random Material Icon is displayed
2. **Guess the Name**: Type the icon's name in the input field
3. **Get Hints**: Each wrong guess or skip reveals a random letter
4. **Score Points**: Guess correctly before 75% of letters are revealed to earn a point
5. **Keep Playing**: Move on to the next icon and build your score!

## 🎯 Game Features

### Core Gameplay
- **Dynamic Icon Loading**: Fetches the complete Material Icons library from Google's repository (~2000+ icons)
- **Smart Scoring**: +1 point for guessing before 75% of letters revealed, -1 for giving up (minimum score: 0)
- **Progressive Hints**: Random letters revealed after each incorrect guess
- **Flexible Input**: Type spaces or underscores - both "account circle" and "account_circle" work

### User Experience
- **Keyboard Navigation**: Use Enter to submit guesses or advance to next icon
- **Skip Feature**: Press Enter with empty input or click Skip to reveal a letter
- **Visual Feedback**: Clear indication of revealed letters, spaces, and underscores
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Smooth loading experience with fallback icon sets

### Technical Features
- **Robust Fallback**: Uses curated icon list if network request fails
- **Modern Web Standards**: Vanilla HTML, CSS, and JavaScript
- **Beautiful UI**: Material Design-inspired interface with gradients and animations
- **No Dependencies**: Works without external libraries or frameworks

## 🚀 Getting Started

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/austinglander/guess-that-icon.git
   cd guess-that-icon
   ```

2. Open `index.html` in your web browser or serve with a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   ```

3. Navigate to `http://localhost:8000` and start playing!

### Production Deployment
For web server deployment, copy the web files to your document root:
```bash
cp *.{html,css,js} /var/www/html/
```

## 🎨 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Google Material Icons (loaded dynamically)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **API**: Material Icons codepoints from GitHub

## 🎲 Game Mechanics

- **Attempts**: Up to 75% of the icon name length before losing points
- **Letter Revelation**: Random unrevealed letters are shown as hints
- **Scoring**: 
  - ✅ Correct guess before hint limit: +1 point
  - ❌ Give up or run out of attempts: -1 point (minimum 0)
  - 🔄 Skip: Reveals letter and reduces attempts

## 📱 Browser Compatibility

- Chrome/Edge 60+
- Firefox 55+
- Safari 11+
- Mobile browsers with ES6+ support

## 🤝 Contributing

Feel free to open issues or submit pull requests to improve the game!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
