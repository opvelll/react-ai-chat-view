import { StateCreator } from "zustand";
import { ChatStoreState } from "./useChatStore";

export type AudioSlice = {
  voiceAudioData: Blob | null;
  isRunAudio: boolean;
  toggleAudio: () => void;
  audio: HTMLAudioElement;
  play: (data: Blob) => void;
  stop: () => void;
};

const createAudioSlice: StateCreator<
  ChatStoreState,
  [["zustand/persist", unknown]],
  [],
  AudioSlice
> = (set, get) => ({
  voiceAudioData: null,
  isRunAudio: false,
  toggleAudio: () => set((state) => ({ isRunAudio: !state.isRunAudio })),
  audio: new Audio(),
  play: (data) => {
    const audio = get().audio;
    audio.src = URL.createObjectURL(data);
    audio.play();
    set({ voiceAudioData: data, isRunAudio: true });
  },
  stop: () => {
    const audio = get().audio;
    if (!audio.src) return;
    audio.pause();
    set({ isRunAudio: false });
  },
});

export default createAudioSlice;
