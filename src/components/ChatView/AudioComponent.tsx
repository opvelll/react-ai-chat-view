// AudioComponent.js
import { useEffect } from 'react';
import useContextChatStore from '../Store/useContextStore';

const AudioComponent = () => {
    const store = useContextChatStore();
    const { voiceAudioData, isRunAudio, audio, play, stop } = store((state) => state);

    useEffect(() => {
        if (voiceAudioData && isRunAudio) {
            play(voiceAudioData);
        } else {
            stop();
        }
    }, [voiceAudioData, isRunAudio, audio, play, stop]);

    return null;
};

export default AudioComponent;
