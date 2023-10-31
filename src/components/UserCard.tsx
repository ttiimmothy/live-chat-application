import { Timestamp } from "firebase/firestore";

interface UserCardProps {
  name: string;
  email: string;
  createdAt: Timestamp;
}

const UserCard: React.FC<{ user: UserCardProps }> = ({ user }) => {
  return (
    <div className="rounded-lg shadow-lg p-4 h-[fit-content]">
      <p className="text-lg">{user.name}</p>
      <p>{user.email}</p>
      {user.createdAt && (
        <p className="text-gray-500">
          {user.createdAt.toDate().toUTCString().slice(5, -4)}
        </p>
      )}
    </div>
  );
};

export default UserCard;
