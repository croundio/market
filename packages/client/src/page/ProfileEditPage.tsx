import * as React from "react";
import { useRequireLogged } from "../components/profile/useRequireLogged";
import { FormLayout } from "../components/layout/FormLayout";
import { ProfileEdit } from "../components/profile/ProfileEdit";

export const ProfileEditPage = () => {
  useRequireLogged();

  return (
    <FormLayout>
      <ProfileEdit />
    </FormLayout>
  );
};
