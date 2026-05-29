// 🎖️ СИСТЕМА ДОСТИЖЕНИЙ - ФАЗА 1

// ============================================
// ПОЛНЫЙ СПИСОК 50+ ДОСТИЖЕНИЙ
// ============================================

const ACHIEVEMENTS = {
    // === КАТЕГОРИЯ 1: НОВИЧОК (7) ===
    first_game: {
        id: 'first_game',
        name: '🥚 Первый шаг',
        desc: 'Закончить первую игру',
        category: 'novice',
        points: 10,
        condition: (data) => true, // триггер при первой игре
    },
    ten_games: {
        id: 'ten_games',
        name: '👶 Малыш',
        desc: 'Закончить 10 игр',
        category: 'novice',
        points: 25,
        condition: (data) => data.totalGames >= 10,
    },
    fifty_games: {
        id: 'fifty_games',
        name: '🎮 Игрок',
        desc: 'Закончить 50 игр',
        category: 'novice',
        points: 50,
        condition: (data) => data.totalGames >= 50,
    },
    hundred_games: {
        id: 'hundred_games',
        name: '🏆 Ветеран',
        desc: 'Закончить 100 игр',
        category: 'novice',
        points: 100,
        condition: (data) => data.totalGames >= 100,
    },
    thousand_games: {
        id: 'thousand_games',
        name: '🧠 Мастер игр',
        desc: 'Закончить 1000 игр',
        category: 'novice',
        points: 250,
        condition: (data) => data.totalGames >= 1000,
    },
    first_win_level_3: {
        id: 'first_win_level_3',
        name: '⬆️ Вверх!',
        desc: 'Выиграть на уровне 3',
        category: 'novice',
        points: 30,
        condition: (data) => data.maxLevelReached >= 3,
    },
    level_7_complete: {
        id: 'level_7_complete',
        name: '👑 Король уровней',
        desc: 'Выиграть на максимальном уровне (7)',
        category: 'novice',
        points: 150,
        condition: (data) => data.maxLevelReached >= 7,
    },

    // === КАТЕГОРИЯ 2: МАСТЕР ПАМЯТИ (8) ===
    perfect_game: {
        id: 'perfect_game',
        name: '🧠 Идеальная память',
        desc: 'Пройти уровень без ошибок',
        category: 'master',
        points: 75,
        condition: (data) => data.moves === data.pairsCount * 2,
    },
    five_perfect: {
        id: 'five_perfect',
        name: '💎 Совершенство',
        desc: 'Пройти 5 уровней без ошибок',
        category: 'master',
        points: 150,
        condition: (data) => data.perfectGames >= 5,
    },
    speed_run: {
        id: 'speed_run',
        name: '⚡ Молния',
        desc: 'Пройти уровень за <30 сек',
        category: 'master',
        points: 100,
        condition: (data) => data.time < 30,
    },
    speed_run_three: {
        id: 'speed_run_three',
        name: '⚡⚡⚡ Гроза',
        desc: 'Пройти 3 уровня за <30 сек',
        category: 'master',
        points: 200,
        condition: (data) => data.speedRuns >= 3,
    },
    combo_10: {
        id: 'combo_10',
        name: '🔥 Комбо X10',
        desc: 'Получить комбо из 10+ совпадений подряд',
        category: 'master',
        points: 80,
        condition: (data) => data.maxCombo >= 10,
    },
    combo_50: {
        id: 'combo_50',
        name: '🔥🔥🔥 Лавина',
        desc: 'Получить комбо из 50+ совпадений подряд',
        category: 'master',
        points: 200,
        condition: (data) => data.maxCombo >= 50,
    },
    no_mistakes_10: {
        id: 'no_mistakes_10',
        name: '🎯 Снайпер',
        desc: 'Пройти 10 игр без единой ошибки',
        category: 'master',
        points: 250,
        condition: (data) => data.perfectGamesStreak >= 10,
    },
    perfect_multiplier: {
        id: 'perfect_multiplier',
        name: '📈 Максимум',
        desc: 'Достичь мультипликатора X5',
        category: 'master',
        points: 120,
        condition: (data) => data.maxMultiplier >= 5,
    },

    // === КАТЕГОРИЯ 3: КОЛЛЕКЦИОНЕР (8) ===
    unlock_costume_1: {
        id: 'unlock_costume_1',
        name: '🎨 Дизайнер',
        desc: 'Разблокировать первый эффект',
        category: 'collector',
        points: 25,
        condition: (data) => data.unlockedCosmetics >= 1,
    },
    unlock_costume_5: {
        id: 'unlock_costume_5',
        name: '🌈 Художник',
        desc: 'Разблокировать 5 эффектов',
        category: 'collector',
        points: 75,
        condition: (data) => data.unlockedCosmetics >= 5,
    },
    unlock_costume_10: {
        id: 'unlock_costume_10',
        name: '👨‍🎨 Мастер стиля',
        desc: 'Разблокировать 10+ эффектов',
        category: 'collector',
        points: 150,
        condition: (data) => data.unlockedCosmetics >= 10,
    },
    unlock_theme: {
        id: 'unlock_theme',
        name: '🎭 Вкус',
        desc: 'Разблокировать новую тему оформления',
        category: 'collector',
        points: 50,
        condition: (data) => data.unlockedThemes >= 2,
    },
    unlock_all_themes: {
        id: 'unlock_all_themes',
        name: '🎪 Радуга',
        desc: 'Разблокировать все темы',
        category: 'collector',
        points: 200,
        condition: (data) => data.unlockedThemes >= 5,
    },
    unlock_sound: {
        id: 'unlock_sound',
        name: '🎵 Меломан',
        desc: 'Разблокировать новый звуковой набор',
        category: 'collector',
        points: 40,
        condition: (data) => data.unlockedSounds >= 2,
    },
    unlock_all_sounds: {
        id: 'unlock_all_sounds',
        name: '🎼 Симфонист',
        desc: 'Разблокировать все звуки',
        category: 'collector',
        points: 150,
        condition: (data) => data.unlockedSounds >= 4,
    },
    card_set_change: {
        id: 'card_set_change',
        name: '🔀 Исследователь',
        desc: 'Поиграть во всех наборах карточек',
        category: 'collector',
        points: 100,
        condition: (data) => data.cardSetsPlayed >= 6,
    },

    // === КАТЕГОРИЯ 4: РАНГИ И УРОВНИ (6) ===
    rank_student: {
        id: 'rank_student',
        name: '👦 Ученик',
        desc: 'Достичь ранга Ученик (6-15 баллов)',
        category: 'ranks',
        points: 50,
        condition: (data) => data.currentRank && data.currentRank.name === 'Ученик',
    },
    rank_master: {
        id: 'rank_master',
        name: '🧙 Мастер',
        desc: 'Достичь ранга Мастер (16-30 баллов)',
        category: 'ranks',
        points: 100,
        condition: (data) => data.currentRank && data.currentRank.name === 'Мастер',
    },
    rank_legend: {
        id: 'rank_legend',
        name: '🦸 Легенда',
        desc: 'Достичь ранга Легенда (31-50 баллов)',
        category: 'ranks',
        points: 200,
        condition: (data) => data.currentRank && data.currentRank.name === 'Легенда',
    },
    rank_superhero: {
        id: 'rank_superhero',
        name: '🦹 Супергерой',
        desc: 'Достичь максимального ранга (51+ баллов)',
        category: 'ranks',
        points: 500,
        condition: (data) => data.currentRank && data.currentRank.name === 'Супергерой',
    },
    level_up_5: {
        id: 'level_up_5',
        name: '⬆️ На вершину',
        desc: 'Повысить уровень 5 раз',
        category: 'ranks',
        points: 150,
        condition: (data) => data.levelUps >= 5,
    },
    champion_mode: {
        id: 'champion_mode',
        name: '👑 Чемпион',
        desc: 'Включить режим чемпиона',
        category: 'ranks',
        points: 200,
        condition: (data) => data.championModeUnlocked,
    },

    // === КАТЕГОРИЯ 5: ЧЕЛЛЕНДЖИ (6) ===
    daily_challenge_1: {
        id: 'daily_challenge_1',
        name: '📅 Ежедневник',
        desc: 'Выполнить 1 ежедневный челлендж',
        category: 'challenges',
        points: 20,
        condition: (data) => data.dailyChallengesCompleted >= 1,
    },
    daily_challenge_7: {
        id: 'daily_challenge_7',
        name: '📅📅📅 Привычка',
        desc: 'Выполнить 7 ежедневных челленджей подряд',
        category: 'challenges',
        points: 100,
        condition: (data) => data.dailyChallengesStreak >= 7,
    },
    daily_challenge_30: {
        id: 'daily_challenge_30',
        name: '🗓️ Железная воля',
        desc: 'Выполнить 30 ежедневных челленджей',
        category: 'challenges',
        points: 300,
        condition: (data) => data.dailyChallengesCompleted >= 30,
    },
    weekly_challenge: {
        id: 'weekly_challenge',
        name: '📊 Марафонец',
        desc: 'Выполнить все недельные челленджи',
        category: 'challenges',
        points: 150,
        condition: (data) => data.weeklyChallenguesCompleted >= 7,
    },
    seasonal_challenge: {
        id: 'seasonal_challenge',
        name: '🎯 Сезонный',
        desc: 'Выполнить сезонный челлендж',
        category: 'challenges',
        points: 250,
        condition: (data) => data.seasonalChallengesCompleted >= 1,
    },
    perfect_challenge: {
        id: 'perfect_challenge',
        name: '⭐ Идеал',
        desc: 'Выполнить челлендж на максимум',
        category: 'challenges',
        points: 100,
        condition: (data) => data.perfectChallenges >= 1,
    },

    // === КАТЕГОРИЯ 6: СОЦИАЛЬНЫЕ (4) - ФАЗА 8 ===
    add_friend: {
        id: 'add_friend',
        name: '👥 Компания',
        desc: 'Добавить первого друга',
        category: 'social',
        points: 30,
        condition: (data) => data.friendsCount >= 1,
    },
    invite_friend: {
        id: 'invite_friend',
        name: '📨 Приглашение',
        desc: 'Отправить вызов другу',
        category: 'social',
        points: 50,
        condition: (data) => data.invitesSent >= 1,
    },
    beat_friend: {
        id: 'beat_friend',
        name: '🏅 Лучше друга',
        desc: 'Выиграть с большей разницей чем друг',
        category: 'social',
        points: 75,
        condition: (data) => data.friendsBeaten >= 1,
    },
    ten_friends: {
        id: 'ten_friends',
        name: '👨‍👩‍👧‍👦 Вечеринка',
        desc: 'Добавить 10 друзей',
        category: 'social',
        points: 150,
        condition: (data) => data.friendsCount >= 10,
    },

    // === КАТЕГОРИЯ 7: АРЕНА И РЕЙТИНГ (6) - ФАЗА 7 ===
    arena_first_win: {
        id: 'arena_first_win',
        name: '⚔️ Боец',
        desc: 'Выиграть первый бой на арене',
        category: 'arena',
        points: 100,
        condition: (data) => data.arenaWins >= 1,
    },
    arena_ten_wins: {
        id: 'arena_ten_wins',
        name: '⚔️⚔️ Воин',
        desc: 'Выиграть 10 боёв на арене',
        category: 'arena',
        points: 150,
        condition: (data) => data.arenaWins >= 10,
    },
    arena_fifty_wins: {
        id: 'arena_fifty_wins',
        name: '⚔️⚔️⚔️ Паладин',
        desc: 'Выиграть 50 боёв на арене',
        category: 'arena',
        points: 250,
        condition: (data) => data.arenaWins >= 50,
    },
    arena_rating_500: {
        id: 'arena_rating_500',
        name: '🏆 Чемпион класса',
        desc: 'Набрать 500 рейтинга на арене',
        category: 'arena',
        points: 200,
        condition: (data) => data.arenaRating >= 500,
    },
    arena_rating_1000: {
        id: 'arena_rating_1000',
        name: '👑 Король арены',
        desc: 'Набрать 1000 рейтинга на арене',
        category: 'arena',
        points: 500,
        condition: (data) => data.arenaRating >= 1000,
    },
    arena_streak: {
        id: 'arena_streak',
        name: '🔥 Неустанный',
        desc: 'Выиграть 10 боёв подряд',
        category: 'arena',
        points: 300,
        condition: (data) => data.arenaWinStreak >= 10,
    },

    // === КАТЕГОРИЯ 8: СПЕЦИАЛЬНЫЕ (5) ===
    thousand_points: {
        id: 'thousand_points',
        name: '💰 Миллионер',
        desc: 'Набрать 1000 очков в одной игре',
        category: 'special',
        points: 150,
        condition: (data) => data.gameScore >= 1000,
    },
    five_thousand_total: {
        id: 'five_thousand_total',
        name: '💎 Богач',
        desc: 'Набрать всего 100000 очков',
        category: 'special',
        points: 300,
        condition: (data) => data.totalScore >= 100000,
    },
    play_all_modes: {
        id: 'play_all_modes',
        name: '🎭 Всесторонний',
        desc: 'Поиграть во всех режимах',
        category: 'special',
        points: 200,
        condition: (data) => data.modesPlayed >= 5,
    },
    midnight_player: {
        id: 'midnight_player',
        name: '🌙 Ночная птица',
        desc: 'Играть в 3 часа ночи',
        category: 'special',
        points: 75,
        condition: (data) => data.playedAtMidnight,
    },
    easter_egg: {
        id: 'easter_egg',
        name: '🥚 Пасхальное яйцо',
        desc: 'Найти секрет в игре',
        category: 'special',
        points: 100,
        condition: (data) => data.foundEasterEgg,
    },
};

