// ============================================
// ⚔️ АРЕНА (ОНЛАЙН ТУРНИРЫ И ДУЭЛИ)
// ============================================

const ARENA_TOURNAMENTS = {
    'weekly': {
        id: 'weekly',
        name: 'Еженедельный турнир',
        prize: 1000,
        description: 'Участвуй и выигрывай до 1000 очков',
        status: 'active',
        duration: 7,
        maxCards: 6
    },
    'monthly': {
        id: 'monthly',
        name: 'Ежемесячный турнир',
        prize: 5000,
        description: 'Большой турнир с призом 5000 очков',
        status: 'active',
        duration: 30,
        maxCards: 8
    }
};

let currentMatch = null;
let matchOpponent = null;
let matchScore = { player: 0, opponent: 0 };

// ============================================
// ПРИСОЕДИНЕНИЕ К ТУРНИРУ
// ============================================

function joinTournament(tournamentId) {
    if (!currentUser) {
        alert('❌ Необходимо войти в игру');
        return;
    }

    const tournament = ARENA_TOURNAMENTS[tournamentId];
    if (!tournament) return;

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    if (!userData.arenaStats) {
        userData.arenaStats = {
            tournaments: [],
            rating: 1000,
            wins: 0,
            losses: 0
        };
    }

    if (!userData.arenaStats.tournaments.includes(tournamentId)) {
        userData.arenaStats.tournaments.push(tournamentId);
        userData.arenaStats.joined_date = new Date().toISOString();
        localStorage.setItem('user_' + currentUser.email, JSON.stringify(userData));

        alert(`✅ Ты успешно присоединился к турниру!\n\n${tournament.name}\nПриз: ${tournament.prize} очков\n\nУдачи! 🎮`);

        // Запускаем турнир
        startTournamentGame(tournamentId);
    } else {
        alert('✅ Ты уже участвуешь в этом турнире!');
    }
}

// ============================================
// ИГРА ТУРНИРА
// ============================================

function startTournamentGame(tournamentId) {
    const tournament = ARENA_TOURNAMENTS[tournamentId];
    if (!tournament) return;

    // Устанавливаем текущий матч
    currentMatch = {
        id: tournamentId,
        tournament: tournament,
        startTime: Date.now(),
        moves: 0
    };

    // Переключаемся на игровой экран турнира
    showScreen('tournamentGameScreen');

    // Обновляем заголовок
    const title = document.querySelector('.tournament-game h1');
    if (title) {
        title.innerHTML = `⚔️ ${tournament.name}`;
    }

    // Устанавливаем количество карточек для турнира
    const maxEmojis = tournament.maxCards;
    const tournamentEmojis = EMOJIS.slice(0, maxEmojis);

    // Создаём доску турнира
    setupTournamentBoard(tournamentEmojis);
}

function setupTournamentBoard(emojisArray) {
    const board = document.getElementById('tournamentBoard');
    if (!board) return;

    // Создаём пары и перемешиваем
    gameState.cards = [...emojisArray, ...emojisArray].sort(() => Math.random() - 0.5);
    gameState.matched = 0;
    gameState.moves = 0;

    board.innerHTML = '';
    gameState.cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'game-card tournament-card';
        card.textContent = '?';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.addEventListener('click', () => flipTournamentCard(index, card));
        board.appendChild(card);
    });

    updateTournamentUI();
}

function flipTournamentCard(index, cardElement) {
    if (gameState.flipped.length >= 2) return;
    if (gameState.flipped.includes(index)) return;
    if (cardElement.classList.contains('matched')) return;

    gameState.flipped.push(index);
    cardElement.textContent = gameState.cards[index];
    cardElement.classList.add('flipped');

    if (gameState.flipped.length === 2) {
        gameState.moves++;
        updateTournamentUI();

        setTimeout(() => {
            const [i1, i2] = gameState.flipped;
            const card1 = document.querySelector(`[data-index="${i1}"]`);
            const card2 = document.querySelector(`[data-index="${i2}"]`);

            if (gameState.cards[i1] === gameState.cards[i2]) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                gameState.matched++;
                gameState.flipped = [];
                updateTournamentUI();

                // Проверяем, выиграл ли игрок
                if (gameState.matched === gameState.cards.length / 2) {
                    completeTournamentGame();
                }
            } else {
                card1.textContent = '?';
                card2.textContent = '?';
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                gameState.flipped = [];
            }
        }, 600);
    }
}

