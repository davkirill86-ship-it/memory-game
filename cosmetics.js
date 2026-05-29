// ============================================
// СИСТЕМА КОСМЕТИКИ
// ============================================

const CARD_SKINS = {
    'default': { name: 'Классический', color: '#4caf50' },
    'purple': { name: 'Фиолетовый', color: '#9c27b0' },
    'blue': { name: 'Синий', color: '#2196f3' },
    'gold': { name: 'Золотой', color: '#ffc107' }
};

function getSelectedSkin() {
    if (!currentUser) return CARD_SKINS.default;
    
    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    const skinId = userData.selectedSkin || 'default';
    return CARD_SKINS[skinId] || CARD_SKINS.default;
}

function setSkin(skinId) {
    if (!currentUser) return;
    
    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    userData.selectedSkin = skinId;
    localStorage.setItem('user_' + currentUser.email, JSON.stringify(userData));
}

console.log('✅ cosmetics.js загружен');
