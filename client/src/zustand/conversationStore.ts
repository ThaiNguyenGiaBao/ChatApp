import { create } from "zustand";
import { persist } from "zustand/middleware";

type Conversation = {
  id: string;
  username: string;
  profilePic: string;
};

export type Message = {
  text: string;
  senderId: string;
  sender: {
    profilePic: string;
  };
};

type ConversationStore = {
  conversation: Conversation | null;
  setConversation: (conversation: Conversation | null) => void;
  messageList: Message[] | [];
  setMessageList: (messageList: Message[] | []) => void;
};

const useConversationStore = create<ConversationStore>()(
  persist(
    (set) => ({
      conversation: null,
      setConversation: (conversation: Conversation | null) =>
        set({ conversation }),
      messageList: [],
      setMessageList: (messageList: Message[]) => set({ messageList }),
    }),
    {
      name: "conversation-storage",
    }
  )
);

export default useConversationStore;
