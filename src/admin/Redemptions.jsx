import React, { useState, useEffect, useCallback } from 'react';
import {
  Input,
  Select,
  Button,
  Table,
  Tag,
  Space,
  Card,
  Empty,
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { fetchRedemptions } from '../services/api';

const { Option } = Select;

const STATUS_FLOW = [
  'redeemed',
  'accepted',
  'packed',
  'in_transit',
  'out_for_delivery',
  'delivered',
];

const STATUS_CONFIG = {
  redeemed: { color: 'blue', label: 'Redeemed' },
  accepted: { color: 'geekblue', label: 'Accepted' },
  packed: { color: 'purple', label: 'Packed' },
  in_transit: { color: 'cyan', label: 'In Transit' },
  out_for_delivery: { color: 'orange', label: 'Out for Delivery' },
  delivered: { color: 'green', label: 'Delivered' },
};

const CATEGORIES = [
  'Electronics',
  'Home & Kitchen',
  'Fashion',
  'Sports',
  'Books',
  'Toys',
  'Beauty',
  'Food',
];

const GIFT_EMOJIS = {
  Electronics: '📱',
  'Home & Kitchen': '🏠',
  Fashion: '👗',
  Sports: '⚽',
  Books: '📚',
  Toys: '🧸',
  Beauty: '💄',
  Food: '🍕',
};

const Redemptions = () => {
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const history = useHistory();

  const loadData = useCallback(
    (params = {}) => {
      setLoading(true);
      const filters = {
        search: params.search !== undefined ? params.search : search,
        status: params.status !== undefined ? params.status : status,
        category: params.category !== undefined ? params.category : category,
      };

      // Remove empty/undefined values
      Object.keys(filters).forEach((key) => {
        if (!filters[key]) delete filters[key];
      });

      fetchRedemptions(filters)
        .then((res) => setRedemptions(res))
        .catch(console.error)
        .finally(() => setLoading(false));
    },
    [search, status, category]
  );

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilter = () => {
    loadData();
  };

  const handleClear = () => {
    setSearch('');
    setStatus(undefined);
    setCategory(undefined);
    loadData({ search: '', status: undefined, category: undefined });
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
      render: (text) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Gift',
      key: 'gift',
      render: (_, record) => {
        const emoji = GIFT_EMOJIS[record.gift_category] || '🎁';
        return (
          <span>
            {emoji} {record.gift_name}
          </span>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'gift_category',
      key: 'gift_category',
      render: (cat) => <Tag>{cat}</Tag>,
    },
    {
      title: 'Points',
      dataIndex: 'points_spent',
      key: 'points_spent',
      render: (pts) => (
        <span style={{ fontWeight: 600 }}>{pts?.toLocaleString()}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s) => {
        const cfg = STATUS_CONFIG[s] || {};
        return <Tag color={cfg.color}>{cfg.label || s}</Tag>;
      },
    },
    {
      title: 'Docket',
      dataIndex: 'docket_number',
      key: 'docket_number',
      render: (text) =>
        text ? (
          <span style={{ fontFamily: 'monospace' }}>{text}</span>
        ) : (
          <span style={{ color: '#bbb' }}>--</span>
        ),
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
      {/* Filter bar */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Space wrap size="middle">
          <Input
            placeholder="Search by order ID, gift, or customer..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={handleFilter}
            style={{ width: 300 }}
            allowClear
          />
          <Select
            placeholder="Status"
            value={status}
            onChange={(val) => setStatus(val)}
            style={{ width: 180 }}
            allowClear
          >
            {STATUS_FLOW.map((s) => (
              <Option key={s} value={s}>
                {STATUS_CONFIG[s].label}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Category"
            value={category}
            onChange={(val) => setCategory(val)}
            style={{ width: 180 }}
            allowClear
          >
            {CATEGORIES.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={handleFilter}
          >
            Filter
          </Button>
          <Button icon={<ClearOutlined />} onClick={handleClear}>
            Clear
          </Button>
        </Space>
      </Card>

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={redemptions}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 15, showSizeChanger: true }}
          size="middle"
          locale={{
            emptyText: (
              <Empty
                description="No redemptions found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Card>
    </div>
  );
};

export default Redemptions;