function updateTournamentUI() {
    const moveCount = document.getElementById('tournamentMoves');
    const matchCount = document.getElementById('tournamentMatched');

    if (moveCount) moveCount.textContent = gameState.moves;
    if (matchCount) matchCount.textContent = gameState.matched;
}

function completeTournamentGame() {
    const duration = Date.now() - currentMatch.startTime;
    const durationSec = Math.floor(duration / 1000);

    // Рассчитываем очки
    const baseScore = 100;
    const moveBonus = Math.max(0, 50 - gameState.moves * 2);
    const timeBonus = Math.max(0, 30 - (durationSec / 2));
    const totalScore = Math.floor(baseScore + moveBonus + timeBonus);

    // Сохраняем результат
    if (currentUser) {
        const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
        if (!userData.arenaStats) {
            userData.arenaStats = { tournaments: [], rating: 1000, wins: 0, losses: 0 };
        }

        userData.arenaStats.wins = (userData.arenaStats.wins || 0) + 1;
        userData.arenaStats.rating = (userData.arenaStats.rating || 1000) + Math.floor(totalScore / 10);
        userData.score = (userData.score || 0) + totalScore;

        localStorage.setItem('user_' + currentUser.email, JSON.stringify(userData));
    }

    setTimeout(() => {
        alert(`🎉 ПОЗДРАВЛЯЕМ!\n\n⚔️ Турнир завершён!\n\n📊 Результат:\n• Ходов: ${gameState.moves}\n• Время: ${durationSec}с\n• Очки: +${totalScore}\n\n🏆 Общий рейтинг: ${userData.arenaStats.rating}`);

        // Возвращаемся в меню арены
        openSection('arena');
    }, 500);
}

// ============================================
// ДУЭЛИ С ДРУЗЬЯМИ
// ============================================

function startDuel() {
    if (!currentUser) {
        alert('❌ Необходимо войти в игру');
        return;
    }

    // Показываем список доступных противников
    showFindOpponentModal();
}

// Таймер поиска противников
let opponentSearchTimer = null;
let opponentTimerInterval = null;
let opponentTimeRemaining = 30;

