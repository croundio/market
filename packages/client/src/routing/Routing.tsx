import { RouterProvider } from "react-router-dom";
import React from "react";
import { router } from "./router";

export const Routing = () => {
  return <RouterProvider router={router} />;
};
