import { Timestamp } from "firebase/firestore";

export interface Message {
  messageText: string;
  senderID: string;
  senderName: string;
  timestamp: Timestamp;
}
