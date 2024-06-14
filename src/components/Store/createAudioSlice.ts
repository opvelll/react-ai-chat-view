import { StateCreator } from "zustand";
import { ChatStoreState } from "./useChatStore";

export type AudioSlice = {
  voiceAudioData: Blob | null;
  isRunAudio: boolean;
  audio: HTMLAudioElement;
  play: (data: Blob) => void;
  stop: () => void;
};

const createAudioSlice: StateCreator<
  ChatStoreState,
  [["zustand/persist", unknown]],
  [],
  AudioSlice
> = (set) => ({
  voiceAudioData: null,
  isRunAudio: false,
  audio: new Audio(),
  play: (data) =>
    set((state) => {
      state.audio.src = URL.createObjectURL(data);
      state.audio.play();
      return { voiceAudioData: data, isRunAudio: true };
    }),
  stop: () =>
    set((state) => {
      state.audio.pause();
      return { isRunAudio: false };
    }),
});

export default createAudioSlice;
