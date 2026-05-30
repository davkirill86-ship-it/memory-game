// ============================================
// 🎨 СИСТЕМА КОСМЕТИКИ (СКИНЫ КАРТОЧЕК)
// ============================================

const CARD_SKINS = {
    'default': {
        id: 'default',
        name: 'Классический',
        description: 'Стандартный зелёный скин',
        color: '#4caf50',
        unlocked: true
    },
    'purple': {
        id: 'purple',
        name: 'Фиолетовый',
        description: 'Элегантный фиолетовый скин',
        color: '#9c27b0',
        unlocked: false,
        price: 500
    },
    'blue': {
        id: 'blue',
        name: 'Синий',
        description: 'Классический синий скин',
        color: '#2196f3',
        unlocked: false,
        price: 500
    },
    'gold': {
        id: 'gold',
        name: 'Золотой',
        description: 'Редкий золотой скин',
        color: '#ffc107',
        unlocked: false,
        price: 1000
    }
};

// ============================================
// ПОЛУЧЕНИЕ И УСТАНОВКА СКИНА
// ============================================

function getSelectedSkin() {
    if (!currentUser) return CARD_SKINS.default;

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    const skinId = userData.selectedSkin || 'default';
    return CARD_SKINS[skinId] || CARD_SKINS.default;
}

function setSkin(skinId) {
    if (!currentUser) return;

    const skin = CARD_SKINS[skinId];
    if (!skin) {
        alert('❌ Скин не найден!');
        return;
    }

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');

    // Проверяем, разблокирован ли скин
    if (!userData.unlockedSkins) {
        userData.unlockedSkins = ['default'];
    }

    if (!userData.unlockedSkins.includes(skinId)) {
        alert('❌ Этот скин не разблокирован!');
        return;
    }

    userData.selectedSkin = skinId;
    localStorage.setItem('user_' + currentUser.email, JSON.stringify(userData));

    currentUser.selectedSkin = skinId;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    alert(`✅ Скин "${skin.name}" активирован!\n\nТвои карточки теперь выглядят по-новому!`);

    // Обновляем UI косметики
    updateCosmeticsUI();
}

// ============================================
// РАЗБЛОКИРОВКА СКИНА
// ============================================

function unlockSkin(skinId) {
    if (!currentUser) {
        alert('❌ Необходимо войти в игру');
        return;
    }

    const skin = CARD_SKINS[skinId];
    if (!skin) {
        alert('❌ Скин не найден!');
        return;
    }

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');

    if (!userData.unlockedSkins) {
        userData.unlockedSkins = ['default'];
    }

    // Проверяем, уже ли разблокирован
    if (userData.unlockedSkins.includes(skinId)) {
        alert('✅ Этот скин уже разблокирован!');
        return;
    }

    // Проверяем очки
    const price = skin.price || 0;
    const playerScore = currentUser.score || 0;

    if (playerScore < price) {
        alert(`❌ Недостаточно очков!\n\nНужно: ${price}\nЕсть: ${playerScore}`);
        return;
    }

    // Разблокируем скин
    userData.unlockedSkins.push(skinId);
    userData.score = (userData.score || 0) - price;

    localStorage.setItem('user_' + currentUser.email, JSON.stringify(userData));

    currentUser.score = userData.score;
    currentUser.unlockedSkins = userData.unlockedSkins;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    alert(`🎉 Скин "${skin.name}" разблокирован!\n\nТвой счёт: -${price} очков`);

    // Обновляем UI косметики
    updateCosmeticsUI();
}

// ============================================
// ОБНОВЛЕНИЕ UI КОСМЕТИКИ
// ============================================

function updateCosmeticsUI() {
    if (!currentUser) return;

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    const unlockedSkins = userData.unlockedSkins || ['default'];
    const selectedSkin = userData.selectedSkin || 'default';

    // Обновляем каждый скин в UI
    Object.keys(CARD_SKINS).forEach(skinId => {
        const skinElement = document.querySelector(`[data-skin-id="${skinId}"]`);
        if (!skinElement) return;

        const isUnlocked = unlockedSkins.includes(skinId);
        const isSelected = skinId === selectedSkin;

        // Обновляем статус скина
        const statusDiv = skinElement.querySelector('.cosmetic-status');
        if (statusDiv) {
            if (isSelected) {
                statusDiv.innerHTML = '✅ Активен';
                statusDiv.style.color = '#4caf50';
            } else if (isUnlocked) {
                statusDiv.innerHTML = '✅ Разблокирован';
                statusDiv.style.color = '#4caf50';
            } else {
                const price = CARD_SKINS[skinId].price || 0;
                statusDiv.innerHTML = `🔒 ${price} очков`;
                statusDiv.style.color = '#ff9800';
            }
        }

        // Обновляем кнопку
        const button = skinElement.querySelector('button');
        if (button) {
            if (isSelected) {
                button.textContent = '✅ Активен';
                button.disabled = true;
                button.style.opacity = '0.7';
            } else if (isUnlocked) {
                button.textContent = 'Активировать';
                button.disabled = false;
                button.style.opacity = '1';
                button.onclick = () => setSkin(skinId);
            } else {
                button.textContent = 'Разблокировать';
                button.disabled = false;
                button.style.opacity = '1';
                button.onclick = () => unlockSkin(skinId);
            }
        }
    });
}

// ============================================
// ВЫБОР КОСМЕТИКИ (из HTML onclick)
// ============================================

function selectCosmetic(cosmeticName) {
    if (!currentUser) {
        alert('❌ Необходимо войти в игру');
        return;
    }

    // Ищем скин по названию
    let skinId = null;
    for (let id in CARD_SKINS) {
        if (CARD_SKINS[id].name === cosmeticName) {
            skinId = id;
            break;
        }
    }

    if (!skinId) {
        alert('❌ Косметика не найдена!');
        return;
    }

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    if (!userData.unlockedSkins) {
        userData.unlockedSkins = ['default'];
    }

    if (!userData.unlockedSkins.includes(skinId)) {
        unlockSkin(skinId);
    } else {
        setSkin(skinId);
    }
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ КОСМЕТИКИ
// ============================================

function initializeCosmeticsOnLoad() {
    if (currentUser) {
        updateCosmeticsUI();
    }
}

// Инициализируем при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeCosmeticsOnLoad, 500);
});

console.log('✅ cosmetics.js загружен полностью');
