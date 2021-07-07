import { Attachment } from "src/types/attachmentType";
import { Http } from "@nuvolo/nuux/services";

export const blobToUrl = (b: Blob): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    var reader = new window.FileReader();
    reader.readAsDataURL(b);
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return reject(new Error("Couldn't generate an image url"));
      }
      resolve(reader.result);
    };
  });
};

export const uploadAttachment = async (
  recordSysId: string,
  file: File[],
  updateProduct?: Function
) => {
  Http.post(
    `/api/now/attachment/file?table_name=x_nuvo_eam_ts_onb_products&table_sys_id=${recordSysId}&file_name=${file[0].name}`,
    file
  )
    .then((response) => {
      if (updateProduct) {
        updateProduct(response.data.result as Attachment);
      }
    })
    .catch((error) => console.warn("Error: ", error));
};

export const getImageUrl = async (imageId: string): Promise<string | null> => {
  const response = await Http.get(`/api/now/attachment/${imageId}/file`, {
    responseType: "blob",
  });

  const url = await blobToUrl(response.data);
  return url;
};
