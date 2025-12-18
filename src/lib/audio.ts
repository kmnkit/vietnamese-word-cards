/**
 * Audio file utilities and path management
 */

/**
 * Base path for audio assets
 */
export const AUDIO_BASE_PATH = '/audio';

/**
 * Audio file paths configuration
 */
export const AUDIO_PATHS = {
  alphabet: `${AUDIO_BASE_PATH}/alphabet`,
  words: `${AUDIO_BASE_PATH}/words`,
  tones: `${AUDIO_BASE_PATH}/tones`,
} as const;

/**
 * Get audio file path for alphabet letter
 * @param letter - Vietnamese alphabet letter
 * @returns Audio file path
 */
export const getAlphabetAudioPath = (letter: string): string => {
  const normalizedLetter = letter.toLowerCase().replace(/[^a-z]/g, '');
  return `${AUDIO_PATHS.alphabet}/${normalizedLetter}.mp3`;
};

/**
 * Get audio file path for word
 * @param wordId - Unique word identifier
 * @param category - Word category (greetings, numbers, etc.)
 * @returns Audio file path
 */
export const getWordAudioPath = (wordId: string, category: string): string => {
  return `${AUDIO_PATHS.words}/${category}/${wordId}.mp3`;
};

/**
 * Get audio file path for tone example
 * @param toneId - Tone identifier (1-6)
 * @returns Audio file path
 */
export const getToneAudioPath = (toneId: number): string => {
  return `${AUDIO_PATHS.tones}/tone_${toneId}.mp3`;
};

/**
 * Audio quality requirements for native speaker recording
 */
export const AUDIO_RECORDING_SPECS = {
  format: 'MP3',
  bitRate: '128 kbps',
  sampleRate: '44.1 kHz',
  maxFileSize: '50 KB',
  maxDuration: '3 seconds',
  volumeLevel: '-12 dB (normalized)',
  noiseFloor: '-50 dB',
} as const;

/**
 * Audio content creation checklist
 */
export const AUDIO_CREATION_CHECKLIST = {
  nativeSpeaker: {
    requirements: [
      'Native Vietnamese speaker',
      'Clear pronunciation',
      'Professional recording environment',
      'Consistent pacing and tone'
    ],
    recordingSetup: [
      'Professional microphone (cardioid pattern recommended)',
      'Quiet recording environment',
      'Audio interface or good quality USB microphone',
      'Recording software (Audacity, Reaper, etc.)'
    ]
  },
  postProcessing: {
    steps: [
      'Noise reduction',
      'Volume normalization to -12 dB',
      'Compression to maintain consistent levels',
      'Trim silence at beginning and end',
      'Export as MP3 128 kbps'
    ],
    qualityCheck: [
      'No background noise or artifacts',
      'Clear and intelligible pronunciation',
      'Consistent volume across all files',
      'File size under 50 KB'
    ]
  }
} as const;

/**
 * Priority order for audio content creation (following task decomposition plan)
 */
export const AUDIO_CREATION_PRIORITY = {
  week1: {
    critical: ['alphabet'],
    description: '29 Vietnamese alphabet letters',
    files: 29,
    estimatedHours: 8
  },
  week2: {
    high: ['greetings', 'numbers'],
    description: 'Basic conversation words',
    files: 60,
    estimatedHours: 12
  },
  week3_4: {
    medium: ['daily', 'food', 'business'],
    description: 'Specialized vocabulary',
    files: 140,
    estimatedHours: 20
  },
  week5: {
    low: ['tones'],
    description: 'Vietnamese tone examples',
    files: 6,
    estimatedHours: 4
  }
} as const;