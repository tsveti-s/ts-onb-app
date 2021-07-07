import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { NuvoUpload } from "@nuvolo/nuux/components/NuvoUpload";
import { ProductForm } from "src/components/ProductViews/Form/ProductForm";
import { useHistory } from "react-router-dom";
import { createProduct, updateProduct } from "src/services/productService";
import { Product } from "src/types/productType";
import { useState } from "react";
import { uploadAttachment } from "src/services/attachmentService";
import { Attachment } from "src/types/attachmentType";

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
  const [isFieldChanged, setIsFieldChanged] = useState(false as boolean);
  const [file, setFile] = useState([] as any);
  const [currentTest, setCurrentTest] = useState(null as any);
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

    if (!isFieldChanged) {
      setIsFieldChanged(true);
    }
  };

  const handleReload = (): void => {
    history.push("/");
  };

  const handleSaveFile = useCallback(() => {
    setIsFieldChanged(false);

    createProduct(payload.current, handleReload, async (current: Product) => {
      if (current && file && file.length) {
        await setFile(
          uploadAttachment(current.id, file, (attachedFile: Attachment) => {
            updateProduct(current.id, {
              ...current,
              image: attachedFile.sys_id,
            });
          })
        );
      }
    });
  }, [file, currentTest]);

  const handleValueChanged = (e: any) => {
    const files = e.value;
    if (files && files.length) {
      setFile(files);
    }
  };

  return (
    <>
      <Upload
        value={file && !file.then ? (file as File[]) : [] || []}
        chunkSize={400000}
        accept="*"
        multiple={false}
        readyToUploadMessage="Uploaded"
        selectButtonText="Select File"
        uploadMode="useForm"
        uploadType="Advance"
        onValueChanged={handleValueChanged}
      />
      <ProductForm
        label={"Add Product"}
        handleButton={handleSaveFile}
        handleFieldDataChanged={handleFieldDataChanged}
        isButtonEnabled={isFieldChanged}
        areFieldsDisabled={false}
      />
    </>
  );
};
