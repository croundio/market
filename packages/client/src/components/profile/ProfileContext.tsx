import { createContext, useContext, useState } from "react";
import { useDataProvider } from "../../provider/dataProvider";
import { User } from "@market/server-api";
import { lsProvider } from "../../provider/localStorageProvider";

type ProfileContextProps = {
  setToken: (token: string) => void;
  profile: User | null;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};
const ProfileContext = createContext<ProfileContextProps>(null as any);

type ProfileContextProviderProps = {
  children: JSX.Element;
};

export const useProfile = () => useContext(ProfileContext);

export const ProfileContextProvider = ({
  children,
}: ProfileContextProviderProps) => {
  const { getProfile } = useDataProvider();
  const [profile, setProfile] = useState<User | null>(
    lsProvider.get("profile")
  );

  const setToken = (token: string) => {
    lsProvider.set("token", token);
  };

  const logout = () => {
    lsProvider.remove("profile");
    lsProvider.remove("token");
    setProfile(null);
  };

  const refreshProfile = async () => {
    const refreshedProfile = await getProfile();
    setProfile(refreshedProfile);
    lsProvider.set("profile", refreshedProfile);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setToken,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
