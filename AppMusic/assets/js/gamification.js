// Système de gamification
class GamificationSystem {
    constructor() {
        this.badges = this.loadBadges();
        this.streaks = this.loadStreaks();
        this.challenges = this.loadChallenges();
        this.achievements = this.loadAchievements();
    }

    loadBadges() {
        return JSON.parse(localStorage.getItem('maestroBadges')) || [];
    }

    saveBadges() {
        localStorage.setItem('maestroBadges', JSON.stringify(this.badges));
    }

    loadStreaks() {
        const defaultStreaks = {
            current: 0,
            longest: 0,
            lastActivity: null
        };
        return JSON.parse(localStorage.getItem('maestroStreaks')) || defaultStreaks;
    }

    saveStreaks() {
        localStorage.setItem('maestroStreaks', JSON.stringify(this.streaks));
    }

    loadChallenges() {
        const defaultChallenges = [
            { id: 1, title: 'Première session', description: 'Complétez votre premier exercice', completed: false, reward: 50 },
            { id: 2, title: 'Série de 3', description: '3 jours consécutifs', completed: false, reward: 100 },
            { id: 3, title: 'Maître vocal', description: '10 exercices vocaux', completed: false, reward: 200 },
            { id: 4, title: 'Théoricien', description: '5 quiz théorie réussis', completed: false, reward: 150 }
        ];
        return JSON.parse(localStorage.getItem('maestroChallenges')) || defaultChallenges;
    }

    saveChallenges() {
        localStorage.setItem('maestroChallenges', JSON.stringify(this.challenges));
    }

    loadAchievements() {
        return JSON.parse(localStorage.getItem('maestroAchievements')) || {
            totalXP: 0,
            sessionsCompleted: 0,
            voiceExercises: 0,
            theoryQuizzes: 0,
            instrumentPractice: 0,
            meditationSessions: 0
        };
    }

    saveAchievements() {
        localStorage.setItem('maestroAchievements', JSON.stringify(this.achievements));
    }

    // Mise à jour des streaks
    updateStreak() {
        const today = new Date().toDateString();
        const lastActivity = this.streaks.lastActivity;
        
        if (lastActivity === today) {
            return; // Déjà compté aujourd'hui
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastActivity === yesterday.toDateString()) {
            this.streaks.current += 1;
        } else {
            this.streaks.current = 1;
        }
        
        this.streaks.longest = Math.max(this.streaks.longest, this.streaks.current);
        this.streaks.lastActivity = today;
        this.saveStreaks();
        
        this.checkStreakBadges();
    }

    // Vérification des badges de streak
    checkStreakBadges() {
        const streakBadges = [
            { streak: 3, name: 'Débutant Assidu', icon: '🔥' },
            { streak: 7, name: 'Semaine Parfaite', icon: '⭐' },
            { streak: 30, name: 'Mois Légendaire', icon: '👑' }
        ];
        
        streakBadges.forEach(badge => {
            if (this.streaks.current >= badge.streak && !this.hasBadge(badge.name)) {
                this.awardBadge(badge.name, badge.icon, `${badge.streak} jours consécutifs!`);
            }
        });
    }

    // Attribution de badge
    awardBadge(name, icon, description) {
        const badge = {
            id: Date.now(),
            name,
            icon,
            description,
            dateEarned: new Date().toISOString()
        };
        
        this.badges.push(badge);
        this.saveBadges();
        this.showBadgeNotification(badge);
    }

    hasBadge(name) {
        return this.badges.some(badge => badge.name === name);
    }

    showBadgeNotification(badge) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #D4AF37, #B8860B);
            color: white;
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            z-index: 2000;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        `;
        
        notification.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">${badge.icon}</div>
            <h3 style="margin-bottom: 0.5rem;">Nouveau Badge!</h3>
            <h4 style="margin-bottom: 0.5rem;">${badge.name}</h4>
            <p style="font-size: 0.9rem; opacity: 0.9;">${badge.description}</p>
            <button onclick="this.parentElement.remove()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: rgba(255,255,255,0.2); border: none; border-radius: 8px; color: white; cursor: pointer;">
                Continuer
            </button>
        `;
        
        document.body.appendChild(notification);
    }

    // Mise à jour des achievements
    updateAchievement(type, amount = 1) {
        this.achievements[type] += amount;
        this.achievements.totalXP += amount * 10;
        this.saveAchievements();
        this.checkAchievementBadges(type);
    }

    checkAchievementBadges(type) {
        const achievementBadges = {
            voiceExercises: [
                { count: 5, name: 'Chanteur Débutant', icon: '🎤' },
                { count: 25, name: 'Voix d\'Or', icon: '🏆' },
                { count: 100, name: 'Maître Vocal', icon: '👑' }
            ],
            theoryQuizzes: [
                { count: 5, name: 'Étudiant', icon: '📚' },
                { count: 20, name: 'Théoricien', icon: '🎓' },
                { count: 50, name: 'Professeur', icon: '👨‍🏫' }
            ],
            instrumentPractice: [
                { count: 10, name: 'Instrumentiste', icon: '🎸' },
                { count: 50, name: 'Virtuose', icon: '🎹' },
                { count: 100, name: 'Maestro', icon: '🎼' }
            ]
        };
        
        if (achievementBadges[type]) {
            achievementBadges[type].forEach(badge => {
                if (this.achievements[type] >= badge.count && !this.hasBadge(badge.name)) {
                    this.awardBadge(badge.name, badge.icon, `${badge.count} ${type} complétés!`);
                }
            });
        }
    }

    // Défis hebdomadaires
    generateWeeklyChallenge() {
        const challenges = [
            { title: 'Marathon Vocal', description: 'Complétez 5 exercices vocaux cette semaine', target: 5, type: 'voice' },
            { title: 'Théorie Intensive', description: 'Réussissez 3 quiz de théorie', target: 3, type: 'theory' },
            { title: 'Multi-Instruments', description: 'Pratiquez 3 instruments différents', target: 3, type: 'instruments' },
            { title: 'Zen Master', description: '7 sessions de méditation', target: 7, type: 'spirituality' }
        ];
        
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        randomChallenge.id = Date.now();
        randomChallenge.progress = 0;
        randomChallenge.completed = false;
        randomChallenge.weekStart = new Date().toISOString();
        
        return randomChallenge;
    }

    // Système de points et classement
    calculateLevel(xp) {
        return Math.floor(xp / 100) + 1;
    }

    getNextLevelXP(currentXP) {
        const currentLevel = this.calculateLevel(currentXP);
        return currentLevel * 100;
    }

    // Récompenses quotidiennes
    getDailyReward() {
        const lastReward = localStorage.getItem('lastDailyReward');
        const today = new Date().toDateString();
        
        if (lastReward !== today) {
            localStorage.setItem('lastDailyReward', today);
            return {
                xp: 25,
                message: 'Récompense quotidienne: +25 XP!'
            };
        }
        
        return null;
    }
}

window.GamificationSystem = GamificationSystem;