import { useEffect, useRef } from "react";
import useConversationStore from "../zustand/conversationStore";
import { useUserStore } from "../zustand/userStore";
import { getSocket } from "../socket";
import notiSound from "../../public/noti.mp3";
type MessageProps = {
  avatar: string;
  message: string;
  start: boolean;
};

const Message = ({ avatar, message, start = true }: MessageProps) => {
  return (
    <div className={start ? `chat chat-start` : `chat chat-end`}>
      <div className="chat-image avatar ">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={avatar} />
        </div>
      </div>
      <div
        className={
          start
            ? `chat-bubble text-white bg-gray-500 font-semibold max-w-64 md:max-w-80`
            : `chat-bubble text-white bg-blue-600 font-semibold max-w-64 md:max-w-80`
        }
      >
        {message}
      </div>
    </div>
  );
};

const MessageList = () => {
  const messageList = useConversationStore((state) => state.messageList);
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const user = useUserStore((state) => state.user);
  //console.log(messageList);
  useEffect(() => {
    const socket = getSocket();
    socket.on("new-message", (message) => {
      console.log(message);
      useConversationStore.setState((state) => {
        return {
          ...state,
          messageList: [...state.messageList, message],
        };
      });
      const audio = new Audio(notiSound);
      audio.play();
    });
    return () => {
      socket.off("new-message");
    };
  }, []);
  useEffect(() => {
    // Scroll to the bottom of the message list whenever messageList changes
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageList]); // This effect runs whenever messageList changes
  return (
    <div ref={messageListRef} className="overflow-y-auto h-[400px]">
      {messageList.map((message, index) => {
        return (
          <Message
            key={index}
            avatar={message.sender.profilePic}
            message={message.text}
            start={message.senderId !== user?.id}
          />
        );
      })}
    </div>
  );
};

export default MessageList;
