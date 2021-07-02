import { NuvoRoute } from "@nuvolo/nuux/components/NuvoApp";
import {
  ProductHomeView,
  ProductCreateView,
  ProductEditView,
  ProductDetailsView,
  WalletView,
} from "@views/index";

const Routes: NuvoRoute[] = [
  {
    path: "/",
    component: ProductHomeView,
    name: "PRODUCTS_HOME_VIEW",
  },
  {
    path: "/create",
    component: ProductCreateView,
    name: "PRODUCT_CREATE_VIEW",
  },
  {
    path: "/edit/:id",
    component: ProductEditView,
    name: "PRODUCT_EDIT_VIEW",
  },
  {
    path: "/details/:id",
    component: ProductDetailsView,
    name: "PRODUCT_DETAILS_VIEW",
  },
  {
    path: "/wallet",
    component: WalletView,
    name: "WALLET_VIEW",
  },
];

function getRoutes(): NuvoRoute[] {
  return Routes;
}

export { Routes, getRoutes };