// ============================================
// КЛАСС УПРАВЛЕНИЯ ДОСТИЖЕНИЯМИ
// ============================================

class AchievementSystem {
    constructor(userId) {
        this.userId = userId;
        this.achievements = this.loadAchievements();
        this.newAchievements = [];
    }

    // Загрузить достижения из профиля пользователя
    loadAchievements() {
        const user = getUserByEmail(this.userId);
        if (!user || !user.achievements) {
            return {};
        }
        return user.achievements;
    }

    // Сохранить достижения
    saveAchievements() {
        const users = getUsers();
        const userIndex = users.findIndex(u => u.email === this.userId);
        if (userIndex !== -1) {
            users[userIndex].achievements = this.achievements;
            saveUsers(users);
        }
    }

    // Проверить все достижения после игры
    checkAllAchievements(gameData) {
        this.newAchievements = [];

        Object.values(ACHIEVEMENTS).forEach(achievement => {
            // Если уже разблокировано, пропустить
            if (this.achievements[achievement.id]?.unlocked) {
                return;
            }

            // Проверить условие
            if (achievement.condition(gameData)) {
                this.unlockAchievement(achievement.id, achievement.points);
                this.newAchievements.push(achievement);
            } else {
                // Обновить прогресс
                this.updateProgress(achievement.id, gameData);
            }
        });

        // Сохранить изменения
        if (this.newAchievements.length > 0) {
            this.saveAchievements();
        }

        return this.newAchievements;
    }

