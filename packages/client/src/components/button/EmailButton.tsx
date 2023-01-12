import { Button } from "@mui/material";

type EmailButtonProps = {
  email: string;
  subject?: string;
};

export const EmailButton = ({ email, subject = "" }: EmailButtonProps) => {
  const handleClick = (e: any) => {
    window.location.href = `mailto:${email}?subject=${subject}`;
    e.preventDefault();
  };

  return (
    <Button size="small" onClick={handleClick}>
      Написати
    </Button>
  );
};
