import React, { useState, useEffect, useRef } from "react";
import { NuvoButton } from "@nuvolo/nuux/components/NuvoButton";
import { GroupItem, Item, NuvoForm } from "@nuvolo/nuux/components/NuvoForm";
import { useHistory } from "react-router-dom";
import { getWallet, updateWallet } from "src/services/walletService";
import { NuvoThrobber } from "@nuvolo/nuux/components/NuvoThrobber";

export const Wallet = (): JSX.Element => {
  const history = useHistory();
  const [wallet, setWallet] = useState(null as any);
  const [isFieldChanged, setIsFieldChanged] = useState(false);
  const payload = useRef({} as any);
  const payloadBuffer = useRef({} as any);
  const BALANCE_PREFIX = "balance.";

  useEffect(() => {
    getWallet(setWallet);
  }, []);

  const handleFieldDataChanged = (e: any) => {
    if (!isFieldChanged) {
      setIsFieldChanged(true);
    }

    const propTest = e.dataField.toString() as any;
    const fieldProperty = propTest.includes(BALANCE_PREFIX)
      ? propTest.replace(BALANCE_PREFIX, "")
      : propTest;

    if (fieldProperty === "amount" || fieldProperty === "currency") {
      payloadBuffer.current = {
        ...payloadBuffer.current,
        balance: {
          ...payloadBuffer.current.balance,
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
      ...wallet,
    };
  };

  const handleReload = () => {
    history.push("/");
  };

  const handleUpdateWallet = () => {
    setIsFieldChanged(false);
    updateWallet(payload.current as any, handleReload);
  };

  if (wallet?.balance) {
    wallet.balance.amount = Number(wallet.balance.amount).toFixed(2);
  }

  return !wallet ? (
    <NuvoThrobber size="large" />
  ) : (
    <NuvoForm
      colCount={1}
      width="100%"
      onFieldDataChanged={handleFieldDataChanged}
      formData={wallet}
    >
      <GroupItem colCount={3}>
        <Item dataField="name" label={{ text: "Name" }} />
        <Item
          dataField="balance.amount"
          editorType="dxNumberBox"
          label={{ text: "Amount" }}
          editorOptions={{
            format: "###.##",
          }}
        />
        <Item dataField="balance.currency" label={{ text: "Currency" }} />
      </GroupItem>
      <GroupItem>
        <NuvoButton
          disabled={!isFieldChanged}
          label={"Update Wallet"}
          onClick={handleUpdateWallet}
        />
      </GroupItem>
    </NuvoForm>
  );
};
