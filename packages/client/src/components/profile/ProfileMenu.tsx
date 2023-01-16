import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RouteEnum, routing } from "../../routing/router";
import { useEffect } from "react";
import { OfferStatusEnum } from "@market/server-api";
import { useProfile } from "./ProfileContext";

export const ProfileMenu = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (url: string) => () => {
    navigate(url);
  };

  useEffect(() => {}, [profile]);

  if (!profile) return <Box>Профіль не знайдено</Box>;

  return (
    <div>
      {profile.name}
      <IconButton
        aria-label="display more actions"
        edge="end"
        color="inherit"
        id="profile-button"
        sx={{ marginRight: 1 }}
        onClick={handleClick}
      >
        <AccountCircle fontSize="large" />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleMenu(RouteEnum.PROFILE)}>Профіль</MenuItem>
        <MenuItem
          onClick={handleMenu(
            routing(RouteEnum.OFFERS_OWN, { status: OfferStatusEnum.ACTIVE })
          )}
        >
          Оголошення
        </MenuItem>
        <MenuItem onClick={handleMenu(RouteEnum.OFFERS_FAVORITES)}>
          Обрані
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenu(RouteEnum.LOGOUT)}>Вийти</MenuItem>
      </Menu>
    </div>
  );
};
