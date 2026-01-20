import { create } from 'zustand';

interface ChatState {
  selectedModel: string;
  isSidebarOpen: boolean;
  
  setSelectedModel: (modelId: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  selectedModel: '', // Default initialized empty, will be set on mount
  isSidebarOpen: true,

  setSelectedModel: (modelId) => set({ selectedModel: modelId }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
