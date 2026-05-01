import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import { getGiftsByCategory } from '../data/gifts';
import GiftCard from './GiftCard';

const Wrapper = styled.div`
  padding: 0 16px 100px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const SectionTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
`;

const GiftCount = styled.span`
  font-size: 12px;
  color: #64748b;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
`;

const EmptyEmoji = styled.span`
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.6;
`;

const EmptyTitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

const EmptySubtitle = styled.p`
  font-size: 12px;
  color: #475569;
  margin: 6px 0 0;
`;

const GiftGrid = () => {
  const history = useHistory();
  const category = useAppStore((s) => s.category);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSelectedGift = useAppStore((s) => s.setSelectedGift);

  let filteredGifts = getGiftsByCategory(category);

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredGifts = filteredGifts.filter(
      (g) =>
        g.name.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query)
    );
  }

  const handleSelect = (gift) => {
    setSelectedGift(gift);
    history.push(`/gift/${gift.id}`);
  };

  return (
    <Wrapper>
      <SectionHeader>
        <SectionTitle>
          {searchQuery ? 'Search Results' : 'Gift Catalogue'}
        </SectionTitle>
        <GiftCount>{filteredGifts.length} gifts</GiftCount>
      </SectionHeader>

      {filteredGifts.length > 0 ? (
        <Grid>
          {filteredGifts.map((gift, index) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              index={index}
              onSelect={handleSelect}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <EmptyEmoji>&#128269;</EmptyEmoji>
          <EmptyTitle>No gifts found</EmptyTitle>
          <EmptySubtitle>Try a different search or category</EmptySubtitle>
        </EmptyState>
      )}
    </Wrapper>
  );
};

export default GiftGrid;
