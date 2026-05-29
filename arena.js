// ============================================
// АРЕНА (ОНЛАЙН ТУРНИРЫ)
// ============================================

const ARENA_BRACKETS = {
    'weekly': {
        name: 'Еженедельный турнир',
        prize: 1000,
        status: 'active'
    },
    'monthly': {
        name: 'Ежемесячный турнир',
        prize: 5000,
        status: 'active'
    }
};

function joinArena(bracketId) {
    if (!currentUser) return false;

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    const arenaData = userData.arena || {};
    
    if (!arenaData.joined) {
        arenaData.joined = [];
    }
    
    if (!arenaData.joined.includes(bracketId)) {
        arenaData.joined.push(bracketId);
        userData.arena = arenaData;
        localStorage.setItem('user_' + currentUser.email, JSON.stringify(userData));
        return true;
    }
    
    return false;
}

console.log('✅ arena.js загружен');
