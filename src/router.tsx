import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import App from "./App";
import RoomPage from "./pages/RoomPage";
import { HomePage } from "./pages/HomePage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        { path: "room/:id", element: <RoomPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
