import { create } from "zustand";
import { persist } from "zustand/middleware";

type Conversation = {
  id: string;
  username: string;
  profilePic: string;
};

type ConversationStore = {
  conversation: Conversation | null;
  setConversation: (conversation: Conversation) => void;
};

const useConversationStore = create<ConversationStore>()(
  persist(
    (set) => ({
      conversation: null,
      setConversation: (conversation: Conversation) => set({ conversation }),
    }),
    {
      name: "conversation-storage",
    }
  )
);

export default useConversationStore;
