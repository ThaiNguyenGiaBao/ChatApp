import SideBar from "../components/SideBar";
import MessageContainer from "../components/MessageContainer";
import { TiMessages } from "react-icons/ti";
import useConversationStore from "../zustand/conversationStore";

const Home = () => {
  const conversation = useConversationStore((state) => state.conversation);


  return (
    <div className="flex p-4 min-h-96 gap-4 max-w-3xl w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
      <SideBar />
      {conversation ? (
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
