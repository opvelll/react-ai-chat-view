import { StateCreator } from "zustand";
import { ChatStoreState } from "./useChatStore";
import { AudioSource } from "../ChatView/useChat";

export type AudioSlice = {
  voiceAudioData: AudioSource | null;
  isRunAudio: boolean;
  toggleAudio: () => void;
  audio: HTMLAudioElement;
  play: (data: AudioSource) => void;
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
    if (typeof data === "string") {
      audio.src = data;
    } else {
      audio.src = URL.createObjectURL(data);
    }
    audio.oncanplaythrough = () => {
      audio.play().catch((error) => {
        throw new Error(error);
      });
    };
    audio.load();
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
