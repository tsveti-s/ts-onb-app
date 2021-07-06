import React, { useRef } from "react";
import styled from "styled-components";
import { NuvoUpload } from "@nuvolo/nuux/components/NuvoUpload";
import { ProductForm } from "src/components/ProductViews/Form/ProductForm";
import { useHistory } from "react-router-dom";
import { createProduct } from "src/services/productService";
import { Product } from "src/types/productType";

const Upload = styled(NuvoUpload)`
  margin-top: 20px;
  .dx-fileuploader-wrapper {
    padding: 0;
  }
  .dx-fileuploader-input-wrapper {
    padding: 0;
    border: none;
  }
`;

export const ProductAdd = (): JSX.Element => {
  const history = useHistory();
  const payload = useRef({} as Product);
  const payloadBuffer = useRef({} as any);
  const PRICE_PREFIX = "price.";

  const handleFieldDataChanged = (e: any) => {
    const propTest = e.dataField.toString() as any;

    const fieldProperty = propTest.includes(PRICE_PREFIX)
      ? propTest.replace(PRICE_PREFIX, "")
      : propTest;

    if (fieldProperty === "amount" || fieldProperty === "currency") {
      payloadBuffer.current = {
        ...payloadBuffer.current,
        price: {
          ...payloadBuffer.current.price,
          [fieldProperty]: e.value,
        } as any,
      };
    } else {
      payloadBuffer.current = {
        ...payloadBuffer.current,
        [fieldProperty]: e.value,
      } as any;
    }

    payload.current = {
      ...payload.current,
      ...payloadBuffer.current,
    };
  };

  const handleFileUpload = () => {};

  const handleReload = (): void => {
    history.push("/");
  };

  const handleSaveFile = () => {
    createProduct(payload.current, handleReload);
  };

  return (
    <>
      <Upload
        // value={file || []}
        chunkSize={400000}
        accept="*"
        multiple={false}
        readyToUploadMessage="Uploaded"
        selectButtonText="Select File"
        uploadMode="useButtons"
        uploadType="Advance"
        onValueChanged={handleFileUpload}
      />
      <ProductForm
        label={"Add Product"}
        handleButton={handleSaveFile}
        handleFieldDataChanged={handleFieldDataChanged}
        isButtonEnabled={true}
        areFieldsDisabled={false}
      />
    </>
  );
};
