import { useEffect, useState } from "react";
import axios from "axios";
import ProfileItem from "./ProfileItem";
import io from "socket.io-client";
import { useUserStore } from "../zustand/userStore";
import onlineUserStore from "../zustand/onlineUserStore";
import { initailizeSocket } from "../socket";
type Conversation = {
  id: string;
  username: string;
  profilePic: string;
  email: string;
};

const ConversationList = () => {
  const [conservationList, setConservationList] = useState<Conversation[]>([]);
  const user = useUserStore((state) => state.user);
  const onlineUsers = onlineUserStore((state) => state.onlineUsers);
  const setOnlineUsers = onlineUserStore((state) => state.setOnlineUsers);
  useEffect(() => {
    // Fetch conversations from the API
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/message/conversations",
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setConservationList(res.data);
      } catch (err: any) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    fetchConversations();

    const socket = initailizeSocket(user?.username, user?.id);
    socket.on("user-online", (users: string[]) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <div>
      {conservationList.map((conversation) => {
        console.log(onlineUsers);

        const id = conversation?.id;
        const isOnline = onlineUsers.includes(id);

        return <ProfileItem user={conversation} isOnline={isOnline} />;
      })}
    </div>
  );
};

export default ConversationList;
export { ProfileItem };
