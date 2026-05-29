// ============================================
// ЛИДЕРБОРДЫ
// ============================================

function updateLeaderboard(gameData) {
    if (!currentUser) return;

    const leaderboard = JSON.parse(localStorage.getItem('global_leaderboard') || '[]');
    
    const playerEntry = {
        name: currentUser.name,
        score: gameData.score || (100 - gameData.moves),
        moves: gameData.moves,
        timestamp: new Date().toISOString(),
        userId: currentUser.id
    };

    leaderboard.push(playerEntry);
    leaderboard.sort((a, b) => b.score - a.score);
    
    localStorage.setItem('global_leaderboard', JSON.stringify(leaderboard.slice(0, 100)));
}

function getGlobalLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('global_leaderboard') || '[]');
    return leaderboard.slice(0, 10);
}

console.log('✅ leaderboards.js загружен');
