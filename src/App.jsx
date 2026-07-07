import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/app-router";
import { SessionChecker } from "@/common/layouts/checker/session-checker";
import { Toaster } from "react-stacked-toast";

export default function App() {
  return (
    <SessionChecker>
      <Toaster />
      <RouterProvider router={router} />
    </SessionChecker>
  );
}
