import React from "react";
import { GroupItem, Item, NuvoForm } from "@nuvolo/nuux/components/NuvoForm";
import { NuvoButton } from "@nuvolo/nuux/components/NuvoButton";

export const ProductForm = (props: any): JSX.Element => {
  const {
    payload,
    label,
    areFieldsDisabled,
    handleButton,
    handleFieldDataChanged,
    isButtonEnabled,
  } = props;

  if (payload?.price) {
    payload.price.amount = Number(payload.price.amount).toFixed(2);
  }

  return (
    <NuvoForm
      colCount={1}
      width="100%"
      onFieldDataChanged={handleFieldDataChanged}
      formData={payload}
    >
      <GroupItem colCount={2}>
        <Item
          disabled={areFieldsDisabled}
          dataField="name"
          label={{ text: "Name" }}
        />
        <Item
          disabled={areFieldsDisabled}
          dataField="price.amount"
          editorType="dxNumberBox"
          label={{ text: "Amount" }}
          editorOptions={{
            format: "###.##",
          }}
        />
        <Item
          disabled={areFieldsDisabled}
          dataField="quantity"
          editorType="dxNumberBox"
          label={{ text: "Quantity" }}
        />
        <Item
          disabled={areFieldsDisabled}
          dataField="price.currency"
          label={{ text: "Currency" }}
        />
        {/* <Item
          disabled={areFieldsDisabled}
          dataField="image"
          // editorType="dxGallery"
          label={{ text: "Image" }}
        /> */}
      </GroupItem>
      <GroupItem>
        <NuvoButton
          disabled={!isButtonEnabled}
          label={label}
          onClick={handleButton}
        />
      </GroupItem>
    </NuvoForm>
  );
};
