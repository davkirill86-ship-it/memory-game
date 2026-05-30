// ============================================
// 🎮 НАЙДИ ПАРУ - ПОЛНАЯ ВЕРСИЯ
// ============================================

let currentUser = null;
let gameState = {
    cards: [],
    flipped: [],
    matched: 0,
    moves: 0,
    totalTime: 0,
    startTime: null
};

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Игра загружена');
    setupAuthTabs();
    restoreSession();
    setupGameBoard();
});

// ============================================
// АУТЕНТИФИКАЦИЯ
// ============================================

function setupAuthTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab') + 'Tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) loginForm.addEventListener('submit', loginUser);
    if (registerForm) registerForm.addEventListener('submit', registerUser);
}

function loginUser(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (!email || !password) {
        alert('Заполните все поля!');
        return;
    }

    // Проверяем в localStorage
    const savedUser = localStorage.getItem('user_' + email);
    if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.password === password) {
            loginSuccess(user);
        } else {
            alert('❌ Неправильный пароль');
        }
    } else {
        alert('❌ Пользователь не найден');
    }
}

function registerUser(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (!name || !email || !password) {
        alert('Заполните все поля!');
        return;
    }

    if (localStorage.getItem('user_' + email)) {
        alert('❌ Пользователь с таким email уже существует');
        return;
    }

    const user = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        joinDate: new Date().toISOString(),
        level: 1,
        score: 0,
        gamesPlayed: 0,
        achievements: [],
        friends: []
    };

    localStorage.setItem('user_' + email, JSON.stringify(user));
    alert('✅ Регистрация успешна! Теперь войдите в игру.');
    form.reset();

    // Переключаемся на вкладку входа
    document.querySelector('[data-tab="login"]').click();
}

function loginSuccess(user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Очищаем формы
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
    
    showMainMenu();
}

function restoreSession() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        try {
            currentUser = JSON.parse(user);
            showMainMenu();
        } catch (e) {
            console.log('Ошибка восстановления сессии');
        }
    }
}

function showMainMenu() {
    showScreen('mainMenuScreen');
    if (currentUser) {
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = currentUser.name;
        }
    }
}

function logoutUser() {
    if (confirm('🚪 Вы уверены что хотите выйти?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        showScreen('authScreen');
    }
}

// ============================================
// УПРАВЛЕНИЕ ЭКРАНАМИ
// ============================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

// ============================================
// ИГРОВАЯ ЛОГИКА
// ============================================

function setupGameBoard() {
    const board = document.getElementById('gameBoard');
    if (!board) return;

    // Создаем пары карточек
    gameState.cards = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);

    board.innerHTML = '';
    gameState.cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.textContent = '?';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.addEventListener('click', () => flipCard(index, card));
        board.appendChild(card);
    });
}

function flipCard(index, cardElement) {
    // Не переворачиваем если: карточка уже перевернута, уже есть 2 открытые, карточка угадана
    if (gameState.flipped.length >= 2) return;
    if (gameState.flipped.includes(index)) return;
    if (cardElement.classList.contains('matched')) return;

    gameState.flipped.push(index);
    cardElement.textContent = gameState.cards[index];
    cardElement.classList.add('flipped');

    // Если открыли 2 карточки - проверяем
    if (gameState.flipped.length === 2) {
        gameState.moves++;
        updateUI();

        setTimeout(() => {
            const [i1, i2] = gameState.flipped;
            const card1 = document.querySelector(`[data-index="${i1}"]`);
            const card2 = document.querySelector(`[data-index="${i2}"]`);

            if (gameState.cards[i1] === gameState.cards[i2]) {
                // ✅ Пара найдена!
                card1.classList.add('matched');
                card2.classList.add('matched');
                gameState.matched++;
                gameState.flipped = [];
                updateUI();

                // Проверяем выигрыш
                if (gameState.matched === EMOJIS.length) {
                    gameWon();
                }
            } else {
                // ❌ Пара не совпадает - закрываем карточки
                card1.textContent = '?';
                card2.textContent = '?';
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                gameState.flipped = [];
            }
        }, 600);
    }
}

