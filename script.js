// Material Icons list - a curated selection of common icons
const MATERIAL_ICONS = [
    'home', 'search', 'settings', 'favorite', 'star', 'share', 'delete', 'edit', 'add', 'remove',
    'check', 'close', 'menu', 'more_vert', 'more_horiz', 'arrow_back', 'arrow_forward', 'arrow_upward', 'arrow_downward',
    'refresh', 'sync', 'download', 'upload', 'cloud', 'folder', 'file_copy', 'save', 'print', 'email',
    'phone', 'message', 'chat', 'notifications', 'alarm', 'schedule', 'event', 'today', 'calendar_today',
    'location_on', 'map', 'directions', 'local_shipping', 'flight', 'hotel', 'restaurant', 'shopping_cart',
    'account_circle', 'person', 'group', 'lock', 'visibility', 'visibility_off', 'help', 'info', 'warning',
    'error', 'done', 'cancel', 'thumb_up', 'thumb_down', 'bookmark', 'language', 'public', 'wifi',
    'bluetooth', 'battery_full', 'signal_cellular_4_bar', 'volume_up', 'volume_down', 'volume_off', 'mic',
    'mic_off', 'camera', 'photo', 'video_call', 'call', 'call_end', 'music_note', 'play_arrow',
    'pause', 'stop', 'skip_next', 'skip_previous', 'repeat', 'shuffle', 'playlist_add', 'queue_music',
    'brightness_high', 'brightness_low', 'flash_on', 'flash_off', 'wb_sunny', 'wb_cloudy', 'ac_unit',
    'beach_access', 'casino', 'fitness_center', 'golf_course', 'pool', 'spa', 'cake', 'coffee',
    'local_pizza', 'local_bar', 'shopping_bag', 'credit_card', 'payment', 'monetization_on', 'trending_up',
    'trending_down', 'show_chart', 'pie_chart', 'bar_chart', 'assessment', 'assignment', 'book',
    'library_books', 'school', 'work', 'business', 'domain', 'store', 'local_offer', 'redeem',
    'card_giftcard', 'loyalty', 'grade', 'build', 'bug_report', 'code', 'developer_mode', 'memory',
    'computer', 'laptop', 'tablet', 'smartphone', 'watch', 'tv', 'headset', 'keyboard', 'mouse',
    'router', 'scanner', 'security', 'lock_open', 'vpn_key', 'fingerprint', 'face', 'backup',
    'cloud_download', 'cloud_upload', 'cloud_sync', 'folder_open', 'create_new_folder', 'insert_drive_file',
    'attach_file', 'link', 'content_copy', 'content_cut', 'content_paste', 'undo', 'redo', 'select_all',
    'text_format', 'format_bold', 'format_italic', 'format_underlined', 'format_color_text', 'highlight',
    'insert_emoticon', 'mood', 'sentiment_satisfied', 'sentiment_dissatisfied', 'pets', 'eco', 'local_florist',
    'wb_incandescent', 'lightbulb_outline', 'power', 'power_off', 'settings_power', 'restart_alt', 'update',
    'system_update', 'get_app', 'launch', 'open_in_new', 'fullscreen', 'fullscreen_exit', 'zoom_in',
    'zoom_out', 'center_focus_strong', 'filter_center_focus', 'tune', 'palette', 'color_lens', 'invert_colors',
    'format_paint', 'brush', 'gesture', 'touch_app', 'pan_tool', 'back_hand', 'front_hand'
];

class IconGuessingGame {
    constructor() {
        this.score = 0;
        this.currentIcon = '';
        this.revealedLetters = new Set();
        this.maxReveals = 0;
        this.attemptsLeft = 0;
        this.gameEnded = false;

        this.initializeElements();
        this.bindEvents();
        this.startNewIcon();
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

    startNewIcon() {
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
        return MATERIAL_ICONS[Math.floor(Math.random() * MATERIAL_ICONS.length)];
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
