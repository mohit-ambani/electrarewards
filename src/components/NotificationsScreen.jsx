import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import anime from 'animejs';
import useAppStore from '../store/useAppStore';

const floatParticle = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0; }
  50% { transform: translateY(-50px); opacity: 1; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const notifColorMap = {
  redeemed: {
    bg: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.03))',
    border: 'rgba(249,115,22,0.25)',
  },
  confirmed: {
    bg: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.03))',
    border: 'rgba(34,197,94,0.25)',
  },
  shipped: {
    bg: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.03))',
    border: 'rgba(59,130,246,0.25)',
  },
  delivered: {
    bg: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.03))',
    border: 'rgba(168,85,247,0.25)',
  },
};

const Wrapper = styled.div`
  min-height: 100vh;
  background: #020617;
  max-width: 430px;
  margin: 0 auto;
  padding-bottom: 96px;
`;

const HeaderGradient = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #4338ca, #8b5cf6, #7c3aed);
  padding: 48px 20px 32px;
`;

const HeaderBubble1 = styled.div`
  position: absolute;
  right: -32px;
  top: -32px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  filter: blur(2px);
`;

const HeaderBubble2 = styled.div`
  position: absolute;
  left: -24px;
  bottom: 0;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
`;

const HeaderParticle = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  left: ${(p) => 20 + p.idx * 15}%;
  top: ${(p) => 50 + (p.idx % 3) * 10}%;
  animation: ${floatParticle} 3s ease-in-out ${(p) => p.idx * 0.4}s infinite;
`;

const BackBtn = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(8px);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
`;

const HeaderContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 10;
  opacity: 0;
  transform: scale(0);
`;

const BellEmoji = styled.span`
  font-size: 40px;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  margin-top: 8px;
`;

const HeaderSub = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.8);
  margin-top: 4px;
`;

const ContentArea = styled.div`
  margin: -16px 16px 0;
  position: relative;
  z-index: 10;
`;

const EmptyState = styled.div`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  opacity: 0;
  transform: scale(0.9);
`;

const BounceEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  animation: ${bounce} 2s ease-in-out infinite;
`;

const EmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #f8fafc;
`;

const EmptyDesc = styled.p`
  font-size: 12px;
  color: #94a3b8;
  margin-top: 8px;
  max-width: 240px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
`;

const NotifList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NotifCard = styled.div`
  background: ${(p) => p.bg};
  border: 1px solid ${(p) => p.borderColor};
  border-radius: 12px;
  padding: 14px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  opacity: 0;
  transform: translateX(-20px);
`;

const NotifIcon = styled.div`
  font-size: 24px;
  flex-shrink: 0;
  margin-top: 2px;
`;

const NotifBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotifHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const NotifTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #f8fafc;
`;

const NotifTime = styled.p`
  font-size: 10px;
  color: #94a3b8;
  flex-shrink: 0;
`;

const NotifMessage = styled.p`
  font-size: 12px;
  color: #cbd5e1;
  margin-top: 2px;
  line-height: 1.4;
`;

function getNotifications(redemptionHistory) {
  const notifs = [];

  redemptionHistory.forEach((entry) => {
    const time = new Date(entry.timestamp);

    notifs.push({
      id: `redeem-${entry.timestamp}`,
      type: 'redeemed',
      icon: '🎁',
      title: 'Gift Redeemed!',
      message: `You redeemed ${entry.name} for ${entry.points.toLocaleString()} points.`,
      time: time.getTime(),
    });

    notifs.push({
      id: `confirm-${entry.timestamp}`,
      type: 'confirmed',
      icon: '✅',
      title: 'Order Confirmed',
      message: `Your order for ${entry.name} has been confirmed and is being processed.`,
      time: time.getTime() + 1000,
    });

    notifs.push({
      id: `ship-${entry.timestamp}`,
      type: 'shipped',
      icon: '🚚',
      title: 'Gift Shipped',
      message: `${entry.name} is on its way! Track your delivery in the app.`,
      time: time.getTime() + 2000,
    });

    notifs.push({
      id: `deliver-${entry.timestamp}`,
      type: 'delivered',
      icon: '📦',
      title: 'Gift Delivered',
      message: `${entry.name} has been delivered. Enjoy your reward!`,
      time: time.getTime() + 3000,
    });
  });

  return notifs.sort((a, b) => b.time - a.time);
}

function formatTime(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function NotificationsScreen() {
  const history = useHistory();
  const { redemptionHistory } = useAppStore();
  const notifications = getNotifications(redemptionHistory);

  const headerRef = useRef(null);
  const emptyRef = useRef(null);
  const notifRefs = useRef([]);

  useEffect(() => {
    if (headerRef.current) {
      anime({
        targets: headerRef.current,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'spring(1, 80, 10, 0)',
      });
    }

    if (notifications.length === 0 && emptyRef.current) {
      anime({
        targets: emptyRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 500,
        delay: 300,
        easing: 'easeOutExpo',
      });
    }

    notifRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateX: [-20, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 200 + i * 60,
        easing: 'easeOutExpo',
      });
    });
  }, [notifications.length]);

  return (
    <Wrapper>
      <HeaderGradient>
        <HeaderBubble1 />
        <HeaderBubble2 />
        {[...Array(5)].map((_, i) => (
          <HeaderParticle key={i} idx={i} />
        ))}

        <BackBtn onClick={() => history.push('/home')}>
          <FiArrowLeft />
        </BackBtn>

        <HeaderContent ref={headerRef}>
          <BellEmoji>🔔</BellEmoji>
          <HeaderTitle>Notifications</HeaderTitle>
          <HeaderSub>
            {notifications.length} update{notifications.length !== 1 ? 's' : ''}
          </HeaderSub>
        </HeaderContent>
      </HeaderGradient>

      <ContentArea>
        {notifications.length === 0 ? (
          <EmptyState ref={emptyRef}>
            <BounceEmoji>🔕</BounceEmoji>
            <EmptyTitle>No Notifications Yet</EmptyTitle>
            <EmptyDesc>
              Redeem a gift and your notifications will appear here!
            </EmptyDesc>
          </EmptyState>
        ) : (
          <NotifList>
            {notifications.map((notif, i) => {
              const colors = notifColorMap[notif.type] || notifColorMap.redeemed;
              return (
                <NotifCard
                  key={notif.id}
                  ref={(el) => (notifRefs.current[i] = el)}
                  bg={colors.bg}
                  borderColor={colors.border}
                >
                  <NotifIcon>{notif.icon}</NotifIcon>
                  <NotifBody>
                    <NotifHeader>
                      <NotifTitle>{notif.title}</NotifTitle>
                      <NotifTime>{formatTime(notif.time)}</NotifTime>
                    </NotifHeader>
                    <NotifMessage>{notif.message}</NotifMessage>
                  </NotifBody>
                </NotifCard>
              );
            })}
          </NotifList>
        )}
      </ContentArea>
    </Wrapper>
  );
}
