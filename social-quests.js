// ============================================
// СОЦИАЛЬНЫЕ ЗАДАЧИ И ДРУЗЬЯ
// ============================================

function addFriend(friendEmail) {
    if (!currentUser) return false;

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    const friendData = localStorage.getItem('user_' + friendEmail);

    if (!friendData) return false;

    if (!userData.friends) {
        userData.friends = [];
    }

    if (!userData.friends.includes(friendEmail)) {
        userData.friends.push(friendEmail);
        localStorage.setItem('user_' + currentUser.email, JSON.stringify(userData));
        return true;
    }

    return false;
}

function getFriendsList() {
    if (!currentUser) return [];

    const userData = JSON.parse(localStorage.getItem('user_' + currentUser.email) || '{}');
    return userData.friends || [];
}

function sendChallenge(friendEmail) {
    if (!currentUser) return false;

    const challenges = JSON.parse(localStorage.getItem('challenges_' + friendEmail) || '[]');
    challenges.push({
        from: currentUser.email,
        timestamp: new Date().toISOString(),
        type: 'duel'
    });

    localStorage.setItem('challenges_' + friendEmail, JSON.stringify(challenges));
    return true;
}

console.log('✅ social-quests.js загружен');
