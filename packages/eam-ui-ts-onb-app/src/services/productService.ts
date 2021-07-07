import { Http } from "@nuvolo/nuux/services";
import { Product } from "src/types/productType";

const fetchProducts = () => {
  return Http.get(
    "api/x_nuvo_eam_ts_onb/tsveti_onboarding_store/product/getAll"
  )
    .then((response) => {
      return JSON.parse(response?.data.result);
    })
    .catch((error) => {
      console.warn(`error while getting products ${error}`);
      return null;
    });
};

const getCurrentProduct = (
  id: string,
  setCurrent: React.Dispatch<React.SetStateAction<null>>,
  setImg?: Function
) => {
  Http.get(
    `api/x_nuvo_eam_ts_onb/tsveti_onboarding_store/product/getCurrent/${id}`
  )
    .then((response) => {
      console.warn(`successfully get product!`);
      const current = JSON.parse(response?.data.result);
      setCurrent(current);

      if (setImg) {
        setImg(current);
      }
    })
    .catch((error) => {
      console.warn(`error while getting product ${error}`);
    });
};

const getAllProducts = (
  setTableData: React.Dispatch<React.SetStateAction<null>>
) =>
  (async () => {
    const response = await fetchProducts();
    setTableData(response);
  })();

const deleteProduct = (id: string, handleReaload: Function) => {
  Http.del(`api/x_nuvo_eam_ts_onb/tsveti_onboarding_store/product/delete/${id}`)
    .then((response) => {
      console.warn(`successfully deleted product!`);
      handleReaload();
    })
    .catch((error) => {
      console.warn(`error while deleting product ${error}`);
    });
};

const updateProduct = (
  id: string,
  payload: Product,
  handleReload?: Function
) => {
  Http.put(
    `api/x_nuvo_eam_ts_onb/tsveti_onboarding_store/product/update/${id}`,
    payload
  )
    .then((response) => {
      console.warn(`successfully updated product!`);
      if (handleReload) {
        handleReload();
      }
    })
    .catch((error) => {
      console.warn(`error while updating product ${error}`);
    });
};

const createProduct = (
  payload: Product,
  handleReload: Function,
  uploadFile?: Function
) => {
  Http.post(
    `api/x_nuvo_eam_ts_onb/tsveti_onboarding_store/product/create`,
    payload
  )
    .then((response) => {
      console.warn(`successfully updated product!`);

      if (uploadFile) {
        uploadFile(JSON.parse(response?.data.result));
      }

      handleReload();
    })
    .catch((error) => {
      console.warn(`error while updating product ${error}`);
    });
};

const buyProduct = (id: string, handleReaload: Function) => {
  Http.post(
    `api/x_nuvo_eam_ts_onb/tsveti_onboarding_store/product/buyProduct/${id}`
  )
    .then((response) => {
      console.warn(`successfully bought product!`);
      handleReaload();
    })
    .catch((error) => {
      console.warn(`error while buying product ${error}`);
    });
};

export {
  getAllProducts,
  getCurrentProduct,
  deleteProduct,
  updateProduct,
  buyProduct,
  createProduct,
};
