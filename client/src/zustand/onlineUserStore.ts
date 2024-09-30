import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnlineUserStore = {
  onlineUsers: string[];
  setOnlineUsers: (onlineUserStore: string[]) => void;
};

const useOnlineUserStore = create<OnlineUserStore>()(
  persist(
    (set) => ({
      onlineUsers: [],
      setOnlineUsers: (onlineUsers: string[]) => set({ onlineUsers }),
    }),
    {
      name: "online-user-storage",
    }
  )
);

export default useOnlineUserStore;
