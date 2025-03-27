import React from 'react';
import OrderContainer from "../containers/OrderContainer.jsx";
import {useParams} from "react-router-dom";

const OrderPage = () => {
    const {id} = useParams();
    return <OrderContainer id={id} />
};

export default OrderPage;
