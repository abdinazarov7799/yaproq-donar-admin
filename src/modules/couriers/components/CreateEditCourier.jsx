import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {Button, Form, Input} from "antd";
import {get} from "lodash";
import usePatchQuery from "../../../hooks/api/usePatchQuery.js";

const CreateEditCourier = ({itemData,setIsModalOpen,refetch}) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const { mutate, isLoading } = usePostQuery({
        listKeyId: KEYS.courier_list,
    });
    const { mutate:mutateEdit, isLoading:isLoadingEdit } = usePatchQuery({
        listKeyId: KEYS.courier_list,
        hideSuccessToast: false
    });


    useEffect(() => {
        form.setFieldsValue({
            chatId: get(itemData,'chatId'),
            name: get(itemData,'name'),
            phoneNumber: get(itemData,'phoneNumber'),
            username: get(itemData,'username'),
        });
    }, [itemData]);

    const onFinish = (values) => {
        if (itemData){
            mutateEdit(
                { url: `${URLS.courier_edit}/${get(itemData,'id')}`, attributes: values },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        refetch()
                    },
                }
            );
        }else {
            mutate(
                { url: URLS.courier_add, attributes: values },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        refetch()
                    },
                }
            );
        }
    };

    return (
        <>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                layout={"vertical"}
                form={form}
            >
                <Form.Item
                    label={t("Chat id")}
                    name="chatId"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("Name")}
                    name="name"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("Username")}
                    name="username"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("Phone number")}
                    name="phoneNumber"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={isLoading || isLoadingEdit}>
                        {itemData ? t("Edit") : t("Create")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateEditCourier;
