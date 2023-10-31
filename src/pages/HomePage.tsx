import { useEffect, useState } from "react";
import Modal from "../components/layout/Modal";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import UserCard from "../components/UserCard";

const CreateRoom: React.FC<{
  openCreateRoom: boolean;
  setOpenCreateRoom: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openCreateRoom, setOpenCreateRoom }) => {
  const [newRoomName, setNewRoomName] = useState<string>("");

  const createNewRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "rooms"), {
        name: newRoomName,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error creating room: ", error);
      alert("Cannot create a new room");
    }
    setNewRoomName("");
    setOpenCreateRoom(false);
  };

  return (
    <Modal
      isOpen={openCreateRoom}
      setIsOpen={setOpenCreateRoom}
      title="Create room"
    >
      <form onSubmit={createNewRoom}>
        <input
          className="border-2 border-gray-300 p-2 rounded-md min-w-[320px] my-4"
          type="text"
          placeholder="Please enter room name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          required
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 px-4 rounded-md"
          >
            Create Room
          </button>
        </div>
      </form>
    </Modal>
  );
};

export const HomePage: React.FC = () => {
  const [openCreateRoom, setOpenCreateRoom] = useState(false);

  const [rooms, setRooms] = useState<
    { id: string; name: string; createdAt: Timestamp }[]
  >([]);

  const [loginUsers, setLoginUsers] = useState<
    {
      id: string;
      name: string;
      email: string;
      createdAt: Timestamp;
    }[]
  >([]);

  const [users] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "rooms"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            createdAt: doc.data().createdAt,
          }))
        );
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      setLoginUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          createdAt: doc.data().createdAt,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-5xl mx-auto flex gap-4 mt-6 md:flex-row flex-col px-8">
      <CreateRoom
        openCreateRoom={openCreateRoom}
        setOpenCreateRoom={setOpenCreateRoom}
      />
      <div className="flex flex-col gap-4 grow">
        <div className="flex justify-between items-center min-h-[50px]">
          <h2 className="text-xl font-semibold">{`Available Rooms (${rooms.length})`}</h2>
          {users && (
            <button
              className="border-2 border-blue-500 py-2 px-4 rounded-md"
              onClick={() => setOpenCreateRoom(true)}
            >
              Create Room
            </button>
          )}
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {rooms.map((room) => (
            <Link
              to={`/room/${room.id}`}
              type="button"
              key={room.id}
              className="w-full border-2 py-2 px-4 rounded-md text-center"
            >
              <div className="font-bold">{room.name}</div>
              {room.createdAt && (
                <div>{room.createdAt.toDate().toUTCString().slice(5, -4)}</div>
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {loginUsers.map((user) => (
          <UserCard
            user={{
              name: user.name,
              email: user.email,
              createdAt: user.createdAt,
            }}
            key={user.id}
          />
        ))}
      </div>
    </div>
  );
};
