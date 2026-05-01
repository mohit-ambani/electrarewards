import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiX } from 'react-icons/fi';
import useAppStore from '../store/useAppStore';

const Wrapper = styled.div`
  padding: 12px 16px 0;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 48px;
  border-radius: 16px;
  background: rgba(248, 250, 252, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid
    ${(props) =>
      props.$focused
        ? 'rgba(251, 146, 60, 0.4)'
        : 'rgba(248, 250, 252, 0.06)'};
  box-shadow: ${(props) =>
    props.$focused
      ? '0 0 20px rgba(251, 146, 60, 0.12), inset 0 0 0 1px rgba(251, 146, 60, 0.1)'
      : 'none'};
  transition: border 0.25s ease, box-shadow 0.25s ease;
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: ${(props) => (props.$focused ? '#fb923c' : '#64748b')};
  margin-right: 12px;
  transition: color 0.25s ease, transform 0.25s ease;
  transform: ${(props) => (props.$focused ? 'scale(1.15)' : 'scale(1)')};
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: #f8fafc;
  caret-color: #fb923c;

  &::placeholder {
    color: #475569;
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: rgba(248, 250, 252, 0.1);
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:active {
    transform: scale(0.88);
    background: rgba(248, 250, 252, 0.15);
  }
`;

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);

  return (
    <Wrapper>
      <InputContainer $focused={focused}>
        <SearchIcon $focused={focused}>
          <FiSearch />
        </SearchIcon>
        <Input
          type="text"
          placeholder="Search gifts, tools, gadgets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {searchQuery && (
          <ClearButton onClick={() => setSearchQuery('')}>
            <FiX />
          </ClearButton>
        )}
      </InputContainer>
    </Wrapper>
  );
};

export default SearchBar;
