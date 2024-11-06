import { useState, useEffect } from 'react';

interface UseSpeechRecognition {
    transcript: string;
    isListening: boolean;
    startListening: () => void;
    stopListening: () => void;
    error: string | null;
}

const useSpeechRecognition = (): UseSpeechRecognition => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError("Ваш браузер не підтримує розпізнавання мовлення.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'uk-UA';

        const handleStart = () => {
            setIsListening(true);
            setError(null);
        };

        const handleEnd = () => {
            setIsListening(false);
        };

        const handleResult = (event: SpeechRecognitionEvent) => {
            const transcriptArray = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            setTranscript(prev => prev + transcriptArray);
        };

        const handleError = (event: SpeechRecognitionErrorEvent) => {
            setError(`Помилка: ${event.error}`);
            setIsListening(false);
        };

        recognition.addEventListener('start', handleStart);
        recognition.addEventListener('end', handleEnd);
        recognition.addEventListener('result', handleResult);
        recognition.addEventListener('error', handleError);

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => {
            recognition.removeEventListener('start', handleStart);
            recognition.removeEventListener('end', handleEnd);
            recognition.removeEventListener('result', handleResult);
            recognition.removeEventListener('error', handleError);
            recognition.stop();
        };
    }, [isListening]);

    return {
        transcript,
        isListening,
        startListening: () => setIsListening(true),
        stopListening: () => setIsListening(false),
        error,
    };
};

export default useSpeechRecognition;
