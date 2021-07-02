import { NuvoRoute } from "@nuvolo/nuux/components/NuvoApp";
import {
  ProductHomeView,
  ProductAddView,
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
    path: "/add",
    component: ProductAddView,
    name: "PRODUCT_ADD_VIEW",
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
