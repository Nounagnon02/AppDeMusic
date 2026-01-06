// Audio Engine pour MaestroSpirit
class AudioEngine {
    constructor() {
        this.audioContext = null;
        this.mediaRecorder = null;
        this.isRecording = false;
        this.metronomeInterval = null;
        this.bpm = 120;
        this.init();
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Audio non supporté');
        }
    }

    // Métronome
    startMetronome(bpm = 120) {
        this.bpm = bpm;
        const interval = 60000 / bpm;
        
        this.metronomeInterval = setInterval(() => {
            this.playClick();
        }, interval);
    }

    stopMetronome() {
        if (this.metronomeInterval) {
            clearInterval(this.metronomeInterval);
            this.metronomeInterval = null;
        }
    }

    playClick() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // Piano virtuel
    playNote(frequency, duration = 0.5) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Enregistreur vocal
    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];
            
            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };
            
            this.mediaRecorder.start();
            this.isRecording = true;
            return true;
        } catch (error) {
            console.error('Erreur microphone:', error);
            return false;
        }
    }

    stopRecording() {
        return new Promise((resolve) => {
            if (this.mediaRecorder && this.isRecording) {
                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    this.isRecording = false;
                    resolve(audioUrl);
                };
                this.mediaRecorder.stop();
            }
        });
    }

    // Accordeur simple
    async startTuner() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const analyser = this.audioContext.createAnalyser();
            const source = this.audioContext.createMediaStreamSource(stream);
            
            source.connect(analyser);
            analyser.fftSize = 2048;
            
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            
            const detectPitch = () => {
                analyser.getByteFrequencyData(dataArray);
                const frequency = this.findFundamentalFreq(dataArray);
                return frequency;
            };
            
            return detectPitch;
        } catch (error) {
            console.error('Erreur accordeur:', error);
            return null;
        }
    }

    findFundamentalFreq(dataArray) {
        let maxIndex = 0;
        let maxValue = 0;
        
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i] > maxValue) {
                maxValue = dataArray[i];
                maxIndex = i;
            }
        }
        
        return maxIndex * this.audioContext.sampleRate / 2048;
    }
}

// Notes et fréquences
const NOTE_FREQUENCIES = {
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13,
    'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
    'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
    'C5': 523.25
};

window.AudioEngine = AudioEngine;
window.NOTE_FREQUENCIES = NOTE_FREQUENCIES;