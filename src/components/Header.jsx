import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import { IoFlash } from 'react-icons/io5';
import useAppStore from '../store/useAppStore';

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 8px rgba(251, 146, 60, 0.3); }
  50% { box-shadow: 0 0 18px rgba(251, 146, 60, 0.6); }
`;

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(2, 6, 23, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(251, 146, 60, 0.12);
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #fb923c, #ea580c);
  color: #020617;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.25);
`;

const AppName = styled.h1`
  font-size: 15px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
  letter-spacing: -0.3px;
  white-space: nowrap;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BellButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(248, 250, 252, 0.08);
  background: rgba(248, 250, 252, 0.05);
  color: #f8fafc;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:active {
    transform: scale(0.92);
  }
`;

const NotifBadge = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: #ef4444;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border: 2px solid #020617;
`;

const PointsBadge = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 20px;
  border: 1px solid rgba(251, 146, 60, 0.25);
  background: rgba(251, 146, 60, 0.1);
  color: #fb923c;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: ${pulseGlow} 3s ease-in-out infinite;
  white-space: nowrap;
  flex-shrink: 0;

  &:active {
    transform: scale(0.95);
  }
`;

const PointsIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #fb923c;
`;

const Header = () => {
  const history = useHistory();
  const userPoints = useAppStore((s) => s.userPoints);
  const redemptionHistory = useAppStore((s) => s.redemptionHistory);

  const notificationCount = redemptionHistory.length * 4;

  return (
    <HeaderWrapper>
      <LogoSection>
        <LogoIcon>
          <IoFlash />
        </LogoIcon>
        <AppName>ElectraRewards</AppName>
      </LogoSection>

      <RightSection>
        <BellButton onClick={() => history.push('/notifications')}>
          <FiBell />
          {notificationCount > 0 && (
            <NotifBadge>
              {notificationCount > 99 ? '99+' : notificationCount}
            </NotifBadge>
          )}
        </BellButton>

        <PointsBadge onClick={() => history.push('/profile')}>
          <PointsIcon>
            <IoFlash />
          </PointsIcon>
          {userPoints.toLocaleString()}
        </PointsBadge>
      </RightSection>
    </HeaderWrapper>
  );
};

export default Header;
