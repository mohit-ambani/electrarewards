import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const navItems = [
  { icon: '📦', label: 'Orders', path: '/orders' },
  { icon: '⚡', label: 'Points', path: '/rewards' },
  { icon: '👤', label: 'Profile', path: '/profile' },
  { icon: '🎯', label: 'Earn', path: '/earn' },
  { icon: '📞', label: 'Support', path: '/support' },
];

const Wrapper = styled.div`
  padding: 12px 10px 4px;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 6px;
`;

const NavItem = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 4px;
  border-radius: 12px;
  border: 1px solid #e8ecf1;
  background: #f8f9fb;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
    background: rgba(249, 115, 22, 0.08);
    border-color: rgba(249, 115, 22, 0.2);
  }
`;

const NavIcon = styled.span`
  font-size: 20px;
`;

const NavLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #4b5563;
`;

const QuickNav = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Grid>
        {navItems.map((item) => (
          <NavItem key={item.path} onClick={() => history.push(item.path)}>
            <NavIcon>{item.icon}</NavIcon>
            <NavLabel>{item.label}</NavLabel>
          </NavItem>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default QuickNav;
