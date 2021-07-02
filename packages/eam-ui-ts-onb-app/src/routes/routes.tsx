import React from "react";
import { NuvoRoute } from "@nuvolo/nuux/components/NuvoApp";
import { ProductsTableView } from "@views/index";

const example = "PRODUCTS_TABLE";

const Routes: NuvoRoute[] = [
  {
    path: "/",
    component: ProductsTableView,
    name: example,
  },
];

function getRoutes(): NuvoRoute[] {
  return Routes;
}

export { Routes, getRoutes };
