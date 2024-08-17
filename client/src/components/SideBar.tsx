import React from "react";
import Search from "./Search";
import ConversationList from "./ConversationList";
const Sidebar = () => {
  return (
    <div className="flex flex-col border-r-2 pr-2 border-gray-500">
      <Search />
      <div className="divider px-3 "></div>
      <ConversationList />
    </div>
  );
};

export default Sidebar;
