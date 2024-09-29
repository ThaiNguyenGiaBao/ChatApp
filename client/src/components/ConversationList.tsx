import useConversationStore from "../zustand/conversationStore";
import { useEffect, useState } from "react";
import axios from "axios";
type ProfileItemProps = {
  user: {
    id: string;
    username: string;
    email: string;
    profilePic: string;
  };
  width?: number;
  isHover?: boolean;
};

const ProfileItem = ({
  user,
  //width = 14,
  isHover = true,
}: ProfileItemProps) => {
  const conversation = useConversationStore((state) => state.conversation);
  const setConversation = useConversationStore(
    (state) => state.setConversation
  );

  const handleChangeConversation = () => {
    setConversation({
      id: user.id,
      username: user.username,
      profilePic: user.profilePic,
    });
  };

  console.log("conservation", conversation);
  return (
    <div
      className={`flex items-center p-2 space-x-2 cursor-pointer px-0 rounded-lg
      ${isHover ? "hover:bg-gray-600" : ""}
      ${conversation?.id === user.id ? "bg-gray-600" : ""}`}
      onClick={handleChangeConversation}
    >
      <div className={`avatar online w-14`}>
        <img src={user.profilePic} alt="profile" className="rounded-full" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{user.username}</h3>
        <p className="text-sm text-gray-200 ">{user.email}</p>
      </div>
    </div>
  );
};

type Conversation = {
  id: string;
  username: string;
  profilePic: string;
  email: string;
};

const ConversationList = () => {
  const [conservationList, setConservationList] = useState<Conversation[]>([]);
  // const user = {
  //   id: "clzw7f6rz0000afskg0tdsdg2",
  //   username: "phuc2",
  //   email: "phuc2@123",
  //   profilePic: "https://avatar.iran.liara.run/public/boy?username=phuc",
  // };

  // const user2 = {
  //   id: "clzw7f6rz0000afskg0tdsdg1",
  //   username: "phuc1",
  //   email: "phuc1@123",
  //   profilePic: "https://avatar.iran.liara.run/public/boy?username=phuc",
  // };

  const renderConversationList = () => {
    return conservationList.map((user) => {
      console.log(user);
      return <ProfileItem user={user} />;
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/message/conversations")
      .then((res) => {
        console.log(res.data);
        setConservationList(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  });

  return <div>{renderConversationList()}</div>;
};

export default ConversationList;
export { ProfileItem };
