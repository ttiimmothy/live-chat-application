import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import App from "./App";
import { RoomPage } from "./pages/RoomPage";
import { ChatPage } from "./pages/ChatPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <RoomPage />,
        },
        { path: "chat/:id", element: <ChatPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