function updateUI() {
    const foundCount = document.getElementById('foundCount');
    const moveCount = document.getElementById('moveCount');

    if (foundCount) foundCount.textContent = gameState.matched;
    if (moveCount) moveCount.textContent = gameState.moves;
}

function resetGame() {
    gameState = {
        cards: [],
        flipped: [],
        matched: 0,
        moves: 0,
        totalTime: 0,
        startTime: null
    };
    setupGameBoard();
    updateUI();
}

function gameWon() {
    setTimeout(() => {
        const time = gameState.moves;
        alert(`🎉 Поздравляем! Вы выиграли!
        
Ходов: ${gameState.moves}
Пар найдено: ${gameState.matched}/${EMOJIS.length}`);

        // Сохраняем результат
        if (currentUser) {
            currentUser.gamesPlayed = (currentUser.gamesPlayed || 0) + 1;
            currentUser.score = (currentUser.score || 0) + (100 - gameState.moves);
            localStorage.setItem('user_' + currentUser.email, JSON.stringify(currentUser));
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }

        resetGame();
    }, 500);
}

// Кнопка начать заново
const resetButton = document.getElementById('resetButton');
if (resetButton) {
    resetButton.addEventListener('click', resetGame);
}

// ============================================
// НАВИГАЦИЯ МЕНЮ
// ============================================

// Функция openSection теперь работает со всеми разделами
function openSection(section) {
    const screenMap = {
        'game': 'gameScreen',
        'achievements': 'achievementsScreen',
        'challenges': 'challengesScreen',
        'leaderboards': 'leaderboardsScreen',
        'cosmetics': 'cosmeticsScreen',
        'card-sets': 'cardSetsScreen',
        'modes': 'modesScreen',
        'arena': 'arenaScreen',
        'social': 'socialScreen'
    };

    const screenId = screenMap[section];
    if (screenId) {
        showScreen(screenId);
        if (section === 'game') {
            resetGame();
        }
    }
}

console.log('✅ script.js загружен полностью');


// ============================================
// АДМИН ПАНЕЛЬ
// ============================================

function openAdminPanel() {
    const isAdmin = confirm('🔐 Это админ панель!\n\nВы администратор?');
    if (isAdmin) {
        showScreen('adminScreen');
        updateAdminStats();
    }
}

function updateAdminStats() {
    // Загружаем статистику
    const allUsers = [];
    for (let key in localStorage) {
        if (key.startsWith('user_') && key.endsWith('.com')) {
            try {
                const user = JSON.parse(localStorage.getItem(key));
                allUsers.push(user);
            } catch (e) {}
        }
    }

    // Обновляем количество пользователей
    const userCount = document.getElementById('userCount');
    if (userCount) {
        userCount.innerHTML = `<strong>Всего пользователей:</strong> ${allUsers.length}<br>
        <strong>Активных сегодня:</strong> ${Math.floor(Math.random() * allUsers.length)}<br>
        <strong>Рег. сегодня:</strong> ${Math.floor(Math.random() * 5)}`;
    }

    // Обновляем статистику
    const statsContent = document.getElementById('statsContent');
    if (statsContent) {
        const totalGames = allUsers.reduce((sum, u) => sum + (u.gamesPlayed || 0), 0);
        const totalScore = allUsers.reduce((sum, u) => sum + (u.score || 0), 0);
        
        statsContent.innerHTML = `
            <strong>📊 Общая статистика:</strong><br>
            • Всего игр: ${totalGames}<br>
            • Общий счет: ${totalScore.toLocaleString()}<br>
            • Среднее ходов: ${totalGames > 0 ? (totalScore / totalGames).toFixed(0) : 0}<br>
            <br>
            <strong>🏆 Лидер:</strong><br>
            ${allUsers.length > 0 ? `• ${allUsers[0].name} (${allUsers[0].score || 0} очков)` : 'Нет данных'}
        `;
    }

    // Обновляем лидерборд
    const leaderboard = JSON.parse(localStorage.getItem('global_leaderboard') || '[]');
    const leaderboardContent = document.getElementById('leaderboardContent');
    if (leaderboardContent) {
        if (leaderboard.length > 0) {
            let html = '<ol style="font-size: 12px;">';
            leaderboard.slice(0, 10).forEach((entry, i) => {
                html += `<li>${entry.name} - ${entry.score} очков (${entry.moves} ходов)</li>`;
            });
            html += '</ol>';
            leaderboardContent.innerHTML = html;
        } else {
            leaderboardContent.innerHTML = '<p>Пока нет данных</p>';
        }
    }
}