    // Разблокировать достижение
    unlockAchievement(id, points) {
        if (!this.achievements[id]) {
            this.achievements[id] = {};
        }

        this.achievements[id].unlocked = true;
        this.achievements[id].unlockedAt = new Date();
        this.achievements[id].progress = 100;

        console.log(`🎖️ Достижение разблокировано: ${ACHIEVEMENTS[id].name}`);
    }

    // Обновить прогресс достижения
    updateProgress(id, gameData) {
        // Это будет реализовано позже для отображения прогресса
    }

    // Получить количество разблокированных достижений
    getUnlockedCount() {
        return Object.values(this.achievements).filter(a => a.unlocked).length;
    }

    // Получить общее количество очков
    getTotalPoints() {
        let total = 0;
        Object.keys(this.achievements).forEach(id => {
            if (this.achievements[id].unlocked) {
                total += ACHIEVEMENTS[id].points;
            }
        });
        return total;
    }

    // Получить все разблокированные достижения
    getUnlocked() {
        return Object.entries(ACHIEVEMENTS)
            .filter(([id]) => this.achievements[id]?.unlocked)
            .map(([id, ach]) => ({
                ...ach,
                unlockedAt: this.achievements[id].unlockedAt
            }));
    }

    // Получить все достижения с прогрессом
    getAll() {
        return Object.entries(ACHIEVEMENTS).map(([id, ach]) => ({
            ...ach,
            unlocked: this.achievements[id]?.unlocked || false,
            progress: this.achievements[id]?.progress || 0,
            unlockedAt: this.achievements[id]?.unlockedAt || null
        }));
    }
}

