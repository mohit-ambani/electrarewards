import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Typography,
  Spin,
} from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  InboxOutlined,
  CarOutlined,
  RocketOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { fetchDashboard } from '../services/api';

const { Title } = Typography;

const STATUS_CONFIG = {
  redeemed: { color: '#1890ff', bg: '#e6f7ff', label: 'Redeemed', icon: <ShoppingCartOutlined /> },
  accepted: { color: '#3f51b5', bg: '#e8eaf6', label: 'Accepted', icon: <CheckCircleOutlined /> },
  packed: { color: '#722ed1', bg: '#f9f0ff', label: 'Packed', icon: <InboxOutlined /> },
  in_transit: { color: '#13c2c2', bg: '#e6fffb', label: 'In Transit', icon: <CarOutlined /> },
  out_for_delivery: { color: '#faad14', bg: '#fffbe6', label: 'Out for Delivery', icon: <RocketOutlined /> },
  delivered: { color: '#52c41a', bg: '#f6ffed', label: 'Delivered', icon: <GiftOutlined /> },
};

const STATUS_FLOW = ['redeemed', 'accepted', 'packed', 'in_transit', 'out_for_delivery', 'delivered'];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchDashboard()
      .then((res) => setData(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 120 }}>
        <Spin size="large" />
      </div>
    );
  }

  const counts = data?.counts || {};
  const total = data?.total || 0;
  const total_points = data?.total_points || 0;
  const recent = data?.recent || [];

  const chartOptions = {
    chart: { type: 'donut' },
    labels: STATUS_FLOW.map((s) => STATUS_CONFIG[s].label),
    colors: STATUS_FLOW.map((s) => STATUS_CONFIG[s].color),
    legend: { position: 'bottom' },
    plotOptions: {
      pie: {
        donut: {
          size: '55%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: () => total,
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { width: 300 }, legend: { position: 'bottom' } },
      },
    ],
  };

  const chartSeries = STATUS_FLOW.map((s) => counts[s] || 0);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
      render: (text) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{text}</span>
      ),
    },
    {
      title: 'Gift',
      key: 'gift',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {record.gift_image && (
            <img
              src={record.gift_image}
              alt={record.gift_name}
              style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover' }}
            />
          )}
          <span>{record.gift_name}</span>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'gift_category',
      key: 'gift_category',
      render: (cat) => <Tag>{cat}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const cfg = STATUS_CONFIG[status] || {};
        return <Tag color={cfg.color}>{cfg.label || status}</Tag>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (d) => new Date(d).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <a onClick={() => history.push(`/admin/redemptions/${record.id}`)}>
          View
        </a>
      ),
    },
  ];

  return (
    <div>
      <Title level={4} style={{ marginBottom: 20 }}>
        Status Overview
      </Title>

      {/* Status count cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {STATUS_FLOW.map((status) => {
          const cfg = STATUS_CONFIG[status];
          return (
            <Col xs={12} sm={8} md={4} key={status}>
              <Card
                size="small"
                style={{
                  borderLeft: `4px solid ${cfg.color}`,
                  background: cfg.bg,
                }}
                bodyStyle={{ padding: '16px 12px' }}
              >
                <Statistic
                  title={
                    <span style={{ color: cfg.color, fontSize: 12 }}>
                      {cfg.label}
                    </span>
                  }
                  value={counts[status] || 0}
                  prefix={React.cloneElement(cfg.icon, {
                    style: { color: cfg.color },
                  })}
                  valueStyle={{ color: cfg.color, fontSize: 24 }}
                />
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Summary cards + chart */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #ff9800, #f44336)',
              border: 'none',
            }}
            bodyStyle={{ padding: 24 }}
          >
            <Statistic
              title={
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Total Redemptions
                </span>
              }
              value={total}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#fff', fontSize: 32 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #2196f3, #673ab7)',
              border: 'none',
            }}
            bodyStyle={{ padding: 24 }}
          >
            <Statistic
              title={
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Total Points Redeemed
                </span>
              }
              value={total_points}
              prefix={<StarOutlined />}
              valueStyle={{ color: '#fff', fontSize: 32 }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Status Distribution" size="small">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="donut"
              height={250}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent redemptions table */}
      <Card title="Recent Redemptions" style={{ marginBottom: 24 }}>
        <Table
          columns={columns}
          dataSource={recent}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default Dashboard;
