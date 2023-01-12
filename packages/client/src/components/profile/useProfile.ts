import { lsProvider } from "../../provider/localStorageProvider";
import { useState } from "react";
import { useDataProvider } from "../../provider/dataProvider";
import { User } from "@market/server-api";

export const useProfile = () => {
  const { getProfile } = useDataProvider();
  const [profile, setProfile] = useState<User>(lsProvider.get("profile"));

  const setToken = (token: string) => {
    lsProvider.set("token", token);
  };

  const logout = () => {
    lsProvider.remove("profile");
    lsProvider.remove("token");
  };

  const refreshProfile = () => {
    return getProfile().then((profile) => {
      lsProvider.set("profile", profile);
      setProfile(profile);
    });
  };

  return {
    profile,
    setToken,
    logout,
    refreshProfile,
  };
};
