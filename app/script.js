document.addEventListener('DOMContentLoaded', () => {
    // --- LOGIN PAGE LOGIC ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if (email) {
                simulateLogin();
            }
        });
    }

    // --- DASHBOARD LOGIC ---
    // (None specifically needed for simple links, but kept for extensibility)

    // --- PLAYER PAGE LOGIC ---
    const playerTitle = document.getElementById('player-title');
    if (playerTitle) {
        const urlParams = new URLSearchParams(window.location.search);
        const freqId = urlParams.get('freq');
        loadFrequency(freqId);
    }
});

function simulateLogin() {
    const overlay = document.getElementById('loading-overlay');
    const text = document.getElementById('loading-text');

    overlay.classList.remove('hide');

    // Sequence of loading messages
    setTimeout(() => {
        text.textContent = "Encrypting session...";
    }, 1500);

    setTimeout(() => {
        text.textContent = "Preparing frequency interface...";
    }, 3000);

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 4500);
}

const frequencyData = {
    '1': {
        title: "Frequency of Physical Restoration",
        desc: "Aligned to promote cellular renewal and physical harmony. Allow the vibrations to scan and soothe your body's energy centers."
    },
    '2': {
        title: "Frequency of Emotional Peace",
        desc: "Designed to quiet the mind and settle the heart. Let go of anxiety and embrace a state of profound stillness."
    },
    '3': {
        title: "Frequency of Spiritual Strength",
        desc: "Fortifies your spiritual connection and inner resolve. Feel the grounding energy reinforcing your spirit."
    },
    '4': {
        title: "Frequency of Protection",
        desc: "Creates an energetic shield around your aura. Visualize a golden light repelling negativity as you listen."
    },
    '5': {
        title: "Frequency of Financial Alignment",
        desc: "Opens pathways for abundance and prosperity. Align your vibration with the flow of receiving."
    },
    '6': {
        title: "Frequency of Relationship Healing",
        desc: "Softens conflicts and nurtures connection. Direct this energy towards forgiveness and love."
    },
    '7': {
        title: "Frequency of Energy Renewal",
        desc: "Revitalizes a weary spirit and recharges your energetic battery. Breathe in fresh energy with every tone."
    }
};

function loadFrequency(id) {
    const data = frequencyData[id] || frequencyData['1']; // Default to 1

    document.getElementById('player-title').textContent = data.title;
    document.getElementById('player-desc').textContent = data.desc;

    // Universal audio source (Placeholder logic, assuming same file)
    // In a real app, this might change based on ID, but request was for same base audio.
}
