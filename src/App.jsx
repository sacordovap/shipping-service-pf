import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/app-router";

import "./common/styles/global.css";

export default function App() {
  return <RouterProvider router={router} />;
}
