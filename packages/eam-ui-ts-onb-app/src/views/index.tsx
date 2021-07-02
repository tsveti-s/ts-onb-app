import React from "react";
import { ProductHome } from "@components/ProductViews/Home";
import { ProductCreate } from "@components/ProductViews/Create";
import { ProductEdit } from "@components/ProductViews/Edit";
import { ProductDetails } from "@components/ProductViews/Details";
import { Wallet } from "@components/WalletView/Wallet";

export const ProductHomeView = (): JSX.Element => <ProductHome />;
export const ProductCreateView = (): JSX.Element => <ProductCreate />;
export const ProductEditView = (): JSX.Element => <ProductEdit />;
export const ProductDetailsView = (): JSX.Element => <ProductDetails />;
export const WalletView = (): JSX.Element => <Wallet />;
