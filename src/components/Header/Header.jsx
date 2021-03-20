import React from "react";
import { Layout } from "antd";
import { StarFilled } from "@ant-design/icons";
import styled from "styled-components";
import "antd/dist/antd.css";
import "./Header.css";

const { Header: HeaderBar } = Layout;

const Header = () => {
  return (
    <Layout>
      <HeaderWrapper>
        <StarFilled style={{ color: "green", fontSize: "1rem" }} />
        <HeaderText>TopRamen</HeaderText>
        <StarFilled style={{ color: "green", fontSize: "1rem" }} />
      </HeaderWrapper>
    </Layout>
  );
};

export default Header;

const HeaderWrapper = styled(HeaderBar)`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const HeaderText = styled.h1`
  margin: 0 0.5rem;
  font-style: italic;
  font-weight: 700;
  font-size: 1.5rem;
`;
