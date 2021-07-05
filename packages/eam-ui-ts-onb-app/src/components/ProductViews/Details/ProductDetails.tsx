import React, { useState } from "react";
import { ProductForm } from "src/components/ProductViews/Form/ProductForm";

export const ProductDetails = (): JSX.Element => {
  return (
    <ProductForm
      label={"Buy Product"}
      handleButton={() => console.log("hi")}
      handleFieldDataChanged={() => console.log("hi")}
      isButtonEnabled={true}
      areFieldsDisabled={true}
    />
  );
};
