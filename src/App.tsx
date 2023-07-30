import React, { useEffect } from "react";
import classes from "App.module.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Configuration from "./pages/Configuration";
import * as msTeams from "@microsoft/teams-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/configure", element: <Configuration /> },
]);

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    msTeams.app.initialize();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
