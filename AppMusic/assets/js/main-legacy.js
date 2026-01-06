// MaestroSpirit - Application Principale
class MaestroSpiritApp {
    constructor() {
        this.currentUser = this.loadUserData();
        this.progressData = this.loadProgressData();
        this.dailyQuote = this.getDailyQuote();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboard();
        this.initAnimations();
    }

    // Gestion des données utilisateur
    loadUserData() {
        const defaultUser = {
            name: 'Musicien',
            favoriteInstrument: 'piano',
            level: 'débutant',
            joinDate: new Date().toISOString()
        };
        return JSON.parse(localStorage.getItem('maestroUser')) || defaultUser;
    }

    saveUserData(userData) {
        localStorage.setItem('maestroUser', JSON.stringify(userData));
        this.currentUser = userData;
    }

    // Gestion de la progression
    loadProgressData() {
        const defaultProgress = {
            voice: { level: 1, xp: 0, totalSessions: 0 },
            instruments: { level: 1, xp: 0, totalSessions: 0 },
            theory: { level: 1, xp: 0, totalSessions: 0 },
            spirituality: { level: 1, xp: 0, totalSessions: 0 }
        };
        return JSON.parse(localStorage.getItem('maestroProgress')) || defaultProgress;
    }

    saveProgressData(progressData) {
        localStorage.setItem('maestroProgress', JSON.stringify(progressData));
        this.progressData = progressData;
    }

    updateProgress(category, xpGained) {
        if (this.progressData[category]) {
            this.progressData[category].xp += xpGained;
            this.progressData[category].totalSessions += 1;
            
            // Système de niveaux
            if (this.progressData[category].xp >= 100) {
                this.progressData[category].level += 1;
                this.progressData[category].xp = 0;
                this.showLevelUpAnimation(category);
            }
            
            this.saveProgressData(this.progressData);
            this.updateProgressDisplay();
        }
    }

    // Citations bibliques quotidiennes
    getDailyQuote() {
        const quotes = [
            { text: "Chantez à l'Éternel un chant nouveau, car il a fait des choses merveilleuses.", reference: "Psaumes 98:1" },
            { text: "Élevez votre voix, célébrez la grandeur de l'Éternel.", reference: "Psaumes 47:1" },
            { text: "La musique est la prière du cœur.", reference: "Saint Augustin" },
            { text: "Chantez avec reconnaissance dans vos cœurs à l'Éternel.", reference: "Éphésiens 5:19" },
            { text: "La louange découle d'un cœur reconnaissant.", reference: "Psaumes 100:4" },
            { text: "La musique adoucit les mœurs et élève l'âme.", reference: "Platon" },
            { text: "Chantez à Dieu, chantez des louanges à son nom.", reference: "Psaumes 68:4" }
        ];
        
        const today = new Date().getDay();
        return quotes[today];
    }

    // Chargement du tableau de bord
    loadDashboard() {
        this.updateProgressDisplay();
        this.displayDailyQuote();
        this.setupQuickActions();
    }

    updateProgressDisplay() {
        Object.keys(this.progressData).forEach(category => {
            const progress = this.progressData[category];
            const levelElement = document.querySelector(`#${category}-level`);
            const progressBar = document.querySelector(`#${category}-progress`);
            const xpElement = document.querySelector(`#${category}-xp`);
            
            if (levelElement) levelElement.textContent = progress.level;
            if (xpElement) xpElement.textContent = `${progress.xp}/100 XP`;
            if (progressBar) {
                anime({
                    targets: progressBar,
                    width: `${progress.xp}%`,
                    duration: 1000,
                    easing: 'easeOutQuart'
                });
            }
        });
    }

    displayDailyQuote() {
        const quoteElement = document.querySelector('#daily-quote');
        const referenceElement = document.querySelector('#quote-reference');
        
        if (quoteElement && referenceElement) {
            // Animation de typewriter pour la citation
            new Typed('#daily-quote', {
                strings: [this.dailyQuote.text],
                typeSpeed: 30,
                showCursor: false,
                onComplete: () => {
                    referenceElement.textContent = this.dailyQuote.reference;
                    anime({
                        targets: referenceElement,
                        opacity: [0, 1],
                        translateY: [10, 0],
                        duration: 500,
                        easing: 'easeOutQuart'
                    });
                }
            });
        }
    }

