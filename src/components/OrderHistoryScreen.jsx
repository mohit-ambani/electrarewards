import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import anime from 'animejs';
import useAppStore from '../store/useAppStore';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
  max-width: 430px;
  margin: 0 auto;
  padding-bottom: 32px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 16px;
  border-bottom: 1px solid #e8ecf1;
  position: sticky;
  top: 0;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  z-index: 10;
`;

const BackBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #e8ecf1;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1a2e;
  font-size: 16px;
  cursor: pointer;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
`;

const SummaryBar = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
`;

const SummaryCard = styled.div`
  flex: 1;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  opacity: 0;
`;

const SummaryValue = styled.p`
  font-size: 18px;
  font-weight: 800;
  color: ${(p) => p.color || '#1a1a2e'};
`;

const SummaryLabel = styled.p`
  font-size: 10px;
  color: #9ca3af;
  margin-top: 2px;
`;

const ListSection = styled.div`
  padding: 0 16px;
`;

const SectionLabel = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const OrderCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 14px;
  margin-bottom: 8px;
  opacity: 0;
  transform: translateY(12px);
`;

const OrderEmoji = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(249,115,22,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
`;

const OrderInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const OrderName = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OrderDate = styled.p`
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
`;

const OrderRight = styled.div`
  text-align: right;
  flex-shrink: 0;
`;

const OrderPoints = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: #f87171;
`;

const StatusBadge = styled.span`
  display: inline-block;
  margin-top: 3px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 9px;
  font-weight: 700;
  background: ${(p) => p.bg || 'rgba(34,197,94,0.12)'};
  color: ${(p) => p.color || '#16a34a'};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 32px;
`;

const EmptyEmoji = styled.p`
  font-size: 48px;
  margin-bottom: 12px;
`;

const EmptyTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
`;

const EmptyDesc = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-top: 6px;
  line-height: 1.5;
`;

const BrowseBtn = styled.button`
  margin-top: 20px;
  padding: 12px 32px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f97316, #ea580c);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

export default function OrderHistoryScreen() {
  const history = useHistory();
  const { redemptionHistory } = useAppStore();

  const totalSpent = redemptionHistory.reduce((sum, e) => sum + e.points, 0);
  const summaryRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    summaryRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 400,
        delay: 100 + i * 80,
        easing: 'easeOutExpo',
      });
    });

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateY: [12, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 250 + i * 60,
        easing: 'easeOutExpo',
      });
    });
  }, [redemptionHistory.length]);

  return (
    <Wrapper>
      <Header>
        <BackBtn onClick={() => history.goBack()}>
          <FiArrowLeft />
        </BackBtn>
        <HeaderTitle>Order History</HeaderTitle>
      </Header>

      <SummaryBar>
        {[
          { label: 'Total Orders', value: String(redemptionHistory.length), color: '#1a1a2e' },
          { label: 'Points Spent', value: totalSpent > 0 ? `${(totalSpent / 1000).toFixed(1)}k` : '0', color: '#f87171' },
          { label: 'Status', value: redemptionHistory.length > 0 ? 'Active' : 'New', color: '#16a34a' },
        ].map((s, i) => (
          <SummaryCard key={i} ref={(el) => (summaryRefs.current[i] = el)}>
            <SummaryValue color={s.color}>{s.value}</SummaryValue>
            <SummaryLabel>{s.label}</SummaryLabel>
          </SummaryCard>
        ))}
      </SummaryBar>

      <ListSection>
        {redemptionHistory.length > 0 ? (
          <>
            <SectionLabel>Recent Orders</SectionLabel>
            {redemptionHistory.map((entry, i) => {
              const date = new Date(entry.timestamp);
              const status = i === 0 ? 'Processing' : 'Delivered';
              const statusBg = i === 0 ? 'rgba(249,115,22,0.12)' : 'rgba(34,197,94,0.12)';
              const statusColor = i === 0 ? '#ea580c' : '#16a34a';

              return (
                <OrderCard key={entry.timestamp + '-' + i} ref={(el) => (cardRefs.current[i] = el)}>
                  <OrderEmoji>{entry.image}</OrderEmoji>
                  <OrderInfo>
                    <OrderName>{entry.name}</OrderName>
                    <OrderDate>
                      {entry.orderId ? `#${entry.orderId}` : ''}{entry.orderId ? ' · ' : ''}
                      {date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </OrderDate>
                  </OrderInfo>
                  <OrderRight>
                    <OrderPoints>-{entry.points.toLocaleString()}</OrderPoints>
                    <StatusBadge bg={statusBg} color={statusColor}>
                      {status}
                    </StatusBadge>
                  </OrderRight>
                </OrderCard>
              );
            })}
          </>
        ) : (
          <EmptyState>
            <EmptyEmoji>📦</EmptyEmoji>
            <EmptyTitle>No Orders Yet</EmptyTitle>
            <EmptyDesc>Your order history will appear here once you redeem your first gift.</EmptyDesc>
            <BrowseBtn onClick={() => history.push('/home')}>Browse Gifts</BrowseBtn>
          </EmptyState>
        )}
      </ListSection>
    </Wrapper>
  );
}
