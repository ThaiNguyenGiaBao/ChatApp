import { ProfileItem } from "./ConversationList";
import MessageList from "./MessageList";
import { LuSend } from "react-icons/lu";



const MessageContainer = () => {
  const user = {
    id: "clzw7f6rz0000afskg0tdsdgc",
    username: "phuc",
    email: "phuc@123",
    profilePic: "https://avatar.iran.liara.run/public/boy?username=phuc",
  };

  return (
    <div className="w-full ">
      <div className="border-b-2 border-gray-600 ">
        <ProfileItem user={user} width={10} isHover={false} />
      </div>
      
      <MessageList />

      <div className="w-full p-1 pl-3 rounded-full flex items-center  text-white bg-gray-500">
        <input
          type="text"
          className="bg-inherit outline-none w-full"
          placeholder="Type a message"
        />
        <LuSend className="text-3xl hover:bg-gray-400 hover:cursor-pointer p-1 rounded-full" />
      </div>
    </div>
  );
};

export default MessageContainer;