    setupQuickActions() {
        const quickActions = [
            { id: 'quick-voice', category: 'voice', label: 'Exercice Vocal' },
            { id: 'quick-instrument', category: 'instruments', label: 'Pratique Instrument' },
            { id: 'quick-theory', category: 'theory', label: 'Quiz Théorie' },
            { id: 'quick-spirituality', category: 'spirituality', label: 'Méditation' }
        ];

        quickActions.forEach(action => {
            const element = document.querySelector(`#${action.id}`);
            if (element) {
                element.addEventListener('click', () => {
                    this.startQuickSession(action.category);
                });
            }
        });
    }

    startQuickSession(category) {
        // Simuler une session rapide
        this.showSessionModal(category);
        
        // Après 2 secondes (simulation d'exercice)
        setTimeout(() => {
            this.updateProgress(category, 10);
            this.closeSessionModal();
            this.showCompletionMessage(category);
        }, 2000);
    }

    showSessionModal(category) {
        const modal = document.createElement('div');
        modal.className = 'session-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="spinner"></div>
                <h3>Session ${category} en cours...</h3>
                <p>Exercice en cours d'exécution</p>
            </div>
        `;
        document.body.appendChild(modal);
        
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
    }

    closeSessionModal() {
        const modal = document.querySelector('.session-modal');
        if (modal) {
            anime({
                targets: modal,
                opacity: [1, 0],
                duration: 300,
                easing: 'easeOutQuart',
                complete: () => modal.remove()
            });
        }
    }

    showCompletionMessage(category) {
        const toast = document.createElement('div');
        toast.className = 'completion-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">✨</span>
                <span class="toast-text">+10 XP en ${category}!</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        anime({
            targets: toast,
            translateY: [-100, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutBounce',
            complete: () => {
                setTimeout(() => {
                    anime({
                        targets: toast,
                        translateY: [0, -100],
                        opacity: [1, 0],
                        duration: 300,
                        complete: () => toast.remove()
                    });
                }, 2000);
            }
        });
    }

    showLevelUpAnimation(category) {
        const levelUpModal = document.createElement('div');
        levelUpModal.className = 'levelup-modal';
        levelUpModal.innerHTML = `
            <div class="levelup-content">
                <div class="levelup-icon">🎉</div>
                <h2>Niveau Supérieur!</h2>
                <p>Félicitations! Vous avez atteint le niveau ${this.progressData[category].level} en ${category}!</p>
                <button onclick="this.parentElement.parentElement.remove()">Continuer</button>
            </div>
        `;
        document.body.appendChild(levelUpModal);
        
        anime({
            targets: levelUpModal.querySelector('.levelup-content'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutBack'
        });
    }

    // Navigation entre sections
    navigateTo(section) {
        const pages = ['index.html', 'voice.html', 'instruments.html', 'theory.html', 'spirituality.html', 'plan.html', 'profile.html'];
        const pageMap = {
            'dashboard': 'index.html',
            'voice': 'voice.html',
            'instruments': 'instruments.html',
            'theory': 'theory.html',
            'spirituality': 'spirituality.html',
            'plan': 'plan.html',
            'profile': 'profile.html'
        };
        
        if (pageMap[section]) {
            window.location.href = pageMap[section];
        }
    }

    // Enregistreur audio local
    initVoiceRecorder() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            this.mediaRecorder = null;
            this.audioChunks = [];
            this.isRecording = false;
        }
    }

    startRecording() {
        if (!this.isRecording) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    this.mediaRecorder = new MediaRecorder(stream);
                    this.audioChunks = [];
                    
                    this.mediaRecorder.ondataavailable = event => {
                        this.audioChunks.push(event.data);
                    };
                    
                    this.mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                        this.saveRecording(audioBlob);
                    };
                    
                    this.mediaRecorder.start();
                    this.isRecording = true;
                    this.updateRecordingUI();
                })
                .catch(error => {
                    console.error('Erreur d\'accès au microphone:', error);
                    this.showMicrophoneError();
                });
        }
    }

    stopRecording() {
        if (this.isRecording && this.mediaRecorder) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.updateRecordingUI();
        }
    }

    saveRecording(audioBlob) {
        const recordingId = Date.now().toString();
        const reader = new FileReader();
        
        reader.onload = () => {
            const audioData = reader.result;
            localStorage.setItem(`recording_${recordingId}`, audioData);
            this.addRecordingToList(recordingId);
        };
        
        reader.readAsDataURL(audioBlob);
    }

    addRecordingToList(recordingId) {
        const recordingsList = document.querySelector('#recordings-list');
        if (recordingsList) {
            const recordingItem = document.createElement('div');
            recordingItem.className = 'recording-item';
            recordingItem.innerHTML = `
                <div class="recording-info">
                    <span class="recording-date">${new Date().toLocaleString()}</span>
                    <audio controls src="${localStorage.getItem(`recording_${recordingId}`)}"></audio>
                </div>
                <button class="delete-recording" data-id="${recordingId}">Supprimer</button>
            `;
            recordingsList.appendChild(recordingItem);
        }
    }

    // Initialisation des animations
    initAnimations() {
        // Animation d'entrée des cartes de progression
        anime({
            targets: '.progress-card',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(200),
            duration: 800,
            easing: 'easeOutQuart'
        });

        // Animation de la barre de navigation
        anime({
            targets: '.nav-item',
            scale: [0.9, 1],
            opacity: [0, 1],
            delay: anime.stagger(100, {start: 500}),
            duration: 600,
            easing: 'easeOutBack'
        });

        // Effet de particules dorées (si p5.js est disponible)
        if (typeof p5 !== 'undefined') {
            this.initGoldenParticles();
        }
    }

    initGoldenParticles() {
        const canvas = document.createElement('div');
        canvas.id = 'particles-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        document.body.appendChild(canvas);

        new p5((p) => {
            let particles = [];
            
            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight);
                
                for (let i = 0; i < 20; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        size: p.random(2, 6),
                        speedX: p.random(-0.5, 0.5),
                        speedY: p.random(-0.5, 0.5),
                        opacity: p.random(0.1, 0.3)
                    });
                }
            };
            
            p.draw = () => {
                p.clear();
                
                particles.forEach(particle => {
                    p.fill(212, 175, 55, particle.opacity * 255);
                    p.noStroke();
                    p.circle(particle.x, particle.y, particle.size);
                    
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    if (particle.x < 0 || particle.x > p.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > p.height) particle.speedY *= -1;
                });
            };
            
            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        }, canvas);
    }

    // Setup des event listeners
    setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-nav]')) {
                e.preventDefault();
                this.navigateTo(e.target.dataset.nav);
            }
        });

        // Boutons d'enregistrement
        document.addEventListener('click', (e) => {
            if (e.target.matches('#record-btn')) {
                if (!this.isRecording) {
                    this.startRecording();
                } else {
                    this.stopRecording();
                }
            }
        });

        // Suppression d'enregistrements
        document.addEventListener('click', (e) => {
            if (e.target.matches('.delete-recording')) {
                const recordingId = e.target.dataset.id;
                localStorage.removeItem(`recording_${recordingId}`);
                e.target.closest('.recording-item').remove();
            }
        });
    }

    // Gestion des erreurs
    showMicrophoneError() {
        const errorToast = document.createElement('div');
        errorToast.className = 'error-toast';
        errorToast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">⚠️</span>
                <span class="toast-text">Microphone non disponible</span>
            </div>
        `;
        document.body.appendChild(errorToast);
        
        setTimeout(() => errorToast.remove(), 3000);
    }

    updateRecordingUI() {
        const recordBtn = document.querySelector('#record-btn');
        if (recordBtn) {
            if (this.isRecording) {
                recordBtn.textContent = 'Arrêter';
                recordBtn.classList.add('recording');
            } else {
                recordBtn.textContent = 'Enregistrer';
                recordBtn.classList.remove('recording');
            }
        }
    }
}

// Initialisation de l'application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MaestroSpiritApp();
});

// Fonctions utilitaires
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MaestroSpiritApp;
}