import React, {useState} from 'react';
import useGetOneQuery from "../../../hooks/api/useGetOneQuery.js";
import OverlayLoader from "../../../components/OverlayLoader.jsx";
import Container from "../../../components/Container.jsx";
import {Button, Descriptions, notification, Select, Space} from "antd";
import {useTranslation} from "react-i18next";
import {get, isArray, isEmpty} from "lodash";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import usePutQuery from "../../../hooks/api/usePutQuery.js";

const OrderViewContainer = ({id}) => {
    const {t} = useTranslation();
    const [selected, setSelected] = useState(null);
    const {data,isLoading} = useGetOneQuery({
        key: 'order',
        url: '/api/order/get',
        id,
        enabled: !!id
    })

    const {data:couriers,isLoading:isLoadingCouriers} = useGetAllQuery({
        key: KEYS.courier_list,
        url: URLS.courier_list
    })

    const {mutate,isLoading:isLoadingMutate} = usePutQuery({})

    const couriersList = isArray(get(couriers,'data.data.content')) ? get(couriers,'data.data.content') : [];

    const options = !isEmpty(couriersList) && couriersList?.map(courier => {
        return {
            label: `${get(courier,'name')} / ${get(courier,'phoneNumber')}`,
            value: get(courier,'id'),
        }
    })

    const handleAttach = () => {
        mutate(
            { url: `api/order/link-courier/${id}/${selected}` },
            {
                onSuccess: () => {
                    notification.success({message: t("Success")})
                },
            }
        );
    }

    const items = [
        {
            key: 'id',
            label: t("ID"),
            children: get(data,'data.data.id')
        },
        {
            key: 'branch',
            label: t("Branch"),
            children: get(data,'data.data.branch')
        },
        {
            key: 'price',
            label: t("Price"),
            children: Intl.NumberFormat('en-US').format(get(data,'data.data.price'))
        },
        {
            key: 'totalPrice',
            label: t("Total price"),
            children: Intl.NumberFormat('en-US').format(get(data,'data.data.totalPrice'))
        },
        {
            key: 'deliveryPrice',
            label: t("Delivery price"),
            children: Intl.NumberFormat('en-US').format(get(data,'data.data.deliveryPrice'))
        },
        {
            key: 'paymentProvider',
            label: t("Payment provider"),
            children: get(data,'data.data.paymentProvider')
        },
        {
            key: 'courier',
            label: t("Courier"),
            children: get(data,'data.data.courier')
        },
        {
            key: 'delivery',
            label: t("Delivery"),
            children: get(data,'data.data.delivery') ? 'true' : 'false'
        },
    ]

    if (isLoading) {
        return <OverlayLoader />
    }

    return (
        <Container>
            <Space size={"middle"} style={{width: "100%"}} direction={'vertical'}>
                <Descriptions title={t("Order info")} items={items} bordered column={1} />

                <Select options={options} style={{width:'100%'}} onSelect={(e) => setSelected(e)} loading={isLoadingCouriers}/>
                <Button onClick={handleAttach} block type={"primary"} loading={isLoadingMutate}>{t("Attach courier")}</Button>
            </Space>
        </Container>
    );
};

export default OrderViewContainer;
