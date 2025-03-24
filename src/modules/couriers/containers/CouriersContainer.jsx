import React, {useState} from 'react';
import Container from "../../../components/Container.jsx";
import {Button, Input, Modal, Pagination, Popconfirm, Row, Space, Switch, Table} from "antd";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {EditOutlined, LockOutlined, PlusOutlined, UnlockOutlined} from "@ant-design/icons";
import useDeleteQuery from "../../../hooks/api/useDeleteQuery.js";
import CreateEditCourier from "../components/CreateEditCourier.jsx";

const CouriersContainer = () => {
    const {t} = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [searchKey,setSearchKey] = useState();
    const [isCreateModalOpenCreate, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [itemData, setItemData] = useState(null);

    const {data,isLoading} = usePaginateQuery({
        key: KEYS.courier_list,
        url: URLS.courier_list,
        params: {
            params: {
                size,
                search: searchKey
            }
        },
        page
    });

    const {mutate} = useDeleteQuery({
        listKeyId: KEYS.courier_list
    })

    const useBlock = (id) => {
        mutate({url: `${URLS.users_unban}/${id}`},{})
    }

    const columns = [
        {
            title: t("ID"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("Name"),
            dataIndex: "name",
            key: "name"
        },
        {
            title: t("Username"),
            dataIndex: "username",
            key: "username",
        },
        {
            title: t("Phone number"),
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: t("Chat id"),
            dataIndex: "chatId",
            key: "chatId",
        },
        {
            title: t("Blocked"),
            dataIndex: "blocked",
            key: "blocked",
            render: (props,data) => (
                <Switch disabled checked={get(data,'blocked')} />
            )
        },
        {
            title: t("Block / Un block"),
            width: 120,
            fixed: 'right',
            key: 'action',
            render: (props, data, index) => (
                <Space key={index}>
                    {
                        get(data,'banned') ?
                            <Popconfirm
                                title={t("Unblock")}
                                description={t("Are you really unbanned this user?")}
                                onConfirm={() => useUnBan(get(data,'id'))}
                                okText={t("Yes")}
                                cancelText={t("No")}
                            >
                                <Button type={"primary"} icon={<UnlockOutlined />}/>
                            </Popconfirm>  :
                            <Popconfirm
                                title={t("Block")}
                                description={t("Are you really banning this user?")}
                                onConfirm={() => useBan(get(data,'id'))}
                                okText={t("Yes")}
                                cancelText={t("No")}
                            >
                                <Button danger type={"primary"} icon={<LockOutlined />}/>
                            </Popconfirm>
                    }
                </Space>
            )
        },
        {
            title: t("Edit"),
            width: 80,
            fixed: 'right',
            key: 'action',
            render: (props, data, index) => (
                <Button key={index} icon={<EditOutlined />} onClick={() => {
                    setIsEditModalOpen(true)
                    setItemData(data)
                }} />
            )
        }
    ]
    return (
        <Container>
            <Space direction={"vertical"} style={{width: "100%"}} size={"middle"}>
                <Space size={"middle"}>
                    <Input.Search
                        placeholder={t("Search")}
                        onChange={(e) => setSearchKey(e.target.value)}
                        allowClear
                    />
                    <Button
                        icon={<PlusOutlined />}
                        type={"primary"}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        {t("New")}
                    </Button>
                    <Modal
                        title={t('Create')}
                        open={isCreateModalOpenCreate}
                        onCancel={() => setIsCreateModalOpen(false)}
                        footer={null}
                    >
                        <CreateEditCourier setIsModalOpen={setIsCreateModalOpen}/>
                    </Modal>
                    <Modal
                        title={t("Edit")}
                        open={isEditModalOpen}
                        onCancel={() => setIsEditModalOpen(false)}
                        footer={null}
                    >
                        <CreateEditCourier
                            itemData={itemData}
                            setIsModalOpen={setIsEditModalOpen}
                        />
                    </Modal>
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
    );
};

export default CouriersContainer;
