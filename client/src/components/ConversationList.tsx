import React from "react";

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
  width = 12,
  isHover = true,
}: ProfileItemProps) => {
  return (
    <div
      className={
        isHover
          ? "hover:bg-gray-400 flex items-center p-2 space-x-2 cursor-pointer px-4  rounded-lg"
          : "flex items-center p-2 space-x-2 cursor-pointer px-0  rounded-lg "
      }
    >
      <div className={`avatar online w-${width}`}>
        <img src={user.profilePic} alt="profile" className="rounded-full" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{user.username}</h3>
        <p className="text-sm text-gray-200 ">{user.email}</p>
      </div>
    </div>
  );
};

const ConversationList = () => {
  const user = {
    id: "clzw7f6rz0000afskg0tdsdgc",
    username: "phuc",
    email: "phuc@123",
    profilePic: "https://avatar.iran.liara.run/public/boy?username=phuc",
  };

  return (
    <div>
      <ProfileItem user={user} />
      <ProfileItem user={user} />
      <ProfileItem user={user} />
      <ProfileItem user={user} />
    </div>
  );
};

export default ConversationList;
export { ProfileItem };
