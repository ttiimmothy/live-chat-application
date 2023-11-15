import { useEffect, useState } from "react";
import { Message } from "../interfaces/Message";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const RoomPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (id) {
      onSnapshot(doc(db, "rooms", id), (doc) => {
        if (doc.data()) {
          setRoomName(doc.data()?.name);
        }
      });

      const unsubscribe = onSnapshot(
        query(
          collection(db, "rooms", id, "messages"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              messageText: doc.data().messageText,
              senderID: doc.data().senderID,
              senderName: doc.data().senderName,
              timestamp: doc.data().timestamp,
            }))
          );
          setIsLoading(false);
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [id]);

  const handleSendMessage = async () => {
    if (message.trim() !== "" && id) {
      try {
        const roomRef = doc(db, "rooms", id); // Reference to the specific room
        const messagesCollectionRef = collection(roomRef, "messages"); // Reference to the messages sub-collection
        await addDoc(messagesCollectionRef, {
          messageText: message,
          timestamp: serverTimestamp(),
          senderID: user?.uid,
          senderName: user?.displayName,
        });
      } catch (e) {
        console.error("Error adding message:", e);
      }
    }
    setMessage("");
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 px-8">
      {isLoading || (!isLoading && roomName) ? (
        <h2 className="text-2xl mb-6">{roomName}</h2>
      ) : (
        <h2 className="text-2xl mb-6">unknown room</h2>
      )}
      <div className="flex flex-col gap-2 my-4 h-[70vh] overflow-auto">
        {messages.map((message, index) => (
          <div key={`message ${index}`}>
            {message.senderID === user?.uid ? (
              <div className="w-full flex justify-end gap-1">
                <div className="w-[fit-content] h-8 rounded-lg bg-blue-500 text-white flex justify-center items-center font-bold px-2">
                  {message.senderName}
                </div>
                <p className="bg-blue-500 text-white py-1 px-4 rounded-md max-w-xs whitespace-nowrap flex items-center gap-1">
                  {message.messageText} -{" "}
                  <span className="text-blue-200 text-xs">
                    {message.timestamp &&
                      message.timestamp.toDate().toUTCString().slice(5, -4)}
                  </span>
                </p>
              </div>
            ) : (
              <div className="w-full flex gap-2 items-start">
                <div className="w-[fit-content] h-8 rounded-lg bg-gray-200 flex justify-center items-center font-bold px-2">
                  {message.senderName}
                </div>
                <div className="bg-gray-200 py-1 px-4 rounded-md max-w-xs whitespace-nowrap flex items-center gap-1">
                  {message.messageText} -{" "}
                  <span className="text-gray-500 text-xs">
                    {message.timestamp &&
                      message.timestamp.toDate().toUTCString().slice(5, -4)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        {user && roomName ? (
          <input
            className="w-full border-2 border-blue-500 py-1 px-2 rounded-md"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Type your message"
            autoFocus
          />
        ) : user ? (
          <input
            className="w-full border-2 border-blue-500 py-1 px-2 rounded-md"
            type="text"
            value={message}
            disabled
            placeholder="This is not an existing room"
          />
        ) : (
          <input
            className="w-full border-2 border-blue-500 py-1 px-2 rounded-md"
            type="text"
            value={message}
            disabled
            placeholder="Login to chat"
          />
        )}
        <button
          onClick={handleSendMessage}
          className="bg-slate-500 text-white py-1 px-4 rounded-md disabled:bg-slate-400"
          disabled={!user || !roomName}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default RoomPage;
