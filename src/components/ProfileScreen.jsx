import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import anime from 'animejs';
import useAppStore from '../store/useAppStore';

const floatParticle = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0; }
  50% { transform: translateY(-60px); opacity: 1; }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(251,146,60,0.2); }
  50% { box-shadow: 0 0 25px rgba(251,146,60,0.4); }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background: #020617;
  max-width: 430px;
  margin: 0 auto;
  padding-bottom: 96px;
`;

const HeaderGradient = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #ea580c, #f97316, #3b82f6);
  overflow: hidden;
`;

const HeaderOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.2);
`;

const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  left: ${(p) => 10 + p.idx * 12}%;
  top: 80%;
  animation: ${floatParticle} 2s ease-in-out ${(p) => p.idx * 0.3}s infinite;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
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

const HeaderInfo = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
`;

const AvatarBox = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 8px;
  opacity: 0;
  transform: scale(0);
`;

const UserName = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #fff;
`;

const UserRole = styled.p`
  font-size: 12px;
  color: rgba(255,255,255,0.7);
`;

const PointsCard = styled.div`
  margin: -16px 16px 0;
  position: relative;
  z-index: 10;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 20px;
  opacity: 0;
  transform: translateY(20px);
`;

const PointsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PointsLabel = styled.p`
  font-size: 11px;
  color: #94a3b8;
`;

const PointsValue = styled.p`
  font-size: 28px;
  font-weight: 800;
  color: #fb923c;
  margin-top: 4px;
`;

const TierBadge = styled.div`
  padding: 8px 16px;
  border-radius: 16px;
  background: ${(p) => p.gradient};
  display: flex;
  align-items: center;
  gap: 6px;
  animation: ${pulseGlow} 2s ease-in-out infinite;
`;

const TierEmoji = styled.span`
  font-size: 18px;
`;

const TierName = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #fff;
`;

const ProgressSection = styled.div`
  margin-top: 16px;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const ProgressText = styled.span`
  font-size: 10px;
  color: #94a3b8;
`;

const ProgressTrack = styled.div`
  height: 6px;
  background: #1e293b;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #f97316, #fb923c);
  border-radius: 6px;
  width: 0%;
`;

const StatsGrid = styled.div`
  margin: 16px 16px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const StatItem = styled.div`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
`;

const StatIcon = styled.span`
  font-size: 24px;
`;

const StatValue = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #f8fafc;
  margin-top: 4px;
`;

const StatLabel = styled.p`
  font-size: 10px;
  color: #94a3b8;
`;

const SettingsSection = styled.div`
  margin: 24px 16px 0;
  padding-bottom: 32px;
`;

const SettingsTitle = styled.h3`
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 4px;
  cursor: pointer;
  opacity: 0;
  transform: translateX(-20px);
  transition: background 0.2s;
  &:hover {
    background: rgba(255,255,255,0.02);
  }
`;

const MenuIcon = styled.span`
  font-size: 20px;
`;

const MenuText = styled.div`
  flex: 1;
`;

const MenuLabel = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #f8fafc;
`;

const MenuSub = styled.p`
  font-size: 11px;
  color: #94a3b8;
  margin-top: 1px;
`;

const MenuArrow = styled.span`
  font-size: 14px;
  color: #334155;
