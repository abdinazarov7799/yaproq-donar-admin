import React, {useState} from 'react';
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {Checkbox, Pagination, Row, Space, Table, Typography} from "antd";
import {get} from "lodash";
import Container from "../../../components/Container.jsx";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {useTranslation} from "react-i18next";

const OrdersContainer = () => {
    const [page, setPage] = useState(0);
    const {t} = useTranslation();
    const {data,isLoading} = usePaginateQuery({
        key: KEYS.order_list,
        url: URLS.order_list,
        params: {
            params: {
                size: 10,
            }
        },
        page
    })

    const getStatusColor = (status) => {
        switch (status) {
            case "DELIVERED": return "#08dd24";
            case "ACCEPTED": return "#1631ef";
            case "NOT_COMPLETE": return "#c9cf17";
            case "REJECTED": return "red";
        }
    }

    const columns = [
        {
            title: t("ID"),
            dataIndex: "id",
            key: "id",
            width: 30
        },
        {
            title: t("Status"),
            dataIndex: "status",
            key: "status",
            render: status => <Typography.Text style={{color: getStatusColor(status)}}>{t(status)}</Typography.Text>
        },
        {
            title: t("Branch"),
            dataIndex: "branch",
            key: "branch",
        },
        {
            title: t("Courier"),
            dataIndex: "courier",
            key: "courier",
        },
        {
            title: t("Payment provider"),
            dataIndex: "paymentProvider",
            key: "paymentProvider",
        },
        {
            title: t("Price"),
            dataIndex: "price",
            key: "price",
            render: (props) => `${Intl.NumberFormat("en-US").format(props)} ${t("so'm")}`
        },
        {
            title: t("Delivery price"),
            dataIndex: "deliveryPrice",
            key: "deliveryPrice",
            render: (props) => `${Intl.NumberFormat("en-US").format(props)} ${t("so'm")}`
        },
        {
            title: t("Total price"),
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (props) => `${Intl.NumberFormat("en-US").format(props)} ${t("so'm")}`
        },
        {
            title: t("delivery"),
            dataIndex: "delivery",
            key: "delivery",
            width: 150,
            render: (props) => (
                <Checkbox checked={props} />
            )
        }
    ]

    return (
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
    );
};

export default OrdersContainer;
