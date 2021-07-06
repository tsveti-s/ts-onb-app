import { NuvoThrobber } from "@nuvolo/nuux/components/NuvoThrobber";
import { DETAILS_ROUTE } from "@utils/constants";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductForm } from "src/components/ProductViews/Form/ProductForm";
import { buyProduct, getCurrentProduct } from "src/services/productService";

export const ProductDetails = (): JSX.Element => {
  const [current, setCurrent] = useState(null as any);
  const [isBought, setIsBought] = useState(true);
  const history = useHistory();
  const id = history.location.pathname.replace(DETAILS_ROUTE, "");

  useEffect(() => {
    getCurrentProduct(id, setCurrent);
  }, []);

  const handleReload = (): void => {
    history.push("/");
  };

  const handleBuyButton = () => {
    setIsBought(false);
    buyProduct(current.id, handleReload);
  };

  return !current ? (
    <NuvoThrobber size="large" />
  ) : (
    <ProductForm
      payload={current}
      label={"Buy Product"}
      handleButton={handleBuyButton}
      isButtonEnabled={isBought && current ? current.quantity > 0 : false}
      areFieldsDisabled={true}
    />
  );
};
