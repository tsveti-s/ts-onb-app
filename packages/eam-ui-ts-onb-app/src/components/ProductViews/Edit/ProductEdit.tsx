import React, { useState } from "react";
import { ProductForm } from "src/components/ProductViews/Form/ProductForm";

export const ProductEdit = (): JSX.Element => {
  return (
    <ProductForm
      label={"Update"}
      handleButton={() => console.log("hi")}
      handleFieldDataChanged={() => console.log("hi")}
      isButtonEnabled={true}
      areFieldsDisabled={false}
    />
  );
};
