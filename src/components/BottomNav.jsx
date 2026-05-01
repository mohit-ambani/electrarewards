import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FiHome, FiGift, FiUser } from 'react-icons/fi';
import { IoFlash } from 'react-icons/io5';
import useAppStore from '../store/useAppStore';

const tabs = [
  { id: 'home', icon: FiHome, label: 'Home', path: '/home' },
  { id: 'catalogue', icon: FiGift, label: 'Gifts', path: '/home' },
  { id: 'rewards', icon: IoFlash, label: 'Points', path: '/rewards' },
  { id: 'profile', icon: FiUser, label: 'Profile', path: '/profile' },
];

const NavWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  z-index: 100;
  background: rgba(2, 6, 23, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(248, 250, 252, 0.06);
`;

const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 6px 8px 2px;
  max-width: 430px;
  margin: 0 auto;
`;

const TabButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 18px;
  border-radius: 14px;
  border: none;
  background: ${(props) => (props.$active ? 'rgba(251, 146, 60, 0.1)' : 'transparent')};
  cursor: pointer;
  transition: all 0.25s ease;

  &:active {
    transform: scale(0.9);
  }
`;

const TabIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${(props) => (props.$active ? '#fb923c' : '#64748b')};
  transition: color 0.25s ease;
`;

const TabLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${(props) => (props.$active ? '#fb923c' : '#64748b')};
  transition: color 0.25s ease;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: 2px;
  width: 24px;
  height: 2px;
  border-radius: 1px;
  background: #fb923c;
`;

const SafeAreaSpacer = styled.div`
  height: env(safe-area-inset-bottom, 0px);
`;

const BottomNav = () => {
  const history = useHistory();
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    history.push(tab.path);
  };

  return (
    <NavWrapper>
      <NavInner>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <TabButton
              key={tab.id}
              $active={isActive}
              onClick={() => handleTabClick(tab)}
            >
              <TabIcon $active={isActive}>
                <Icon />
              </TabIcon>
              <TabLabel $active={isActive}>{tab.label}</TabLabel>
              {isActive && <ActiveIndicator />}
            </TabButton>
          );
        })}
      </NavInner>
      <SafeAreaSpacer />
    </NavWrapper>
  );
};

export default BottomNav;
