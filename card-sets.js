// ============================================
// НАБОРЫ КАРТОЧЕК
// ============================================

const CARD_SETS = {
    'animals': {
        name: '🐾 Животные',
        emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
        unlocked: true
    },
    'food': {
        name: '🍕 Еда',
        emojis: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒'],
        unlocked: false
    },
    'nature': {
        name: '🌲 Природа',
        emojis: ['🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '🍀', '🍃'],
        unlocked: false
    },
    'sports': {
        name: '⚽ Спорт',
        emojis: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸'],
        unlocked: false
    }
};

function unlockedCardSets() {
    if (!currentUser) return ['animals'];
    
    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    return userData.unlockedSets || ['animals'];
}

console.log('✅ card-sets.js загружен');
