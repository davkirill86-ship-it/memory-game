// ============================================
// ИНТЕГРАЦИЯ ВСЕХ СИСТЕМ
// ============================================

console.log('🔗 Интеграция систем инициализирована');

/**
 * Главный обработчик завершения игры
 * Интегрирует все 8 систем в одну точку
 */
function handleGameCompletion(gameData) {
    if (!currentUser) return;

    console.log('🏆 Игра завершена:', gameData);

    // Уведомления и логирование
    const event = {
        type: 'game_completed',
        timestamp: new Date().toISOString(),
        userId: currentUser.id,
        data: gameData
    };

    // Система достижений
    if (typeof checkAchievements === 'function') {
        checkAchievements(gameData);
    }

    // Система челленджей
    if (typeof updateChallengeProgress === 'function') {
        updateChallengeProgress(gameData);
    }

    // Лидерборды
    if (typeof updateLeaderboard === 'function') {
        updateLeaderboard(gameData);
    }

    // Сохраняем событие
    const events = JSON.parse(localStorage.getItem('user_events_' + currentUser.email) || '[]');
    events.push(event);
    localStorage.setItem('user_events_' + currentUser.email, JSON.stringify(events));

    console.log('✅ Все системы обновлены');
}

/**
 * Синхронизирует данные пользователя между всеми системами
 */
function syncUserData() {
    if (!currentUser) return;
    
    const userData = localStorage.getItem('user_' + currentUser.email);
    if (userData) {
        const user = JSON.parse(userData);
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}

/**
 * Получает статистику игрока со всех систем
 */
function getPlayerStats() {
    if (!currentUser) return null;

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    
    return {
        player: currentUser.name,
        level: userData.level || 1,
        score: userData.score || 0,
        gamesPlayed: userData.gamesPlayed || 0,
        achievements: (userData.achievements || []).length,
        friends: (userData.friends || []).length,
        joinDate: currentUser.joinDate
    };
}

console.log('✅ integration.js загружен');