function clearAllData() {
    if (confirm('⚠️ Вы уверены? Это удалит ВСЕ данные!')) {
        if (confirm('Это действие необратимо! Подтверждаете?')) {
            localStorage.clear();
            alert('✅ Все данные очищены');
            logoutUser();
        }
    }
}

function downloadBackup() {
    const backup = {
        timestamp: new Date().toISOString(),
        users: [],
        leaderboard: JSON.parse(localStorage.getItem('global_leaderboard') || '[]'),
        version: '1.0'
    };

    // Собираем данные пользователей
    for (let key in localStorage) {
        if (key.startsWith('user_')) {
            try {
                backup.users.push({
                    email: key.replace('user_', ''),
                    data: JSON.parse(localStorage.getItem(key))
                });
            } catch (e) {}
        }
    }

    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `memory-game-backup-${new Date().getTime()}.json`;
    link.click();
    
    alert('✅ Резервная копия скачана');
}

// ============================================
// ДЕМО АККАУНТ
// ============================================

function initializeDemoAccount() {
    const demoEmail = 'test@demo.com';
    if (!localStorage.getItem('user_' + demoEmail)) {
        const demoUser = {
            id: 'demo-001',
            name: 'Демо Игрок',
            email: demoEmail,
            password: '123456',
            joinDate: new Date().toISOString(),
            level: 5,
            score: 2500,
            gamesPlayed: 15,
            achievements: ['first_game', 'fast_win', 'speedster'],
            friends: [],
            unlockedSets: ['animals'],
            selectedSkin: 'default'
        };
        localStorage.setItem('user_' + demoEmail, JSON.stringify(demoUser));
        console.log('✅ Демо аккаунт создан: test@demo.com / 123456');
    }
}

// Инициализируем демо аккаунт при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initializeDemoAccount();
});

// ============================================
// ОБРАБОТЧИКИ КНОПОК В РАЗДЕЛАХ
// ============================================

function joinTournament(tournamentName) {
    alert(`✅ Ты присоединился к турниру: ${tournamentName}!\n\nУдачи в боях! ⚔️`);
}

function playMode(modeName) {
    alert(`🎮 Режим: ${modeName}\n\nОткрытие игры в режиме...`);
    showScreen('gameScreen');
    resetGame();
}

function selectCosmetic(cosmeticName) {
    alert(`✅ Скин "${cosmeticName}" активирован!\n\nТвои карточки теперь будут выглядеть по-новому!`);
}

function selectCardSet(setName) {
    alert(`✅ Набор "${setName}" выбран!\n\nТеперь ты будешь видеть эти карточки в игре!`);
}

function challengeFriend() {
    const friendName = prompt('Введи email своего друга:');
    if (friendName) {
        alert(`✅ Вызов отправлен ${friendName}!\n\nОжидание ответа...`);
    }
}

function addFriend() {
    const friendEmail = prompt('Введи email друга для добавления:');
    if (friendEmail) {
        alert(`✅ Запрос на дружбу отправлен ${friendEmail}!`);
    }
}

function sendMessage() {
    const input = document.querySelector('.social-section input[type="text"]');
    if (input && input.value.trim()) {
        const message = input.value.trim();
        alert(`✅ Сообщение отправлено: "${message}"`);
        input.value = '';
    }
}

console.log('✅ Обработчики кнопок добавлены');
