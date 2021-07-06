import React, { useState } from "react";
import styled from "styled-components";
import { NuvoAppBar } from "@nuvolo/nuux/components/NuvoAppBar";
import { NuvoAppBarTitle } from "@nuvolo/nuux/components/NuvoAppBarTitle";
import { useNuvoMessages } from "@nuvolo/nuux/hooks/useNuvoMessages";
import { appTitleKey, DETAILS_ROUTE, EDIT_ROUTE } from "@utils/constants";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Add from "@material-ui/icons/Add";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { NuvoNavButton } from "@nuvolo/nuux/components/NuvoIconButton";
import { useEffect } from "react";
import { AppBarProps } from "src/types/appBarType";
import { ToggleRoute } from "@components/ToggleRoute/ToggleRoute";
import { getWallet } from "src/services/walletService";

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

const WalletContainer = styled.div`
  width: 50%;
`;

const WalletText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  margin-left: 10px;
`;

const backBtnStyles = { justifyContent: "flex-start" };
const addBtnStyles = { justifyContent: "flex-end", flexGrow: "1" };

const Content = ({
  title,
  onBackPress,
  onAddProduct,
  onWalletPress,
  isHomePage,
  isWalletView,
  isEditOrDetails,
  wallet,
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
      {wallet ? (
        <>
          <NuvoAppBarTitle>Hello, {wallet.user}!</NuvoAppBarTitle>
          {!isWalletView && (
            <WalletContainer>
              <WalletText>
                <Button
                  label="balance"
                  icon={AccountBalanceWalletIcon}
                  onClick={onWalletPress}
                  visible={!!onWalletPress}
                />
                {wallet.balance.amount} {wallet.balance.currency}
              </WalletText>
            </WalletContainer>
          )}
        </>
      ) : null}
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
  const [wallet, setWallet] = useState(null as any);
  const [isHomePage, setIsHomePage] = useState(pathname === "/");
  const [isEditOrDetails, setIsEditOrDetails] = useState(false);
  const [isWallet, setIsWallet] = useState(false);

  useEffect(() => {
    getWallet(setWallet);
  }, []);

  useEffect(() => {
    setIsHomePage(pathname === "/");
    setIsWallet(pathname === "/wallet");

    if (pathname === "/") {
      getWallet(setWallet);
    }

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

  const handleWalletClick = () => {
    history.push("/wallet");
  };

  if (wallet?.balance) {
    wallet.balance.amount = Number(wallet.balance.amount).toFixed(2);
  }

  return (
    <NuvoAppBar
      width="100%"
      appBar={
        <Content
          isHomePage={isHomePage}
          isEditOrDetails={isEditOrDetails}
          isWalletView={isWallet}
          title={msg.get(appTitleKey)}
          onBackPress={handleBackPress}
          onAddProduct={handleAddProduct}
          onWalletPress={handleWalletClick}
          wallet={wallet}
        />
      }
    />
  );
};
