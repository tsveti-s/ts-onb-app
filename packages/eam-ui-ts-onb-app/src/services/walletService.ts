import { Http } from "@nuvolo/nuux/services";
import { Wallet } from "src/types/walletType";

const getWallet = (setCurrent: React.Dispatch<React.SetStateAction<null>>) => {
  Http.get("api/x_nuvo_eam_ts_onb/tsveti_onboarding_store/wallet/get")
    .then((response) => {
      console.warn(`successfully get wallet!`);
      setCurrent(JSON.parse(response?.data.result)[0]);
    })
    .catch((error) => {
      console.warn(`error while getting wallet ${error}`);
    });
};

const updateWallet = (payload: Wallet, handleReload: Function) => {
  Http.put(
    "api/x_nuvo_eam_ts_onb/tsveti_onboarding_store/wallet/update",
    payload
  )
    .then((response) => {
      console.warn(`successfully updated wallet!`);
      handleReload();
    })
    .catch((error) => {
      console.warn(`error while updating wallet ${error}`);
    });
};

export { getWallet, updateWallet };
