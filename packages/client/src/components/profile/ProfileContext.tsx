import { createContext } from "react";

type ProfileContextProps = {
  logged: boolean;
  profile?: string;
};
export const ProfileContext = createContext<ProfileContextProps>(null as any);
