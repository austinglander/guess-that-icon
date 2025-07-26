// Material Icons Guessing Game - Dynamically loads icons from Google's repository

class IconGuessingGame {
    constructor() {
        this.score = 0;
        this.currentIcon = '';
        this.revealedLetters = new Set();
        this.maxReveals = 0;
        this.attemptsLeft = 0;
        this.gameEnded = false;
        this.iconList = null;
        this.isLoading = false;

        this.initializeElements();
        this.bindEvents();
        this.loadIconList();
    }

    initializeElements() {
        this.scoreElement = document.getElementById('score');
        this.attemptsLeftElement = document.getElementById('attempts-left');
        this.iconElement = document.getElementById('current-icon');
        this.nameLettersElement = document.getElementById('name-letters');
        this.guessInput = document.getElementById('guess-input');
        this.submitButton = document.getElementById('submit-guess');
        this.skipButton = document.getElementById('skip-btn');
        this.giveUpButton = document.getElementById('give-up-btn');
        this.nextIconButton = document.getElementById('next-icon-btn');
        this.messageElement = document.getElementById('message');
    }

    bindEvents() {
        this.submitButton.addEventListener('click', () => this.submitGuess());
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (this.gameEnded) {
                    this.startNewIcon();
                } else {
                    this.submitGuess();
                }
            }
        });
        this.skipButton.addEventListener('click', () => this.skipGuess());
        this.giveUpButton.addEventListener('click', () => this.giveUp());
        this.nextIconButton.addEventListener('click', () => this.startNewIcon());
    }

    async loadIconList() {
        this.isLoading = true;
        this.showMessage('Loading Material Icons...', 'info');
        
        try {
            // Fetch the Material Icons from the official Google repository
            const response = await fetch('https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints');
            const text = await response.text();
            
            // Parse the codepoints file to extract icon names
            this.iconList = text.split('\n')
                .filter(line => line.trim())
                .map(line => line.split(' ')[0])
                .filter(name => name && name.length > 0);
            
            this.isLoading = false;
            this.startNewIcon();
        } catch (error) {
            console.error('Failed to load icon list:', error);
            // Fallback to a smaller curated list if the API fails
            this.iconList = [
                'home', 'search', 'settings', 'favorite', 'star', 'share', 'delete', 'edit', 'add', 'remove',
                'check', 'close', 'menu', 'refresh', 'sync', 'download', 'upload', 'cloud', 'folder', 'save',
                'print', 'email', 'phone', 'message', 'chat', 'notifications', 'alarm', 'schedule', 'event',
                'location_on', 'map', 'directions', 'flight', 'hotel', 'restaurant', 'shopping_cart', 'person',
                'group', 'lock', 'visibility', 'help', 'info', 'warning', 'error', 'done', 'cancel', 'wifi',
                'bluetooth', 'camera', 'photo', 'music_note', 'play_arrow', 'pause', 'stop', 'volume_up'
            ];
            this.isLoading = false;
            this.showMessage('Using fallback icon list', 'info');
            setTimeout(() => this.startNewIcon(), 1000);
        }
    }

    startNewIcon() {
        if (this.isLoading || !this.iconList) {
            return;
        }
        // Reset game state
        this.currentIcon = this.getRandomIcon();
        this.revealedLetters.clear();
        this.maxReveals = Math.floor(this.currentIcon.length * 0.75);
        this.attemptsLeft = this.maxReveals;
        this.gameEnded = false;

        // Update UI
        this.iconElement.textContent = this.currentIcon;
        this.updateAttemptsDisplay();
        this.displayIconName();
        this.guessInput.value = '';
        this.guessInput.disabled = false;
        this.guessInput.placeholder = "Enter your guess...";
        this.submitButton.disabled = false;
        this.skipButton.disabled = false;
        this.giveUpButton.style.display = 'inline-block';
        this.nextIconButton.style.display = 'none';
        this.showMessage('', '');
        this.guessInput.focus();
    }

    getRandomIcon() {
        if (!this.iconList || this.iconList.length === 0) {
            return 'help'; // fallback icon
        }
        return this.iconList[Math.floor(Math.random() * this.iconList.length)];
    }

    displayIconName() {
        this.nameLettersElement.innerHTML = '';
        
        for (let i = 0; i < this.currentIcon.length; i++) {
            const char = this.currentIcon[i];
            const letterElement = document.createElement('span');
            letterElement.className = 'letter';
            
            if (char === '_') {
                letterElement.textContent = '_';
                letterElement.classList.add('underscore');
            } else if (char === ' ') {
                letterElement.textContent = ' ';
                letterElement.classList.add('space');
            } else if (this.revealedLetters.has(i)) {
                letterElement.textContent = char;
                letterElement.classList.add('revealed');
            } else {
                letterElement.textContent = '';
            }
            
            this.nameLettersElement.appendChild(letterElement);
        }
    }

    submitGuess() {
        if (this.gameEnded) return;

        const guess = this.guessInput.value.trim().toLowerCase();
        if (!guess) {
            // If empty guess, trigger skip logic
            this.skipGuess();
            return;
        }

        // Convert spaces to underscores for comparison
        const normalizedGuess = guess.replace(/ /g, '_');

        if (normalizedGuess === this.currentIcon.toLowerCase()) {
            this.handleCorrectGuess();
        } else {
            this.handleIncorrectGuess();
        }

        this.guessInput.value = '';
    }

    skipGuess() {
        if (this.gameEnded) return;

        this.attemptsLeft--;
        this.updateAttemptsDisplay();

        if (this.attemptsLeft <= 0) {
            this.handleGameOver();
        } else {
            this.revealRandomLetter();
            this.showMessage(`Skipped! ${this.attemptsLeft} attempts left for a point.`, 'info');
        }
    }

    handleCorrectGuess() {
        this.gameEnded = true;
        this.score++;
        this.updateScore();
        this.revealAllLetters();
        this.showMessage('Correct! Well done! 🎉', 'success');
        this.endGame();
    }

    handleIncorrectGuess() {
        this.attemptsLeft--;
        this.updateAttemptsDisplay();

        if (this.attemptsLeft <= 0) {
            this.handleGameOver();
        } else {
            this.revealRandomLetter();
            this.showMessage(`Incorrect guess. ${this.attemptsLeft} attempts left for a point.`, 'info');
        }
    }

    handleGameOver() {
        this.gameEnded = true;
        if (this.score > 0) {
            this.score--;
        }
        this.updateScore();
        this.revealAllLetters();
        this.showMessage('The answer was: ' + this.currentIcon, 'failure');
        this.endGame();
    }

    giveUp() {
        if (this.gameEnded) return;

        this.gameEnded = true;
        if (this.score > 0) {
            this.score--;
        }
        this.updateScore();
        this.revealAllLetters();
        this.showMessage('You gave up! The answer was: ' + this.currentIcon, 'failure');
        this.endGame();
    }

    revealRandomLetter() {
        // Find all unrevealed letter positions (excluding spaces and underscores)
        const unrevealedPositions = [];
        for (let i = 0; i < this.currentIcon.length; i++) {
            const char = this.currentIcon[i];
            if (char !== ' ' && char !== '_' && !this.revealedLetters.has(i)) {
                unrevealedPositions.push(i);
            }
        }

        if (unrevealedPositions.length > 0) {
            const randomIndex = unrevealedPositions[Math.floor(Math.random() * unrevealedPositions.length)];
            this.revealedLetters.add(randomIndex);
            this.displayIconName();
        }
    }

    revealAllLetters() {
        for (let i = 0; i < this.currentIcon.length; i++) {
            this.revealedLetters.add(i);
        }
        this.displayIconName();
    }

    endGame() {
        this.submitButton.disabled = true;
        this.skipButton.disabled = true;
        this.giveUpButton.style.display = 'none';
        this.nextIconButton.style.display = 'inline-block';
        // Keep input enabled so Enter key can work for next icon
        this.guessInput.placeholder = "Press Enter for next icon...";
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
    }

    updateAttemptsDisplay() {
        this.attemptsLeftElement.textContent = this.attemptsLeft;
    }

    showMessage(text, type) {
        this.messageElement.textContent = text;
        this.messageElement.className = `message ${type}`;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new IconGuessingGame();
});
