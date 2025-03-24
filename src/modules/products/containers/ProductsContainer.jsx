import React, {useState} from "react";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {Input, Pagination, Row, Space, Switch, Table, Typography} from "antd";
import Container from "../../../components/Container.jsx";
const { Link } = Typography;

const ProductsContainer = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [searchKey,setSearchKey] = useState();

    const {data,isLoading} = usePaginateQuery({
        key: KEYS.product_get_all,
        url: URLS.product_get_all,
        params: {
            params: {
                size,
                search: searchKey
            }
        },
        page
    });

    const columns = [
        {
            title: t("ID"),
            dataIndex: "id",
            key: "id",
            width: 30
        },
        {
            title: t("Code"),
            dataIndex: "code",
            key: "code",
            width: 30
        },
        {
            title: t("Name"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("Description"),
            dataIndex: "description",
            key: "description",
        },
        {
            title: t("Parent group name"),
            dataIndex: "parentGroupName",
            key: "parentGroupName",
        },
        {
            title: t("Measure unit"),
            dataIndex: "measureUnit",
            key: "measureUnit",
        },
        {
            title: t("Type"),
            dataIndex: "type",
            key: "type",
        },
        {
            title: t("Price"),
            dataIndex: "price",
            key: "price",
            width: 110,
            render: (props) => {
                return `${Intl.NumberFormat("en-US", {}).format(props)} ${t("so'm")}`
            }
        },
        {
            title: t("Image"),
            dataIndex: "imageUrl",
            key: "imageUrl",
            width: 50,
            render: (props, data) => (
                <Link href={get(data,'imageUrl')} target="_blank">{t("Image")}</Link>
            )
        },
        {
            title: t("Order"),
            dataIndex: "order",
            key: "order",
            width: 70
        },
        {
            title: t("Is deleted"),
            dataIndex: "deleted",
            key: "deleted",
            render: (props,data) => (
                <Switch disabled checked={get(data,'deleted')} />
            )
        }
    ]

    return(
      <Container>
          <Space direction={"vertical"} style={{width: "100%"}} size={"middle"}>
              <Space size={"middle"}>
                  <Input.Search
                      placeholder={t("Search")}
                      onChange={(e) => setSearchKey(e.target.value)}
                      allowClear
                  />
              </Space>

              <Table
                  columns={columns}
                  dataSource={get(data,'data.data.content',[])}
                  bordered
                  size={"middle"}
                  pagination={false}
                  loading={isLoading}
              />

              <Row justify={"end"} style={{marginTop: 10}}>
                  <Pagination
                      current={page+1}
                      onChange={(page) => setPage(page - 1)}
                      total={get(data,'data.data.totalPages') * 10 }
                      showSizeChanger={false}
                  />
              </Row>
          </Space>
      </Container>
  )
}
export default ProductsContainer
