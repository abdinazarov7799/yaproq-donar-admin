import React from 'react';
import OrderViewContainer from "../containers/OrderViewContainer.jsx";
import {useParams} from "react-router-dom";

const OrderViewPage = () => {
    const {id} = useParams();
    return <OrderViewContainer id={id} />
};

export default OrderViewPage;
