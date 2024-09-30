import { ProfileItem } from "./ConversationList";
import MessageList from "./MessageList";
import { LuSend } from "react-icons/lu";
import useConversationStore from "../zustand/conversationStore";
import { useState } from "react";
import axios from "axios";
import { useUserStore } from "../zustand/userStore";

const MessageContainer = () => {
  const [message, setMessage] = useState("");
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const conversation = useConversationStore((state) => state.conversation);
  const setMessageList = useConversationStore((state) => state.setMessageList);
  const currentMessageList = useConversationStore((state) => state.messageList);
  const receiveUser = {
    id: conversation?.id || "",
    username: conversation?.username || "",
    email: "",
    profilePic: conversation?.profilePic || "",
  };

  const user = useUserStore((state) => state.user);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  }

  const handleSendMessage = () => {
    console.log(message);
    setMessage("");
    setMessageList([
      ...currentMessageList,
      {
        text: message,
        senderId: user?.id || "",
        sender: { profilePic: user?.profilePic || "" },
      },
    ]);

    axios
      .post(
        "http://localhost:8000/message/send/" + receiveUser?.id,
        {
          message,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="w-full ">
      <div className="border-b-2 border-gray-600 ">
        <ProfileItem user={receiveUser} isHover={false} />
      </div>

      <MessageList />

      <div className="w-full p-1 pl-3 rounded-full flex items-center  text-white bg-gray-500">
        <input
          type="text"
          className="bg-inherit outline-none w-full"
          placeholder="Type a message"
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyPress}
        />
        <LuSend
          className="text-3xl hover:bg-gray-400 hover:cursor-pointer p-1 rounded-full"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MessageContainer;
