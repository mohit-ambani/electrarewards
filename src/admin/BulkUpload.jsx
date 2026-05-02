import React, { useState } from 'react';
import { Card, Upload, Button, message, Alert, Table, Typography, Row, Col, Divider } from 'antd';
import {
  UploadOutlined,
  SendOutlined,
  NumberOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { bulkDispatch, bulkDocket, bulkDelivered } from '../services/api';

const { Title, Text } = Typography;

const uploadCards = [
  {
    key: 'dispatch',
    title: 'Bulk Dispatch',
    description: 'Upload Excel with order IDs to mark orders as dispatched (in transit)',
    icon: <SendOutlined style={{ fontSize: 28, color: '#1890ff' }} />,
    color: '#e6f7ff',
    borderColor: '#91d5ff',
    apiFn: bulkDispatch,
    columns: ['order_id'],
  },
  {
    key: 'docket',
    title: 'Assign Docket Numbers',
    description: 'Upload Excel with order IDs and docket/AWB numbers',
    icon: <NumberOutlined style={{ fontSize: 28, color: '#722ed1' }} />,
    color: '#f9f0ff',
    borderColor: '#d3adf7',
    apiFn: bulkDocket,
    columns: ['order_id', 'docket_number'],
  },
  {
    key: 'delivered',
    title: 'Bulk Delivered',
    description: 'Upload Excel with order IDs to mark orders as delivered',
    icon: <CheckCircleOutlined style={{ fontSize: 28, color: '#52c41a' }} />,
    color: '#f6ffed',
    borderColor: '#b7eb8f',
    apiFn: bulkDelivered,
    columns: ['order_id'],
  },
];

const errorColumns = [
  { title: 'Order ID', dataIndex: 'order_id', key: 'order_id' },
  { title: 'Reason', dataIndex: 'reason', key: 'reason' },
];

function UploadCard({ config }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await config.apiFn(file);
      setResult(data);
      message.success(data.message);
    } catch (err) {
      const msg = err.response?.data?.error || 'Upload failed';
      message.error(msg);
      setResult({ error: msg });
    } finally {
      setLoading(false);
    }
    return false;
  };

  return (
    <Card
      style={{
        borderRadius: 12,
        border: `1px solid ${config.borderColor}`,
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: config.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {config.icon}
        </div>
        <div>
          <Title level={5} style={{ margin: 0 }}>{config.title}</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>{config.description}</Text>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <Text type="secondary" style={{ fontSize: 11 }}>
          Required columns: {config.columns.join(', ')}
        </Text>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Upload
          accept=".xlsx,.xls"
          showUploadList={false}
          beforeUpload={handleUpload}
        >
          <Button icon={<UploadOutlined />} loading={loading} type="primary">
            Upload Excel
          </Button>
        </Upload>
        <Button
          icon={<DownloadOutlined />}
          href={`/api/admin/bulk/template/${config.key}`}
        >
          Template
        </Button>
      </div>

      {result && !result.error && (
        <div>
          <Alert
            type="success"
            showIcon
            message={result.message}
            style={{ marginBottom: 12, borderRadius: 8 }}
          />
          <Row gutter={12}>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center', borderRadius: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{result.total}</div>
                <div style={{ fontSize: 11, color: '#999' }}>Total</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center', borderRadius: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#52c41a' }}>{result.updated}</div>
                <div style={{ fontSize: 11, color: '#999' }}>Updated</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center', borderRadius: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#faad14' }}>{result.skipped}</div>
                <div style={{ fontSize: 11, color: '#999' }}>Skipped</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center', borderRadius: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#ff4d4f' }}>{result.errors?.length || 0}</div>
                <div style={{ fontSize: 11, color: '#999' }}>Errors</div>
              </Card>
            </Col>
          </Row>

          {result.errors?.length > 0 && (
            <>
              <Divider style={{ margin: '12px 0' }} />
              <Table
                dataSource={result.errors.map((e, i) => ({ ...e, key: i }))}
                columns={errorColumns}
                size="small"
                pagination={false}
                style={{ borderRadius: 8 }}
              />
            </>
          )}
        </div>
      )}

      {result?.error && (
        <Alert type="error" showIcon message={result.error} style={{ borderRadius: 8 }} />
      )}
    </Card>
  );
}

export default function BulkUpload() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>Bulk Upload</Title>
        <Text type="secondary">
          Upload Excel files to update order statuses in bulk
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {uploadCards.map((config) => (
          <Col xs={24} lg={8} key={config.key}>
            <UploadCard config={config} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
