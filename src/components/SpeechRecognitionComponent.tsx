import React from 'react';
import useSpeechRecognition from '../hooks/useSpeechRecognition.ts';

const SpeechRecognitionComponent: React.FC = () => {
    const { transcript, isListening, startListening, stopListening, error } = useSpeechRecognition();

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Розпізнавання мовлення</h2>
            {error && <p className="text-red-500">{error}</p>}
            <p className="mb-2">Розпізнаний текст: <span className="font-mono">{transcript}</span></p>
            <button
                onClick={isListening ? stopListening : startListening}
                className={`px-4 py-2 rounded ${isListening ? 'bg-red-500' : 'bg-green-500'} text-white`}
            >
                {isListening ? 'Зупинити' : 'Почати'}
            </button>
        </div>
    );
};

export default SpeechRecognitionComponent;
