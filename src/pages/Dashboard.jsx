import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurants,
  filterRestaurants,
} from "../redux/restaurantsReducer/actions";
import Header from "./../components/Header/Header";
import Footer from "./../components/Footer/Footer";
import {
  Card,
  Cascader,
  Col,
  Layout,
  Row,
  Rate,
  Select,
  Spin,
} from "antd";
import styled from "styled-components";
import {
  DatabaseTwoTone,
  FlagTwoTone,
  FunnelPlotTwoTone,
  ShopTwoTone,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./../components/styles/Content.css";

const { Content } = Layout;
const { Option, OptGroup } = Select;

const Dashboard = () => {
  const dispatch = useDispatch();
  const restos = useSelector((state) => state.restaurants.restos);
  const filteredRestos = useSelector(
    (state) => state.restaurants.filteredRestos
  );
  const isRestosLoading = useSelector(
    (state) => state.restaurants.isRestosLoading
  );

  if (restos.length) {
    var categories = Object.keys(restos[0]),
      categoryItems = {};

    categories.forEach((category) => {
      categoryItems[category] = new Set();
      restos.forEach((resto) => categoryItems[category].add(resto[category]));
    });

    categoryItems["Year"] = new Set();
    categoryItems["Rank"] = new Set();

    categoryItems["Top Ten"].forEach((ele) => {
      categoryItems["Year"].add(ele.split(" ")[0]);
      categoryItems["Rank"].add(ele.split(" ")[1]);
    });

    categories.splice(5, 1, "Year", "Rank");
    delete categoryItems["Top Ten"];

    categories.forEach(
      (category) =>
        (categoryItems[category] = Array.from(categoryItems[category]).filter(
          (item) => item && item !== "NaN"
        ))
    );

    var options = [];

    categories
      .filter((category) => category !== "Variety")
      .forEach((category, i) => {
        options.push({ label: category, value: category, children: [] });
        categoryItems[category].forEach((item) => {
          options[i].children.push({ label: item, value: item });
        });
      });
  }

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const handleFilterChange = (value) => {
    let [category, item] = value;

    const payload = {
      category,
      item,
    };
    dispatch(filterRestaurants(payload));
  };

  return (
    <>
      <Header />
      <Content>
        <FilterRow justify="center">
          <FilterContainer
            xs={{ span: 22 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
          >
            <Select
              onChange={handleFilterChange}
              placeholder="Search Restaurants..."
              showSearch
              style={{ width: "100%" }}
            >
              {categories &&
                categories.map((category, index) => (
                  <OptGroup label={category} key={index}>
                    {categoryItems[category].map((item, index) => (
                      <Option key={index} value={[category, item]}>
                        {item}
                      </Option>
                    ))}
                  </OptGroup>
                ))}
            </Select>
            <FilterBar>
              <LabelContainer>
                <DatabaseTwoTone twoToneColor={"green"} />{" "}
                <BoldText>Restaurants</BoldText>
              </LabelContainer>
              <FilterBox>
                <FunnelPlotTwoTone
                  style={{ fontSize: "1rem" }}
                  twoToneColor={"green"}
                />
                <FilterLabel>Filter</FilterLabel>
                <Cascader
                  options={options}
                  onChange={handleFilterChange}
                  placeholder="Please select"
                />
              </FilterBox>
            </FilterBar>
          </FilterContainer>
        </FilterRow>

        {isRestosLoading ? (
          <SpinWrapper>
            <Spin />
          </SpinWrapper>
        ) : (
          filteredRestos.map((resto, index) => (
            <StyledRow key={index} justify="center">
              <Col
                xs={{ span: 22 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 12 }}
              >
                <Card
                  type="inner"
                  title={
                    <CardTitle>
                      <IconContainer>
                        <ShopTwoTone twoToneColor={"green"} />
                      </IconContainer>
                      {resto.Brand}
                    </CardTitle>
                  }
                  extra={
                    <CardExtra>
                      {" "}
                      <Year>{resto["Top Ten"].split(" ")[0]}</Year>
                      <Rank>{resto["Top Ten"].split(" ")[1]}</Rank>
                    </CardExtra>
                  }
                >
                  <DetailRow>
                    <Title>Variety:</Title>
                    <Value>{resto.Variety}</Value>
                  </DetailRow>
                  <DetailRow>
                    <Title>Style:</Title>
                    <Value>{resto.Style}</Value>
                  </DetailRow>
                  <DetailRow>
                    <IconContainer>
                      <FlagTwoTone twoToneColor={"green"} />:
                    </IconContainer>
                    <Value>{resto.Country}</Value>
                  </DetailRow>
                  <DetailRow>
                    <Rate allowHalf disabled defaultValue={resto.Stars} />
                  </DetailRow>
                </Card>
              </Col>
            </StyledRow>
          ))
        )}
      </Content>
      <Footer />
    </>
  );
};

export default Dashboard;

const FilterContainer = styled(Col)`
  box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 15%);
  padding: 0.5rem 0.5rem 0 0.5rem;
`;
const FilterRow = styled(Row)`
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
`;
const LabelContainer = styled.div`
  justify-self: start;
`;
const FilterBar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`;
const FilterLabel = styled.span`
  margin: 0 0.5rem;
`;
const BoldText = styled.b`
  font-size: 1rem;
  margin-left: 0.5rem;
`;
const SpinWrapper = styled.div`
  display: grid;
  height: 70vh;
  place-items: center;
  width: 100vw;
`;
const StyledRow = styled(Row)`
  margin: 1rem 0;
`;
const FilterBox = styled.div`
  justify-self: end;
`;
const IconContainer = styled.div`
  margin-right: 0.375rem;
`;

const CardTitle = styled.div`
  display: flex;
`;
const Title = styled.i`
  font-weight: 700;
`;
const Value = styled.i`
  margin-left: 0.25rem;
`;
const DetailRow = styled.div`
  align-items: center;
  display: flex;
  font-size: 1rem;
  margin: 0.25rem;
`;

const CardExtra = styled.div`
  align-items: center;
  display: flex;
  font-size: 1rem;
`;
const Year = styled.div`
  color: #212529;
  margin-right: 0.375rem;
`;

const Rank = styled.div`
  color: #ff5f3b;
`;
