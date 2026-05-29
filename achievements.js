// ============================================
// СИСТЕМА ДОСТИЖЕНИЙ
// ============================================

const ACHIEVEMENTS = {
    'first_game': { name: '🎮 Первая игра', points: 10 },
    'fast_win': { name: '⚡ Молния', points: 50, desc: 'Выиграть за 20 ходов' },
    'perfect_match': { name: '🎯 Идеальное совпадение', points: 100, desc: 'Выиграть без ошибок' },
    'speedster': { name: '🏃 Спринтер', points: 75, desc: 'Выиграть за 15 ходов' },
    'level_5': { name: '🎖️ Уровень 5', points: 200 },
    'collector': { name: '🏆 Коллекционер', points: 150, desc: 'Разблокировать 10 наборов карт' },
    'social_butterfly': { name: '🦋 Социальная бабочка', points: 100, desc: 'Пригласить 5 друзей' },
    'streak_master': { name: '🔥 Король стриков', points: 250, desc: '10 побед подряд' }
};

function checkAchievements(gameData) {
    if (!currentUser) return;

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    const achievements = userData.achievements || [];

    // Проверяем новые достижения
    if (gameData.moves <= 20) {
        addAchievement('fast_win', achievements);
    }

    if (gameData.perfect) {
        addAchievement('perfect_match', achievements);
    }

    if (gameData.moves <= 15) {
        addAchievement('speedster', achievements);
    }

    userData.achievements = achievements;
    localStorage.setItem('user_' + currentUser.email, JSON.stringify(userData));
}

function addAchievement(achievementId, achievementsList) {
    if (!achievementsList.includes(achievementId)) {
        achievementsList.push(achievementId);
        console.log('🎖️ Достижение разблокировано:', ACHIEVEMENTS[achievementId].name);
    }
}

console.log('✅ achievements.js загружен');
