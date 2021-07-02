import React from "react";
import { ProductHome } from "@components/ProductViews/Home";
import { ProductAdd } from "@components/ProductViews/Add";
import { ProductEdit } from "@components/ProductViews/Edit";
import { ProductDetails } from "@components/ProductViews/Details";
import { Wallet } from "@components/WalletView/Wallet";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  align-items: center;
`;

export const ProductHomeView = (): JSX.Element => (
  <Container>
    <ProductHome />
  </Container>
);
export const ProductAddView = (): JSX.Element => (
  <Container>
    <ProductAdd />
  </Container>
);
export const ProductEditView = (): JSX.Element => (
  <Container>
    <ProductEdit />
  </Container>
);
export const ProductDetailsView = (): JSX.Element => (
  <Container>
    <ProductDetails />
  </Container>
);
export const WalletView = (): JSX.Element => (
  <Container>
    <Wallet />
  </Container>
);
