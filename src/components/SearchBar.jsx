import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiX } from 'react-icons/fi';
import useAppStore from '../store/useAppStore';

const Wrapper = styled.div`
  padding: 8px 10px 0;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 38px;
  border-radius: 10px;
  background: #f1f5f9;
  border: 1px solid
    ${(props) =>
      props.$focused
        ? '#f97316'
        : '#e8ecf1'};
  box-shadow: ${(props) =>
    props.$focused
      ? '0 0 0 2px rgba(249, 115, 22, 0.15)'
      : 'none'};
  transition: border 0.25s ease, box-shadow 0.25s ease;
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: ${(props) => (props.$focused ? '#fb923c' : '#9ca3af')};
  margin-right: 10px;
  transition: color 0.25s ease, transform 0.25s ease;
  transform: ${(props) => (props.$focused ? 'scale(1.1)' : 'scale(1)')};
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 13px;
  color: #1a1a2e;
  caret-color: #fb923c;

  &::placeholder {
    color: #9ca3af;
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
  background: #e5e7eb;
  color: #6b7280;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:active {
    transform: scale(0.88);
    background: #d1d5db;
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
