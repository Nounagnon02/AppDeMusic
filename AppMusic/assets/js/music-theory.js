// Moteur de théorie musicale
class MusicTheoryEngine {
    constructor() {
        this.scales = this.initScales();
        this.chords = this.initChords();
        this.intervals = this.initIntervals();
        this.modes = this.initModes();
    }

    initScales() {
        return {
            major: [0, 2, 4, 5, 7, 9, 11],
            minor: [0, 2, 3, 5, 7, 8, 10],
            pentatonic: [0, 2, 4, 7, 9],
            blues: [0, 3, 5, 6, 7, 10],
            chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        };
    }

    initChords() {
        return {
            major: [0, 4, 7],
            minor: [0, 3, 7],
            diminished: [0, 3, 6],
            augmented: [0, 4, 8],
            major7: [0, 4, 7, 11],
            minor7: [0, 3, 7, 10],
            dominant7: [0, 4, 7, 10]
        };
    }

    initIntervals() {
        return {
            'unisson': 0, 'seconde mineure': 1, 'seconde majeure': 2,
            'tierce mineure': 3, 'tierce majeure': 4, 'quarte juste': 5,
            'triton': 6, 'quinte juste': 7, 'sixte mineure': 8,
            'sixte majeure': 9, 'septième mineure': 10, 'septième majeure': 11
        };
    }

    initModes() {
        return {
            ionien: [0, 2, 4, 5, 7, 9, 11],      // Mode majeur
            dorien: [0, 2, 3, 5, 7, 9, 10],     // Mode mineur avec 6te majeure
            phrygien: [0, 1, 3, 5, 7, 8, 10],   // Mode mineur avec 2nde mineure
            lydien: [0, 2, 4, 6, 7, 9, 11],     // Mode majeur avec 4te augmentée
            mixolydien: [0, 2, 4, 5, 7, 9, 10], // Mode majeur avec 7ème mineure
            éolien: [0, 2, 3, 5, 7, 8, 10],     // Mode mineur naturel
            locrien: [0, 1, 3, 5, 6, 8, 10]     // Mode diminué
        };
    }

    // Générateur de gammes
    generateScale(root, scaleType) {
        const rootNote = this.noteToNumber(root);
        const intervals = this.scales[scaleType];
        
        return intervals.map(interval => 
            this.numberToNote((rootNote + interval) % 12)
        );
    }

    // Générateur d'accords
    generateChord(root, chordType) {
        const rootNote = this.noteToNumber(root);
        const intervals = this.chords[chordType];
        
        return intervals.map(interval => 
            this.numberToNote((rootNote + interval) % 12)
        );
    }

    // Progression d'accords communes
    getChordProgression(key, progression) {
        const progressions = {
            'I-V-vi-IV': [0, 7, 9, 5],      // Pop progression
            'ii-V-I': [2, 7, 0],           // Jazz progression
            'I-vi-ii-V': [0, 9, 2, 7],     // Circle of fifths
            'I-IV-V': [0, 5, 7],           // Blues progression
            'vi-IV-I-V': [9, 5, 0, 7]      // Pop ballad
        };
        
        const keyRoot = this.noteToNumber(key);
        const intervals = progressions[progression];
        
        return intervals.map(interval => {
            const chordRoot = this.numberToNote((keyRoot + interval) % 12);
            const chordType = this.getChordTypeInKey(interval, 'major');
            return { root: chordRoot, type: chordType };
        });
    }

    getChordTypeInKey(degree, keyType) {
        const majorKeyChords = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'diminished'];
        const minorKeyChords = ['minor', 'diminished', 'major', 'minor', 'minor', 'major', 'major'];
        
        const chords = keyType === 'major' ? majorKeyChords : minorKeyChords;
        return chords[degree];
    }

    // Transposition
    transpose(notes, semitones) {
        return notes.map(note => {
            const noteNum = this.noteToNumber(note);
            return this.numberToNote((noteNum + semitones) % 12);
        });
    }

    // Calculateur d'intervalles
    calculateInterval(note1, note2) {
        const num1 = this.noteToNumber(note1);
        const num2 = this.noteToNumber(note2);
        const interval = (num2 - num1 + 12) % 12;
        
        return Object.keys(this.intervals).find(key => 
            this.intervals[key] === interval
        );
    }

    // Analyseur d'accords
    analyzeChord(notes) {
        if (notes.length < 3) return null;
        
        const root = notes[0];
        const intervals = notes.slice(1).map(note => 
            (this.noteToNumber(note) - this.noteToNumber(root) + 12) % 12
        ).sort((a, b) => a - b);
        
        for (const [chordType, chordIntervals] of Object.entries(this.chords)) {
            if (this.arraysEqual(intervals, chordIntervals.slice(1))) {
                return { root, type: chordType };
            }
        }
        
        return { root, type: 'unknown' };
    }

    // Générateur de quiz
    generateQuiz() {
        const quizTypes = [
            'interval_identification',
            'chord_identification', 
            'scale_identification',
            'key_signature',
            'chord_progression'
        ];
        
        const type = quizTypes[Math.floor(Math.random() * quizTypes.length)];
        
        switch (type) {
            case 'interval_identification':
                return this.generateIntervalQuiz();
            case 'chord_identification':
                return this.generateChordQuiz();
            case 'scale_identification':
                return this.generateScaleQuiz();
            case 'key_signature':
                return this.generateKeySignatureQuiz();
            case 'chord_progression':
                return this.generateProgressionQuiz();
        }
    }

    generateIntervalQuiz() {
        const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const note1 = notes[Math.floor(Math.random() * notes.length)];
        const intervalNames = Object.keys(this.intervals);
        const correctInterval = intervalNames[Math.floor(Math.random() * intervalNames.length)];
        const semitones = this.intervals[correctInterval];
        const note2 = this.numberToNote((this.noteToNumber(note1) + semitones) % 12);
        
        const options = this.shuffleArray([
            correctInterval,
            ...intervalNames.filter(i => i !== correctInterval).slice(0, 3)
        ]);
        
        return {
            type: 'interval_identification',
            question: `Quel est l'intervalle entre ${note1} et ${note2}?`,
            options,
            correct: correctInterval,
            notes: [note1, note2]
        };
    }

    generateChordQuiz() {
        const roots = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const root = roots[Math.floor(Math.random() * roots.length)];
        const chordTypes = Object.keys(this.chords);
        const correctType = chordTypes[Math.floor(Math.random() * chordTypes.length)];
        const chordNotes = this.generateChord(root, correctType);
        
        const options = this.shuffleArray([
            correctType,
            ...chordTypes.filter(t => t !== correctType).slice(0, 3)
        ]);
        
        return {
            type: 'chord_identification',
            question: `Quel type d'accord est formé par les notes: ${chordNotes.join(' - ')}?`,
            options,
            correct: correctType,
            notes: chordNotes
        };
    }

    // Utilitaires
    noteToNumber(note) {
        const noteMap = { 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11 };
        return noteMap[note] || 0;
    }

    numberToNote(num) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        return notes[num % 12];
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    arraysEqual(a, b) {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }
}

window.MusicTheoryEngine = MusicTheoryEngine;