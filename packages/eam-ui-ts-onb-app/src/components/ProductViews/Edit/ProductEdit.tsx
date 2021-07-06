import { NuvoThrobber } from "@nuvolo/nuux/components/NuvoThrobber";
import { EDIT_ROUTE } from "@utils/constants";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductForm } from "src/components/ProductViews/Form/ProductForm";
import { getCurrentProduct, updateProduct } from "src/services/productService";

export const ProductEdit = (): JSX.Element => {
  const [current, setCurrent] = useState(null as any);
  const [isFieldChanged, setIsFieldChanged] = useState(false as boolean);
  const history = useHistory();
  const id = history.location.pathname.replace(EDIT_ROUTE, "");

  const handleReload = (): void => {
    history.push("/");
  };

  useEffect(() => {
    getCurrentProduct(id, setCurrent);
  }, []);

  const handleUpdateButton = () => {
    updateProduct(id, current, handleReload);
  };

  const handleFieldDataChanged = () => {
    if (!isFieldChanged) {
      setIsFieldChanged(true);
    }
  };

  return !current ? (
    <NuvoThrobber size="large" />
  ) : (
    <ProductForm
      payload={current}
      label={"Update"}
      handleButton={handleUpdateButton}
      handleFieldDataChanged={handleFieldDataChanged}
      isButtonEnabled={isFieldChanged}
      areFieldsDisabled={false}
    />
  );
};
