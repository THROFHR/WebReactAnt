import {
  DeviceControllerFindAll as getList,
  DeviceControllerRemove as RemoveItem,
  DeviceControllerUpdate as UpdateItem,
} from '@/services/ant-design-pro/device';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import UploadFile from './components/UploadFile';
type ListItem = API.DeviceResponseDto & any;
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (id: string, data: API.UpdateDeviceDto) => {
  const hide = message.loading('Configuring');
  try {
    await UpdateItem({ id }, data);
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 * @param selectedRows
 */
const handleRemove = async (selectedRows: ListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await RemoveItem({ id: selectedRows.map((row) => row.key).join(',') });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showUpload, setShowUpload] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ListItem>();
  const [selectedRowsState, setSelectedRows] = useState<ListItem[]>([]);

  const columns: ProColumns<ListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      ellipsis: true,
      search: false,
    },
    {
      title: '设备ID',
      dataIndex: 'did',
      tip: '设备ID，唯一',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowUpload(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      align: 'center',
    },
    {
      title: '型号',
      dataIndex: 'model',
      align: 'center',
      search: false,
    },
    {
      title: '创建时间',
      sorter: true,
      align: 'center',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      align: 'center',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      align: 'right',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          <FormattedMessage
            id="pages.searchTable.subscribeAlert"
            defaultMessage="Subscribe to alerts"
          />
        </a>,
      ],
    },
  ];
  const loadData = async (params: any, sort: any, filter: any) => {
    const q: any = {
      ...params,
      pageNo: params.current,
      sort,
      filter,
    };
    delete q.current;
    const resp = await getList(q);
    return resp;
  };

  return (
    <PageContainer>
      <ProTable<ListItem, API.DeviceControllerFindAllParams>
        headerTitle="列表"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setShowUpload(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={loadData}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (value: any) => {
          const success = await handleUpdate(value.id, value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showUpload) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showUpload}
        onClose={() => {
          setShowUpload(false);
        }}
        closable={false}
      >
        <UploadFile />
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
