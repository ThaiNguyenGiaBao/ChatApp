import useConversationStore from "../zustand/conversationStore";
import axios from "axios";
import { Message } from "../zustand/conversationStore";

type ProfileItemProps = {
  user: {
    id: string;
    username: string;
    email: string;
    profilePic: string;
  };
  isHover?: boolean;
  isOnline?: boolean;
};

const ProfileItem = ({
  user,
  isHover = true,
  isOnline = false,
}: ProfileItemProps) => {
  const conversation = useConversationStore((state) => state.conversation);
  const setConversation = useConversationStore(
    (state) => state.setConversation
  );
  const setMessageList = useConversationStore((state) => state.setMessageList);
  const handleChangeConversation = async () => {
    setConversation({
      id: user.id,
      username: user.username,
      profilePic: user.profilePic,
    });
    await axios
      .get(`http://localhost:8000/message/${user.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        //console.log(res.data);
        if (res.data.messages) {
          // select fields (text: string;senderId: string;sender: {profilePic: string;};) from res.data.messages
          const messages: Message[] = res.data.messages.map((message: any) => {
            return {
              text: message.text,
              senderId: message.senderId,
              sender: {
                profilePic: message.sender.profilePic,
              },
            };
          });

          setMessageList(messages);
        } else {
          setMessageList([]);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <div
      className={`flex items-center p-2 space-x-2 cursor-pointer  rounded-lg
      ${isHover ? "hover:bg-gray-500" : ""}
      ${conversation?.id === user.id && isHover ? "bg-gray-600" : ""}`}
      onClick={handleChangeConversation}
      key={user.id}
    >
      <div className={`avatar w-14 ${isOnline ? "online" : ""}`}>
        <img src={user.profilePic} alt="profile" className="rounded-full" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{user.username}</h3>
        <p className="text-sm text-gray-200 ">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileItem;
