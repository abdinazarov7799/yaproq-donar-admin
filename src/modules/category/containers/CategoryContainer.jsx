import React, {useState} from "react";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {Pagination, Row, Space, Switch, Table} from "antd";
import Container from "../../../components/Container.jsx";

const CategoryContainer = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const {data,isLoading} = usePaginateQuery({
        key: KEYS.category_get_all,
        url: URLS.category_get_all,
        params: {
            params: {
                size,
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
            title: t("Name"),
            dataIndex: "name",
            key: "name"
        },
        {
            title: t("Description"),
            dataIndex: "description",
            key: "description",
        },
        {
            title: t("Order"),
            dataIndex: "_order",
            key: "_order",
            width: 70
        },
        {
            title: t("Is included in menu"),
            dataIndex: "isIncludedInMenu",
            key: "isIncludedInMenu",
            width: 150,
            render: (props,data) => (
                <Switch disabled checked={get(data,'isIncludedInMenu')} />
            )
        },
        {
            title: t("Is deleted"),
            dataIndex: "isDeleted",
            key: "isDeleted",
            width: 150,
            render: (props,data) => (
                <Switch disabled checked={get(data,'isDeleted')} />
            )
        }
    ]

    return(
      <Container>
          <Space direction={"vertical"} style={{width: "100%"}} size={"middle"}>
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
export default CategoryContainer
