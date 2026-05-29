// ============================================
// СИСТЕМА ЧЕЛЛЕНДЖЕЙ
// ============================================

const DAILY_CHALLENGES = [
    { id: 'daily_1', name: 'Утренняя игра', desc: 'Сыграй первую игру дня', reward: 10 },
    { id: 'daily_2', name: 'Быстрый умник', desc: 'Выигри за менее чем 25 ходов', reward: 20 },
    { id: 'daily_3', name: 'Тройной удар', desc: 'Выигри 3 раза подряд', reward: 30 }
];

function updateChallengeProgress(gameData) {
    if (!currentUser) return;

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    const challenges = userData.challenges || {};

    // Обновляем ежедневные челленджи
    DAILY_CHALLENGES.forEach(challenge => {
        if (!challenges[challenge.id]) {
            challenges[challenge.id] = { progress: 0, completed: false };
        }

        if (challenge.id === 'daily_1') {
            challenges[challenge.id].progress = 1;
            challenges[challenge.id].completed = true;
        }

        if (challenge.id === 'daily_2' && gameData.moves < 25) {
            challenges[challenge.id].completed = true;
        }
    });

    userData.challenges = challenges;
    localStorage.setItem('user_' + currentUser.email, JSON.stringify(userData));
}

console.log('✅ challenges.js загружен');
