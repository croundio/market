import * as React from "react";
import { Routing } from "./routing/Routing";
import { Snackbar } from "./components/snackbar/Snackbar";
import { ProfileContextProvider } from "./components/profile/ProfileContext";

export const App = () => {
  return (
    <Snackbar>
      <ProfileContextProvider>
        <Routing />
      </ProfileContextProvider>
    </Snackbar>
  );
};
