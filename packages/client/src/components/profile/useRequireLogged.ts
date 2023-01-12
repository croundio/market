import { useProfile } from "./useProfile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RouteEnum } from "../../routing/router";

export const useRequireLogged = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate(RouteEnum.LOGIN);
    }
  }, [profile, navigate]);
};
