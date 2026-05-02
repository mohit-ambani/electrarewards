import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import anime from 'animejs';

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
  padding: 16px;
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

const Content = styled.div`
  padding: 16px;
`;

const AddressCard = styled.div`
  padding: 16px;
  background: #f8f9fb;
  border: 1px solid #e8ecf1;
  border-radius: 14px;
  margin-bottom: 12px;
  display: flex;
  gap: 14px;
  opacity: 0;
  transform: translateY(12px);
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #d1d5db;
  }
`;

const ActiveCard = styled(AddressCard)`
  border-color: #f97316;
  background: rgba(249,115,22,0.03);

  &:hover {
    border-color: #f97316;
  }
`;

const AddressIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${(p) => p.bg || 'rgba(249,115,22,0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

const AddressInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const AddressLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LabelText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
`;

const DefaultTag = styled.span`
  padding: 1px 6px;
  border-radius: 6px;
  background: rgba(249,115,22,0.12);
  color: #ea580c;
  font-size: 9px;
  font-weight: 700;
`;

const AddressText = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
  line-height: 1.5;
`;

const PhoneText = styled.p`
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
`;

const SectionTitle = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 20px 0 10px;
`;

const AddNewBtn = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  border: 1.5px dashed #d1d5db;
  background: transparent;
  color: #6b7280;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 8px;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: #f97316;
    color: #f97316;
  }
`;

const addresses = [
  {
    id: 1,
    type: 'home',
    label: 'Home',
    icon: '🏠',
    address: 'B-42, Sector 21, Noida, Uttar Pradesh - 201301',
    phone: '+91 98765 43210',
    isDefault: true,
  },
  {
    id: 2,
    type: 'work',
    label: 'Workshop',
    icon: '🔧',
    address: 'Plot 15, Industrial Area Phase-II, Noida, UP - 201305',
    phone: '+91 98765 43210',
    isDefault: false,
  },
];

export default function DeliveryAddressScreen() {
  const history = useHistory();
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        translateY: [12, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 100 + i * 80,
        easing: 'easeOutExpo',
      });
    });
  }, []);

  return (
    <Wrapper>
      <Header>
        <BackBtn onClick={() => history.goBack()}>
          <FiArrowLeft />
        </BackBtn>
        <HeaderTitle>Delivery Address</HeaderTitle>
      </Header>

      <Content>
        <SectionTitle>Saved Addresses</SectionTitle>

        {addresses.map((addr, i) => {
          const CardComp = addr.isDefault ? ActiveCard : AddressCard;
          return (
            <CardComp key={addr.id} ref={(el) => (cardRefs.current[i] = el)}>
              <AddressIcon bg={addr.isDefault ? 'rgba(249,115,22,0.12)' : '#f1f5f9'}>
                {addr.icon}
              </AddressIcon>
              <AddressInfo>
                <AddressLabel>
                  <LabelText>{addr.label}</LabelText>
                  {addr.isDefault && <DefaultTag>Default</DefaultTag>}
                </AddressLabel>
                <AddressText>{addr.address}</AddressText>
                <PhoneText>{addr.phone}</PhoneText>
              </AddressInfo>
            </CardComp>
          );
        })}

        <AddNewBtn>+ Add New Address</AddNewBtn>
      </Content>
    </Wrapper>
  );
}
