import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { DETAILS_ROUTE, EDIT_ROUTE } from "@utils/constants";

const ModeSwitchContainer = styled.span`
  display: inline-block;
  height: 27px;
  border-radius: 4px;
  background-color: #2ab3d8;
  padding: 4px 2px;
`;

const ModeThumbs = styled.div<{ isActive: boolean }>`
  display: inline;
  cursor: pointer;
  color: ${(props) =>
    props.isActive ? "#2ab3d8" : props.theme.nuvo.colors.contrast.light};
  position: relative;
  top: "-5px";
  padding: ${(props) => (props.isActive ? "2px" : "0px")} 12px
    ${(props) => (props.isActive ? "2px" : "0px")} 12px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.isActive ? props.theme.nuvo.colors.contrast.light : "#2ab3d8"};
  ${(props) => (props.isActive ? props.theme.nuvo.elevation.lvl1 : null)};
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
  pointer-events: ${(props) => (props.isActive ? "none" : "auto")};
`;

const Target = styled.div`
  display: inline;
  top: 7px;
  font-size: ${({ theme }) => theme.nuvo.fontConfig.fontSizes.h3};
`;

const tabsTextData = [
  {
    label: "Edit",
  },
  {
    label: "Details",
  },
];

export const ToggleRoute = (): JSX.Element => {
  const history = useHistory();
  const getCurrentTab = () => {
    return history.location.pathname.includes(DETAILS_ROUTE) ? 1 : 0;
  };
  const [activeTab, setActiveTab] = useState(getCurrentTab() as number);
  const productId = useRef("" as string);
  const previousTab = useRef(0 as number);

  const getProductId = () => {
    return history.location.pathname
      .replace(EDIT_ROUTE, "")
      .replace(DETAILS_ROUTE, "");
  };

  useEffect(() => {
    productId.current = getProductId();

    if (productId.current && previousTab.current != activeTab) {
      history.push(
        activeTab === 0
          ? `${EDIT_ROUTE}${productId.current}`
          : `${DETAILS_ROUTE}${productId.current}`
      );

      previousTab.current = activeTab;
    }
  }, [activeTab]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <ModeSwitchContainer>
      {tabsTextData.map((tab, index) => (
        <ModeThumbs
          isActive={activeTab === index}
          onClick={() => handleTabChange(index)}
          key={`${tab}-${index}`}
        >
          <Target>{tab.label}</Target>
        </ModeThumbs>
      ))}
    </ModeSwitchContainer>
  );
};
