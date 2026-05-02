import React from 'react';
import styled, { keyframes } from 'styled-components';
import { twGradient } from '../utils/colors';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardWrapper = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 0.35s ease forwards;
  animation-delay: ${(props) => props.$delay}s;
  cursor: pointer;
  min-width: 0;

  &:active {
    transform: scale(0.97);
  }
`;

const Card = styled.div`
  border-radius: 10px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  transition: box-shadow 0.25s ease;
  width: 100%;
  min-width: 0;

  &:hover {
    box-shadow: 0 2px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06);
  }
`;

const ImageArea = styled.div`
  position: relative;
  height: 96px;
  background: ${(props) => props.$gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.08);
`;

const DecorCircleA = styled.div`
  position: absolute;
  right: -12px;
  top: -12px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`;

const DecorCircleB = styled.div`
  position: absolute;
  left: -6px;
  bottom: -12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
`;

const GiftEmoji = styled.span`
  font-size: 34px;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
`;

const TagBadge = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 1px 6px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  font-size: 8px;
  font-weight: 700;
  color: #ffffff;
  z-index: 3;
  letter-spacing: 0.2px;
`;

const PointsBadge = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
  padding: 2px 7px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-size: 10px;
  font-weight: 700;
  color: #fb923c;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const InfoSection = styled.div`
  padding: 6px 8px 8px;
`;

const GiftName = styled.h3`
  font-size: 11px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GiftDescription = styled.p`
  font-size: 9px;
  color: #6b7280;
  margin: 2px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.3;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 4px;
`;

const Stars = styled.div`
  display: flex;
`;

const Star = styled.span`
  font-size: 8px;
  color: ${(props) => (props.$filled ? '#fbbf24' : '#d1d5db')};
`;

const RatingValue = styled.span`
  font-size: 8px;
  color: #9ca3af;
`;

const GiftCard = ({ gift, index, onSelect }) => {
  const delay = index * 0.06;

  return (
    <CardWrapper $delay={delay} onClick={() => onSelect(gift)}>
      <Card>
        <ImageArea $gradient={twGradient(gift.color)}>
          <ImageOverlay />
          <DecorCircleA />
          <DecorCircleB />
          <GiftEmoji>{gift.image}</GiftEmoji>
          {gift.tag && <TagBadge>{gift.tag}</TagBadge>}
          <PointsBadge>
            <span>&#9889;</span> {gift.points.toLocaleString()}
          </PointsBadge>
        </ImageArea>
        <InfoSection>
          <GiftName>{gift.name}</GiftName>
          <GiftDescription>{gift.description}</GiftDescription>
          <RatingRow>
            <Stars>
              {[...Array(5)].map((_, i) => (
                <Star key={i} $filled={i < Math.floor(gift.rating)}>
                  &#9733;
                </Star>
              ))}
            </Stars>
            <RatingValue>{gift.rating}</RatingValue>
          </RatingRow>
        </InfoSection>
      </Card>
    </CardWrapper>
  );
};

export default GiftCard;
