import { create } from "zustand"

export const useSessionStore = create((set) => ({
  messages: [],

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  clear: () => set({ messages: [] }),
}))