
import { useEffect, useRef, useState } from "react";
import useChatStore from "./useChatStore";

export function useAudio() {
  const [voiceAudioData, setVoiceAudioData] = useState<Blob>();
  const isRunAudio = useChatStore((state) => state.isRunAudio);
  // Audioを使いまわすためにrefで保持
  const audio = useRef(new Audio());

  // audiodataを入れたら音声を再生する
  useEffect(() => {
    if (voiceAudioData == null || !isRunAudio) return;
    playAudioData(voiceAudioData)
  }, [voiceAudioData, isRunAudio]);

  function playAudioData(data: Blob) {
    audio.current.src = URL.createObjectURL(data);
    audio.current?.play();
  }

  // audioボタンを押してoffにしたとき音声を止める
  useEffect(() => {
    if (!isRunAudio) audio.current?.pause();
  }, [isRunAudio]);

  return {
    setVoiceAudioData,
    isRunAudio
  };
}
