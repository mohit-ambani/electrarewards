import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Descriptions,
  Steps,
  Button,
  Input,
  Tag,
  Typography,
  Spin,
  Avatar,
  Badge,
  Divider,
  message,
} from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  InboxOutlined,
  CarOutlined,
  RocketOutlined,
  GiftOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
  UserOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import { fetchRedemptionDetail, advanceStatus } from '../services/api';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Step } = Steps;

const STATUS_FLOW = [
  'redeemed',
  'accepted',
  'packed',
  'in_transit',
  'out_for_delivery',
  'delivered',
];

const STATUS_CONFIG = {
  redeemed: { color: '#1890ff', label: 'Redeemed', icon: <CheckCircleOutlined /> },
  accepted: { color: '#3f51b5', label: 'Accepted', icon: <SyncOutlined /> },
  packed: { color: '#722ed1', label: 'Packed', icon: <InboxOutlined /> },
  in_transit: { color: '#13c2c2', label: 'In Transit', icon: <CarOutlined /> },
  out_for_delivery: { color: '#faad14', label: 'Out for Delivery', icon: <RocketOutlined /> },
  delivered: { color: '#52c41a', label: 'Delivered', icon: <GiftOutlined /> },
};

const RedemptionDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);
  const [note, setNote] = useState('');

  const loadDetail = () => {
    setLoading(true);
    fetchRedemptionDetail(id)
      .then((res) => setData(res))
      .catch((err) => {
        console.error(err);
        message.error('Failed to load redemption details');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDetail();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAdvance = async () => {
    if (!data) return;
    setAdvancing(true);
    try {
      const result = await advanceStatus(id, note);
      message.success(
        `Status advanced: ${STATUS_CONFIG[result.previous_status]?.label} -> ${STATUS_CONFIG[result.new_status]?.label}`
      );
      setNote('');
      loadDetail();
    } catch (err) {
      console.error(err);
      message.error('Failed to advance status');
    } finally {
      setAdvancing(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 120 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <GiftOutlined style={{ fontSize: 48, color: '#ccc', marginBottom: 16 }} />
          <div style={{ color: '#999', fontSize: 16 }}>Redemption not found or failed to load.</div>
          <Button type="link" onClick={() => history.push('/admin/redemptions')} style={{ marginTop: 12 }}>
            &larr; Back to Redemptions
          </Button>
        </div>
      </Card>
    );
  }

  const currentIndex = STATUS_FLOW.indexOf(data.status);
  const nextStatus = currentIndex < STATUS_FLOW.length - 1 ? STATUS_FLOW[currentIndex + 1] : null;
  const isDelivered = data.status === 'delivered';

  // Build status log lookup by status name
  const logByStatus = {};
  if (data.status_log) {
    data.status_log.forEach((entry) => {
      logByStatus[entry.status] = entry;
    });
  }

  const userInitial = data.user_name ? data.user_name.charAt(0).toUpperCase() : '?';

  const giftGradient = data.gift_color
    ? `linear-gradient(135deg, ${data.gift_color}, ${data.gift_color}99)`
    : 'linear-gradient(135deg, #667eea, #764ba2)';

  return (
    <div>
      <Button
        type="link"
        onClick={() => history.push('/admin/redemptions')}
        style={{ padding: 0, marginBottom: 16 }}
      >
        &larr; Back to Redemptions
      </Button>

      <Row gutter={[24, 24]}>
        {/* Left column */}
        <Col xs={24} lg={16}>
          {/* Order header */}
          <Card style={{ marginBottom: 24 }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={4} style={{ margin: 0 }}>
                  Order {data.order_id}
                </Title>
                <Text type="secondary">
                  <ClockCircleOutlined style={{ marginRight: 4 }} />
                  Created: {new Date(data.created_at).toLocaleString()}
                </Text>
              </Col>
              <Col>
                <Badge
                  count={STATUS_CONFIG[data.status]?.label || data.status}
                  style={{
                    backgroundColor: STATUS_CONFIG[data.status]?.color,
                    fontSize: 14,
                    padding: '0 12px',
                    height: 28,
                    lineHeight: '28px',
                  }}
                />
              </Col>
            </Row>
            <Divider style={{ margin: '16px 0' }} />
            <Descriptions column={{ xs: 1, sm: 2, md: 3 }} size="small">
              <Descriptions.Item label="Docket Number">
                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                  {data.docket_number || '--'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="OTP">
                <Tag color="red" style={{ fontFamily: 'monospace', fontWeight: 700 }}>
                  {data.otp || '--'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Points Spent">
                <span style={{ fontWeight: 700, color: '#faad14', fontSize: 16 }}>
                  {data.points_spent?.toLocaleString()}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {new Date(data.updated_at).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Status timeline */}
          <Card title="Status Timeline" style={{ marginBottom: 24 }}>
            <Steps
              direction="vertical"
              current={currentIndex}
              size="small"
              style={{ maxWidth: 600 }}
            >
              {STATUS_FLOW.map((status, idx) => {
                const cfg = STATUS_CONFIG[status];
                const log = logByStatus[status];
                let stepStatus = 'wait';
                if (idx < currentIndex) stepStatus = 'finish';
                else if (idx === currentIndex) stepStatus = 'process';

                return (
                  <Step
                    key={status}
                    title={cfg.label}
                    status={stepStatus}
                    icon={cfg.icon}
                    description={
                      log ? (
                        <div>
                          {log.note && (
                            <div style={{ color: '#555' }}>{log.note}</div>
                          )}
                          <div style={{ color: '#999', fontSize: 12 }}>
                            {new Date(log.timestamp || log.created_at).toLocaleString()}
                          </div>
                        </div>
                      ) : null
                    }
                  />
                );
              })}
            </Steps>
          </Card>

          {/* Customer card */}
          <Card title="Customer" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar
                size={56}
                style={{
                  backgroundColor: '#1890ff',
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                {userInitial}
              </Avatar>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>
                  <UserOutlined style={{ marginRight: 6 }} />
                  {data.user_name}
                </div>
                <div style={{ color: '#888' }}>
                  <MailOutlined style={{ marginRight: 6 }} />
                  {data.user_email}
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Right column */}
        <Col xs={24} lg={8}>
          {/* Gift card */}
          <Card
            style={{ marginBottom: 24, overflow: 'hidden' }}
            bodyStyle={{ padding: 0 }}
          >
            <div
              style={{
                background: giftGradient,
                padding: '32px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 8 }}>
                {data.gift_image || '🎁'}
              </div>
              <div
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {data.gift_name}
              </div>
            </div>
            <div style={{ padding: 20 }}>
              {data.gift_description && (
                <p style={{ color: '#666', marginBottom: 16 }}>
                  {data.gift_description}
                </p>
              )}
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Category">
                  <Tag>{data.gift_category}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Points Required">
                  <span style={{ fontWeight: 700 }}>
                    {data.gift_points?.toLocaleString()}
                  </span>
                </Descriptions.Item>
                {data.gift_rating && (
                  <Descriptions.Item label="Rating">
                    {'★'.repeat(Math.round(data.gift_rating))}{' '}
                    <span style={{ color: '#999' }}>({data.gift_rating})</span>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          </Card>

          {/* Advance status card */}
          <Card
            title="Advance Status"
            style={{ marginBottom: 24 }}
          >
            {isDelivered ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <GiftOutlined
                  style={{ fontSize: 40, color: '#52c41a', marginBottom: 8 }}
                />
                <div style={{ color: '#52c41a', fontWeight: 600, fontSize: 16 }}>
                  Delivered Successfully
                </div>
                <Text type="secondary">
                  This order has reached its final status.
                </Text>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    marginBottom: 20,
                    padding: '12px 0',
                  }}
                >
                  <Tag
                    color={STATUS_CONFIG[data.status]?.color}
                    style={{ fontSize: 14, padding: '4px 12px' }}
                  >
                    {STATUS_CONFIG[data.status]?.label}
                  </Tag>
                  <ArrowRightOutlined style={{ fontSize: 18, color: '#999' }} />
                  <Tag
                    color={STATUS_CONFIG[nextStatus]?.color}
                    style={{ fontSize: 14, padding: '4px 12px' }}
                  >
                    {STATUS_CONFIG[nextStatus]?.label}
                  </Tag>
                </div>
                <TextArea
                  rows={3}
                  placeholder="Add a note (optional)..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ marginBottom: 16 }}
                />
                <Button
                  type="primary"
                  block
                  size="large"
                  loading={advancing}
                  onClick={handleAdvance}
                >
                  Advance to {STATUS_CONFIG[nextStatus]?.label}
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RedemptionDetail;
