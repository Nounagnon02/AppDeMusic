class MaestroSpiritApp {
    constructor() {
        this.currentUser = this.loadUserData();
        this.progressData = this.loadProgressData();
        this.dailyQuote = this.getDailyQuote();
        this.gamification = null;
        this.audioEngine = null;
        this.theoryEngine = null;
        this.init();
    }

    init() {
        this.initEngines();
        this.setupEventListeners();
        this.loadDashboard();
        this.initAnimations();
        this.checkDailyReward();
    }

    async initEngines() {
        // Initialiser les moteurs si les classes sont disponibles
        if (typeof GamificationSystem !== 'undefined') {
            this.gamification = new GamificationSystem();
        }
        if (typeof AudioEngine !== 'undefined') {
            this.audioEngine = new AudioEngine();
        }
        if (typeof MusicTheoryEngine !== 'undefined') {
            this.theoryEngine = new MusicTheoryEngine();
        }
    }

    loadUserData() {
        const defaultUser = {
            name: 'Musicien',
            favoriteInstrument: 'piano',
            level: 'débutant',
            joinDate: new Date().toISOString()
        };
        return JSON.parse(localStorage.getItem('maestroUser')) || defaultUser;
    }

    loadProgressData() {
        const defaultProgress = {
            voice: { level: 1, xp: 0, totalSessions: 0 },
            instruments: { level: 1, xp: 0, totalSessions: 0 },
            theory: { level: 1, xp: 0, totalSessions: 0 },
            spirituality: { level: 1, xp: 0, totalSessions: 0 }
        };
        return JSON.parse(localStorage.getItem('maestroProgress')) || defaultProgress;
    }

    getDailyQuote() {
        const quotes = [
            { text: "Chantez à l'Éternel un chant nouveau, car il a fait des choses merveilleuses.", reference: "Psaumes 98:1" },
            { text: "Élevez votre voix, célébrez la grandeur de l'Éternel.", reference: "Psaumes 47:1" },
            { text: "La musique est la prière du cœur.", reference: "Saint Augustin" }
        ];
        const today = new Date().getDay();
        return quotes[today % quotes.length];
    }

    updateProgress(category, xpGained) {
        if (this.progressData[category]) {
            this.progressData[category].xp += xpGained;
            this.progressData[category].totalSessions += 1;
            
            if (this.progressData[category].xp >= 100) {
                this.progressData[category].level += 1;
                this.progressData[category].xp = 0;
                this.showLevelUpAnimation(category);
            }
            
            localStorage.setItem('maestroProgress', JSON.stringify(this.progressData));
            this.updateProgressDisplay();
            this.showXpNotification(category, xpGained);
            
            // Mise à jour gamification
            if (this.gamification) {
                this.gamification.updateStreak();
                this.gamification.updateAchievement(category + 'Exercises');
            }
        }
    }

    showXpNotification(category, xp) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gold);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            z-index: 1000;
            font-weight: 600;
        `;
        notification.textContent = `+${xp} XP en ${category}!`;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    }

    updateProgressDisplay() {
        Object.keys(this.progressData).forEach(category => {
            const progress = this.progressData[category];
            const levelElement = document.querySelector(`#${category}-level`);
            const progressBar = document.querySelector(`#${category}-progress`);
            const xpElement = document.querySelector(`#${category}-xp`);
            
            if (levelElement) levelElement.textContent = progress.level;
            if (xpElement) xpElement.textContent = `${progress.xp}/100 XP`;
            if (progressBar) progressBar.style.width = `${progress.xp}%`;
        });
    }

    navigateTo(section) {
        const pageMap = {
            'dashboard': 'index.html',
            'voice': 'pages/voice.html',
            'instruments': 'pages/instruments.html',
            'theory': 'pages/theory.html',
            'spirituality': 'pages/spirituality.html',
            'tools': 'pages/tools.html',
            'profile': 'pages/profile.html'
        };
        
        if (pageMap[section]) {
            window.location.href = pageMap[section];
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-nav]')) {
                e.preventDefault();
                this.navigateTo(e.target.dataset.nav);
            }
        });
    }

    loadDashboard() {
        this.updateProgressDisplay();
    }

    initAnimations() {
        // Animations d'entrée simples
        const cards = document.querySelectorAll('.progress-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    showLevelUpAnimation(category) {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
                <div style="background: white; padding: 2rem; border-radius: 16px; text-align: center;">
                    <h2>Niveau Supérieur!</h2>
                    <p>Niveau ${this.progressData[category].level} en ${category}!</p>
                    <button onclick="this.parentElement.parentElement.remove()">Continuer</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    checkDailyReward() {
        if (this.gamification) {
            const reward = this.gamification.getDailyReward();
            if (reward) {
                setTimeout(() => {
                    this.showXpNotification('daily', reward.xp);
                }, 2000);
            }
        }
    }

    // Nouvelles fonctionnalités
    startVoiceRecording() {
        if (this.audioEngine) {
            return this.audioEngine.startRecording();
        }
        return false;
    }

    stopVoiceRecording() {
        if (this.audioEngine) {
            return this.audioEngine.stopRecording();
        }
        return null;
    }

    playMetronome(bpm = 120) {
        if (this.audioEngine) {
            this.audioEngine.startMetronome(bpm);
        }
    }

    stopMetronome() {
        if (this.audioEngine) {
            this.audioEngine.stopMetronome();
        }
    }

    generateQuiz() {
        if (this.theoryEngine) {
            return this.theoryEngine.generateQuiz();
        }
        return null;
    }

    getBadges() {
        if (this.gamification) {
            return this.gamification.badges;
        }
        return [];
    }

    getCurrentStreak() {
        if (this.gamification) {
            return this.gamification.streaks.current;
        }
        return 0;
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MaestroSpiritApp();
});

// Service Worker pour PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}