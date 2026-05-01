import React, { useRef } from 'react';
import styled from 'styled-components';
import useAppStore from '../store/useAppStore';
import { giftCategories } from '../data/gifts';

const Wrapper = styled.div`
  padding: 16px 0 8px;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 0 16px 8px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Pill = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 16px;
  border: ${(props) =>
    props.$active ? 'none' : '1px solid rgba(248, 250, 252, 0.06)'};
  background: ${(props) =>
    props.$active
      ? 'linear-gradient(135deg, #fb923c, #ea580c)'
      : 'rgba(248, 250, 252, 0.05)'};
  backdrop-filter: ${(props) => (props.$active ? 'none' : 'blur(8px)')};
  -webkit-backdrop-filter: ${(props) =>
    props.$active ? 'none' : 'blur(8px)'};
  color: ${(props) => (props.$active ? '#ffffff' : '#94a3b8')};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${(props) =>
    props.$active ? '0 4px 14px rgba(251, 146, 60, 0.3)' : 'none'};

  &:active {
    transform: scale(0.94);
  }

  &:hover {
    border-color: ${(props) =>
      props.$active ? 'transparent' : 'rgba(251, 146, 60, 0.25)'};
  }
`;

const PillIcon = styled.span`
  font-size: 14px;
  line-height: 1;
`;

const CategoryFilter = () => {
  const scrollRef = useRef(null);
  const category = useAppStore((s) => s.category);
  const setCategory = useAppStore((s) => s.setCategory);

  return (
    <Wrapper>
      <ScrollContainer ref={scrollRef}>
        {giftCategories.map((cat) => (
          <Pill
            key={cat.id}
            $active={category === cat.id}
            onClick={() => setCategory(cat.id)}
          >
            <PillIcon>{cat.icon}</PillIcon>
            {cat.name}
          </Pill>
        ))}
      </ScrollContainer>
    </Wrapper>
  );
};

export default CategoryFilter;
