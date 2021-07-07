import { NuvoThrobber } from "@nuvolo/nuux/components/NuvoThrobber";
import { EDIT_ROUTE } from "@utils/constants";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductForm } from "src/components/ProductViews/Form/ProductForm";
import { getImageUrl } from "src/services/attachmentService";
import { getCurrentProduct, updateProduct } from "src/services/productService";
import styled from "styled-components";

const Image = styled.img`
  height: 100%;
  border: 2px solid skyblue;
  border-radius: 10px;
`;

const ImgContainer = styled.div`
  padding: 30px 40px 0 0;
  height: 250px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ProductEdit = (): JSX.Element => {
  const [current, setCurrent] = useState(null as any);
  const [isFieldChanged, setIsFieldChanged] = useState(false as boolean);
  const history = useHistory();
  const [img, setImg] = useState() as any;
  const [imgURL, setImgURL] = useState(null as any);
  const id = history.location.pathname.replace(EDIT_ROUTE, "");

  const handleReload = (): void => {
    history.push("/");
  };

  useEffect(() => {
    getCurrentProduct(id, setCurrent, (current: any) => {
      if (current.image) {
        setImg(getImageUrl(current.image));
      } else {
        setImg(null);
      }
    });
  }, []);

  useEffect(() => {
    if (img && img.then) {
      img.then((response: any) => {
        setImgURL(response);
      });
    } else {
      setImgURL("none");
    }
  }, [img]);

  const handleUpdateButton = () => {
    setIsFieldChanged(false);
    updateProduct(id, current, handleReload);
  };

  const handleFieldDataChanged = () => {
    if (!isFieldChanged) {
      setIsFieldChanged(true);
    }
  };
  const hasNoImgYet = !current || !imgURL || imgURL === "none";
  const willHaveNoImg = !current || typeof img === "undefined";
  const showLoader = current && current.image ? hasNoImgYet : willHaveNoImg;

  return showLoader ? (
    <NuvoThrobber size="large" />
  ) : (
    <Container>
      {imgURL !== "none" ? (
        <ImgContainer>
          <Image src={imgURL || ""} alt={current.name} />
        </ImgContainer>
      ) : null}
      <ProductForm
        payload={current}
        label={"Update"}
        handleButton={handleUpdateButton}
        handleFieldDataChanged={handleFieldDataChanged}
        isButtonEnabled={isFieldChanged}
        areFieldsDisabled={false}
      />
    </Container>
  );
};