// ============================================
// ИНТЕГРАЦИЯ С СИСТЕМОЙ ИГРЫ
// ============================================

// Эта функция будет вызываться в конце каждой игры
function checkAchievementsAfterGame(gameData) {
    if (!currentUser) return;

    const achievementSystem = new AchievementSystem(currentUser);
    const newAchievements = achievementSystem.checkAllAchievements(gameData);

    // Показать уведомления о новых достижениях
    newAchievements.forEach(achievement => {
        showAchievementNotification(achievement);
    });

    // Сохранить новые достижения в профиль
    const user = getUserByEmail(currentUser);
    if (user) {
        user.achievements = achievementSystem.achievements;
        const users = getUsers();
        const userIndex = users.findIndex(u => u.email === currentUser);
        if (userIndex !== -1) {
            users[userIndex] = user;
            saveUsers(users);
        }
    }

    return newAchievements;
}

// Показать уведомление о разблокировке достижения
function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-popup">
            <div class="achievement-icon">${achievement.name.split(' ')[0]}</div>
            <div class="achievement-text">
                <div class="achievement-title">Достижение разблокировано!</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
                <div class="achievement-points">+${achievement.points} очков</div>
            </div>
        </div>
    `;
    document.body.appendChild(notification);

    // Анимация
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}
