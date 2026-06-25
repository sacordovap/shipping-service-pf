import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/app-router";
import { SessionChecker } from "@/common/layouts/checker/session-checker";

export default function App() {
  return (
    <SessionChecker>
      <RouterProvider router={router} />
    </SessionChecker>
  );
}