function showFindOpponentModal() {
    // Генерируем список доступных противников (AI)
    const opponents = [
        { name: 'Мастер Памяти', rating: 1250, skill: 0.85 },
        { name: 'Быстрый Ум', rating: 1100, skill: 0.75 },
        { name: 'Концентрация', rating: 950, skill: 0.65 },
        { name: 'Логик', rating: 1150, skill: 0.80 },
        { name: 'Внимание', rating: 900, skill: 0.60 }
    ];

    const modal = document.getElementById('findOpponentModal');
    const list = document.getElementById('opponentsList');
    const timerDisplay = document.getElementById('opponentTimer');

    if (!modal || !list || !timerDisplay) return;

    // Очищаем список
    list.innerHTML = '';

    // Добавляем противников в список
    opponents.forEach((opponent, index) => {
        const itemHTML = `
            <div class="opponent-item">
                <div class="opponent-info">
                    <div class="opponent-name">${index + 1}. ${opponent.name}</div>
                    <div class="opponent-rating">⭐ Рейтинг: ${opponent.rating}</div>
                </div>
                <button class="opponent-accept-btn" onclick="acceptDuel('${opponent.name}', ${opponent.rating}, ${opponent.skill})">Принять</button>
            </div>
        `;
        list.innerHTML += itemHTML;
    });

    // Показываем модальное окно и таймер
    modal.classList.add('active');
    timerDisplay.style.display = 'block';
    opponentTimeRemaining = 30;

    // Обновляем таймер каждую секунду
    if (opponentTimerInterval) clearInterval(opponentTimerInterval);

    opponentTimerInterval = setInterval(() => {
        opponentTimeRemaining--;
        document.getElementById('timerDisplay').textContent = opponentTimeRemaining;

        // Если время истекло
        if (opponentTimeRemaining <= 0) {
            clearInterval(opponentTimerInterval);
            const list = document.getElementById('opponentsList');
            if (list) {
                list.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px;">
                        <div style="font-size: 24px; margin-bottom: 10px;">❌ Игроков не найдено</div>
                        <div style="font-size: 14px; color: #666; margin-bottom: 20px;">Попробуйте позже</div>
                        <button class="btn-secondary" onclick="closeFindOpponentModal(); showMainMenu();">Вернуться</button>
                    </div>
                `;
            }
        }
    }, 1000);

    // Таймер на 30 секунд для очистки (на случай если пользователь не закроет окно)
    if (opponentSearchTimer) clearTimeout(opponentSearchTimer);
    opponentSearchTimer = setTimeout(() => {
        // Интервал уже сделал свою работу
    }, 30000);
}

function closeFindOpponentModal() {
    // Очищаем таймеры
    if (opponentSearchTimer) {
        clearTimeout(opponentSearchTimer);
        opponentSearchTimer = null;
    }
    if (opponentTimerInterval) {
        clearInterval(opponentTimerInterval);
        opponentTimerInterval = null;
    }

    const modal = document.getElementById('findOpponentModal');
    const timerDisplay = document.getElementById('opponentTimer');
    if (modal) {
        modal.classList.remove('active');
    }
    if (timerDisplay) {
        timerDisplay.style.display = 'none';
    }
}

function acceptDuel(opponentName, opponentRating, opponentSkill) {
    // Очищаем таймеры
    if (opponentSearchTimer) {
        clearTimeout(opponentSearchTimer);
        opponentSearchTimer = null;
    }
    if (opponentTimerInterval) {
        clearInterval(opponentTimerInterval);
        opponentTimerInterval = null;
    }

    // Закрываем модальное окно
    closeFindOpponentModal();

    // Генерируем противника
    matchOpponent = {
        name: opponentName,
        rating: opponentRating,
        skill: opponentSkill
    };

    matchScore = { player: 0, opponent: 0 };

    // Небольшая задержка для эффекта поиска
    setTimeout(() => {
        startDuelGame();
    }, 500);
}

function startDuelGame() {
    showScreen('duelGameScreen');

    const title = document.querySelector('.duel-game h1');
    if (title) {
        title.innerHTML = `⚔️ Дуэль: ${currentUser.name} vs ${matchOpponent.name}`;
    }

    // Устанавливаем текущее совпадение
    currentMatch = {
        type: 'duel',
        opponent: matchOpponent,
        startTime: Date.now()
    };

    // Создаём доску дуэли
    setupDuelBoard();
}

function setupDuelBoard() {
    const board = document.getElementById('duelBoard');
    if (!board) return;

    gameState.cards = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    gameState.matched = 0;
    gameState.moves = 0;
    gameState.flipped = [];

    board.innerHTML = '';
    gameState.cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'game-card duel-card';
        card.textContent = '?';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.addEventListener('click', () => flipDuelCard(index, card));
        board.appendChild(card);
    });

    updateDuelUI();

    // AI противник начинает играть
    setTimeout(() => {
        simulateOpponentMove();
    }, 1000);
}

function flipDuelCard(index, cardElement) {
    console.log('📌 flipDuelCard:', index, 'flipped length:', gameState.flipped.length);

    if (gameState.flipped.length >= 2) {
        console.log('⛔ Уже 2 карточки открыты');
        return;
    }
    if (gameState.flipped.includes(index)) {
        console.log('⛔ Эта карточка уже открыта');
        return;
    }
    if (cardElement.classList.contains('matched')) {
        console.log('⛔ Карточка уже совпала');
        return;
    }

    gameState.flipped.push(index);
    cardElement.textContent = gameState.cards[index];
    cardElement.classList.add('flipped');
    console.log('✅ Карточка открыта, flipped count:', gameState.flipped.length);

    if (gameState.flipped.length === 2) {
        gameState.moves++;
        updateDuelUI();

        setTimeout(() => {
            const [i1, i2] = gameState.flipped;
            const card1 = document.querySelector(`[data-index="${i1}"]`);
            const card2 = document.querySelector(`[data-index="${i2}"]`);

            if (gameState.cards[i1] === gameState.cards[i2]) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                gameState.matched++;
                gameState.flipped = [];
                matchScore.player++;
                updateDuelUI();

                // Проверяем победу
                if (gameState.matched === EMOJIS.length) {
                    completeDuel();
                } else {
                    setTimeout(() => simulateOpponentMove(), 500);
                }
            } else {
                // Карточки не совпадают - закрываем их
                console.log('🔴 Начинаю закрывать карточки:', card1, card2);
                // Переопределяем стили ПЕРЕД удалением класса
                card1.style.cssText = 'background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%) !important; color: white !important; font-size: 32px !important;';
                card2.style.cssText = 'background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%) !important; color: white !important; font-size: 32px !important;';
                console.log('🔴 Стили установлены:', card1.style.cssText);

                // Устанавливаем текст '?'
                card1.textContent = '?';
                card2.textContent = '?';

                // Теперь удаляем класс flipped
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');

                gameState.flipped = [];
                updateDuelUI();

                setTimeout(() => simulateOpponentMove(), 1000);
            }
        }, 600);
    }
}

function simulateOpponentMove() {
    // AI противник делает ход с вероятностью на основе мастерства
    // Вероятность получить пару и очко зависит от skill
    if (Math.random() < matchOpponent.skill * 0.8) {
        matchScore.opponent++;
    }

    updateDuelUI();

    // Проверяем, закончилась ли игра
    if (gameState.matched >= EMOJIS.length) {
        completeDuel();
    }
}

function updateDuelUI() {
    const playerScore = document.getElementById('playerScore');
    const opponentScore = document.getElementById('opponentScore');

    if (playerScore) playerScore.textContent = matchScore.player;
    if (opponentScore) opponentScore.textContent = matchScore.opponent;
}

function completeDuel() {
    const playerWins = matchScore.player > matchScore.opponent;

    // Обновляем статистику
    if (currentUser) {
        const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
        if (!userData.arenaStats) {
            userData.arenaStats = { tournaments: [], rating: 1000, wins: 0, losses: 0 };
        }

        if (playerWins) {
            userData.arenaStats.wins = (userData.arenaStats.wins || 0) + 1;
            userData.arenaStats.rating = (userData.arenaStats.rating || 1000) + 50;
        } else {
            userData.arenaStats.losses = (userData.arenaStats.losses || 0) + 1;
            userData.arenaStats.rating = Math.max(100, (userData.arenaStats.rating || 1000) - 25);
        }

        localStorage.setItem('user_' + currentUser.email, JSON.stringify(userData));
    }

    setTimeout(() => {
        const result = playerWins ? '🎉 ТЫ ВЫИГРАЛ!' : '😢 ТЫ ПРОИГРАЛ!';
        const ratingChange = playerWins ? '+50' : '-25';

        alert(`${result}\n\n⚔️ ${currentUser.name} ${matchScore.player} : ${matchScore.opponent} ${matchOpponent.name}\n\n🏆 Рейтинг: ${ratingChange}`);

        // Возвращаемся в меню арены
        openSection('arena');
    }, 500);
}

console.log('✅ arena.js загружен полностью');
