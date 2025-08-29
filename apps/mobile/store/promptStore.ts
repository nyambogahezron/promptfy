import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Prompt {
  id: string;
  content: string;
  createdAt: string;
  category: string;
  saved: boolean;
}

interface PromptState {
  prompts: Prompt[];
  addPrompt: (prompt: Prompt) => void;
  removePrompt: (id: string) => void;
  toggleSavePrompt: (id: string) => void;
  clearAllPrompts: () => void;
}

export const usePromptStore = create<PromptState>()(
  persist(
    (set) => ({
      prompts: [],
      addPrompt: (prompt) => {
        set((state) => ({
          prompts: [prompt, ...state.prompts],
        }));
      },
      removePrompt: (id) => {
        set((state) => ({
          prompts: state.prompts.filter((prompt) => prompt.id !== id),
        }));
      },
      toggleSavePrompt: (id) => {
        set((state) => ({
          prompts: state.prompts.map((prompt) =>
            prompt.id === id ? { ...prompt, saved: !prompt.saved } : prompt
          ),
        }));
      },
      clearAllPrompts: () => {
        set({ prompts: [] });
      },
    }),
    {
      name: 'prompt-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);