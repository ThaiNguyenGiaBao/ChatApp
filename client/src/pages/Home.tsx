import SideBar from "../components/SideBar";
import MessageContainer from "../components/MessageContainer";
import { TiMessages } from "react-icons/ti";

import { useState } from "react";
const Home = () => {
  const [hasConversation, setHasConversation] = useState(true);
  return (
    <div className="flex p-4 min-h-96 gap-4 max-w-3xl w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
      <SideBar />
      {hasConversation ? (
        <MessageContainer />
      ) : (
        <div className="w-full  flex flex-col items-center justify-center text-white">
          <div className="font-bold text-2xl">
            Select a chat to start messaging
          </div>
          <TiMessages className="text-6xl" />
        </div>
      )}
    </div>
  );
};

export default Home;
