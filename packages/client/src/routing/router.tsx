import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../page/MainPage";
import { NotFoundPage } from "../page/NotFoundPage";
import { LoginGooglePage } from "../page/LoginGooglePage";
import { LogoutPage } from "../page/LogoutPage";
import { LoginPage } from "../page/LoginPage";
import { OfferCreatePage } from "../page/OfferCreatePage";
import { OfferOwnPage } from "../page/OfferOwnPage";
import { OfferFavoritePage } from "../page/OfferFavoritePage";
import { ProfileEditPage } from "../page/ProfileEditPage";
import { OfferShowPage } from "../page/OfferShowPage";
import { OfferEditPage } from "../page/OfferEditPage";

export enum RouteEnum {
  MAIN = "/",
  LOGIN = "/login",
  LOGIN_GOOGLE = "/login/google",
  LOGOUT = "/logout",
  OFFERS = "/offers/:category",
  OFFER = "/offers/:offerId/show",
  OFFERS_CREATE = "/offers/create",
  OFFERS_EDIT = "/offers/:offerId/edit",
  OFFERS_OWN = "/offers/own/:status",
  OFFERS_FAVORITES = "/offers/favorites",
  PROFILE = "/profile",
  NOT_FOUND = "*",
}

export const router = createBrowserRouter([
  {
    path: RouteEnum.MAIN,
    element: <MainPage />,
  },
  {
    path: RouteEnum.OFFERS,
    element: <MainPage />,
  },
  {
    path: RouteEnum.OFFER,
    element: <OfferShowPage />,
  },
  {
    path: RouteEnum.LOGIN,
    element: <LoginPage />,
  },
  {
    path: RouteEnum.LOGIN_GOOGLE,
    element: <LoginGooglePage />,
  },
  {
    path: RouteEnum.LOGOUT,
    element: <LogoutPage />,
  },
  {
    path: RouteEnum.OFFERS_CREATE,
    element: <OfferCreatePage />,
  },
  {
    path: RouteEnum.OFFERS_EDIT,
    element: <OfferEditPage />,
  },
  {
    path: RouteEnum.OFFERS_OWN,
    element: <OfferOwnPage />,
  },
  {
    path: RouteEnum.OFFERS_FAVORITES,
    element: <OfferFavoritePage />,
  },
  {
    path: RouteEnum.PROFILE,
    element: <ProfileEditPage />,
  },
  {
    path: RouteEnum.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);

export const routing = (
  route: RouteEnum,
  params: Record<string, string>
): string => {
  return Object.keys(params).reduce((r, param) => {
    return r.replace(`:${param}`, params[param]);
  }, route);
};
