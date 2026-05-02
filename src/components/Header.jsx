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
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid #e8ecf1;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #fb923c, #ea580c);
  color: #ffffff;
  font-size: 17px;
  box-shadow: 0 3px 10px rgba(251, 146, 60, 0.25);
`;

const AppName = styled.h1`
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  letter-spacing: -0.3px;
  white-space: nowrap;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BellButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #e8ecf1;
  background: #f8f9fb;
  color: #1a1a2e;
  font-size: 17px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:active {
    transform: scale(0.92);
  }
`;

const NotifBadge = styled.span`
  position: absolute;
  top: 3px;
  right: 3px;
  min-width: 14px;
  height: 14px;
  padding: 0 3px;
  border-radius: 7px;
  background: #ef4444;
  color: #fff;
  font-size: 8px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border: 1.5px solid #ffffff;
`;

const PointsBadge = styled.button`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 5px 9px;
  border-radius: 16px;
  border: 1px solid rgba(251, 146, 60, 0.25);
  background: rgba(251, 146, 60, 0.1);
  color: #fb923c;
  font-size: 11px;
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
  font-size: 13px;
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
