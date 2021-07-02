import { Http } from "@nuvolo/nuux/services";

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

export { getAllProducts, deleteProduct };
