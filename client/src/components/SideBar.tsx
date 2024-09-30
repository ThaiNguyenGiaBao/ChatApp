import React from "react";
import Search from "./Search";
import ConversationList from "./ConversationList";

import { useUserStore } from "../zustand/userStore";
import useConversationStore from "../zustand/conversationStore";
const Sidebar = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setConversation = useConversationStore(
    (state) => state.setConversation
  );
  const handleLogout = () => {
    setUser(null);
    setConversation(null);
  };
  return (
    <div className="flex flex-col border-r-2 pr-2 border-gray-500">
      <Search />
      <div className="divider px-3 "></div>
      <ConversationList />
      <div className="mt-auto hover:cursor-pointer" onClick={handleLogout}>
        Log out
      </div>
    </div>
  );
};

export default Sidebar;
