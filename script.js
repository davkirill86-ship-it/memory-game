// ===== БАЗОВАЯ ЛОГИКА ИГРЫ =====

let currentUser = null;
let gameState = {
    cards: [],
    flipped: [],
    matched: 0,
    moves: 0
};

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];

// ===== ИНИЦИАЛИЗАЦИЯ =====

document.addEventListener('DOMContentLoaded', () => {
    setupAuthTabs();
    restoreSession();
    setupGameBoard();
});

// ===== АУТЕНТИФИКАЦИЯ =====

function setupAuthTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab') + 'Tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    document.getElementById('loginForm').addEventListener('submit', loginUser);
    document.getElementById('registerForm').addEventListener('submit', registerUser);
}

function loginUser(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (email && password) {
        currentUser = {
            id: Date.now().toString(),
            email: email,
            name: email.split('@')[0],
            joinDate: new Date()
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('userData', JSON.stringify({
            achievements: [],
            level: 1,
            score: 0,
            gamesPlayed: 0
        }));
        showMainMenu();
    }
}

function registerUser(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (name && email && password) {
        currentUser = {
            id: Date.now().toString(),
            email: email,
            name: name,
            joinDate: new Date()
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('userData', JSON.stringify({
            achievements: [],
            level: 1,
            score: 0,
            gamesPlayed: 0
        }));
        showMainMenu();
    }
}

function restoreSession() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        showMainMenu();
    }
}

function showMainMenu() {
    showScreen('mainMenuScreen');
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
    }
}

function logoutUser() {
    if (confirm('Вы уверены что хотите выйти?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        showScreen('authScreen');
    }
}

// ===== ЭКРАНЫ =====

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

// ===== ИГРОВАЯ ЛОГИКА =====

function setupGameBoard() {
    const board = document.getElementById('gameBoard');
    gameState.cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

    board.innerHTML = '';
    gameState.cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.textContent = '?';
        card.addEventListener('click', () => flipCard(index, card));
        card.dataset.index = index;
        board.appendChild(card);
    });
}

function flipCard(index, cardElement) {
    if (gameState.flipped.length >= 2) return;
    if (gameState.flipped.includes(index)) return;
    if (cardElement.classList.contains('matched')) return;

    gameState.flipped.push(index);
    cardElement.textContent = gameState.cards[index];
    cardElement.classList.add('flipped');

    if (gameState.flipped.length === 2) {
        gameState.moves++;
        updateUI();

        setTimeout(() => {
            const [i1, i2] = gameState.flipped;
            if (gameState.cards[i1] === gameState.cards[i2]) {
                document.querySelector(`[data-index="${i1}"]`).classList.add('matched');
                document.querySelector(`[data-index="${i2}"]`).classList.add('matched');
                gameState.matched++;
                gameState.flipped = [];
                updateUI();

                if (gameState.matched === emojis.length) {
                    setTimeout(() => {
                        alert(`🎉 Поздравляем! Вы выиграли за ${gameState.moves} ходов!`);
                        setupGameBoard();
                        resetGame();
                    }, 500);
                }
            } else {
                document.querySelector(`[data-index="${i1}"]`).textContent = '?';
                document.querySelector(`[data-index="${i2}"]`).textContent = '?';
                document.querySelector(`[data-index="${i1}"]`).classList.remove('flipped');
                document.querySelector(`[data-index="${i2}"]`).classList.remove('flipped');
                gameState.flipped = [];
            }
        }, 600);
    }
}

function updateUI() {
    document.getElementById('foundCount').textContent = gameState.matched;
    document.getElementById('moveCount').textContent = gameState.moves;
}

function resetGame() {
    gameState = {
        cards: [],
        flipped: [],
        matched: 0,
        moves: 0
    };
    setupGameBoard();
    updateUI();
}

document.getElementById('resetButton')?.addEventListener('click', resetGame);

function openSection(section) {
    if (section === 'game') {
        showScreen('gameScreen');
    } else {
        alert(`Раздел "${section}" еще в разработке!`);
    }
}
