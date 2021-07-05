import React, { useState } from "react";
import styled from "styled-components";
import { NuvoAppBar } from "@nuvolo/nuux/components/NuvoAppBar";
import { NuvoAppBarTitle } from "@nuvolo/nuux/components/NuvoAppBarTitle";
import { useNuvoMessages } from "@nuvolo/nuux/hooks/useNuvoMessages";
import { appTitleKey, DETAILS_ROUTE, EDIT_ROUTE } from "@utils/constants";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Add from "@material-ui/icons/Add";
import { NuvoNavButton } from "@nuvolo/nuux/components/NuvoIconButton";
import { useEffect } from "react";
import { AppBarProps } from "src/types/appBarType";
import { ToggleRoute } from "@components/ToggleRoute/ToggleRoute";

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  position: relative;
`;

export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;

  span:last-child {
    position: absolute;
    right: 10px;
  }
`;

const Button = styled(NuvoNavButton)`
  &.dx-button .dx-button-content > svg {
    font-size: 19px;
  }
`;

const backBtnStyles = { justifyContent: "flex-start" };
const addBtnStyles = { justifyContent: "flex-end", flexGrow: "1" };

const Content = ({
  title,
  onBackPress,
  onAddProduct,
  isHomePage,
  isEditOrDetails,
}: any): JSX.Element => {
  return (
    <NavBar>
      {!isHomePage ? (
        <Container style={backBtnStyles}>
          <Button
            label="back"
            icon={ArrowBackIcon}
            onClick={onBackPress}
            visible={!!onBackPress}
          />
        </Container>
      ) : null}
      <NuvoAppBarTitle>{title}</NuvoAppBarTitle>
      {isHomePage ? (
        <Container style={addBtnStyles as any}>
          <Button
            label="add"
            icon={Add}
            onClick={onAddProduct}
            visible={!!onAddProduct}
          />
        </Container>
      ) : isEditOrDetails ? (
        <ToggleRoute />
      ) : null}
    </NavBar>
  );
};

export const AppBar = (props: AppBarProps): JSX.Element => {
  const msg = useNuvoMessages();
  const { history, location } = props;
  const { pathname } = location;
  const [isHomePage, setIsHomePage] = useState(pathname === "/");
  const [isEditOrDetails, setIsEditOrDetails] = useState(false);

  useEffect(() => {
    setIsHomePage(pathname === "/");
    setIsEditOrDetails(
      pathname
        ? pathname.includes(EDIT_ROUTE) || pathname.includes(DETAILS_ROUTE)
        : false
    );
  }, [pathname]);

  const handleBackPress = () => {
    history.push("/");
  };

  const handleAddProduct = () => {
    history.push("/add");
  };

  return (
    <NuvoAppBar
      width="100%"
      appBar={
        <Content
          isHomePage={isHomePage}
          isEditOrDetails={isEditOrDetails}
          title={msg.get(appTitleKey)}
          onBackPress={handleBackPress}
          onAddProduct={handleAddProduct}
        />
      }
    />
  );
};
