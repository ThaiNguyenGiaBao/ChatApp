import React from "react";

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
  return (
    <div className="overflow-y-auto h-[400px]">
      <Message
        avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        message="Hi"
        start={false}
      />
      <Message
        avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        message="Hi friend  Hãy cho chúng tôi biết câu hỏi của Thái Nguyễn Gia Bảo ạ!"
        start={true}
      />
   
    </div>
  );
};

export default MessageList;
