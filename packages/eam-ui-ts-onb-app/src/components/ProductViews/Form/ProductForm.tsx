import React, { useState } from "react";
import { GroupItem, Item, NuvoForm } from "@nuvolo/nuux/components/NuvoForm";
import { NuvoButton } from "@nuvolo/nuux/components/NuvoButton";

export const ProductForm = (props: any): JSX.Element => {
  const {
    label,
    areFieldsDisabled,
    handleButton,
    handleFieldDataChanged,
    isButtonEnabled,
  } = props;

  return (
    <NuvoForm
      colCount={1}
      width="100%"
      onFieldDataChanged={handleFieldDataChanged}
    >
      <GroupItem colCount={2}>
        <Item
          disabled={areFieldsDisabled}
          dataField="name"
          label={{ text: "Name" }}
        />
        <Item
          disabled={areFieldsDisabled}
          dataField="price"
          label={{ text: "Price" }}
        />
        <Item
          disabled={areFieldsDisabled}
          dataField="quantity"
          label={{ text: "Quantity" }}
        />
        <Item
          disabled={areFieldsDisabled}
          dataField="currency"
          label={{ text: "Currency" }}
        />
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
