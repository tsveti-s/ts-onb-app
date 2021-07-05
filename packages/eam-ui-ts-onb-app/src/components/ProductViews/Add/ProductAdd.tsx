import React from "react";
import styled from "styled-components";
import { NuvoUpload } from "@nuvolo/nuux/components/NuvoUpload";
import { ProductForm } from "src/components/ProductViews/Form/ProductForm";

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
  const handleFieldDataChanged = () => {};
  const handleFileUpload = () => {};
  const handleSaveFile = () => {};

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
