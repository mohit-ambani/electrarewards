import React, { useRef } from 'react';
import styled from 'styled-components';
import useAppStore from '../store/useAppStore';
import { giftCategories } from '../data/gifts';

const Wrapper = styled.div`
  padding: 8px 0 4px;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 0 10px 6px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Pill = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 14px;
  border: ${(props) =>
    props.$active ? 'none' : '1px solid #e8ecf1'};
  background: ${(props) =>
    props.$active
      ? 'linear-gradient(135deg, #fb923c, #ea580c)'
      : '#f1f5f9'};
  color: ${(props) => (props.$active ? '#ffffff' : '#6b7280')};
  font-size: 11px;
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
      props.$active ? 'transparent' : '#d1d5db'};
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
