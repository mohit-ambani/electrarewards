import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import anime from 'animejs';
import useAppStore from '../store/useAppStore';

const floatParticle = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
  50% { transform: translateY(-60px) translateX(15px); opacity: 1; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulseOpacity = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
  max-width: 430px;
  margin: 0 auto;
  padding-bottom: 96px;
`;

const HeaderGradient = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #ea580c, #f97316, #f59e0b);
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
  left: ${(p) => 15 + p.idx * 15}%;
  top: ${(p) => 40 + (p.idx % 3) * 15}%;
  animation: ${floatParticle} 3s ease-in-out ${(p) => p.idx * 0.5}s infinite;
`;

const HeaderContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 10;
  opacity: 0;
  transform: scale(0);
`;

const BoltEmoji = styled.span`
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

const CardArea = styled.div`
  margin: -16px 16px 0;
  position: relative;
  z-index: 10;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const StatCard = styled.div`
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transform: scale(0.8);
`;

const StatIcon = styled.span`
  font-size: 24px;
`;

const StatValue = styled.p`
  font-size: 20px;
  font-weight: 800;
  color: ${(p) => p.color || '#1a1a2e'};
`;

const StatLabel = styled.p`
  font-size: 10px;
  color: #9ca3af;
  font-weight: 500;
`;

const BalanceCard = styled.div`
  margin-top: 16px;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 16px;
  padding: 16px;
  opacity: 0;
  transform: translateY(10px);
`;

const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const BalanceLabel = styled.p`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;

const BalancePct = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #fb923c;
`;

const BarTrack = styled.div`
  height: 12px;
  background: #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const BarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #f97316, #f59e0b);
  border-radius: 12px;
  width: 0%;
  position: relative;
  overflow: hidden;
`;

const BarShimmer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: ${shimmer} 2s ease-in-out infinite;
`;

const BarLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const BarLabelText = styled.p`
  font-size: 10px;
  color: #9ca3af;
`;

const BarPointsText = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #1a1a2e;
  animation: ${pulseOpacity} 2s ease-in-out infinite;
`;

const HistorySection = styled.div`
  margin-top: 20px;
  padding: 0 16px;
`;

const HistoryTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 12px;
`;

const EmptyState = styled.div`
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
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
  color: #1a1a2e;
`;

const EmptyDesc = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin-top: 8px;
  max-width: 240px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
`;

const SparkleText = styled.div`
  margin-top: 16px;
  font-size: 24px;
  animation: ${pulseOpacity} 3s ease-in-out infinite;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HistoryEntry = styled.div`
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transform: translateY(20px);
`;

const EntryEmojiBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${(p) => p.bg || 'rgba(249,115,22,0.15)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

const EntryInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const EntryName = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EntryDate = styled.p`
  font-size: 10px;
  color: #9ca3af;
  margin-top: 2px;
`;

const EntryRight = styled.div`
  text-align: right;
  flex-shrink: 0;
`;

const EntryPoints = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #f87171;
`;

const RedeemedBadge = styled.span`
  display: inline-block;
  margin-top: 2px;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 9px;
  font-weight: 700;
  background: rgba(34,197,94,0.12);
  color: #16a34a;
`;

export default function RewardsScreen() {
  const { userPoints, redemptionHistory } = useAppStore();

  const totalSpent = redemptionHistory.reduce((sum, e) => sum + e.points, 0);
  const totalEarned = userPoints + totalSpent;
  const progressPercent =
    totalEarned > 0 ? Math.round((userPoints / totalEarned) * 100) : 100;

  const headerRef = useRef(null);
  const statRefs = useRef([]);
  const balanceRef = useRef(null);
  const barFillRef = useRef(null);
  const emptyRef = useRef(null);
  const entryRefs = useRef([]);

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

    statRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 500,
        delay: 200 + i * 100,
        easing: 'spring(1, 80, 10, 0)',
      });
    });

    if (balanceRef.current) {
      anime({
        targets: balanceRef.current,
        translateY: [10, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 500,
        easing: 'easeOutExpo',
      });
    }

    if (barFillRef.current) {
      anime({
        targets: barFillRef.current,
        width: ['0%', `${progressPercent}%`],
        duration: 800,
        delay: 700,
        easing: 'easeOutExpo',
      });
    }

    if (redemptionHistory.length === 0 && emptyRef.current) {
      anime({
        targets: emptyRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 500,
        delay: 600,
        easing: 'easeOutExpo',
      });
    }

    entryRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 600 + i * 80,
        easing: 'easeOutExpo',
      });
    });
  }, [progressPercent, redemptionHistory.length]);

  return (
    <Wrapper>
      <HeaderGradient>
        <HeaderBubble1 />
        <HeaderBubble2 />
        {[...Array(6)].map((_, i) => (
          <HeaderParticle key={i} idx={i} />
        ))}
        <HeaderContent ref={headerRef}>
          <BoltEmoji>⚡</BoltEmoji>
          <HeaderTitle>Points & Rewards</HeaderTitle>
          <HeaderSub>Track your earning journey</HeaderSub>
        </HeaderContent>
      </HeaderGradient>

      <CardArea>
        <StatsGrid>
          {[
            {
              label: 'Available',
              value: `${(userPoints / 1000).toFixed(1)}k`,
              icon: '⚡',
              color: '#fb923c',
            },
            {
              label: 'Total Spent',
              value: `${(totalSpent / 1000).toFixed(1)}k`,
              icon: '🎁',
              color: '#f87171',
            },
            {
              label: 'Redeemed',
              value: String(redemptionHistory.length),
              icon: '🏆',
              color: '#fbbf24',
            },
          ].map((stat, i) => (
            <StatCard key={i} ref={(el) => (statRefs.current[i] = el)}>
              <StatIcon>{stat.icon}</StatIcon>
              <StatValue color={stat.color}>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <BalanceCard ref={balanceRef}>
          <BalanceRow>
            <BalanceLabel>Points Balance</BalanceLabel>
            <BalancePct>{progressPercent}% remaining</BalancePct>
          </BalanceRow>
          <BarTrack>
            <BarFill ref={barFillRef}>
              <BarShimmer />
            </BarFill>
          </BarTrack>
          <BarLabels>
            <BarLabelText>0</BarLabelText>
            <BarPointsText>⚡ {userPoints.toLocaleString()} pts</BarPointsText>
            <BarLabelText>{totalEarned.toLocaleString()}</BarLabelText>
          </BarLabels>
        </BalanceCard>
      </CardArea>

      <HistorySection>
        <HistoryTitle>Redemption History</HistoryTitle>

        {redemptionHistory.length === 0 ? (
          <EmptyState ref={emptyRef}>
            <BounceEmoji>🎁</BounceEmoji>
            <EmptyTitle>No Redemptions Yet</EmptyTitle>
            <EmptyDesc>
              Your redemption history will appear here once you redeem your first
              gift!
            </EmptyDesc>
            <SparkleText>⚡✨⚡</SparkleText>
          </EmptyState>
        ) : (
          <HistoryList>
            {redemptionHistory.map((entry, i) => (
              <HistoryEntry
                key={entry.timestamp + '-' + i}
                ref={(el) => (entryRefs.current[i] = el)}
              >
                <EntryEmojiBox>
                  {entry.image}
                </EntryEmojiBox>
                <EntryInfo>
                  <EntryName>{entry.name}</EntryName>
                  <EntryDate>
                    {new Date(entry.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </EntryDate>
                </EntryInfo>
                <EntryRight>
                  <EntryPoints>-{entry.points.toLocaleString()}</EntryPoints>
                  <RedeemedBadge>Redeemed</RedeemedBadge>
                </EntryRight>
              </HistoryEntry>
            ))}
          </HistoryList>
        )}
      </HistorySection>
    </Wrapper>
  );
}