`;

const tierConfig = {
  Platinum: {
    emoji: '💎',
    gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
  },
  Gold: {
    emoji: '🥇',
    gradient: 'linear-gradient(135deg, #facc15, #d97706)',
  },
  Silver: {
    emoji: '🥈',
    gradient: 'linear-gradient(135deg, #d1d5db, #6b7280)',
  },
  Bronze: {
    emoji: '🥉',
    gradient: 'linear-gradient(135deg, #d97706, #92400e)',
  },
};

const settingsMenu = [
  { icon: '📦', label: 'Order History', sub: '12 orders' },
  { icon: '📍', label: 'Delivery Address', sub: 'Sector 21, Noida' },
  { icon: '🔔', label: 'Notifications', sub: 'All enabled' },
  { icon: '🎯', label: 'Earn More Points', sub: 'View missions' },
  { icon: '📞', label: 'Support', sub: '24/7 available' },
  { icon: '📄', label: 'Terms & Conditions', sub: '' },
];

const stats = [
  { label: 'Gifts Redeemed', value: '12', icon: '🎁' },
  { label: 'Points Earned', value: '85K', icon: '⚡' },
  { label: 'Rank', value: '#24', icon: '🏆' },
];

export default function ProfileScreen() {
  const history = useHistory();
  const { userPoints } = useAppStore();

  const tier =
    userPoints >= 20000
      ? 'Platinum'
      : userPoints >= 10000
      ? 'Gold'
      : userPoints >= 5000
      ? 'Silver'
      : 'Bronze';

  const tc = tierConfig[tier];

  const avatarRef = useRef(null);
  const pointsCardRef = useRef(null);
  const progressRef = useRef(null);
  const statRefs = useRef([]);
  const menuRefs = useRef([]);

  useEffect(() => {
    if (avatarRef.current) {
      anime({
        targets: avatarRef.current,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 600,
        delay: 200,
        easing: 'spring(1, 80, 10, 0)',
      });
    }

    if (pointsCardRef.current) {
      anime({
        targets: pointsCardRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 300,
        easing: 'easeOutExpo',
      });
    }

    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ['0%', '75%'],
        duration: 1000,
        delay: 500,
        easing: 'easeOutExpo',
      });
    }

    statRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 400 + i * 100,
        easing: 'easeOutExpo',
      });
    });

    menuRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateX: [-20, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 500 + i * 50,
        easing: 'easeOutExpo',
      });
    });
  }, []);

  return (
    <Wrapper>
      <HeaderGradient>
        <HeaderOverlay />
        {[...Array(8)].map((_, i) => (
          <Particle key={i} idx={i} />
        ))}

        <CloseBtn onClick={() => history.push('/home')}>
          <FiX />
        </CloseBtn>

        <HeaderInfo>
          <AvatarBox ref={avatarRef}>👷</AvatarBox>
          <UserName>Rajesh Kumar</UserName>
          <UserRole>Master Electrician &bull; Member since 2024</UserRole>
        </HeaderInfo>
      </HeaderGradient>

      <PointsCard ref={pointsCardRef}>
        <PointsRow>
          <div>
            <PointsLabel>Available Points</PointsLabel>
            <PointsValue>⚡ {userPoints.toLocaleString()}</PointsValue>
          </div>
          <TierBadge gradient={tc.gradient}>
            <TierEmoji>{tc.emoji}</TierEmoji>
            <TierName>{tier}</TierName>
          </TierBadge>
        </PointsRow>

        <ProgressSection>
          <ProgressHeader>
            <ProgressText>Progress to next tier</ProgressText>
            <ProgressText>75%</ProgressText>
          </ProgressHeader>
          <ProgressTrack>
            <ProgressFill ref={progressRef} />
          </ProgressTrack>
        </ProgressSection>
      </PointsCard>

      <StatsGrid>
        {stats.map((stat, i) => (
          <StatItem key={i} ref={(el) => (statRefs.current[i] = el)}>
            <StatIcon>{stat.icon}</StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatItem>
        ))}
      </StatsGrid>

      <SettingsSection>
        <SettingsTitle>Settings</SettingsTitle>
        {settingsMenu.map((item, i) => (
          <MenuItem key={i} ref={(el) => (menuRefs.current[i] = el)}>
            <MenuIcon>{item.icon}</MenuIcon>
            <MenuText>
              <MenuLabel>{item.label}</MenuLabel>
              {item.sub && <MenuSub>{item.sub}</MenuSub>}
            </MenuText>
            <MenuArrow>&rsaquo;</MenuArrow>
          </MenuItem>
        ))}
      </SettingsSection>
    </Wrapper>
  );
}
