import { removeRule, rule, updateRule } from '@/services/ant-design-pro/rule';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { FormValueType } from '../components/UpdateForm';
import UpdateForm from '../components/UpdateForm';
import UploadFile from '../components/UploadFile';

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
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
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.MediaListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
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
  const [fileGroupEnum, setFileGroupEnum] = useState({} as any);
  const [fileGroupList, setFileGroupList] = useState<API.FileGroup[]>([] as any);

  useEffect(() => {
    const obj = {};
    fileGroupList.forEach((item) => {
      obj[item.id] = item.name;
    });
    setFileGroupEnum(obj);
  }, [fileGroupList]);

  useEffect(() => {
    setFileGroupList([{ id: 1, name: '测试' }]);
  }, []);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showUpload, setShowUpload] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.MediaListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.MediaListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.MediaListItem>[] = [
    {
      title: <FormattedMessage id="fileKey" defaultMessage="文件ID" />,
      dataIndex: 'fileKey',
      width: 100,
      ellipsis: true,
      search: false,
    },
    {
      title: <FormattedMessage id="fileName" defaultMessage="文件名" />,
      dataIndex: 'name',
      tip: 'The rule name is the unique key',
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
      title: <FormattedMessage id="fileType" defaultMessage="文件类型" />,
      dataIndex: 'fileType',
      align: 'center',
      valueEnum: {
        image: {
          text: <FormattedMessage id="fileType.image" defaultMessage="图片" />,
          status: 'Default',
        },
        video: {
          text: <FormattedMessage id="fileType.video" defaultMessage="视频" />,
          status: 'Processing',
        },
        file: {
          text: <FormattedMessage id="fileType.file" defaultMessage="文件" />,
          status: 'Success',
        },
      },
    },
    {
      title: <FormattedMessage id="fileSize" defaultMessage="Size" />,
      dataIndex: 'fileSize',
      align: 'center',
      valueType: 'textarea',
      search: false,
    },
    {
      title: <FormattedMessage id="createdAt" defaultMessage="上传时间" />,
      sorter: true,
      align: 'center',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: <FormattedMessage id="fileGroupId" defaultMessage="分组" />,
      dataIndex: 'fileGroupId',
      align: 'center',
      valueType: 'select',
      valueEnum: fileGroupEnum,
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

  return (
    <PageContainer>
      <ProTable<API.MediaListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
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
        request={rule}
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
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
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
