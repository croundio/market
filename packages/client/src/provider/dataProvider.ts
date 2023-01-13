import {
  Configuration,
  DefaultApi,
  Offer,
  OfferStatusEnum,
} from "@market/server-api";
import { lsProvider } from "./localStorageProvider";
import { useSnackbar } from "notistack";
import { server } from "../config/server";

const api = new DefaultApi(
  new Configuration({
    basePath: server.apiUrl,
  })
);

const withAuth = () => {
  const token = lsProvider.get("token");
  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

type OfferListParams = {
  limit?: number;
  cursor?: number;
  category?: string;
};

export const useDataProvider = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleError = (e: any) => {
    let message = e.response.data?.message || e.message;

    if (e.response.data?.statusCode === 401) {
      message = "Данна дія потребує авторизації";
    }

    if (Array.isArray(message)) {
      message.forEach((m) => {
        enqueueSnackbar(m, { variant: "warning" });
      });
    } else {
      enqueueSnackbar(message, { variant: "warning" });
    }
  };

  return {
    getProfile: () => {
      return api
        .profileControllerGetProfile(withAuth())
        .then((res) => res.data);
    },
    getCategories: () => {
      return api.categoryControllerGetList().then((res) => res.data);
    },
    getOwnOffers: (status: OfferStatusEnum) => {
      return api
        .offerControllerGetOwnList({ ...withAuth(), params: { status } })
        .then((res) => res.data);
    },
    getOwnOffersCount: () => {
      return api.offerControllerGetOwnCount(withAuth()).then((res) => res.data);
    },
    getFavoriteOffers: () => {
      return api
        .favoriteControllerGetFavoriteList(withAuth())
        .then((res) => res.data);
    },
    getOffers: (params?: OfferListParams) => {
      return api
        .offerControllerGetList({ ...withAuth(), params })
        .then((res) => res.data);
    },
    createOffer: (offer: Offer) => {
      return api
        .offerControllerCreate(offer, withAuth())
        .then((res) => res.data)
        .catch(handleError);
    },
    updateOffer: (offerId: number, offer: Offer) => {
      return api
        .offerControllerUpdate(offerId, offer, withAuth())
        .then((res) => res.data)
        .catch(handleError);
    },
    getOffer: (offerId: number) => {
      return api
        .offerControllerGetOne(offerId, withAuth())
        .then((res) => res.data);
    },
    deleteOffer: (offerId: number) => {
      return api
        .offerControllerDelete(offerId, withAuth())
        .then((res) => res.data);
    },
    editProfile: (profile: object) => {
      return api
        .profileControllerUpdateProfile(profile, withAuth())
        .then((res) => res.data)
        .catch(handleError);
    },
    setFavorite: (offerId: number, add = false) => {
      if (add) {
        return api
          .favoriteControllerSetFavorite(offerId, withAuth())
          .then((res) => res.data)
          .catch(handleError);
      }
      return api
        .favoriteControllerUnsetFavorite(offerId, withAuth())
        .then((res) => res.data)
        .catch(handleError);
    },
    setOfferStatus: (offerId: number, status: "ACTIVE" | "DEACTIVATE") => {
      if (status === OfferStatusEnum.ACTIVE) {
        return api
          .offerControllerActivate(offerId, withAuth())
          .then((res) => res.data)
          .catch(handleError);
      }
      return api
        .offerControllerDeactivate(offerId, withAuth())
        .then((res) => res.data)
        .catch(handleError);
    },
    createImage: (image: File) => {
      const data = new FormData();
      data.append("file", image);
      return api
        .storageControllerCreateImage({ data, ...withAuth() })
        .then((res) => res.data)
        .catch(handleError);
    },
  };
};
