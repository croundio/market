import * as React from "react";
import { Routing } from "./routing/Routing";
import { Snackbar } from "./components/snackbar/Snackbar";

export const App = () => {
  return (
    <Snackbar>
      <Routing />
    </Snackbar>
  );
};
